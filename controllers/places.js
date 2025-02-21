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





// D 






// U 







// C 






// E 







// S 









module.exports = router;