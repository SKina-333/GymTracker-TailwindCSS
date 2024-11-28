# Gym Exercise Tracker

Live Website: https://client-2zw8.onrender.com

This application was made to boost my passion and motivation throughout my fitness and health journey. The main objective of this application is to track and record the user training sessions with easy and interactable UIs.

### Technologies

- React
- Node JS
- Postgres

### Main Dependencies
- Prisma ORM
- Express
- Passport JWT
- Tailwind CSS

### Challenges
My biggest challenge in this project is learning how to integrate user authentication using the Passport JS JWT strategy. it provides me with a better understanding of how to handle user authentication and configure react routes based on user authentication and authorization. Other problems includes: 
- figuring out how to better structure my client-side project ensuring that each component only has one responsibility and not many.
- Learning to use different react hooks to better handling data across components
- Learning to use custom axios instance in order to create a custom request for Passport JWT authentication.

### Future Feature
Currently, this application is far from finished. it only has the bare minimum features to fulfill the main purpose of the application but missing many UX qualities and technical features that can provide users with more analytics for their training. This includes:
- Ensure and prevent the user from submitting multiple workout session by creating a loading screen and disable the submit button after clicking once
- Ensure that user recieve a notification when they either fail or success message when submitting
- Ensure that user will recieve fail or success message when logging in
- Have a register page
- when browser refresh and user havent completed workout form, it will not be lost or reset

- progress page (big feature)
- need to change database model in order to allow user to create exercise
- change UI so that user don't type their exercise but select from avaiable ones
- user can track and compare their current performance with previous performance with an easy to understand UI
- user can see when was the last time they exercise on that muscle group

# How to Install and Run Project

1. Install all the dependencies in both Client and Server
```
npm install
```
2. Generate Public Private Key pairs for creating and signing signature (Server Side)
```
cd configs/keys
node generateKeyPairs.js
```
3. Set up .env file 
```
// You will need to have in the file (DATABASE_URL and DIRECT_URL will be used to connect with PrismaORM)
SERVER_PORT =
DATABASE_URL=
DIRECT_URL=
PRIV_KEY=
```
4. Run the application
Client-Side
```
npm run dev
```
Server-side
```
nodemon start
```

# How to use this application
For checking out the live version, you can use this credential
username: admin
password: admin



