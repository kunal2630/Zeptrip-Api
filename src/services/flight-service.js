const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

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
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlight() {
    try {
        const getAllFlightResponse = await flightRepository.getAll();
        return getAllFlightResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
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