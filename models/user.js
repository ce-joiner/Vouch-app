const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['restaurant', 'cafe/coffee shop', 'gallery/museum', 'hotel', 'retail'], 
    required: true 
  },
  address: { type: String },
  notes: { type: String },
  website: { type: String },      
  socialMedia: { type: String }     
});

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    places: [placeSchema], // embedding Place schema as an array
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    lists: [listSchema] // embedding List schema as an array
  });

  const User = mongoose.model("User", userSchema);

  module.exports = User; 