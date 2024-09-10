import axios from 'axios';
import { Wuxia } from '../type/type';
import { API } from './LoginAPI';
import { getRecentView } from 'module/RecentView';

export const getWuxiaListByTitle = async (
    page: number,
    title: string | undefined
) => {
    try {
        if (!title) {
            throw new Error('no Title');
        }
        const data = await axios.get(
            `${API}/page?pg=${page}&sz=${12}&title=${title}`
        );
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSearchWuxiaList = async (input: string) => {
    try {
        const data = await axios.post(`${API}/search`, {
            title: input,
        });

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWuxiaProduct = async (title: string | undefined) => {
    try {
        if (!title) {
            throw new Error('no Title');
        }
        const data = await axios.post(`${API}/product`, {
            title: title,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMainList = async () => {
    try {
        const data = await axios.get(`${API}/main`);
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const setWuxiaProductView = async (wuxia: Wuxia) => {
    try {
        const data = await axios.post(`${API}/view`, wuxia);
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const setWuxiaProductLikes = async (wuxia: Wuxia) => {
    try {
        const response = await axios.post(`${API}/likes`, wuxia);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const setWuxiaProductRate = async (wuxia: Wuxia) => {
    try {
        const data = await axios.post(`${API}/rate`, wuxia);
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWuxiaMyPage = async (title: string) => {
    if (title === '방문') {
        return getRecentView();
    } else if (title === '좋아요') {
        const data = await axios.get(`${API}/mylike`);
        return data.data;
    } else if (title === '별점') {
        const data = await axios.get(`${API}/myrate`);
        return data.data;
    }
    return;
};

export const saveWuxiaProduct = async (wuxia: Wuxia) => {
    await axios.post(`${API}/wuxiasave`, wuxia);
};
