const User = require('./userModel');
const Ad = require('./adModel');

// Définition des associations
User.hasMany(Ad, {
  foreignKey: 'author',
  as: 'ads'
});

Ad.belongsTo(User, {
  foreignKey: 'author',
  as: 'user'
});

module.exports = {
  User,
  Ad
};
