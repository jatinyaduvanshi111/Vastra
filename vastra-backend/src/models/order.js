import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        price: Number
      }
    ],

    totalAmount: Number,

    shippingAddress: {
      fullName: String,
      phone: String,
      pincode: String,
      state: String,
      city: String,
      houseNo: String,
      area: String,
      landmark: String
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD"
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING"
    },

    orderStatus: {
      type: String,
      enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED"
    },

    // 🔥 IMPORTANT FOR RAZORPAY
    razorpayOrderId: String,
    razorpayPaymentId: String

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);