import { RenderWithProviders } from "utill/RenderWtihQuery";
import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import SignUp from "pages/SignUp";


describe('Login Component Test', () => {


    it('Sign Up 컴포넌트가 정상적으로 렌더링된다.', async() => {

        render(
            <RenderWithProviders route="/signup">
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </RenderWithProviders>
        );


        const signuptitle = screen.getByText('Sign Up');
        expect(signuptitle).toBeInTheDocument();

        expect(screen.getByPlaceholderText('이메일을 입력하세요...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('비밀번호를 입력하세요...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('비밀번호를 다시 입력하세요...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('닉네임을 입력하세요...')).toBeInTheDocument();
        

    });

})