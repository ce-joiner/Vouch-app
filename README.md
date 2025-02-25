

# Vouch App

<img src="images/Screenshot 2025-02-25 at 8.32.04 AM.jpg" alt="Screenshot of home page"/>


## Description
I created Vouch after years of frequent travel and countless requests from friends asking for my recommendations. It began with the familiar message: "I'm heading to [city], can you send me your list?"

This often meant cobbling together Google Maps locations (which always felt clunky for pure recommendations) alongside detailed notes from my phone. What was missing was a dedicated platform where thoughtfully curated recommendations could live in one aesthetically appealing space. My aim is to solve that problem by eliminating the fragmentation of sharing across multiple platforms.

Vouch is a refined travel recommendation platform for discerning travelers who appreciate authentic, personally-vetted experiences. Unlike typical review sites filled with anonymous ratings, Vouch enables users to create customized lists of places they've personally experienced and genuinely recommend—with a focus on exceptional restaurants, must-see galleries, boutique hotels, and unique shops.

Each recommendation comes with the personal stamp of approval from someone who's actually been there, creating a trusted network of high-quality destinations. Users can organize their recommendations by location and category, upload photos to showcase each spot, and share their lists with friends and fellow travelers.

Vouch helps users discover remarkable places through firsthand endorsements, making it easier to experience the best a destination has to offer without without endless scrolling and research. Every place on Vouch comes with a personal guarantee: if you vouched for it, it's worth visiting.

## Table of Contents
* [Technologies Used](#technologiesused)
* [Features](#features)
* [Design](#design)
* [Project Next Steps](#nextsteps)
* [Deployed App](#deployment)


## <a name="technologiesused"></a>Technologies Used
* Node.js
* Express
* MongoDB
* EJS
* CSS3
* Leaflet.js
* Multer


## Features
* **Personalized Lists**: Create and manage customized lists of places you've experienced and recommend
* **Category Organization**: Group your places by type (restaurant/bar, cafe/coffee shop, gallery/museum, hotel, retail)
* **Location Filtering**: Organize recommendations by city or region
* **Photo Gallery**: Upload and manage multiple images for each place (up to 10 photos per location)
* **Interactive Maps**:View all places on a map to easily visualize locations
* **Detailed Entries**: Add notes, addresses, websites, and social media links to each place
* **User Authentication**: Secure account creation and login functionality


## Wireframe Images
* I drew my original wireframe by hand, but the design has changed during development.<img src="/Users/caseyjoiner/code/ga/projects/Vouch-app/images/IMG_2902.jpeg" alt="wireframe image"/>
## Trello Planning
* Link to Trello planning board -  https://trello.com/b/W42lsp3C/vouch-app-planning

## <a name="design"></a>Design Approach
Vouch features a clean, minimalist design that emphasizes content while maintaining visual sophistication. The aesthetic combines sans-serif headings in Oswald with serif body text in Noto Serif, creating a typography hierarchy that feels both contemporary and timeless.

The monochromatic color palette centers on black and white with subtle gray accents, allowing the recommended places and their images to stand as the focal points without distraction. Interactive elements use subtle hover effects and consistent styling to create an intuitive user experience.

The layout employs a responsive flexbox structure throughout, ensuring the application adapts seamlessly across devices while maintaining visual harmony. Places are organized in clean card-based layouts with clear typography, ample white space, and subtle shadows to create depth.

Special attention was given to form design and user interaction patterns, with carefully styled inputs and buttons that maintain the application's refined aesthetic. This restrained design approach creates a platform where user recommendations and images take center stage, elevating the content users share.


## <a name="nextsteps"></a>Future Enhancements
* **User Profiles**: Allow users to create a profile page, and choose between a public or private setting
* **Favorites System**: Allow users to bookmark places from others' recommendations
* **"From The Team"**: A dedicated directory of lists created by the Vouch team for signed-in users
* **Connectivity Features**: Allow users to share their private lists with other users, and allow users to save lists to their "favorites"
* **Custom List Covers**:Allow users to set featured images for their lists
* **Mobile App Version**:Develop native iOS/Android apps for enhanced mobile experience
* **Wish List Feature**: Let users save places they haven't visited yet but want to and create a distinction between personal recommendations and places of interest
* **Featured User Lists**: Users submit their best lists to the team for a chance to have their list featured on the "From The Team" page, with rotations bi-weekly or monthly




## <a name="deployment"></a>Deployed Link
[Vouch App](https://vouch-app-5bafb66225b5.herokuapp.com/)

* You can view the repository:
[Github.com - Vouch](https://github.com/ce-joiner/Vouch-app)
* If unable to view please go live locally through VS Code

    
## Attributions:

* https://leafletjs.com/examples/quick-start/

* https://leafletjs.com/examples/geojson/

* https://www.npmjs.com/package/multer

* https://www.geeksforgeeks.org/node-js-fs-unlinksync-method/

* https://listentoripley.medium.com/express-js-routing-with-nested-paths-2526bae9d2e6#:~:text=This%20is%20a%20way%20to,your%20first%20nested%2C%20child%2C%20router

* https://medium.com/@priyaeswaran/automatic-image-deletion-in-node-js-multer-fs-f1835d272b92

