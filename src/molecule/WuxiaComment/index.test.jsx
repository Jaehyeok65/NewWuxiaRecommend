import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RenderWithProvider } from 'utill/RenderWithProvider';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from 'api/LoginAPI';
import { Suspense } from 'react';
import WuxiaComment from './index';

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

const data = {
    title: '백련성신',
    writer: '은사해탈',
    view: 0,
    id: 1,
    content: '내용',
    likes: 0,
    url: '/img1.png',
    link: 'www.naver.com',
};

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
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={true}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });

    it('loginstate가 false일 때 추천 버튼을 누르면 경고 메시지와 함께 로그인 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={false}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const recommend = screen.getByTestId('commentrecommend');

        expect(recommend).toBeInTheDocument();

        fireEvent.click(recommend);

        await waitFor(() =>
            expect(alertMock).toHaveBeenCalledWith(
                '로그인이 필요한 기능입니다.'
            )
        );

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        );
    });

    it('loginstate가 true일 때 추천 버튼을 누르면 데이터 Fetch가 발생하며 리턴된 결과가 정상적으로 렌더링된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );

        const updatedMockData = mockdata.map((item) => {
            return {
                ...item,
                recommendationcount: 1,
            };
        });

        mock.onPost(`${API}/wuxiacommentrecommend`, {
            wuxiaCommentId: 2,
        }).reply(200, updatedMockData);

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={true}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const recommend = screen.getByTestId('commentrecommend');

        expect(recommend).toBeInTheDocument();

        expect(screen.queryByText(1)).not.toBeInTheDocument();

        fireEvent.click(recommend);

        expect(await screen.findByText(1)).toBeInTheDocument();
    });

    it('nickname과 userNickname이 일치하면 삭제 아이콘이 보이며 loginstate가 false일 때 삭제 아이콘을 클릭하면 경고 메시지와 함께 로그인 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={false}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
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

    it('nickname과 userNickname이 일치하면 삭제 아이콘이 보이며 loginstate가 true일 때 삭제 아이콘을 클릭하면 데이터 fetch가 발생하며 리턴된 데이터가 정상적으로 렌더링된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );

        mock.onPost(`${API}/wuxiacommentdelete`, {
            wuxiaCommentId: 2,
        }).reply(200, []);

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={true}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
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

    it('loginstate가 false일 때 등록하기 버튼을 누르면 경고 메시지와 함께 로그인 페이지로 이동된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );
        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={false}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        const commentbox = screen.getByPlaceholderText(
            '댓글을 입력하려면 로그인이 필요합니다...'
        );

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

    it('loginstate가 true일 때 등록하기 버튼을 누르면 데이터 Fetch가 발생하며 리턴된 데이터가 정상적으로 렌더링된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
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

        mock.onPost(`${API}/wuxiacommentsave`).reply(200, updatedMockData);

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={true}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        expect(screen.queryByText('댓글 입력')).not.toBeInTheDocument();

        const commentbox = screen.getByPlaceholderText('댓글을 입력하세요...');

        fireEvent.change(commentbox, { target: { value: '댓글 입력' } });

        const submitbtn = screen.getByText('등록하기');

        fireEvent.click(submitbtn);

        expect(await screen.findByText('댓글 입력')).toBeInTheDocument();
    });

    it('답글 버튼을 누르면 답글 컴포넌트가 정상적으로 렌더링된다.', async () => {
        mock.onPost(`${API}/wuxiacommentlist`, { title: '백련성신' }).reply(
            200,
            mockdata
        );

        const replymockdata = [
            {
                id: 3,
                content: '답글 내용',
                writer: '팔협지',
                createdAt: '2024-07-30',
                recommendationcount: 0,
                user: {
                    userNickname: '팔협지',
                },
            },
        ];

        mock.onPost(`${API}/wuxiarecommentlist`, {
            wuxiaCommentId: 2,
        }).reply(200, replymockdata);

        render(
            <RenderWithProvider>
                <Suspense>
                    <MemoryRouter>
                        <WuxiaComment
                            title="백련성신"
                            data={data}
                            nickname="팔협지"
                            loginstate={true}
                        />
                    </MemoryRouter>
                </Suspense>
            </RenderWithProvider>
        );

        expect(
            await screen.findByText('내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();

        fireEvent.click(screen.getByText('답글'));

        expect(
            await screen.findByText('답글 내용', {}, { timeout: 3000 })
        ).toBeInTheDocument();
    });
});
