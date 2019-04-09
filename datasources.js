const { RESTDataSource } = require('apollo-datasource-rest');

class OpportunityAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/';
    this.accessToken = 'access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c'
  }
  async getOpportunity() {
    const response = await this.get('opportunities/6125?' + this.accessToken);
    return response
  }
  async getSkills() {
    const response = await this.get('lists/skills?' + this.accessToken);
    return response
  }
  async getBackgrounds() {
    const response = await this.get('lists/backgrounds?' + this.accessToken);
    return response
  }
  async updateMutation(body) {
    const response = await this.patch('opportunities/6125?' + this.accessToken, body);
    return response
  }
}

module.exports = OpportunityAPI;