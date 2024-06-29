export interface Wuxia {
    id: number;
    title: string;
    writer: string;
    content: string;
    url: string;
    view: number;
    likes: number;
    rate: number;
    people: number;
    link: string;
}

export interface Comment {
    id: string;
    title: string;
    content: string;
    writer: string;
    date: string;
    view: number;
    recommend: number;
}
