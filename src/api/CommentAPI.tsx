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
    return [year, month, day].join(delimiter) + ' ' + [hour, minutes].join(':');
};

export const saveWuxiaComment = async (wuxiacomment: any) => {
    const data = await axios.post(`${API}/wuxiacommentsave`, {
        wuxiaId: wuxiacomment.wuxia_id,
        userId: wuxiacomment.user_id,
        content: wuxiacomment.comment_text,
        createdAt: wuxiacomment.created_at,
    });
    return data.data;
};

export const getWuxiaCommentList = async (title: string | undefined) => {
    try {
        if (!title) {
            throw new Error('no Title');
        }
        const data = await axios.post(`${API}/wuxiacommentlist`, {
            title: title,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteWuxiaComment = async (commentId: number) => {
    try {
        const data = await axios.post(`${API}/wuxiacommentdelete`, {
            wuxiaCommentId: commentId,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const recommendWuxiaComment = async (commentId: number) => {
    try {
        const data = await axios.post(`${API}/wuxiacommentrecommend`, {
            wuxiaCommentId: commentId,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const saveWuxiaReComment = async (wuxiarecomment: any) => {
    console.log(wuxiarecomment.comment_id);
    const data = await axios.post(`${API}/wuxiarecommentsave`, {
        commentId: wuxiarecomment.comment_id,
        userId: wuxiarecomment.user_id,
        content: wuxiarecomment.comment_text,
        createdAt: wuxiarecomment.created_at,
    });
    return data.data;
};

export const getWuxiaReCommentList = async (commentId: number | undefined) => {
    try {
        if (!commentId) {
            throw new Error('no commentId');
        }
        const data = await axios.post(`${API}/wuxiarecommentlist`, {
            wuxiaCommentId: commentId,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteWuxiaReComment = async (commentId: number) => {
    try {
        const data = await axios.post(`${API}/wuxiarecommentdelete`, {
            replyId: commentId,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const recommendWuxiaReComment = async (commentId: number) => {
    try {
        const data = await axios.post(`${API}/wuxiarecommentrecommend`, {
            replyId: commentId,
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
};
