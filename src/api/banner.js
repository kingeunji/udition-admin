import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://webapi.udition.co/api/banner',
});

export const banner = {
    list(bannerType, form) {
        return instance.post(`/${bannerType}/search`, form);
    },
    auditionList(bannerType) {
        return instance.post(`/${bannerType}/auditionList`, {});
    }
}