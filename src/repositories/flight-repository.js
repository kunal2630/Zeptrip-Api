const CrudRepository = require("./crud-repository");
const { Flights } = require('../models/flight')
class FlightRepository extends CrudRepository {

    constructor() {
        super(Flights)
    }
}
module.exports = FlightRepository;