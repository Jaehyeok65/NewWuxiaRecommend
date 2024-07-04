import { API, getuserId } from './LoginAPI';
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
        wuxia: comment.wuxia,
        url: comment.url,
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
    if (!comment) {
        return;
    }
    const data = await axios.post(`${API}/commentsave`, {
        id: comment.id,
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
    return [year, month, day].join(delimiter) + " " +  [hour,minutes].join(":");
};

export const saveWuxiaComment = async (wuxiacomment: any) => {
    const data = await axios.post(`${API}/wuxiacommentsave`, {
        wuxiaId : wuxiacomment.wuxia_id,
        userId : wuxiacomment.user_id,
        commentText : wuxiacomment.comment_text,
        createdAt : wuxiacomment.created_at
    });
    return data.data;
};


export const getWuxiaComment = async (title: string | undefined) => {
    try {
        if (!title) {
            throw new Error('no Title');
        }
        const data = await axios.post(`${API}/wuxiacomment`, {
            title: title,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteWuxiaComment = async (commentId : number) => {
    try {
        const data = await axios.post(`${API}/wuxiacommentdelete`, {
            commentId : commentId
        })
        return data.data;
    }
    catch(error) {
        console.log(error);
    }
} 