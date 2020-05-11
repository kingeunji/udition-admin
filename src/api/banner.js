import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://webapi.udition.co/api/banner',
    // baseURL : 'http://localhost:8082/api/banner'
});

export const banner = {
    list(bannerType, form) {
        return instance.post(`/${bannerType}/search`, form);
    },
    auditionList(bannerType) {
        return instance.post(`/${bannerType}/auditionList`, {});
    },
    insert(bannerType, form) {
        return instance.post(`/${bannerType}/insert`, form);
    },
    showBanner(bannerType, form) {
        return instance.post(`/${bannerType}/showBanner`, form);
    },
    updateList(bannerType, form) {
        return instance.post(`/${bannerType}/updateList`, form);
    },
    update(bannerType, form) {
        return instance.post(`/${bannerType}/update`, form);
    },
    delete(bannerType, pk) {
        return instance.post(`/${bannerType}/delete`, { pk : pk });
    }
}