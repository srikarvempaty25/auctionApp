const express = require("express")
const Product = require("../models/Product");
const router = express.Router()

router.get("/:productId", async (req, res) => {
    const productId = req.params.productId
    console.log("product id: " + productId)
    try {
        const product = await Product.findByPk(productId); // Fetch products from the database
        console.log(product)
        res.render('one-product', { pageTitle: "Product Details", product: product, isLoggedIn: req.session.isLoggedIn}); // Render the products.ejs view and pass the products data
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
})

module.exports = router