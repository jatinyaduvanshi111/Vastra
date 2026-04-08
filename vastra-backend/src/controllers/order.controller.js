import Order from "../models/order.js";
import User from "../models/User.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = user.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create Order in DB
    const newOrder = await Order.create({
      user: user._id,
      products: user.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentMethod === "COD" ? "PENDING" : "PENDING"
    });

    // ================= ONLINE PAYMENT =================
    if (req.body.paymentMethod === "ONLINE") {

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR"
      });

      newOrder.razorpayOrderId = razorpayOrder.id;
      await newOrder.save();

      return res.json({
        amount: totalAmount,
        razorpayOrderId: razorpayOrder.id
      });
    }

    // ================= COD =================
    user.cart = [];
    await user.save();

    res.json({ message: "Order placed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= VERIFY PAYMENT =================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: "PAID"
        }
      );

      // Clear Cart After Payment
      const user = await User.findById(order.user);
      user.cart = [];
      await user.save();

      res.json({ success: true });

    } else {
      res.status(400).json({ message: "Invalid signature" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET USER ORDERS =================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};