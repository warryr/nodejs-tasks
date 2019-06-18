const ObjectID = require('mongodb').ObjectID;

module.exports = {
  async up(db) {
    await db.collection('film-categories').insertMany([
      {
        _id: ObjectID('5d089d57a07666ef9cfed35e'),
        title: 'Musical',
        description: 'Musical',
        films: ['5d089b1d655a7c1ae81bb86d'],
      },
      {
        _id: ObjectID('5d089d57a07666ef9cfed35f'),
        title: 'Drama',
        description: 'Drama',
        films: ['5d089b1d655a7c1ae81bb86a', '5d089b1d655a7c1ae81bb86c'],
      },
      {
        _id: ObjectID('5d089d57a07666ef9cfed360'),
        title: 'Comedy',
        description: 'Comedy',
        films: ['5d089b1d655a7c1ae81bb86e'],
      },
      {
        _id: ObjectID('5d089d57a07666ef9cfed361'),
        title: 'Biography',
        description: 'Biography',
        films: ['5d089b1d655a7c1ae81bb86b'],
      },
    ]);
  },

  async down(db) {
    await db.collection('film-categories').deleteMany({});
  },
};
