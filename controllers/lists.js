const express = require("express");
const router = express.Router();

const User = require("../models/user.js");


// INDEX 

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('lists/index.ejs', {
            lists: currentUser.lists,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


// NEW 

router.get('/new', async (req, res) => {
    res.render('lists/new.ejs');
});



// DELETE 

router.delete('/:listId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        // Use the Mongoose .deleteOne() method to delete
        // an application using the id supplied from req.params
        currentUser.lists.id(req.params.listId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/lists`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



// UPDATE 

router.put('/:listId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const list = currentUser.lists.id(req.params.listId);
        // Use the Mongoose .set() method
        // this method updates the current list to reflect the new form
        // data on `req.body`
        list.set(req.body);
        await currentUser.save();
        // Redirect back to the show view of the current list
        res.redirect(
            `/users/${currentUser._id}/lists/${req.params.listId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



// CREATE 

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        // Push req.body (the new form data object) to the
        // lists array of the current user
        currentUser.lists.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/lists`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


// EDIT 

router.get('/:listId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const list = currentUser.lists.id(req.params.listId);
        res.render('lists/edit.ejs', {
            list: list,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


// SHOW 

router.get('/:listId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const list = currentUser.lists.id(req.params.listId);
        // Render the show view, passing the application data in the context object
        res.render('lists/show.ejs', {
            list: list,
        });
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;