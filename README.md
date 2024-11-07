# CYBR8470-Final-Project
Food Recipe Web Application


# **APPLICATION SUMMARY**
This app is meant to serve as an individual or family based digital recipe storage and reference source.  The idea is to allow someone to manually enter their own creations, old family recipes, or even recipes they like that they found online or from any source, into a local network hosted application.  With recipes stored, the main functionality and service provided by the app, is allowing a user to search for and find a recipe using various critera including:  protein type (beef, chicken, pork, vegetable, seafood, etc.); meal type (soup, salad, sandwich, etc.); and various others.  The benefits allow a user to search for a recipe using ingredients found on sale in a sales flyer, or just find something that just "sounds good right now".

This app additionally uses a popular food/ingredient nutrition and information api Edamam:  https://developer.edamam.com/food-database-api-docs.  This allows users to find general information about the ingredients in their recipes, view nutritional information about the ingredients in their recipes, or even find recipes base on specific nutritional restrictions or requirements.




# **INSTALLATION**

- Install Docker on the machine you want to host the application
- Clone the project from github to the local machine and open the application directory
    - git clone https://github.com/schaafcl/CYBR8470-Final-Project
    - cd FoodNStuff
- The project contains a dockerfile, so build the docker image for the application
    - docker-compose up --build
- This will build the docker image, initialize the database, and run the server.  You can leave it running if you wish or bring it down as needed with:
    - docker-compose down



# **GETTING STARTED**




# **LICENSE**

This project is licensed under the MIT License, see the LICENSE file for more details.



# **USER STORIES**
- As a USER, I want to be able to search by, and filter recipe results based on various criteria like protein type or specific ingredients, so that I can save money by finding recipes that use ingredients that are currently on sale.
    - Given that I have criteria in mind that wish to search by.
    - Given that I enter or select the appropriate criteria in the selection/dropdown/entry boxes.
- As a USER, I want to be able to add and remove, or modify recipes from my recipe list, so that I can have new recipes to search for and keep my existing recipes up to date.
    - Given that I have selected a recipe to remove, and confirmed that I wish to remove it.
    - Given that I select the recipe I want to modify and have entered data where appropriate to change the parts of the recipe I want to change.
- As a USER, I want to be able to retrieve public API information about a particular recipe and its ingredients, so that I can see nutritional and other related information about recipes and ingredients.
    - Given that I allow the app to make external API requests outside my internal network.