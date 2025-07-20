const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function addCity(city) {
    try {

        const addCityResponse = await cityRepository.add(city);
        return addCityResponse;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot add new city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCity() {
    try {
        const getAllCityResponse = await cityRepository.getAll();
        return getAllCityResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getCity(id) {
    try {
        const getCityResponse = await cityRepository.get(id);
        return getCityResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteCity(id) {

    try {
        const deleteCityResponse = await cityRepository.delete(id);
        if (!deleteCityResponse) {
            throw new Error("Resource Not Found");
        }
        return deleteCityResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id, data) {
    try {
        const updateCityResponse = await cityRepository.update(id, data);
        return updateCityResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    addCity,
    getCity,
    getAllCity,
    deleteCity,
    updateCity
}