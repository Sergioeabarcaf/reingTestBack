const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `.env.${NODE_ENV}`
});

//imports
import axios from 'axios';

// var
const url = process.env.URL;

// get articles from hn.algolia.com.
function getArticles() {
    return axios.get(url)
        .then( (resp) => resp.data )
        .catch( (err) => err);
}

// save articles in mongodb
async function saveArticles( articles ) {
    console.log(articles[0]);
    return true;
}

// function articles 
async function articles(){
    let articles = await getArticles();
    console.log('articles');
    //valid exist hits in articles
    if (!articles.hits){
        console.error(articles);
        return false;
    }
    let ready = await saveArticles( articles.hits );
    return ready ? true : false;
}

// every 1 hour the articles function is activated.
setInterval(articles, process.env.TIMEINTERVAL);
