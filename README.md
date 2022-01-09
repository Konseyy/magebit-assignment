# Features
## Landing page
file : `index.html`
<br>
Contains a landing page with response design for both desktop and mobile that serves as a frontend for submitting data to the backend part of this project.
## Emails page
file : `emails.html`
<br>
Page that lets the user query the emails submitted through the landing page by email providers, and search terms, along with sorting and pagination implemented.
<br>
Also allows the user to delete entries from the database, as well as download selected entries as a .csv file
# Local installation instructions
## Setup
Make sure you have a local php development server (like [XAMPP](https://www.apachefriends.org/index.html)) and [git](https://git-scm.com/downloads) installed.
## Change your working directory to the respective development server's 
For XAMPP this would be something like `…/XAMPP/htdocs/`
<br>
For WAMP on windows this would be something like `c:\wamp\www\`
## Clone the repository
Clone the repository in the previously opened directory by opening a terminal session in the directory and using the git clone command
<br>
`git clone https://github.com/Konseyy/magebit-assignment.git`
## Make local environment variables
Make a new file in the project's root directory called `.env` with the following contents:
```
DB_SERVERNAME=localhost
DB_USERNAME={your mysql username}
DB_PASS={your mysql password}
DB_DB_NAME={name of the mysql database you want to use for this project}
```
replace the parts wrapped in { } with the respective variable values
## Turn on the development server
Make sure your chosen development server is turned on and then navigate to the sever's hosted address in the browsers `http://localhost/magebit-assignment/` and make sure the webpage loads
<br>
You can also navigate to the emails page by going to the address `http://localhost/magebit-assignment/emails.html`
# Making changes to .scss
## Setup
Make sure you have [Node.js](https://nodejs.org/en/download/) installed.
<br>
After installing node, navigate to the project directory and install the required node packages with `npm install`
## Making changes
Before making changes to .scss files remember to run `npm run sass` which will automatically generate .css files from the .scss files you're editing as soon as you save your changes to the file
