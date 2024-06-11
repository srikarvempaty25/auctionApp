const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require("express-session")
const sequelize = require('./util/database')
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const User = require(path.join(__dirname, 'models', 'User'))
const Product = require(path.join(__dirname, 'models', 'Product'))
const AuctionRoom = require(path.join(__dirname, 'models', 'AuctionRoom'))
const Bid = require(path.join(__dirname, 'models', 'Bid'))

const homeRoute = require(path.join(__dirname, 'controllers', 'home'))
const addProductRoute = require(path.join(__dirname, 'controllers', 'add-product'))
const displayProductsRoute = require(path.join(__dirname, 'controllers', 'products'))
const displayOneProductRoute = require(path.join(__dirname, 'controllers', 'one-product'))
const bidOnProductRoute = require(path.join(__dirname, 'controllers', 'bid-on-product'))
const registerUserRoute = require(path.join(__dirname, 'controllers', 'register-user'))
const userLoginRoute = require(path.join(__dirname, 'controllers', 'user-login'))
const userLogoutRoute = require(path.join(__dirname, 'controllers', 'user-logout'))

const app = express()

var myStore = new SequelizeStore({
    db: sequelize,
  })
app.use(
    session({
        secret: "keyboard cat",
        store: myStore,
        resave: false,
        proxy: true,
    })
  )

myStore.sync()
  

app.use(bodyParser.urlencoded({extended: false}))
app.use(session({secret: "my secret", resave:false, saveUninitialized: false}))
app.use(bodyParser.json())

// Associations
AuctionRoom.hasMany(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Product.belongsTo(AuctionRoom, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.belongsToMany(AuctionRoom, { through: 'UserAuctionRoom', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
AuctionRoom.belongsToMany(User, { through: 'UserAuctionRoom', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Bid, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Bid.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Product.hasMany(Bid, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Bid.belongsTo(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    try{
        const user = await User.findOne({
            where: {
                id: req.session.user.id,
            }
        })
        req.user = user
        console.log(user)
        next()
    }catch(error){
        console.log(error)
    }
})

app.use('/', homeRoute)

app.use('/', userLogoutRoute)

app.use('/register-user', registerUserRoute)

app.use('/user-login', userLoginRoute)

app.use('/add-product', addProductRoute)

app.use('/display-product', displayOneProductRoute);

app.use('/display-product', displayProductsRoute)

app.use('/bid-on-product', bidOnProductRoute)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000)
