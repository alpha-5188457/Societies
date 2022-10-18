// packages installed and imported
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; //dotenv used for setting environment variables.

// importing user defined models.
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//using express.js object
const app = express();
dotenv.config(); //calling for setting up env

app.use(bodyParser.json({ limit: '30mb', extended: true })); //setting limit to file size.
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); //???
app.use(cors()); //???

app.use('/posts', postRoutes); //express using ./route for posts as alias postRoutes
app.use('/user', userRoutes);



//const CONNECTION_URL = dotenv.CONNECTION_URL;
const PORT = process.env.PORT || 4000;


// using mongoose, connecting and logging
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
