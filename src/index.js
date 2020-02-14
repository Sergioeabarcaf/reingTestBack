// imports
import axios from 'axios';
import mongoose from 'mongoose';
import server from './server';
import '@babel/polyfill';
import regeneratorRuntime from 'regenerator-runtime';
import articleService from './services/articleService';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// get articles from hn.algolia.com.
function getNewArticlesFromURL() {
  return axios.get(process.env.URL)
    .then((resp) => resp.data)
    .catch((err) => err);
}

// save articles in mongodb
async function saveArticles(articlesList) {
  const saveStatus = await articleService.create(articlesList);
  return saveStatus;
}

// function articles
async function articles() {
  const newArticles = await getNewArticlesFromURL();
  // valid exist hits in articles
  if (!newArticles.hits) {
    return false;
  }
  const ready = await saveArticles(newArticles);
  return ready;
}

// lister server on PORT and connect mongoDB.
server.listen(process.env.PORT, async (err) => {
  if (err) throw err;

  return mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
