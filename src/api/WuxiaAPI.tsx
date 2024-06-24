import axios from 'axios';
import { Wuxia } from '../type/type';
import { API } from './LoginAPI';

export const getWuxiaListByTitle = async (
    page: number,
    title: string | undefined
) => {
    try {
        const data = await axios.get(
            `${API}/page?pg=${page}&sz=${12}&title=${title}`
        );
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSearchWuxiaList = async (input : string) => {
    try {
        const data = await axios.post(`${API}/search`, {
            title: input,
        });

        return data.data;
    } catch (error) {
        console.log(error);
    }

    //await sleep(500); //부드러운 화면 전환을 위해 0.5초 쉬었다가 데이터 반환
};

export const getWuxiaProduct = async (title: string) => {
    try {
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

export const setWuxiaProductLikes = async (wuxia : Wuxia) => {
    try {
      const response = await axios.post(`${API}/likes`, wuxia);
      return response.data; // 이 부분을 추가하여 데이터를 반환하도록 수정
    } catch (error) {
      console.error('좋아요 설정 중 오류 발생:', error);
      throw new Error('Failed to set likes');
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


export const getWuxiaMyPage = async (title) => {
    let data;
    if (title === '좋아요') {
        data = await axios.get(`${API}/mylike`);
    } else if (title === '별점') {
        data = await axios.get(`${API}/myrate`);
    }
    return data.data;
};
