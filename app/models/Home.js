const { Model } = require('objection');

class Home extends Model {
  static get tableName() {
    return 'homes';
  }
}

module.exports = Home;
