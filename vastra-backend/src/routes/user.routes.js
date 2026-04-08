import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  // ADDRESS
  addAddress,
  getAddresses,
  deleteAddress,
  setDefaultAddress,

  // WISHLIST
  addToWishlist,
  removeFromWishlist,
  getWishlist,

  // CART
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getCart

} from "../controllers/user.controller.js";

const router = express.Router();

/* ================= ADDRESS ================= */

router.post("/address", protect, addAddress);
router.get("/address", protect, getAddresses);
router.delete("/address/:id", protect, deleteAddress);
router.put("/address/default/:id", protect, setDefaultAddress);


/* ================= WISHLIST ================= */

router.post("/wishlist/:productId", protect, addToWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);
router.get("/wishlist", protect, getWishlist);


/* ================= CART ================= */

router.post("/cart/:productId", protect, addToCart);
router.put("/cart/:productId", protect, updateCartQuantity);
router.delete("/cart/:productId", protect, removeFromCart);
router.get("/cart", protect, getCart);


export default router;