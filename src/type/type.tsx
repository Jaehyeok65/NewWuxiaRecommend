export interface Wuxia { //Wuxia 
    id?: number; //아이디는 생성 때 생길 수 있으므로
    title: string; 
    writer: string;
    content: string;
    url: string;
    view?: number; //0일 수 있으므로
    likes?: number; //0일 수 있으므로
    rate?: number; //0일 수 있으므로
    people?: number; //0일 수 잇으므로
    link: string;
}

export interface WuxiaComment {
    id?: number;
    wuxia?: Wuxia;
    content: string;
    createdAt: string;
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
