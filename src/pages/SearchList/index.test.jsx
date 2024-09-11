import { screen, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { Route } from 'react-router-dom';
import { API } from 'api/LoginAPI';
import SearchList from './index';

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
    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('title 검색어와 모킹한 데이터의 title 속성값이 일치한다면 정상적으로 렌더링된다.', async () => {
        mock.onPost(`${API}/search`, { title: '검술명가 막내아들' }).reply(
            200,
            list
        );

        render(
            <RenderWithProviders route="/search/검색결과/검술명가 막내아들">
                    <Route
                        path="/search/:title/:input"
                        element={<SearchList />}
                    />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('검술명가 막내아들', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText(/검색결과 1개/)).toBeInTheDocument();
    });

    it('검색결과가 없는 경우 검색 결과가 없습니다. 텍스트가 렌더링된다.', async () => {
        mock.onPost(`${API}/search`, { title: '화산' }).reply(200, empty);

        render(
            <RenderWithProviders route="/search/검색결과/화산">
                    <Route
                        path="/search/:title/:input"
                        element={<SearchList />}
                    />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText(
                /검색 결과가 없습니다./,
                {},
                { timeout: 3000 }
            )
        ).toBeInTheDocument();
    });
});
