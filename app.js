const express = require('express')
const mongoose = require('mongoose')
const Listing = require('./models/listing.js')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const asyncWrap = require('./utils/asyncWrap.js')
const MyError = require('./utils/ExpressErr.js')
const { listingSchema } = require('./schema.js')
const Review = require('./models/review.js')
const listings = require('./routes/listings.js')
const reviews = require('./routes/reviews.js')
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

main()
    .then(res => console.log('Connection Successfull...')).catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
}



app.get('/', (req, res) => {
    res.render('listings/home.ejs')
})

app.use('/listings',listings)

app.use('/listings/:id/reviews',reviews)


app.use((req, res, next) => {
    next(new MyError(404, "Page not found"));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Some error Occured" } = err
    // console.log(err);
    res.status(statusCode).send(message);
});
app.listen(8080, () => {
    console.log('Server is running at port 8080...')
})
