# CYBR8470-Final-Project
Food Recipe Web Application


# **APPLICATION SUMMARY**

This app is meant to solve a simple but annoying problem.  A cabinet, typically somewhere in the kitchen (In particular my mother's kitchen), that is full of stacks of loose papers, manilla folders rubber banded together, and stacks of aged cook books.  I realize that in this digital age we can find recipes with a few keystrokes, but I know that at least my mother prefers her "stash" that includes old family recipes included in the old books and printed sheets.  The goal then, is to consolidate those recipes in a digital format.

This app is meant to serve as an individual or family based digital recipe storage and reference source.  The idea is to allow someone to manually enter their own creations, old family recipes, or even recipes they like that they found online or from any source, into a local network hosted application.  With recipes stored, the main functionality and service provided by the app, is allowing a user to search for and find a recipe using various critera, including:  protein type (beef, chicken, pork, vegetable, seafood, etc.); meal category (soup, salad, sandwich, etc.); and various others.  This also allows a user to search for a recipe based on ingredients found on sale in a sales flyer, or just find something that just "sounds good right now".

This app additionally uses a popular food/ingredient nutrition and information api Edamam:  https://developer.edamam.com/food-database-api-docs.  This allows users to find general information about the ingredients in their recipes, view nutritional information about the ingredients in their recipes, or even find recipes base on specific nutritional restrictions or requirements.




# **INSTALLATION**

- Install Docker on the machine you want to host the application and start the docker or docker desktop application.
- Clone the project from github to the local machine
    - git clone https://github.com/schaafcl/CYBR8470-Final-Project
- For the backend API:
        - cd Backend/FoodNStuff
    - The project contains a dockerfile, so build the docker image for the application
    - docker-compose build
    - docker-compose up --build
- This will build the docker image, initialize the database, and run the api server.  You can leave it running if you wish or bring it down as needed with:
    - docker-compose down
- For the frontend react javascript application:
    - in a terminal at the base project directory, navigate to the frontend react project
        - cd Frontend/final-client
    - the frontend is dockerized as well, and can be stared from the container
        - docker-compose build
        - docker-compose up
- The application can be accessed on the local machine running it at:
    - http://localhost:3000

- This will have you at the home page where you can start using the app.



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

- From the dashboard while logged in as an administrator, you can add more users, or add recipes and assign them to the various users.

- Navigate to the application's hosted location:
    - http://localhost:3000

- This is the home page, from here you must login to gain the ability to view, change, or add recipes
- This means that to create users you must do so from the Django admin dashboard after creating a superuser
    -http://localhost:8000/admin

- The homepage is where users can search for recipes via the search bar, this will filter recipes by title, what type of primary protein (beef, pork, poultry, vegetable) or what type of meal it is (soup, salad, side dish).
Any of these queries can be put in the search bar, click search, and will display results.  Note that only recipes that the currently logged in user has permission to view/edit will be displayed in search results.  Admin users
or staff members can view/edit all stored recipes.

- Clicking on any of the results after searching will navigate to a view page to view the details of that recipe, where authorized users can view, edit or delete that recipe.

- Authorization is done via jwt tokens so users will be automatically "logged out" when the token expires, however if you wish to ensure that the token is dropped from the app, you can click the logout link to do so immediately.

- Authorized users can also add new recipes via the link at the top.  Enter the required fields and submit the recipe, doing so will also register that recipe to whatever user is currently logged in and therefore only they and admins will have access to it

- non authorized users will only have full access to the "About" page to see basic details about the app and the creator.


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
