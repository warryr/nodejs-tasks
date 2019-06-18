module.exports = {
  async up(db) {
    const col = await db.listCollections({ name: 'film-categories' }).toArray();
    if (col.length) {
      console.log('Collection already exists in MongoDB, exiting...');
    } else {
      await db.createCollection('film-categories');
    }
  },

  async down(db) {
    await db.dropCollection('film-categories');
  },
};
