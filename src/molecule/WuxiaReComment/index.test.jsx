import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WuxiaReComment from './index';
import { MemoryRouter } from 'react-router-dom';
import { RenderWithProvidersNoRoutes } from 'utill/RenderWtihQuery';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from 'api/LoginAPI';
import { Suspense } from 'react';

const mockdata = [
    {
        id: 2,
        content: '내용',
        writer: '팔협지',
        createdAt: '2024-07-30',
        recommendationcount: 0,
        user: {
            userNickname: '팔협지',
        },
    },
];

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('WuxiaRecomment 컴포넌트 테스트', () => {
    const mock = new MockAdapter(axios); // 200ms 가짜 딜레이 설정

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

    const alertMock = jest.fn();
    window.alert = alertMock;

    it('초기 렌더링 시 데이터가 정상적으로 로드된다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );

        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={true}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.getByText(0)).toBeInTheDocument();
    });

    it('loginstate가 false일 때 추천 버튼을 클릭시 경고 메시지와 함께 로그인 페이지로 이동한다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );

        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={false}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const recommendicon = screen.getByTestId('commentrecommend');

        expect(recommendicon).toBeInTheDocument();

        fireEvent.click(recommendicon);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith(
                '로그인이 필요한 기능입니다.'
            )
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        );
    });

    it('loginstate가 false일 때 제출 버튼을 클릭시 경고 메시지와 함께 로그인 페이지로 이동한다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );
        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={false}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const commentbox = screen.getByPlaceholderText(
            '댓글을 입력하려면 로그인이 필요합니다...'
        );

        expect(commentbox).toBeInTheDocument();

        fireEvent.change(commentbox, { target: { value: '댓글 입력' } });

        const submitbtn = screen.getByText('등록하기');

        fireEvent.click(submitbtn);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith(
                '로그인이 필요한 기능입니다.'
            )
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        );
    });

    it('loginstate가 true일 때 제출 버튼을 클릭시 데이터 Fetch가 발생한다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );

        const updatedMockData = [
            ...mockdata,
            {
                id: 3,
                content: '댓글 입력',
                user: {
                    userNickname: '팔협지',
                },
                recommendationcount: 0,
                createdAt: '2024-07-30',
            },
        ];

        mock.onPost(`${API}/wuxiarecommentsave`).reply(200, updatedMockData);

        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={true}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const commentbox = screen.getByPlaceholderText('댓글을 입력하세요...');

        expect(commentbox).toBeInTheDocument();

        fireEvent.change(commentbox, { target: { value: '댓글 입력' } });

        const submitbtn = screen.getByText('등록하기');

        fireEvent.click(submitbtn);

        expect(await screen.findByText('댓글 입력')).toBeInTheDocument();
    });

    it('loginstate가 true 일 때 추천 아이콘을 클릭할 시 데이터 Fetch가 발생한다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );

        const updatedMockData = mockdata.map((item) => ({
            ...item,
            recommendationcount: 1,
        }));

        mock.onPost(`${API}/wuxiarecommentrecommend`, { replyId: 2 }).reply(
            200,
            updatedMockData
        );

        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={true}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const recommendicon = screen.getByTestId('commentrecommend');

        expect(recommendicon).toBeInTheDocument();

        fireEvent.click(recommendicon);

        expect(await screen.findByText(1)).toBeInTheDocument();
    });

    it('nickname과 userNickname이 일치할 시 삭제 아이콘이 보이며 loginstate가 false인 상태에서 삭제 아이콘을 클릭하면 경고 메시지와 함께 로그인 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );

        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={false}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );
        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const deleteicon = screen.getByTestId('commentdelete');

        expect(deleteicon).toBeInTheDocument();

        fireEvent.click(deleteicon);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith(
                '로그인이 필요한 기능입니다.'
            )
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        );
    });

    it('nickname과 userNickname이 일치할 시 삭제 아이콘이 보이며 삭제 아이콘을 클릭할 시 데이터 Fetch가 발생한다.', async () => {
        mock.onPost(`${API}/wuxiarecommentlist`, { wuxiaCommentId: 2 }).reply(
            200,
            mockdata
        );

        const updatedMockData = [];

        mock.onPost(`${API}/wuxiarecommentdelete`, { replyId: 2 }).reply(
            200,
            updatedMockData
        );

        render(
            <RenderWithProvidersNoRoutes>
                <Suspense>
                    <WuxiaReComment
                        wuxiaCommentId={2}
                        loginstate={true}
                        nickname="팔협지"
                    />
                </Suspense>
            </RenderWithProvidersNoRoutes>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const deleteicon = screen.getByTestId('commentdelete');

        expect(deleteicon).toBeInTheDocument();

        expect(screen.getByText('내용')).toBeInTheDocument();

        fireEvent.click(deleteicon);

        await waitFor(() =>
            expect(screen.queryByText('내용')).not.toBeInTheDocument()
        );
    });
});
