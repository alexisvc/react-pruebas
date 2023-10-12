import axios from "axios";
const baseUrl = "http://localhost:3001/api/pictograms";

const getAllPictograms = () => {
    return axios.get(baseUrl).then((response) => response.data);
    };

const createPictogram = (newObject) => {
    return axios.post(baseUrl, newObject).then((response) => response.data);
    };

const updatePictogram = (id, newObject) => {
    return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
    };

export default { getAllPictograms, createPictogram, updatePictogram };