import { Article } from '../models';

const find = async (id) => {
    const articleFound = await Article.find({ objectID: id});
    console.log(articleFound);
    return articleFound ? true : false;
};

const create = async( listArticles ) => {
    console.log(listArticles['hits']);
    console.log(typeof(listArticles['hits']));
    // valid listArticles is Array Type.
    if (typeof(listArticles) !== Array) {
        return ({"type": "error", "msj": "Type not supported"});
    }

    listArticles.forEach(article => {
        // save only new articles.
        if( !find(article['objectID']) ){
            const newArticle = new Article(article);

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
    });
};

export default {
    find,
    create
};