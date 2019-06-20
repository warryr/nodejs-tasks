const ObjectID = require('mongodb').ObjectID;

module.exports = {
  async up(db) {
    await db.collection('film-categories').insertMany([
      {
        _id: ObjectID('5d089d57a07666ef9cfed35f'),
        title: "90's films",
        description: 'Films that have been released in 1990-2000.',
        films: ['5d089b1d655a7c1ae81bb86a'],
      },
      {
        _id: ObjectID('5d089d57a07666ef9cfed35e'),
        title: "00's films",
        description: 'Films that have been released in 2000-2010.',
        films: ['5d089b1d655a7c1ae81bb86e'],
      },
      {
        _id: ObjectID('5d089d57a07666ef9cfed360'),
        title: "10's films",
        description: 'Films that have been released in 2010-2019.',
        films: ['5d089b1d655a7c1ae81bb86d', '5d089b1d655a7c1ae81bb86c', '5d089b1d655a7c1ae81bb86b'],
      },
    ]);
  },

  async down(db) {
    await db.collection('film-categories').deleteMany({});
  },
};
