import mongoose from 'mongoose';

const filmCategorySchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
  },
  films: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Film',
      },
    ],
    required: true,
  },
});

const FilmCategory = mongoose.model('FilmCategory', filmCategorySchema, 'film-categories');

export default FilmCategory;
