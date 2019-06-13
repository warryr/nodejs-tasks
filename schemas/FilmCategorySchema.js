var FilmCategorySchema = {
  type: 'object',
  required: ['id', 'title', 'description', 'films'],
  properties: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
      minLength: 3,
    },
    description: {
      type: 'string',
      minLength: 3,
      maxLength: 500,
    },
    films: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};

module.exports = FilmCategorySchema;