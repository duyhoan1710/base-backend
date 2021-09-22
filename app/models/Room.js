const { Model } = require('objection');

class Room extends Model {
  static get tableName() {
    return 'rooms';
  }
}

module.exports = Room;
