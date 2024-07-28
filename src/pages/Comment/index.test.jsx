import React from 'react';
import Comment from './index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from 'api/LoginAPI';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';

const data = {
    id: 2,
    title: '제목을 테스트',
    content: '내용 테스트',
    writer: '호돌맨',
    data: '2022-10-27',
    view: 0,
    recommend: 0,
};

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Comment Component Test', () => {
    const mock = new MockAdapter(axios); // 200ms 가짜 딜레이 설정

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    const alertMock = jest.fn();
    window.alert = alertMock;

    it('초기 렌더링 시 데이터가 정상적으로 Fetch된다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/comment/2">
                <Routes>
                    <Route
                        path="/comment/:id"
                        element={
                            <Comment loginstate={true} nickname="팔협지" />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('제목을 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText('내용 테스트')).toBeInTheDocument();
    });

    it('추천 버튼을 눌렀을 때 로그인이 되어있지 않다면 경고 메시지와 함께 로그인 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/comment/2">
                <Routes>
                    <Route
                        path="/comment/:id"
                        element={
                            <Comment loginstate={false} nickname="팔협지" />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('제목을 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText('내용 테스트')).toBeInTheDocument();

        const recommend = screen.getByTestId('recommend');

        expect(recommend).toBeInTheDocument();

        fireEvent.click(recommend);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(
                '로그인이 필요한 기능입니다.'
            );
        });

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('추천 버튼을 눌렀을 때 로그인이 되어있다면 추천이 완료되어 데이터 Fetch가 발생하며 리턴된 데이터가 성공적으로 렌더링된다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);
        const recommendeddata = {
            ...data,
            recommend: 1,
        };
        mock.onPost(`${API}/commentrecommend`, { id: '2' }).reply(
            200,
            recommendeddata
        );

        render(
            <RenderWithProviders route="/comment/2">
                <Routes>
                    <Route
                        path="/comment/:id"
                        element={
                            <Comment loginstate={true} nickname="팔협지" />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('제목을 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText('내용 테스트')).toBeInTheDocument();

        const recommend = screen.getByTestId('recommend');

        expect(recommend).toBeInTheDocument();

        expect(screen.queryByText('1')).not.toBeInTheDocument();

        fireEvent.click(recommend);

        expect(await screen.findByText('1')).toBeInTheDocument();
    });

    it('닉네임과 작성자가 일치하면 수정 버튼과 삭제 버튼이 보이며 삭제 버튼을 클릭하면 삭제가 완료되어 community 페이지로 이동한다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        const confirmMock = jest.fn().mockReturnValue(true);
        window.confirm = confirmMock;

        render(
            <RenderWithProviders route="/comment/2">
                <Routes>
                    <Route
                        path="/comment/:id"
                        element={
                            <Comment loginstate={false} nickname="호돌맨" />
                        }
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('제목을 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText('내용 테스트')).toBeInTheDocument();

        const removebtn = screen.getByTestId('remove');

        expect(removebtn).toBeInTheDocument();

        const updatebtn = screen.getByTestId('update');

        expect(updatebtn).toBeInTheDocument();

        fireEvent.click(removebtn);

        await waitFor(() => expect(confirmMock).toHaveBeenCalled());

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/community')
        );
    });
});
