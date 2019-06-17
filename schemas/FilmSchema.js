var FilmSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      required: true,
      minLength: 3,
    },
    description: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 500,
    },
    avatar: {
      type: 'string',
      required: true,
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)',
    },
    gallery: {
      type: 'array',
      required: true,
      minItems: 4,
      items: {
        type: 'string',
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)',
      },
    },
    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5,
    },
    category: {
      type: 'string',
    },
  },
};

module.exports = FilmSchema;