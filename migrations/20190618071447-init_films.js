module.exports = {
  async up(db) {
    const col = await db.listCollections({ name: 'films' }).toArray();
    if (col.length) {
      console.log('Collection already exists in MongoDB, exiting...');
    } else {
      await db.createCollection('films');
    }
  },

  async down(db) {
    await db.dropCollection('films');
  },
};
