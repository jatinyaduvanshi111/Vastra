import User from "../models/User.js";

// ================= ADDRESS =================

// ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.addresses.push(req.body);
    await user.save();

    res.json({ message: "Address added", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
};

// GET ALL ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.id
    );

    await user.save();
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
};

// SET DEFAULT ADDRESS
export const setDefaultAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === req.params.id;
    });

    await user.save();
    res.json({ message: "Default address updated" });
  } catch (error) {
    res.status(500).json({ message: "Error setting default address" });
  }
};

// ================= WISHLIST =================

// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }

    res.json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist" });
  }
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== req.params.productId
    );

    await user.save();

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist" });
  }
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};

// ================= CART =================

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        product: req.params.productId,
        quantity: 1
      });
    }

    await user.save();
    res.json({ message: "Added to cart" });

  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// UPDATE QUANTITY
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const user = await User.findById(req.user._id);

    user.cart.forEach((item) => {
      if (item.product.toString() === req.params.productId) {
        item.quantity = quantity;
      }
    });

    await user.save();
    res.json({ message: "Cart updated" });

  } catch (error) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await user.save();
    res.json({ message: "Removed from cart" });

  } catch (error) {
    res.status(500).json({ message: "Error removing from cart" });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json(user.cart);

  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};