const Listing = require("../models/listing.js");

// Geocode a location string using OpenStreetMap Nominatim
async function geocodeLocation(locationStr) {
    try {
        const query = encodeURIComponent(locationStr);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
        const response = await fetch(url, {
            headers: { "User-Agent": "WanderLust-App/1.0" },
        });
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                type: "Point",
                coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)],
            };
        }
    } catch (err) {
        console.log("Geocoding error:", err.message);
    }
    return { type: "Point", coordinates: [0, 0] };
}

module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let filter = {};
    let allListings;

    if (search && search.trim() !== "") {
        filter = {
            $or: [
                { country: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { title: { $regex: search, $options: "i" } }
            ]
        };
        allListings = await Listing.find(filter);
    } else if (category && category === "Trending") {
        // Trending: show the latest 7 listings
        allListings = await Listing.find({}).sort({ _id: -1 }).limit(7);
    } else if (category) {
        // Filter by category
        allListings = await Listing.find({ category: category });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings, search, category });
};

module.exports.renderNewForm =  (req, res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",populate: {path: "author",},}).populate("owner");
    if(!listing){
        req.flash("error", "listing you requested is not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    console.log("req.file content:", req.file);
    if (!req.file) {
        req.flash("error", "Image is required!");
        return res.redirect("/listings/new");
    }
    
    // Some versions of multer-storage-cloudinary use .url, some use .path
    let url = req.file.path || req.file.url || req.file.secure_url;
    let filename = req.file.filename || req.file.public_id;

    // Delete image from body if it exists to prevent conflict with our manual assignment
    if (req.body.listing && req.body.listing.image) {
        delete req.body.listing.image;
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    console.log("New Listing Image Object:", newListing.image);

    // Geocode the location
    let locationStr = `${newListing.location}, ${newListing.country}`;
    newListing.geometry = await geocodeLocation(locationStr);

    await newListing.save();
    req.flash("success", "new Listing Created!");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing you requested is not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image && listing.image.url ? listing.image.url : "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    
    // Remove image from body to prevent it from overwriting our DB value
    if (req.body.listing && req.body.listing.image) {
        delete req.body.listing.image;
    }

    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path || req.file.url || req.file.secure_url;
        let filename = req.file.filename || req.file.public_id;
        listing.image = { url, filename };
    }

    // Re-geocode on location update
    let locationStr = `${req.body.listing.location}, ${req.body.listing.country}`;
    listing.geometry = await geocodeLocation(locationStr);

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};