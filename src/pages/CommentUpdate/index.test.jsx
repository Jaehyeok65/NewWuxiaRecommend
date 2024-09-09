import React from 'react';
import CommentUpdate from './index';
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

describe('CommentUpdate Test', () => {
    const mock = new MockAdapter(axios); // 200ms 가짜 딜레이 설정

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    const alertMock = jest.fn();
    window.alert = alertMock;

    it('Comment가 있다면, Comment 입력창이 보이며, 정상적으로 value가 업데이트 되어있다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/commentupdate/2">
                <Route
                    path="/commentupdate/:id"
                    element={<CommentUpdate loginstate={true} />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('내용 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });

    it('loginstate가 false라면 경고메시지가 발생하며 로그인 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/commentupdate/2">
                <Route
                    path="/commentupdate/:id"
                    element={<CommentUpdate loginstate={false} />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith('로그인이 필요합니다.')
        );

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('제목을 입력하지 않고 전송 버튼을 누를 시 경고메시지가 발생한다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/commentupdate/2">
                <Route
                    path="/commentupdate/:id"
                    element={<CommentUpdate loginstate={true} />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('내용 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const titleinput = screen.getByTestId('titleinput');

        fireEvent.change(titleinput, { target: { value: '' } });

        const submitbtn = screen.getByText('전송');

        expect(submitbtn).toBeInTheDocument();

        fireEvent.click(submitbtn);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith('제목을 입력하세요')
        );
    });

    it('내용을 입력하지 않고 전송 버튼을 누를 시 경고메시지가 발생한다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/commentupdate/2">
                <Route
                    path="/commentupdate/:id"
                    element={<CommentUpdate loginstate={true} />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('내용 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const contentinput = screen.getByTestId('contentinput');

        fireEvent.change(contentinput, { target: { value: '' } });

        const submitbtn = screen.getByText('전송');

        expect(submitbtn).toBeInTheDocument();

        fireEvent.click(submitbtn);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith('내용을 입력하세요')
        );
    });

    it('내용과 제목을 모두 입력하고 전송 버튼을 누를 시 데이터 fetch가 성공하면 comment 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/comment`).reply(200, data);

        render(
            <RenderWithProviders route="/commentupdate/2">
                <Route
                    path="/commentupdate/:id"
                    element={<CommentUpdate loginstate={true} />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('내용 테스트', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const submitbtn = screen.getByText('전송');

        expect(submitbtn).toBeInTheDocument();

        fireEvent.click(submitbtn);

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/comment/2')
        );
    });
});
