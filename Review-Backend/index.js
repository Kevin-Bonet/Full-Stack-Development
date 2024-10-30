import dotenv from "dotenv";
dotenv.config();
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.mongoDB_user;
const mongo_password = process.env.mongoDB_password;
const uri =`mongodb+srv://${mongo_username}:${mongo_password}@movie-reviews.zbl3f.mongodb.net/?retryWrites=true&w=majority&appName=Movie-reviews`
const port = 8000
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, 
        wtimeoutMS: 2500,
        useNewURLParser: true,
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })