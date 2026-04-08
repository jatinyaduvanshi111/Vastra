import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};