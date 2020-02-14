import { Article } from '../models';

const find = async (id) => {
    const articleFound = await Article.find({ objectID: id});
    console.log(`el articulo encontrado es ${articleFound}`);
    return !articleFound ? true : false;
};

const create = async( listArticles ) => {
    // convert hits in array.
    let hitsArray = Object.entries(listArticles.hits);

    hitsArray.forEach(hit => {
        //save only new articles.
        find(hit[1]['objectID'])
            .then( (articleFound) => {
                //if Article not found, create article
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

export default {
    find,
    create
};