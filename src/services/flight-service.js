const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function addFlight(flightData) {
    try {
        const addFlightResponse = await flightRepository.add(flightData);
        return addFlightResponse;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'SequelizeDatabaseError') {
            throw new AppError(error.parent.sqlMessage, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot add a new Flight ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlight(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    // trips=MUM-DEL
    if (query.trips) {

        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getFlight(id) {
    try {
        const getFlightResponse = await flightRepository.get(id);
        return getFlightResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteFlight(id) {

    try {
        const deleteFlightResponse = await flightRepository.delete(id);
        if (!deleteFlightResponse) {
            throw new Error("Resource Not Found");
        }
        return deleteFlightResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateFlight(id, data) {
    try {
        const updateFlightResponse = await flightRepository.update(id, data);
        return updateFlightResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    addFlight,
    getFlight,
    getAllFlight,
    deleteFlight,
    updateFlight
}