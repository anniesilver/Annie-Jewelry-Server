# Instruction of Setting up Annie Jewelry Store Server
## setting up database
1. start terminal as root/administrator 
2. go to annie-jewelry-server root folder
3. connect to mysql server
4. create database annie_jewels_store;
5. source ./annie_jewels_store.sql

## install depency packages and setup enviroment
6. npm install
7. create .env file from .env.example at annie-jewelry-server root foler

## seeding sample data
8. npm run seed

## run annie jewelry server in demon
9. npm start