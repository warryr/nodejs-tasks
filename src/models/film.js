import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
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
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: v =>
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/.test(v),
      message: 'Has to be full link',
    },
  },
  gallery: {
    type: [
      {
        type: String,
        validate: {
          validator: v =>
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/.test(v),
          message: 'Has to be full link',
        },
      },
    ],
    required: true,
    validate: {
      validator: array => array.length > 3,
      message: 'Must have at least 4 full links',
    },
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'FilmCategory',
  },
});

const Film = mongoose.model('Film', filmSchema, 'films');

export default Film;
