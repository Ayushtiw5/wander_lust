// One-time script to geocode existing listings that don't have coordinates yet
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
    return null;
}

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const listings = await Listing.find({
        $or: [
            { geometry: { $exists: false } },
            { "geometry.coordinates": [0, 0] },
            { "geometry.coordinates": { $exists: false } },
        ]
    });

    console.log(`Found ${listings.length} listings to geocode`);

    for (const listing of listings) {
        const locationStr = `${listing.location}, ${listing.country}`;
        console.log(`Geocoding: ${locationStr}`);
        
        const geometry = await geocodeLocation(locationStr);
        if (geometry) {
            listing.geometry = geometry;
            await listing.save();
            console.log(`  -> [${geometry.coordinates[1]}, ${geometry.coordinates[0]}]`);
        } else {
            console.log(`  -> Failed to geocode`);
        }

        // Nominatim rate limit: max 1 request per second
        await new Promise(resolve => setTimeout(resolve, 1100));
    }

    console.log("Done!");
    await mongoose.disconnect();
}

main().catch(console.error);
