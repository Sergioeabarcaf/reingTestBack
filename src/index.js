//imports
const NODE_ENV = process.env.NODE_ENV;
require('dotenv').config({
    path: `.env.${NODE_ENV}`
});
import axios from 'axios';
import mongoose from 'mongoose';
import server from './server';
import articleService from './services/articleService';

// var
const url = process.env.URL;

//lister server on PORT and connect mongoDB.
server.listen(process.env.PORT, (err) => {
    if (err) throw err;

    return mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`MongoDB connected and server listening on port ${process.env.PORT}`);
        articles();
        // every 1 hour the articles function is activated.
        setInterval(articles, process.env.TIMEINTERVAL);
    })
    .catch((errDB) => {
        console.error(errDB);
    });
});

// get articles from hn.algolia.com.
function getArticles() {
    return axios.get(url)
        .then( (resp) => resp.data )
        .catch( (err) => err);
}

// save articles in mongodb
async function saveArticles( articles ) {
    const saveStatus = await articleService.create(articles);
    console.log(`la respuesta de saveStatus es: ${saveStatus}`);
    return saveStatus ? true : false;
}

// function articles 
async function articles(){
    let articles = await getArticles();
    //valid exist hits in articles
    if (!articles.hits){
        console.error(articles);
        return false;
    }
    let ready = await saveArticles( articles );
    return ready ? true : false;
}
