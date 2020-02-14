import { Article } from '../models';

// find article in mongoDB
const find = async (id) => {
    const articleFound = await Article.find({ objectID: id});
    return !articleFound ? true : false;
};

// create record in mongoDB
const create = async( listArticles ) => {
    // convert hits in array.
    let hitsArray = Object.entries(listArticles.hits);

    hitsArray.forEach(hit => {
        //save only new articles.
        find(hit[1]['objectID'])
            .then( (articleFound) => {
                //if Article not found, save article
                if (!articleFound) {
                    const newArticle = new Article(hit[1]);

                    return newArticle.save()
                        .then( (resp) => {
                            console.log(resp);
                            return true;
                        })
                        .catch( (err) => {
                            console.error(err);
                            return false;
                        });
                }
            })
            .catch((err)=> {
                console.log(err);
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
    list
};