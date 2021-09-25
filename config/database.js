// require function is the easiest way to include modules that exist in separate files or folders. The basic functionality of require is that it reads a JavaScript file, executes the file, and then proceeds to return the exports
const mongoose = require('mongoose');

// mongoose.connect will connect to MongoDB in this case connecting with a database url from mongodb atlas which is being taken from the .env file
mongoose.connect(process.env.DATABASE_URL, {
    // following code below fixes deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

// once database has established connection a console log will appear in terminal *THIS STEP IS TO CONFIRM DATABASE IS CONNECTED*
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});