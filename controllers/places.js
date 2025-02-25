const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const fs = require('fs'); 
const path = require('path');
const User = require("../models/user.js");

// Configure multer for multiple file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit per file
    }
});

// I - Index
router.get("/", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      res.render("places/index.ejs", { 
        user: currentUser, 
        list: list
      });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

// N - New
router.get("/new", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      res.render("places/new.ejs", { user: currentUser, list: list });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

// D - Delete
router.delete("/:placeId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      if (place) {
        place.deleteOne();
      }
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/lists/${list._id}/places`);
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

// U - Update
router.put("/:placeId", upload.array('images', 10), async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      
      // Initialize images array if it doesn't exist
      if (!place.images) {
        place.images = [];
      }
      
      // Handle migration from old image format to new images array
      if (place.image && place.image.path && !place.images.length) {
        place.images.push(place.image);
        place.image = undefined; // Remove old format
      }
      
      // Handle image deletion if checkboxes are checked
      if (req.body.deleteImages && Array.isArray(req.body.deleteImages)) {
        // Convert indices to numbers and sort in descending order
        const indicesToDelete = req.body.deleteImages.map(Number).sort((a, b) => b - a);
        
        // Remove images at the specified indices
        for (const index of indicesToDelete) {
          if (index >= 0 && index < place.images.length) {
            // Get the image to delete
            const imageToDelete = place.images[index];
            
            if (imageToDelete && imageToDelete.filename) {
              // Use the absolute path with process.cwd()
              const filePath = path.join(process.cwd(), 'public/uploads', imageToDelete.filename);
              
              try {
                fs.unlinkSync(filePath);
              } catch (err) {
              }
            }
            // Now remove from the array
            place.images.splice(index, 1);
          }
        }
      }
      // Add new images if uploaded
      if (req.files && req.files.length > 0) {
        // Check if adding these would exceed 10 images
        const newTotal = place.images.length + req.files.length;
        const toAdd = newTotal > 10 ? 10 - place.images.length : req.files.length;
        
        for (let i = 0; i < toAdd; i++) {
          const file = req.files[i];
          place.images.push({
            filename: file.filename,
            path: '/uploads/' + file.filename,
            originalname: file.originalname
          });
        }
      }
      // Remove old properties we don't need
      delete req.body.deleteImages;
      
      // Update the place with new data from req.body
      place.set(req.body);
      
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/lists/${list._id}/places/${place._id}`);
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

// C - Create
router.post("/", upload.array('images', 10), async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      
      // Create the new place from req.body
      const newPlace = req.body;
      
      // Initialize empty images array
      newPlace.images = [];
      
      // Add images information if files were uploaded
      if (req.files && req.files.length > 0) {
        const maxImages = Math.min(req.files.length, 10); // Limit to 10 images
        
        for (let i = 0; i < maxImages; i++) {
          const file = req.files[i];
          newPlace.images.push({
            filename: file.filename,
            path: '/uploads/' + file.filename,
            originalname: file.originalname
          });
        }
      }
      
      // Push the new place into the list's places array
      list.places.push(newPlace);
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/lists/${list._id}/places`);
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

// E - Edit
router.get("/:placeId/edit", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      
      // Initialize images array if it doesn't exist (for backward compatibility)
      if (!place.images) {
        place.images = [];
        
        // Migrate old image format if it exists
        if (place.image && place.image.path) {
          place.images.push(place.image);
        }
      }
      
      res.render("places/edit.ejs", { user: currentUser, list: list, place: place });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

// S - Show
router.get("/:placeId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      
      // Initialize images array if it doesn't exist (for backward compatibility)
      if (!place.images) {
        place.images = [];
        
        // Migrate old image format if it exists
        if (place.image && place.image.path) {
          place.images.push(place.image);
        }
      }
      
      res.render("places/show.ejs", { user: currentUser, list: list, place: place });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
});

module.exports = router;