import { fireEvent, render, screen } from '@testing-library/react';
import { RenderWithProviders } from 'utill/RenderWtihQuery';
import CommentBox from '.';

describe('CommentBox Component Test', () => {
    it('loginState가 false라면 댓글을 입력하려면 로그인이 필요하다는 PlaceHolder가 렌더링된다.', () => {
        const wuxiacomment = {
            content: '초기 내용',
        };

        const loginstate = false;

        const onWuxiaSubmit = jest.fn();

        const setWuxiaComment = jest.fn();

        render(
            <RenderWithProviders>
                <CommentBox
                    wuxiacomment={wuxiacomment}
                    loginstate={loginstate}
                    onWuxiaCommentSubmit={onWuxiaSubmit}
                    setWuxiaComment={setWuxiaComment}
                />
            </RenderWithProviders>
        );

        const placeHolderText = screen.getByPlaceholderText('댓글을 입력하려면 로그인이 필요합니다...');
        expect(placeHolderText).toBeInTheDocument();

    });

    it('loginState가 true라면 댓글을 입력하세요라는 PlaceHolder가 렌더링된다.', () => {
        const wuxiacomment = {
            content: '초기 내용',
        };

        const loginstate = true;

        const onWuxiaSubmit = jest.fn();

        const setWuxiaComment = jest.fn();

        render(
            <RenderWithProviders>
                <CommentBox
                    wuxiacomment={wuxiacomment}
                    loginstate={loginstate}
                    onWuxiaCommentSubmit={onWuxiaSubmit}
                    setWuxiaComment={setWuxiaComment}
                />
            </RenderWithProviders>
        );

        const placeHolderText = screen.getByPlaceholderText('댓글을 입력하세요...');
        expect(placeHolderText).toBeInTheDocument();

    });

    it('CommentBox의 Input을 변경했을 때 setWuxiaComment 함수가 성공적으로 호출된다..', async () => {
        const wuxiacomment = {
            content: '초기 내용',
        };

        const loginstate = true;

        const onWuxiaSubmit = jest.fn();

        const setWuxiaComment = jest.fn();

        render(
            <RenderWithProviders>
                <CommentBox
                    wuxiacomment={wuxiacomment}
                    loginstate={loginstate}
                    onWuxiaCommentSubmit={onWuxiaSubmit}
                    setWuxiaComment={setWuxiaComment}
                />
            </RenderWithProviders>
        );

        const valueText = screen.getByDisplayValue('초기 내용');
        expect(valueText).toBeInTheDocument();

        fireEvent.change(valueText, { target : { value : '변경된 내용'}});
       
        await expect(setWuxiaComment).toHaveBeenCalled();

    });

    it('CommentBox의 등록하기 버튼을 누르면 onWuxiaSubmit 함수가 성공적으로 호출된다.', async () => {
        const wuxiacomment = {
            content: '초기 내용',
        };

        const loginstate = true;

        const onWuxiaSubmit = jest.fn();

        const setWuxiaComment = jest.fn();

        render(
            <RenderWithProviders>
                <CommentBox
                    wuxiacomment={wuxiacomment}
                    loginstate={loginstate}
                    onWuxiaCommentSubmit={onWuxiaSubmit}
                    setWuxiaComment={setWuxiaComment}
                />
            </RenderWithProviders>
        );

        const SubmitBtn = screen.getByText('등록하기');
        expect(SubmitBtn).toBeInTheDocument();

        fireEvent.click(SubmitBtn);
       
        await expect(onWuxiaSubmit).toHaveBeenCalled();

    });
});
