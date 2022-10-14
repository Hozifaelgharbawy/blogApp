let mongoose = require("mongoose");

let connection = () => {
    return mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(
        () => {
            console.log("Connected to database successfully!!");
        }
    ).catch((err) => {
        console.log("DB error: " + err);
    });
}

module.exports = {
    connection,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(process.env.CONNECTION_STRING)
    },
    disconnect: done => {
        mongoose.disconnect(done)
    }
};