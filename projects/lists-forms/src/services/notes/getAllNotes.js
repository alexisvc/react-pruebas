import axios from 'axios';

export const getAllNotes = () => {
    //Uso de la API
   return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        const { data } = response;
        return data;
    });
}