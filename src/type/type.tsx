export interface Wuxia {
    id?: number;
    title?: string;
    writer?: string;
    content?: string;
    url?: string;
    view?: number;
    likes?: number;
    rate?: number;
    people?: number;
    link?: string;
}

export interface WuxiaComment {
    id?: number;
    wuxia?: Wuxia;
    content?: string;
    createdAt?: string;
    recommendation?: number;
    user?: User;
    user_id:string; //쿠키로 가져오므로 string
    comment_id ?: number;
}

export interface User {
    id: number;
    userEmail: string;
    userPassword: string;
    userNickname: string;
    userPhone: string;
}

export interface Comment {
    id: number;
    title: string;
    content: string;
    writer: string;
    date: string;
    view: number;
    recommend: number;
}
