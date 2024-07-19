import Detail from './index';
import { waitFor, screen, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { Route, Routes } from 'react-router-dom';
import { API } from 'api/LoginAPI';

const product = {
    id  : 1,
    title : '화산귀환',
    writer : '비가',
    content : '비가 작품임',
    url : '/image/img2.jpg',
    view : 10,
    likes : 0,
    rate : 0,
    people : 0,
    link : ''
};

const comment = [{
    id : 11,
    wuxia : product,
    content : '안뇽하세요',
    createdAt : '2024-07-18:20:16',
    user : null,
    user_id : "14",
    comment_id : 12,
}]

describe('Detail 컴포넌트 테스트', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('Detail 컴포넌트 초기 로드 시 데이터가 정상적으로 로드된다.', async () => {
        const mockdata1 = product;
        const mockdata2 = comment;
        
        mock.onPost(`${API}/product`, { title : "화산귀환"}).reply(200, mockdata1);
        mock.onPost(`${API}/wuxiacommentlist`, { title : "화산귀환"}).reply(200,mockdata2);
        const mockdata3 = {
            ...mockdata1,
            view : 11
        };
        mock.onPost(`${API}/view`, mockdata1).reply(200, mockdata3);

        render(
            <RenderWithProviders route="/detail/화산귀환">
                <Routes>
                    <Route
                        path="/detail/:title"
                        element={<Detail loginstate={true} nickname="팔협지" />}
                    />
                </Routes>
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();


        expect(await screen.findByText('화산귀환', {}, { timeout: 3000 })).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();

        expect(await screen.findByText('안뇽하세요', {}, { timeout: 3000 })).toBeInTheDocument();
    });
});
