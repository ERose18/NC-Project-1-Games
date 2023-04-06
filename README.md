# NC-Project-1-Games

Please note that before using this API you will need to add two .env files to the root directory, this will allow the two databases to be connected locally.

    1. Please create a file called .env.test and insert the code 
        "PGDATABASE=nc_games_test;" into the file. 
    2. Please create a file called .env.development and insert the code
        "PGDATABASE=nc_games;" into the file.

----------------------------------------------------------

LINK TO HOSTED VERSION: https://nc-project-games-r6n8.onrender.com

 A quick summary:
 This project "NC-Project-1-Games" is a database project where you are able to search through reviews, comments, users. give queries and get results.


INSTRUCTIONS:

        PLEASE FORK THIS REPO BEFORE USING!
        On Github, please click the for button when on the repo ("https://github.com/ERose18/NC-Project-1-Games").
        Press the "code" drop down and copy the link given. 
        In your terminal, use the command "git clone [your Github link here]".
        This will clone the repo locally to your computer.

        Once cloned, please install the dependencies with the "npm install" command.

        To run tests locally in your terminal please use the command "npm test app.test.js".

        PLEASE CREATE THE .ENV FILES:
        To create the .env files...
        In the root directory create one file called ".env.development", inside please have the code: "PGDATABASE=nc_games"
        and another file called ".env.test", inside please have the code: "PGDATABASE=nc_games_test"


        MINIMUM NODE AND POSTGRES REQUIREMENTS:

        NODE: v19.4.0
        POSTGRES: v14.7