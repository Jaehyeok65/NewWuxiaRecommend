import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    RenderWithProviders,
    RenderWithProvidersNoRoutes,
} from 'utill/RenderWtihQuery';
import Navigate from '.';
import { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import Main from 'pages/Main';
import { API } from 'api/LoginAPI';
import React from 'react';

describe('Navigate Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    const setNickname = jest.fn();
    const setLoginstate = jest.fn();

    it('초기 렌더링 시 loginstate가 true라면 헤더에 로그아웃 Text가 렌더링된다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Navigate
                    loginstate={true}
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        expect(screen.getByTestId('side')).toBeInTheDocument();
        expect(screen.getByText('로그아웃')).toBeInTheDocument();
    });

    it('초기 렌더링 시 loginstate가 false라면 헤더에 로그인 Text가 렌더링된다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Navigate
                    loginstate={false}
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        expect(screen.getByTestId('side')).toBeInTheDocument();
        expect(screen.getByText('로그인')).toBeInTheDocument();
    });

    it('SideBar 아이콘을 누르면 네비게이션 메뉴가 열린다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Navigate
                    loginstate={false}
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        const sidebar = screen.getByTestId('side');

        expect(sidebar).toBeInTheDocument();

        fireEvent.click(sidebar);

        expect(await screen.findByText('조회순')).toBeInTheDocument();
        expect(screen.getByText('별점순')).toBeInTheDocument();
        expect(screen.getByText('좋아요순')).toBeInTheDocument();
        expect(screen.getByText('커뮤니티')).toBeInTheDocument();
        expect(screen.getByText('마이페이지')).toBeInTheDocument();
    });

    it('SideBar 아이콘을 누르면 네비게이션 메뉴가 열리며 (x) 아이콘을 누르면 메뉴가 닫힌다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Navigate
                    loginstate={false}
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        const sidebar = screen.getByTestId('side');

        expect(sidebar).toBeInTheDocument();

        fireEvent.click(sidebar);

        expect(await screen.findByText('조회순')).toBeInTheDocument();
        expect(screen.getByText('별점순')).toBeInTheDocument();
        expect(screen.getByText('좋아요순')).toBeInTheDocument();
        expect(screen.getByText('커뮤니티')).toBeInTheDocument();
        expect(screen.getByText('마이페이지')).toBeInTheDocument();

        const closebtn = screen.getByTestId('close');

        expect(closebtn).toBeInTheDocument();

        fireEvent.click(closebtn);

        await waitFor(() => {
            expect(screen.queryByText('조회순')).not.toBeInTheDocument();
        });
    });

    it('로그인 버튼을 누르면 로그인 페이지로 이동한다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Navigate
                    loginstate={false}
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </RenderWithProvidersNoRoutes>
        );

        expect(screen.getByTestId('side')).toBeInTheDocument();

        const loginbtn = screen.getByTestId('loginbtn');

        expect(loginbtn).toBeInTheDocument();

        expect(screen.queryByText(/Login/)).not.toBeInTheDocument();

        fireEvent.click(loginbtn);

        expect(await screen.findByText(/Login/)).toBeInTheDocument();
    });

    it('로그아웃 버튼을 누르면 모킹한 setNickname, setLoginstate 함수가 호출된다.', async () => {
        mock.onGet(`${API}/logout`).reply(200, { data: true });

        window.confirm = jest.fn();
        window.alert = jest.fn();

        window.confirm.mockReturnValue(true);

        render(
            <RenderWithProvidersNoRoutes>
                <Navigate
                    loginstate={true}
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        ); //초기 렌더링은 메인페이지 로그인 버튼 클릭시 로그인 페이지로 이동하게끔

        expect(screen.getByTestId('side')).toBeInTheDocument();

        const logout = screen.getByText('로그아웃');

        expect(logout).toBeInTheDocument();

        fireEvent.click(logout);

        await waitFor(() => expect(setLoginstate).toHaveBeenCalled());

        expect(setNickname).toHaveBeenCalledWith(null);
    });
});
