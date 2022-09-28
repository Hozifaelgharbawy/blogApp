let session = require('express-session');
let MongoSessionStore = require('connect-mongodb-session')(session);
let day = 3600000 * 24;


let sessionStore = new MongoSessionStore({
    uri: process.env.CONNECTION_STRING,
    collection: 'mySessions'
});


sessionStore.on('error', (error) => {
    console.log("Mongo Session Store Error: ", error);
});


module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: false,
        maxAge: day
    },

})
