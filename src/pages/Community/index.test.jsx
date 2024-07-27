import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import Community from './index';
import MockAdapter from 'axios-mock-adapter';
import { API } from 'api/LoginAPI';
import axios from 'axios';
import CommentWrite from 'pages/CommentWrite';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Community Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    const commentdata = [
        {
            title: '백련성신',
            content: '재밌다',
            writer: '은사해탈',
            date: '2024-07-26',
            view: 10,
            recommend: 0,
        },
    ];

    const alertMock = jest.fn();
    window.alert = alertMock;

    it('loginstate가 false일 때 글을 작성할 경우 경고 메시지가 발생힌다.', async () => {
        mock.onPost(`${API}/commentlist`, { title: '최신순' }).reply(
            200,
            commentdata
        );

        render(
            <RenderWithProviders route="/community">
                <Routes>
                    <Route
                        path="/community"
                        element={<Community loginstate={false} />}
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('백련성신', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        const pen = screen.getByTestId('nologinwrite');

        expect(pen).toBeInTheDocument();

        fireEvent.click(pen);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith(
                '로그인이 필요한 기능입니다.'
            )
        );

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('loginstate가 true일 때 글을 작성할 경우 commentwrite 페이지로 이동한다.', async () => {
        mock.onPost(`${API}/commentlist`, { title: '최신순' }).reply(
            200,
            commentdata
        );

        render(
            <RenderWithProviders route="/community">
                <Routes>
                    <Route
                        path="/community"
                        element={<Community loginstate={true} />}
                    />
                    <Route
                        path="/commentwrite"
                        element={
                            <CommentWrite
                                loginstate={true}
                                nickname="팔협지"
                                지
                            />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('백련성신', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const pen = screen.getByTestId('loginwrite');

        expect(pen).toBeInTheDocument();

        fireEvent.click(pen);

        expect(
            await screen.findByTestId('loading-spinner')
        ).toBeInTheDocument();

        expect(
            await screen.findByPlaceholderText(
                '제목을 입력하세요...',
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();
    });

    it('추천순으로 바꿀 경우 페이지가 1로 초기화된다.', async () => {
        mock.onPost(`${API}/commentlist`, { title: '최신순' }).reply(
            200,
            commentdata
        );

        mock.onPost(`${API}/commentlist`, { title: '추천순' }).reply(
            200,
            commentdata
        );


        render(
            <RenderWithProviders route="/community">
                <Routes>
                    <Route
                        path="/community"
                        element={<Community loginstate={true} />}
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('백련성신', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const selection = screen.getByDisplayValue('최신순');
        fireEvent.change(selection, { target : { value : '추천순' }});

        expect(await screen.findByText('1')).toBeInTheDocument();

    });
});
