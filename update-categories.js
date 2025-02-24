const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import your User model
const User = require('./models/user'); // Adjust path as needed

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB.');
    
    // Find users with the old category value
    const users = await User.find({ "lists.places.category": "restaurant" });
    console.log(`Found ${users.length} users with places categorized as "restaurant"`);
    
    let updateCount = 0;
    
    // Loop through each user and manually update
    for (const user of users) {
      let modified = false;
      
      // Loop through each list
      for (const list of user.lists) {
        // Loop through each place in the list
        for (const place of list.places) {
          // Check if the place has the old category
          if (place.category === "restaurant") {
            place.category = "restaurant/bar";
            modified = true;
            updateCount++;
          }
        }
      }
      
      // Save the user if modified
      if (modified) {
        await user.save();
      }
    }
    
    console.log(`Updated ${updateCount} places from "restaurant" to "restaurant/bar"`);
    
    // Close the connection
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });