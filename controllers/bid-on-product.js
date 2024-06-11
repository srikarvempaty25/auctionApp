const express = require("express")

const Product = require('../models/Product')
const Bid = require('../models/Bid')

const router = express.Router()

router.post('/:id', async (req, res) =>{
    const productId = req.params.id
    const { bidValue } = req.body

    try {
        const product = await Product.findByPk(productId)
        if (!product) {
            return res.status(404).send('Product not found')
        }
        const currentBid = product.currentBid;
        //console.log(req.user)
        if(bidValue > currentBid){
            const newBid = await Bid.create({
                bidValue: bidValue,
                productId: productId,
                userId: req.user.id
            })
            //update current highest bid of product
            await product.update({currentBid: newBid.bidValue})
            console.log('New bid created at:', newBid.bidTime); // This will log the timestamp
            console.log('New bid value:', newBid.bidValue); // This will log the bid value
            res.render('bid-response', {bidPlaced: true, bidFailed: false, isLoggedIn: req.session.isLoggedIn})
        }else{
            console.log("BID VALUE TOO SMALL")
            res.render('bid-response', {bidPlaced: false, bidFailed: true, isLoggedIn: req.session.isLoggedIn})
        }
    } catch (error) {
        console.error('Error placing bid:', error)
        res.status(500).send('Server Error')
    }
})

module.exports = router
