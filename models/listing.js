const mongoose = require('mongoose');
const Review = require('./review');
const { ref } = require('joi');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    tital: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? v = "https://i.pinimg.com/736x/37/a1/c7/37a1c752b36fe1bb122a3e555595ec30.jpg" : v
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
})

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing;