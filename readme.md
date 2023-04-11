# Passport Example

### Running this application


#### Cloning
Before you try to run this application, first you will need to clone the repository to your machine.
Run git clone git@github.com:XccelerateOrg/passportExample.git

#### Installing the dependencies of the project
Then npm install, this will install the necessary packages for this application (gets this information from the package.json).

cd to the folder you've just cloned within the Terminal or Ubuntu
Run npm install

#### Setting up the Database
Then you will need to start your postgreSQL database on your machine.
Windows: in Ubuntu, Run
sudo service postgresql start
sudo su postgres
psql postgres

Mac: open the postgres application (the elephant), click on the database you want to open.

Check the knexfile within this project, and update the information within "connection". Ensure you've made a database with the same name as the name you've provided in the "connection" block within the knex file.

To make a database within the postgreSQL client Run

CREATE DATABASE [name-of-database];
(replace the [name-of-database with the name you want])

Once you've started postgreSQL we can now run our knex migration from the Terminal or Ubuntu.
Run
knex migrate:latest

#### .env
When using facebook login and other third party services, you will be given an app ID and sometimes a secret key (a unique identifier for your application and account) to mask this data when hosting our projects we will use a .env a file that is hidden on our sever yet accessible through our application.

#### Facebook Developer Application
In the LMS content we take you through how to make a new application on the developers.facebook, to use passport-facebook,we need to first make an account on developers.facebook, then create a new application. Once you've set up facebook login as the product you will need to get the appID and secret and place them into your .env file (which should be called upon in our router.js)
Use the appID and secret that is automatically generated on the developers.facebook web application, within your own .env file

We have provided a sample.env to indicate the structure of this file.

Once this is complete then we can run the application and test it out. 


Run node index.js OR  nodemon index.js (for continuous reload)