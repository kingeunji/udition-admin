import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://webapi.udition.co/api/audition/apply',
});

export const apply = {
    search(form) {
        return instance.post('/search', form);
    },
}