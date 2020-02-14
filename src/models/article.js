import mongoose from 'mongoose';

const ArticleSchemma = new mongoose.Schema(
  {
    created_at: String,
    title: String,
    url: String,
    author: String,
    points: Number,
    story_text: String,
    comment_text: String,
    num_comments: Number,
    story_id: String,
    story_title: String,
    story_url: String,
    parent_id: String,
    created_at_i: Number,
    _tags: Array,
    objectID: String,
    _highlightResult: {
      title: {
        value: String,
        matchLevel: String,
        matchedWords: Array
      },
      url: {
        value: String,
        matchLevel: String,
        fullyHighlighted: Boolean,
        matchedWords: Array
      },
      author: {           
        value: String, 
        matchLevel: String, 
        matchedWords: Array
      },
      comment_text: {
        value: String,
        matchLevel: String,
        fullyHighlighted: Boolean,
        matchedWords: Array
      }
    }
  }
);

export default mongoose.model('Article', ArticleSchemma);