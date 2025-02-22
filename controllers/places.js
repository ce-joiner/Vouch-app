const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/user.js");


// I 

router.get("/", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      res.render("places/index.ejs", { user: currentUser, list: list });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });


// N 

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


// D 

router.delete("/:placeId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      if (place) {
        // Use deleteOne on the subdocument
        place.deleteOne();
      }
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/lists/${list._id}/places`);
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });


// U 

router.put("/:placeId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      // Update the place with new data from req.body
      place.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/lists/${list._id}/places`);
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });


// C 

router.post("/", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      // Push the new place (data from req.body) into the list's places array
      list.places.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/lists/${list._id}/places`);
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });


// E 

router.get("/:placeId/edit", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      res.render("places/edit.ejs", { user: currentUser, list: list, place: place });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });


// S 

router.get("/:placeId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const list = currentUser.lists.id(req.params.listId);
      const place = list.places.id(req.params.placeId);
      res.render("places/show.ejs", { user: currentUser, list: list, place: place });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });




module.exports = router;