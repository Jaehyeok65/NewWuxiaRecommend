import { API } from './LoginAPI';
import axios from 'axios';
import { Comment } from 'type/type';

export const getCommentList = async (title: string) => {
    const data = await axios.post(`${API}/commentlist`, {
        title: title,
    });
    return data.data;
};

export const saveComment = async (comment: Comment) => {
    const data = await axios.post(`${API}/commentsave`, {
        title: comment.title,
        content: comment.content,
        writer: comment.writer,
        date: comment.date,
        view: comment.view,
        recommend: comment.recommend,
    });
    return data.data;
};

export const deleteComment = async (id: string) => {
    const data = await axios.post(`${API}/commentdelete`, {
        id: id,
    });
    return data.data;
};

export const updateComment = async (comment: Comment | undefined) => {
    if(!comment) {
        return;
    }
    const data = await axios.post(`${API}/commentsave`, {
        id : comment.id,
        title: comment.title,
        content: comment.content,
        writer: comment.writer,
        date: comment.date,
        view: comment.view,
        recommend: comment.recommend,
    });
    return data.data;
};

export const getComment = async (id: string | undefined) => {
    const data = await axios.post(`${API}/comment`, {
        id: id,
    });
    return data.data;
};

export const getCommentRecommend = async (id: string) => {
    const data = await axios.post(`${API}/commentrecommend`, {
        id,
    });
    return data.data;
};

export const Formatting = (source: any, delimiter = '-') => {
    const year = source.getFullYear();
    let month = source.getMonth() + 1;
    if (parseInt(month) < 10 && parseInt(month) > 0) {
        month = '0' + month;
    }
    let day = source.getDate();
    if (parseInt(day) < 10 && parseInt(day) > 0) {
        day = '0' + day;
    }
    let hour = source.getHours();
    if (parseInt(hour) < 10 && parseInt(hour) > 0) {
        hour = '0' + hour;
    }
    let minutes = source.getMinutes();
    if (parseInt(minutes) < 10 && parseInt(minutes) > 0) {
        minutes = '0' + minutes;
    }
    let second = source.getSeconds();
    if (parseInt(second) < 10 && parseInt(second) > 0) {
        second = '0' + second;
    }
    return [year, month, day, hour, minutes, second].join(delimiter);
};
