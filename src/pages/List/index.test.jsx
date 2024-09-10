import { screen, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import List from './index';
import { Route } from 'react-router-dom';
import { API } from 'api/LoginAPI';

const list = [
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
];

const list2 = [
    {
        id: 15,
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
        id: 16,
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
        id: 17,
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

class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
        this.elements = [];
    }

    observe(element) {
        this.elements.push(element);
        // 바로 콜백을 실행하여 테스트 환경에서 요소가 관찰됨을 시뮬레이션합니다.
        this.callback([{ target: element, isIntersecting: true }]);
    }

    unobserve(element) {
        this.elements = this.elements.filter((el) => el !== element);
    }

    disconnect() {
        this.elements = [];
    }
}

window.IntersectionObserver = MockIntersectionObserver;

describe('List Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('List 페이지를 초기 로드 시 모킹한 데이터가 정상적으로 로드된다.', async () => {
        const mockdata1 = list;
        mock.onGet(`${API}/page?pg=1&sz=12&title=조회순`).reply(200, mockdata1);

        render(
            <RenderWithProviders route="/menu/조회순">
                <Route path="/menu/:title" element={<List />} />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('조회순', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();
    });

    it('초기 로드 후 스크롤을 하여 다음 페이지를 불러오면 다음 데이터가 정상적으로 로드된다.', async () => {
        const mockdata1 = list;
        const mockdata2 = list2;
        mock.onGet(`${API}/page?pg=1&sz=12&title=조회순`).reply(200, mockdata1);
        mock.onGet(`${API}/page?pg=2&sz=12&title=조회순`).reply(200, mockdata2);

        render(
            <RenderWithProviders route="/menu/조회순">
                <Route path="/menu/:title" element={<List />} />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('조회순', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();

        fireEvent.scroll(screen.getByText('조회순'), {
            target: { scrollY: 1000 },
        });

        expect(
            await screen.findByAltText('비뢰도', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });

    it('title의 값이 조회순일 경우 조회순 Text가 정상적으로 렌더링된다.', async () => {
        const mockdata1 = list;
        mock.onGet(`${API}/page?pg=1&sz=12&title=조회순`).reply(200, mockdata1);

        render(
            <RenderWithProviders route="/menu/조회순">
                <Route path="/menu/:title" element={<List />} />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('조회순', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });

    it('title의 값이 별점순일 경우 별점순 Text가 정상적으로 렌더링된다.', async () => {
        const mockdata1 = list;
        mock.onGet(`${API}/page?pg=1&sz=12&title=별점순`).reply(200, mockdata1);

        render(
            <RenderWithProviders route="/menu/별점순">
                <Route path="/menu/:title" element={<List />} />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('별점순', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });

    it('title의 값이 좋아요순일 경우 좋아요순 Text가 정상적으로 렌더링된다.', async () => {
        const mockdata1 = list;
        mock.onGet(`${API}/page?pg=1&sz=12&title=좋아요순`).reply(
            200,
            mockdata1
        );

        render(
            <RenderWithProviders route="/menu/좋아요순">
                <Route path="/menu/:title" element={<List />} />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('좋아요순', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });
});
