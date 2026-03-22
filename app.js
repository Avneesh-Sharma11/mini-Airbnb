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

// app.get('/testListing', (req, res) => {
//     let sample = new Listing({
//     tital:"Mai hu Chutiya..",
//     description: "Dhoom machale chutiya",
//     price: 3,
//     location: "CCCC",
//     country: "cnjdfbadjf",
//     })
//     sample.save();
//     res.send('success') 
// })
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error.details)

        throw new MyError(400, error)
    } else {
        next()
    }
}
app.get('/', (req, res) => {
    res.render('listings/home.ejs')
})

app.get('/listings', async (req, res) => {
    let AllListings = await Listing.find({});
    res.render('listings/index.ejs', { AllListings })
})
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})
app.post('/listings', validateListing, async (req, res, next) => {

    const NewList = new Listing(req.body.list)
    await NewList.save();
    res.redirect("/listings")
})
app.get('/listings/:id', async (req, res) => {

    let { id } = req.params;
    let user = await Listing.findById(id).populate('reviews');
    // console.log(user);
    res.render('listings/show.ejs', { user })
})
app.post('/listings/:id/reviews', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review)
    // console.log(listing)
    // console.log(newReview)
    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save()
    res.redirect(`/listings/${listing._id}`)
})
app.delete('/listings/:id1/:id2/delete', asyncWrap(async (req, res) => {
    let {id1,id2} = req.params;
    let del = await Review.findByIdAndDelete(id2);
    res.redirect(`/listings/${id1}`)
}))
app.delete('/listings/:id', asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
}))

app.get('/listings/:id/edit', async (req, res, next) => {
    try {
        let { id } = req.params;
        let user = await Listing.findById(id);
        res.render('listings/edit.ejs', { user });
    } catch (err) {
        next(err)
    }
})
app.put('/listings/:id', asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect('/listings');
}))
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
