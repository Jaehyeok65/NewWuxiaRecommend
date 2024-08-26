import { render, screen } from '@testing-library/react';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import Carusel from '.';

export const list = [
    {
        id: 3,
        title: '검술명가 막내아들',
        writer: '황제펭귄',
        content: '진 룬칸델',
        view: 20,
        likes: 2,
        rate: 5,
        url: '/image/img1.jpg',
        link: 'www.naver.com',
    },
    {
        id: 4,
        title: '화산귀환',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 5,
        title: '화산전생',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 6,
        title: '전승자',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 7,
        title: '능천신제',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 8,
        title: '능천귀환',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 9,
        title: '신제귀환',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 10,
        title: '아빠가 너무 강함',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 11,
        title: '아빠귀환',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 12,
        title: '선생님귀환',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 13,
        title: '인건비',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 14,
        title: '안녕귀환',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
    {
        id: 15,
        title: '비뢰도',
        writer: '비가',
        content: '대 화산파 13대 제자',
        view: 55,
        likes: 4,
        rate: 5,
        url: '/image/img2.jpg',
        link: 'www.naver.com',
    },
];

describe('Carusel Component Test', () => {
    it('list Props가 없으면 에러 발생 텍스트가 화면에 출력된다.', () => {
        render(
            <RenderWithProviders>
                <Carusel />
            </RenderWithProviders>
        );

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();
    });

    it('list Props가 있으면 Carusel 컴포넌트가 정상적으로 화면에 출력된다.', () => {
        render(
            <RenderWithProviders>
                <Carusel list={list} />
            </RenderWithProviders>
        );

        const title = screen.getAllByAltText(list[0].title);

        expect(title[0]).toBeInTheDocument();
    });
});
