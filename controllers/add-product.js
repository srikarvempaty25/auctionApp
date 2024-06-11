const express = require('express')
const Product = require("../models/Product")
const router = express.Router()

router.get('/', (req, res) => {
    res.render('add-product', {pageTitle: "Add Product", isLoggedIn: req.session.isLoggedIn})
})

router.post('/', (req, res) => {
    const name = req.body.productName
    const price = req.body.productPrice
    const startPrice = req.body.startPrice
    const currentBid = req.body.currentBid
    const category = req.body.category
    const description = req.body.productDescription
    const imageUrl = req.body.imageUrl
    Product.create({
        name: name,
        price: price,
        startPrice: startPrice,
        currentBid: currentBid,
        category: category,
        description: description,
        imageUrl: imageUrl,
        userId: req.user.id
    })
    res.redirect('/add-product')
})

module.exports = router