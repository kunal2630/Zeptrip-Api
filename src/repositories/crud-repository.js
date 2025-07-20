const { where } = require("sequelize");

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async add(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        return await this.model.update(data, {
            where: {
                id: id,
            }
        });
    }

    async delete(id) {
        return await this.model.destroy({
            where: {
                id: id,
            }
        })
    }

    async getAll() {
        return await this.model.findAll();;
    }

    async get(id) {
        return await this.model.findByPk(id)
    }

}

module.exports = CrudRepository;