import { articleService } from '../services';

// return list of articles record in mongoDB
const list = async (req, res) => {
    const articles = await articleService.list();
    return res.json(articles);
};

export default {
    list
};

