import { Article } from '../models';

// find article in mongoDB
const find = async (id) => {
  const articleFound = await Article.find({ objectID: id });
  return !articleFound;
};

// create record in mongoDB
const create = async (listArticles) => {
  // convert hits in array.
  const hitsArray = Object.entries(listArticles.hits);

  hitsArray.forEach((hit) => {
    // save only new articles.
    find(hit[1].objectID)
      .then((articleFound) => {
        // if Article not found, save article
        if (!articleFound) {
          const newArticle = new Article(hit[1]);
          return newArticle.save()
            .then((resp) => true)
            .catch((err) => false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

// list records in mongoDB
const list = async () => {
  const articlesList = await Article.find();
  return articlesList;
}

export default {
  find,
  create,
  list,
};
