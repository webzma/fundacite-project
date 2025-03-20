const sequelize = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create() {}

  async find() {
    const query = 'SELECT * FROM estudiantes';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne() {}

  async update() {}

  async delete() {}
}

module.exports = ProductsService;
