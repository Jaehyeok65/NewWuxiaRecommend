import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import Admin from './index';
import MockAdapter from 'axios-mock-adapter';
import { API } from 'api/LoginAPI';
import axios from 'axios';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));



describe('CommentWrite Component Test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('초기 렌더링 시 요소들이 정상적으로 렌더링된다.', async () => {
        render(
            <RenderWithProviders route="/admin">
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </RenderWithProviders>
        );

        expect(
            screen.getByPlaceholderText('제목을 입력해주세요...')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('작가 이름을 입력해주세요...')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('이미지 주소를 입력해주세요...')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('작품 설명을 입력해주세요...')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('작품 바로가기 링크를 입력해주세요...')
        ).toBeInTheDocument();
    });

    it('제출 버튼 클릭 시 데이터가 정상적으로 전송된다.', async () => {
        mock.onPost(`${API}/wuxiasave`).reply(200, []);

        render(
            <RenderWithProviders route="/admin">
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </RenderWithProviders>
        );

        const title = screen.getByPlaceholderText('제목을 입력해주세요...');

        expect(title).toBeInTheDocument();

        const writer =
            screen.getByPlaceholderText('작가 이름을 입력해주세요...');

        expect(writer).toBeInTheDocument();

        const img =
            screen.getByPlaceholderText('이미지 주소를 입력해주세요...');

        expect(img).toBeInTheDocument();

        const content =
            screen.getByPlaceholderText('작품 설명을 입력해주세요...');

        expect(content).toBeInTheDocument();

        const link = screen.getByPlaceholderText(
            '작품 바로가기 링크를 입력해주세요...'
        );

        expect(link).toBeInTheDocument();

        fireEvent.change(title, { target: { value: '제목' } });

        fireEvent.change(writer, { target: { value: '작가이름' } });

        fireEvent.change(content, { target: { value: '내용' } });

        fireEvent.change(img, { target: { value: '이미지 주소' } });

        fireEvent.change(link, { target: { value: '바로가기 주소' } });

        const submitbtn = screen.getByText('제출');

        fireEvent.click(submitbtn);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
    });
});
