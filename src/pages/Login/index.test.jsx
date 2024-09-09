import { RenderWithProviders } from 'utill/RenderWtihQuery';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './index';
import { Route } from 'react-router-dom';
import SignUp from 'pages/SignUp';

describe('Login Component Test', () => {
    it('Login 컴포넌트가 정상적으로 렌더링되며 회원가입 하러가기 버튼을 클릭 시 회원가입 페이지로 이동한다.', async () => {
        render(
            <RenderWithProviders route="/login">
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </RenderWithProviders>
        );

        const logintitle = screen.getByText('Login');
        expect(logintitle).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('이메일을 입력하세요...')
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('비밀번호를 입력하세요...')
        ).toBeInTheDocument();

        const signup = screen.getByText('회원가입 하러가기');
        expect(signup).toBeInTheDocument();

        fireEvent.click(signup);

        expect(await screen.findByText('Sign Up')).toBeInTheDocument();
    });
});
