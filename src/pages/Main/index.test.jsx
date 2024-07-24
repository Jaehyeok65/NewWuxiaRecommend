import { screen, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import Main from './index';
import { Route, Routes } from 'react-router-dom';
import { API } from 'api/LoginAPI';

const mockdata = [
    [
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
    ],
    [
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
    ],
    [
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
            title: '헤이귀환',
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
            title: '교수님귀환',
            writer: '비가',
            content: '대 화산파 13대 제자',
            view: 55,
            likes: 4,
            rate: 5,
            url: '/image/img2.jpg',
            link: 'www.naver.com',
        },
    ],
];

describe('MainPage Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('초기 렌더링 시 응답이 없으면 에러 메시지가 렌더링된다.', async () => {
        render(
            <RenderWithProviders route="/">
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </RenderWithProviders>
        );

        expect(
            await screen.findByText(/잠시 후 다시 시도해주세요!/)
        ).toBeInTheDocument();
    });

    it('초기 렌더링 시 데이터가 정상적으로 Fetch된다.', async () => {
        mock.onGet(`${API}/main`).reply(200, mockdata);

        render(
            <RenderWithProviders route="/">
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </RenderWithProviders>
        );

        const images = await screen.findAllByAltText(
            '검술명가 막내아들',
            {},
            { timeout: 3000 }
        );
        images.forEach((img) => {
            expect(img).toBeInTheDocument();
        });
        expect(screen.getByText(/조회수 TOP 12/)).toBeInTheDocument();
        expect(screen.getByText(/좋아요 TOP 12/)).toBeInTheDocument();
        expect(screen.getByText(/별점 TOP 12/)).toBeInTheDocument();
    });
});
