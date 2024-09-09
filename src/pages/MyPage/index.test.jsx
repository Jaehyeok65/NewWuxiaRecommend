import { screen, render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { Route } from 'react-router-dom';
import { API } from 'api/LoginAPI';
import MyPage from './index';

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
        link: 'wwww.naver.com',
    },
];

const empty = [];

describe('List Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
        sessionStorage.clear();
    });

    it('초기 렌더링시 세션스토리지에 저장된 데이터가 있다면 최근 방문한 작품 데이터가 렌더링되며 Props로 전달한 nickname이 화면에 렌더링된다.', async () => {
        sessionStorage.setItem('view', JSON.stringify(list));

        render(
            <RenderWithProviders route="/mypage">
                <Route
                    path="/mypage"
                    element={<MyPage loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('검술명가 막내아들', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText(/팔협지/)).toBeInTheDocument();
    });

    it('초기 렌더링시 세션스토리지에 저장된 데이터가 없다면 아직 본 작품이 없습니다. Text가 렌더링된다.', async () => {

        render(
            <RenderWithProviders route="/mypage">
                <Route
                    path="/mypage"
                    element={<MyPage loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText(
                /아직 본 작품이 없습니다./,
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();
    });

    it('좋아요 표시한 작품 버튼을 눌렀을 때 데이터가 없다면 아직 좋아요를 표시한 작품이 없습니다. Text가 렌더링된다.', async () => {
        mock.onGet(`${API}/mylike`).reply(200, []);

        render(
            <RenderWithProviders route="/mypage">
                <Route
                    path="/mypage"
                    element={<MyPage loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText(
                /아직 본 작품이 없습니다./,
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();

        const likebutton = screen.getByText('좋아요 표시한 작품');

        expect(likebutton).toBeInTheDocument();

        fireEvent.click(likebutton);

        expect(
            await screen.findByText(/아직 좋아요를 표시한 작품이 없습니다./)
        ).toBeInTheDocument();
    });

    it('좋아요 표시한 작품 버튼을 눌렀을 때 데이터가 있다면 좋아요를 표시한 데이터가 렌더링된다.', async () => {
        mock.onGet(`${API}/mylike`).reply(200, list);

        render(
            <RenderWithProviders route="/mypage">
                <Route
                    path="/mypage"
                    element={<MyPage loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText(
                /아직 본 작품이 없습니다./,
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();

        const likebutton = screen.getByText('좋아요 표시한 작품');

        expect(likebutton).toBeInTheDocument();

        fireEvent.click(likebutton);

        expect(
            await screen.findByAltText('검술명가 막내아들')
        ).toBeInTheDocument();
    });

    it('별점 표시한 작품 버튼을 눌렀을 때 데이터가 없다면 아직 별점을 표시한 작품이 없습니다. Text가 렌더링된다.', async () => {
        mock.onGet(`${API}/myrate`).reply(200, []);

        render(
            <RenderWithProviders route="/mypage">
                <Route
                    path="/mypage"
                    element={<MyPage loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText(
                /아직 본 작품이 없습니다./,
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();

        const ratebutton = screen.getByText('별점 표시한 작품');

        expect(ratebutton).toBeInTheDocument();

        fireEvent.click(ratebutton);

        expect(
            await screen.findByText(/아직 별점을 표시한 작품이 없습니다./)
        ).toBeInTheDocument();
    });

    it('별점 표시한 작품 버튼을 눌렀을 때 데이터가 있다면 별점을 표시한 데이터가 렌더링된다.', async () => {
        mock.onGet(`${API}/myrate`).reply(200, list);

        render(
            <RenderWithProviders route="/mypage">
                <Route
                    path="/mypage"
                    element={<MyPage loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText(
                /아직 본 작품이 없습니다./,
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();

        const ratebutton = screen.getByText('별점 표시한 작품');

        expect(ratebutton).toBeInTheDocument();

        fireEvent.click(ratebutton);

        expect(
            await screen.findByAltText('검술명가 막내아들')
        ).toBeInTheDocument();
    });
});
