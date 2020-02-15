import { Article } from '../models';

// find article in mongoDB
const find = async (id) => {
  const articleFound = await Article.find({ objectID : id });
  return articleFound.length > 0;
};

// create record in mongoDB
const create = async (listArticles) => {
  // convert hits in array.
  const hitsArray = Object.entries(listArticles.hits);

  hitsArray.forEach((hit) => {
    // save only new articles.
    find(hit[1].objectID)
      .then((articleFound) => {
        // if Article not found, save article.
        if (!articleFound) {
          // Add key 'visible'.
          const newArticle = new Article(hit[1]).set('visible', true);
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
  const articlesList = await Article.find({visible: true}, { _id:0, objectID: 1, created_at: 1, title: 1, story_title: 1, story_url: 1, url: 1, author: 1 });
  return articlesList.sort((a,b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  });
}

// change visible key to false and return list of articles sorted .
const del = async (param) => {
  try {
    await Article.findOneAndUpdate({ objectID : param.id }, {'visible' : false});
    return {status: true, message: "Delete Success"};
  }
  catch (err){
    return {status: false, message: `Delete error: ${err}`};
  }
}

export default {
  find,
  create,
  list,
  del,
};
