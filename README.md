# Groupomania social media

## Stack

> Mongoose v6.0.4
> Express v6.14.14
> React-redux v7.2.5
> Node.js v14.17.5

## Initialisation

> Start server: nodemon server
> Start client: cd client + npm start

## Back-end configuration:

> Put your cluster info inside /config/db.js
> Create .env file inside /config/ within the following data:

- PORT=5000 your localhost port
- CLIENT_URL=http://localhost:3000 your client url
- DB_USER_PASS=yourID:yourPASSWORD
- TOKEN_SECRET=990bf68e6adf1be5f1671bba3bec692056922454 your random secret key

## Front-end configuration:

> Create a .env file within the server URL:

- REACT_APP_API_URL=http://localhost:5000/ your server url
