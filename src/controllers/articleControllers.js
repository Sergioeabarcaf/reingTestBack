import { articleService } from '../services';

// return list of articles record in mongoDB
const list = async (req, res) => {
  const articles = await articleService.list();
  return res.json(articles);
};

// return list of articles in order newest after hide article
const del = async(req, res) => {
  const articles = await articleService.del(req.params);
  return res.json(articles)
};

export default {
  list,
  del,
};
