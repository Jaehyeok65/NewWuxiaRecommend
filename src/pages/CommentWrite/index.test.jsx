import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import CommentWrite from '.';
import MockAdapter from 'axios-mock-adapter';
import { API } from 'api/LoginAPI';
import axios from 'axios';

describe('CommentWrite Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('초기 렌더링 시 요소들이 정상적으로 렌더링된다.', async () => {
        render(
            <RenderWithProviders route="/commentwrite">
                <Routes>
                    <Route
                        path="/commentwrite"
                        element={
                            <CommentWrite
                                loginstate={true}
                                nickname="은사해탈"
                            />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByPlaceholderText(
                '제목을 입력하세요...',
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('내용을 입력하세요...')
        ).toBeInTheDocument();
    });

    it('데이터를 입력하고 전송 버튼을 클릭 시 서버에 데이터가 전송된다.', async () => {
        mock.onPost(`${API}/commentsave`, {
            title: '백련성신',
            content: '재밌다',
            writer: '은사해탈',
            date: '2024-07-26',
            view: 10,
            recommend: 0,
        }).reply([
            {
                title: '백련성신',
                content: '재밌다',
                writer: '은사해탈',
                date: '2024-07-26',
                view: 10,
                recommend: 0,
            },
        ]);

        render(
            <RenderWithProviders route="/commentwrite">
                <Routes>
                    <Route
                        path="/commentwrite"
                        element={
                            <CommentWrite
                                loginstate={true}
                                nickname="은사해탈"
                            />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(
            await screen.findByPlaceholderText(
                '제목을 입력하세요...',
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();

        const titleInput = screen.getByPlaceholderText('제목을 입력하세요...');

        expect(titleInput).toBeInTheDocument();

        const contentInput =
            screen.getByPlaceholderText('내용을 입력하세요...');

        expect(contentInput).toBeInTheDocument();

        fireEvent.change(titleInput, { target: { value: '백련성신' } });
        fireEvent.change(contentInput, { target: { value: '재밌다' } });

        const submit = screen.getByText('전송');

        expect(submit).toBeInTheDocument();

        fireEvent.click(submit);
    });

    it('loginstate가 false라면 경고 메시지와 함께 페이지가 이동이 된다.', async () => {
        const alertMock = jest.fn();
        window.alert = alertMock;

        render(
            <RenderWithProviders route="/commentwrite">
                <Routes>
                    <Route
                        path="/commentwrite"
                        element={
                            <CommentWrite
                                loginstate={false}
                                nickname="은사해탈"
                            />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(alertMock).toHaveBeenCalledWith('로그인이 필요합니다.');
    });

    it('title Input에 아무것도 입력되지 않으면 경고 메시지가 출력된다.', async () => {
        const alertMock = jest.fn();
        window.alert = alertMock;

        render(
            <RenderWithProviders route="/commentwrite">
                <Routes>
                    <Route
                        path="/commentwrite"
                        element={
                            <CommentWrite
                                loginstate={true}
                                nickname="은사해탈"
                            />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        const submit = screen.getByText('전송');

        fireEvent.click(submit);

        expect(alertMock).toHaveBeenCalledWith('제목을 입력하세요');
    });

    it('content Input에 아무것도 입력되지 않으면 경고 메시지가 출력된다.', async () => {
        const alertMock = jest.fn();
        window.alert = alertMock;

        render(
            <RenderWithProviders route="/commentwrite">
                <Routes>
                    <Route
                        path="/commentwrite"
                        element={
                            <CommentWrite
                                loginstate={true}
                                nickname="은사해탈"
                            />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        const titleInput = screen.getByPlaceholderText('제목을 입력하세요...');

        expect(titleInput).toBeInTheDocument();

        fireEvent.change(titleInput, { target: { value: '백련성신' } });

        const submit = screen.getByText('전송');

        fireEvent.click(submit);

        expect(alertMock).toHaveBeenCalledWith('내용을 입력하세요');
    });
});
