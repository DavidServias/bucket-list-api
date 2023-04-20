import mongoose from 'mongoose';
const { connect } = mongoose;
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 8080;
import userRoutes from './routes/userRoutes.js';
import bucketListRoutes from './routes/bucketlist_routes.js';
import loginRoutes from './routes/login_routes.js';
import thoughtRoutes from './routes/thought_routes.js';
import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;

// const passport = require('passport');
import 'dotenv/config'; 
//require('dotenv').config();
console.log(process.env); // remove this after you've confirmed it working

console.log("db uri test:" + process.env.REACT_APP_DB_URI);

// connect to Mongoose db
//This line was added in response to the following error message:
// DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to 
//`false` by default in Mongoose 7. 
//Use `mongoose.set('strictQuery', false);` if you 
// want to prepare for this change. 
//Or use `mongoose.set('strictQuery', true);` 
//to suppress this warning.
mongoose.set("strictQuery", false);
// connect to db
connect(process.env.REACT_APP_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function(result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));

// Apply CORS policy
app.use(cors({
    origin: 'http://localhost:3000'
}));


// Assign the PORT to our app
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));


//Message is shown  when visiting http://localhost:8080/
app.get('/', (req, res) => res.send('BucketList is up and running!'));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(json());
//app.use(urlencoded());
app.use(urlencoded({ extended: false }))

// project routes
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/bucket_list', bucketListRoutes);
app.use('/thoughts', thoughtRoutes);




// app.use (passport.initialize())
// app.use (passport.session())