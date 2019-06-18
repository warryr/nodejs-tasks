const ObjectID = require('mongodb').ObjectID;

module.exports = {
  async up(db) {
    await db.collection('films').insertMany([
      {
        _id: ObjectID('5d089b1d655a7c1ae81bb86a'),
        title: 'Titanic',
        description:
          'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ' +
          'ill-fated R.M.S. Titanic.',
        avatar: 'https://www.imdb.com/title/tt0120338/mediaviewer/rm2647458304',
        gallery: [
          'https://www.imdb.com/title/tt0120338/mediaviewer/rm4023942144',
          'https://www.imdb.com/title/tt0120338/mediaviewer/rm1677021696',
          'https://www.imdb.com/title/tt0120338/mediaviewer/rm4266918144',
          'https://www.imdb.com/title/tt0120338/mediaviewer/rm2564324352',
        ],
        rating: 5,
        category: '5d089d57a07666ef9cfed35f',
      },
      {
        _id: ObjectID('5d089b1d655a7c1ae81bb86b'),
        title: 'Green Book',
        description:
          'A working-class Italian-American bouncer becomes the driver of an African-American classical pianist on ' +
          'a tour of venues through the 1960s American South.',
        avatar: 'https://www.imdb.com/title/tt6966692/mediaviewer/rm2461296640',
        gallery: [
          'https://www.imdb.com/title/tt6966692/mediaviewer/rm2783862784',
          'https://www.imdb.com/title/tt6966692/mediaviewer/rm2800640000',
          'https://www.imdb.com/title/tt6966692/mediaviewer/rm1592680448',
          'https://www.imdb.com/title/tt6966692/mediaviewer/rm1391353856',
          'https://www.imdb.com/title/tt6966692/mediaviewer/rm869694208',
        ],
        rating: 5,
        category: '5d089d57a07666ef9cfed361',
      },
      {
        _id: ObjectID('5d089b1d655a7c1ae81bb86c'),
        title: 'The Great Gatsby',
        description:
          'A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire ' +
          'neighbor, Jay Gatsby.',
        avatar: 'https://www.imdb.com/title/tt1343092/mediaviewer/rm2643435776',
        gallery: [
          'https://www.imdb.com/title/tt1343092/mediaviewer/rm1756866048',
          'https://www.imdb.com/title/tt1343092/mediaviewer/rm2008524288',
          'https://www.imdb.com/title/tt1343092/mediaviewer/rm1991747072',
          'https://www.imdb.com/title/tt1343092/mediaviewer/rm1874306560',
        ],
        rating: 4,
        category: '5d089d57a07666ef9cfed35f',
      },
      {
        _id: ObjectID('5d089b1d655a7c1ae81bb86d'),
        title: 'The Greatest Showman',
        description:
          'Celebrates the birth of show business and tells of a visionary who rose from nothing to create ' +
          'a spectacle that became a worldwide sensation.',
        avatar: 'https://www.imdb.com/title/tt1485796/mediaviewer/rm956976896',
        gallery: [
          'https://www.imdb.com/title/tt1485796/mediaviewer/rm546004224',
          'https://www.imdb.com/title/tt1485796/mediaviewer/rm747330816',
          'https://www.imdb.com/title/tt1485796/mediaviewer/rm2444373504',
          'https://www.imdb.com/title/tt1485796/mediaviewer/rm2494705152',
          'https://www.imdb.com/title/tt1485796/mediaviewer/rm2461150720',
        ],
        rating: 4,
        category: '5d089d57a07666ef9cfed35e',
      },
      {
        _id: ObjectID('5d089b1d655a7c1ae81bb86e'),
        title: 'Cheaper by the Dozen',
        description:
          'With his wife doing a book tour, a father of twelve must handle a new job and his unstable brood.',
        avatar: 'https://www.imdb.com/title/tt0349205/mediaviewer/rm1502842112',
        gallery: [
          'https://www.imdb.com/title/tt0349205/mediaviewer/rm1351847168',
          'https://www.imdb.com/title/tt0349205/mediaviewer/rm1603505408',
          'https://www.imdb.com/title/tt0349205/mediaviewer/rm1569950976',
          'https://www.imdb.com/title/tt0349205/mediaviewer/rm1452510464',
        ],
        rating: 3,
        category: '5d089d57a07666ef9cfed360',
      },
    ]);
  },

  async down(db) {
    await db.collection('films').deleteMany({});
  },
};
