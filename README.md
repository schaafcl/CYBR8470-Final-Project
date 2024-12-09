# CYBR8470-Final-Project
Food Recipe Web Application


# **APPLICATION SUMMARY**

This app is meant to solve a simple but annoying problem.  A cabinet, typically somewhere in the kitchen (In particular my mother's kitchen), that is full of stacks of loose papers, manilla folders rubber banded together, and stacks of aged cook books.  I realize that in this digital age we can find recipes with a few keystrokes, but I know that at least my mother prefers her "stash" that includes old family recipes included in the old books and printed sheets.  The goal then, is to consolidate those recipes in a digital format.

This app is meant to serve as an individual or family based digital recipe storage and reference source.  The idea is to allow someone to manually enter their own creations, old family recipes, or even recipes they like that they found online or from any source, into a local network hosted application.  With recipes stored, the main functionality and service provided by the app, is allowing a user to search for and find a recipe using various critera, including:  protein type (beef, chicken, pork, vegetable, seafood, etc.); meal category (soup, salad, sandwich, etc.); and various others.  This also allows a user to search for a recipe based on ingredients found on sale in a sales flyer, or just find something that just "sounds good right now".

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

Starting the app is done via docker commands in a terminal on the machine you wish to host the app

To start the App after it is downloaded and installed, enter via terminal:    
    - docker-compose up

To stop the App, enter via terminal on the host machine:    
    - docker-compose down   

To add an administrator for the application, from a terminal on hosting machine while the docker container for the app is currently running:    
    - docker-compose run web python manage.py createsuperuser

- when prompted enter username, email address and password for the administrator
    - as a base protection, common or weak passwords will receive a warning when creating this superuser to avoid brute force or common dictionary attacks on the admninistrator dashboard, (you should always try to use best password practices, especially when dealing with administrator accounts).

- you can then navigate, while on the hosting machine, to:  localhost:8000/admin
    - You will be pompted to enter the credentials you used to create the admin user
    - This will bring you to the administrator dashboard for the django application



This section is currently a bit barren as the project (as of milestone 1) doesn't have a determined front end framework decided or in place.


General Application function will be easy to understand, and will vary depending on what task you wish to complete.

**To enter new content (a new or existing recipe)**
- Navigate to the appropriate page and enter the recipe details in the appropriate entry boxes and menus
- Some selections will be text entry, others will have dropdown boxes for curated selections

**To search for a recipe by some specific criteria**
- Navigate to the search or browse page
- Choose what criteria you wish to filter recipes by, click "search"
- View the results and decide if you wish to further filter the results

**To remove or edit existing recipes**
- Locate the recipe you wish to modify or remove using the above process for searching
- Click the appropriate button on that recipe for what you wish to do, either "Modify Recipe" or "Remove Recipe"
- Clicking modify, will take you to a page similar to entering a new recipe with fields populated with the existing recipe details
    - from there you can modify the fields and save the changes
- Clicking remove will completely remove that recipe from your recipe list


Front end display and presentation is still under works, but viewing a recipe will roughly look like the following:

![Recipe View Mockup](https://github.com/schaafcl/CYBR8470-Final-Project/blob/dc2c60fce0af084826e1307dca0df8e8765e538b/Documentation/mockup.png)


# **LICENSE**

This project is licensed under the MIT License, see the LICENSE file for more details.



# **USER STORIES**
- As a **USER**, I want to be able to search by, and filter recipe results based on various criteria like protein type or specific ingredients, so that I can save money by finding recipes that use ingredients that are currently on sale.
    - Given that I have criteria in mind that wish to search by.
    - Given that I enter or select the appropriate criteria in the selection/dropdown/entry boxes.

- As a **USER**, I want to be able to add and remove, or modify recipes from my recipe list, so that I can have new recipes to search for and keep my existing recipes up to date.
    - Given that I have selected a recipe to remove, and confirmed that I wish to remove it.
    - Given that I select the recipe I want to modify and have entered data where appropriate to change the parts of the recipe I want to change.

- As a **USER**, I want to be able to retrieve public API information about a particular recipe and its ingredients, so that I can see nutritional and other related information about recipes and ingredients.
    - Given that I allow the app to make external API requests outside my internal network.

- As an **ADMINISTRATOR**, I want to be able to create an administrator superuser account, so that I can manage various aspects of the application via the djano administrator dashboard.
    - Given that I follow the steps in "Getting Started" to create a superuser 


# **MISUSE SCENARIOS**
The current plans for this application don't involve exposing the application outside of the internal network.  Given that fact, mis-use stories revolve around malicious insider misuse, or accidental misuse

- As a **MIS-USER**, I want to be able to steal Grandma Schaaf's super duper secret family Runza recipe, so that I can claim it as my own creation.
    - Mitigated through requiring authenticated login to access recipe list.

- As a **MIS-USER**, I want to Delete a recipe repository, so that I can personally attack and inconvenience the USER.
    - Mitigated through only allowing administrators or authenticated users to delete entries.

- As a **MIS-USER**, I accidentally clicked "remove recipe", while trying to modify an existing recipe.
    - Mitigated through a confirmation prompt asking user if they're sure they want to remove an entry.

- As a **MIS-USER**, I want to log into the administrator dashboard, so I can gain control of the server for various malicious purposes.
    - Mitigated through built-in authentication requirements to access the django administrator dashboard through creating a superuser when launching the app

- As a **MIS-USER**, I want to brute force attack the administrator dashboard login, so that I can gain control of the application server.
    - Mitigated through, at a minimum, basic password strength recommendations built into the manage.py createsuperuser function
