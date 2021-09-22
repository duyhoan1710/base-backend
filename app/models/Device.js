const { Model } = require('objection');

class Device extends Model {
  static get tableName() {
    return 'devices';
  }
}

module.exports = Device;
