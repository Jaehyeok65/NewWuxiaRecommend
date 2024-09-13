import Detail from './index';
import { screen, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { Route } from 'react-router-dom';
import { API } from 'api/LoginAPI';
import { Formatting } from 'api/CommentAPI';

const product = {
    id: 1,
    title: '화산귀환',
    writer: '비가',
    content: '비가 작품임',
    url: '/image/img2.jpg',
    view: 10,
    likes: 0,
    rate: 0,
    people: 0,
    link: '',
};

const comment = [
    {
        id: 11,
        wuxia: product,
        content: '안뇽하세요',
        createdAt: '2024-07-18:20:16',
        user: null,
        user_id: '14',
        comment_id: 12,
    },
];

const recomment = [
    {
        id: 11,
        wuxia: product,
        content: '답글입니다.',
        createdAt: '2024-07-20:20:16',
        user: null,
        user_id: '14',
        comment_id: 12,
    },
];

describe('Detail 컴포넌트 테스트', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    it('Detail 컴포넌트 초기 로드 시 데이터가 정상적으로 로드된다.', async () => {
        const mockdata1 = product;
        const mockdata2 = comment;

        mock.onPost(`${API}/product`, { title: '화산귀환' }).reply(
            200,
            mockdata1
        );
        mock.onPost(`${API}/wuxiacommentlist`, { title: '화산귀환' }).reply(
            200,
            mockdata2
        );
        const mockdata3 = {
            ...mockdata1,
            view: 11,
        };
        mock.onPost(`${API}/view`, mockdata1).reply(200, mockdata3);

        render(
            <RenderWithProviders route="/detail/화산귀환">
                <Route
                    path="/detail/:title"
                    element={<Detail loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('화산귀환', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();

        expect(
            await screen.findByText('안뇽하세요', {}, { timeout: 5000 })
        ).toBeInTheDocument();
    });

    it('하트 아이콘을 누르면 데이터 fetch가 발생하고 리턴된 데이터가 정상적으로 반영된다.', async () => {
        const mockdata1 = product;
        const mockdata2 = comment;

        mock.onPost(`${API}/product`, { title: '화산귀환' }).reply(
            200,
            mockdata1
        );
        mock.onPost(`${API}/wuxiacommentlist`, { title: '화산귀환' }).reply(
            200,
            mockdata2
        );
        const mockdata3 = {
            ...mockdata1,
            view: 11,
        };
        const mockdata4 = {
            ...mockdata1,
            likes: 1,
        };
        mock.onPost(`${API}/view`, mockdata1).reply(200, mockdata3);
        mock.onPost(`${API}/likes`, mockdata1).reply(200, mockdata4);

        render(
            <RenderWithProviders route="/detail/화산귀환">
                <Route
                    path="/detail/:title"
                    element={<Detail loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('화산귀환', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();

        expect(
            await screen.findByText('안뇽하세요', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        const heart = screen.getByTestId('heart');

        expect(heart).toBeInTheDocument();

        expect(screen.queryByText('1')).not.toBeInTheDocument();

        fireEvent.click(heart);

        expect(
            await screen.findByText('1', {}, { timeout: 5000 })
        ).toBeInTheDocument();
    });

    it('답글 버튼을 누르면 답글 데이터 fetch가 발생하고 리턴된 데이터가 정상적으로 반영된다', async () => {
        const mockdata1 = product;
        const mockdata2 = comment;

        mock.onPost(`${API}/product`, { title: '화산귀환' }).reply(
            200,
            mockdata1
        );
        mock.onPost(`${API}/wuxiacommentlist`, { title: '화산귀환' }).reply(
            200,
            mockdata2
        );
        const mockdata3 = {
            ...mockdata1,
            view: 11,
        };
        const mockdata4 = recomment;
        mock.onPost(`${API}/view`, mockdata1).reply(200, mockdata3);
        mock.onPost(`${API}/wuxiarecommentlist`, {
            wuxiaCommentId: comment[0].id,
        }).reply(200, mockdata4);

        render(
            <RenderWithProviders route="/detail/화산귀환">
                <Route
                    path="/detail/:title"
                    element={<Detail loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('화산귀환', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();

        expect(
            await screen.findByText('안뇽하세요', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        const reply = screen.getByText('답글');

        expect(reply).toBeInTheDocument();

        fireEvent.click(reply);

        expect(
            await screen.findByText('답글입니다.', {}, { timeout: 5000 })
        ).toBeInTheDocument();
    });

    it('CommentBox에 댓글을 입력하고 등록하기 버튼을 누르면 댓글이 정상적으로 등록된다.', async () => {
        const mockdata1 = product;
        const mockdata2 = comment;

        mock.onPost(`${API}/product`, { title: '화산귀환' }).reply(
            200,
            mockdata1
        );
        mock.onPost(`${API}/wuxiacommentlist`, { title: '화산귀환' }).reply(
            200,
            mockdata2
        );
        const mockdata3 = {
            ...mockdata1,
            view: 11,
        };
        const mockdata4 = [
            ...comment,
            {
                id: 12,
                wuxia: product,
                content: '안녕하세요',
                createdAt: Formatting(new Date()),
                user: null,
                user_id: '15',
                comment_id: 13,
            },
        ];
        mock.onPost(`${API}/view`, mockdata1).reply(200, mockdata3);
        mock.onPost(`${API}/wuxiacommentsave`, {
            wuxiaId: comment[0].wuxia.id,
            userId: '',
            content: '안녕하세요',
            createdAt: Formatting(new Date()),
        }).reply(200, mockdata4);

        render(
            <RenderWithProviders route="/detail/화산귀환">
                <Route
                    path="/detail/:title"
                    element={<Detail loginstate={true} nickname="팔협지" />}
                />
            </RenderWithProviders>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        expect(
            await screen.findByText('화산귀환', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        expect(screen.getByAltText('화산귀환')).toBeInTheDocument();

        expect(
            await screen.findByText('안뇽하세요', {}, { timeout: 5000 })
        ).toBeInTheDocument();

        const commentBox = screen.getByPlaceholderText('댓글을 입력하세요...');

        expect(commentBox).toBeInTheDocument();

        fireEvent.change(commentBox, { target: { value: '안녕하세요' } });

        expect(commentBox.value).toBe('안녕하세요');

        const commentSubmit = screen.getByText('등록하기');

        expect(commentSubmit).toBeInTheDocument();

        fireEvent.click(commentSubmit);

        expect(
            await screen.findByText('안녕하세요', {}, { timeout: 5000 })
        ).toBeInTheDocument();
    });
});
