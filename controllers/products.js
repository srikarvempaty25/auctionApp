const express = require("express")
const Product = require("../models/Product");
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll(); // Fetch products from the database
        res.render('display-product', { pageTitle: "All Products", products: products, isLoggedIn: req.session.isLoggedIn}); // Render the products.ejs view and pass the products data
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
})

module.exports = router