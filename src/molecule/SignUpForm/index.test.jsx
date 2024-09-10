import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '.';
import { getSignUp } from '../../api/LoginAPI';
import { RenderWithProvidersNoRoutes } from 'utill/RenderWtihQuery';
import {
    CheckPassword,
    CheckId,
    CheckNickname,
    CheckRePassword,
} from 'module/CheckValidation';

jest.mock('../../api/LoginAPI'); // 모듈 전체를 모킹

jest.mock('module/CheckValidation'); // 모듈 전체를 모킹

const alertMock = jest.fn();
window.alert = alertMock;

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const LoginFormstyle = {
    input1: {
        margin: '15% 0px 0px 18%',
        padding: '12px',
        width: '60%',
    },
    input2: {
        margin: '3% 0px 0px 18%',
        padding: '12px',
        width: '60%',
    },
    button: {
        margin: '3% 0px 0px 18%',
        padding: '12px',
        width: '66%',
        borderRadius: '4px',
        marginTop: '2%',
    },
};

describe('Sign Up Form Component Test', () => {
    it('styled Props나 input Props가 없다면 에러 발생 텍스트가 화면에 보인다.', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <SignUpForm />
            </RenderWithProvidersNoRoutes>
        );

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();
    });

    it('stlyed Props나 input Props가 있다면 컴포넌트가 정상적으로 화면에 보인다.', () => {
        const onChange = jest.fn();

        render(
            <RenderWithProvidersNoRoutes>
                <SignUpForm styled={LoginFormstyle} onChange={onChange} />
            </RenderWithProvidersNoRoutes>
        );

        const inputs = screen.getByPlaceholderText('이메일을 입력하세요...');

        expect(inputs).toBeInTheDocument();

        const btn = screen.getByText('회원가입');

        expect(btn).toBeInTheDocument();
    });

    it('입력 필드에 아무것도 입력하지 않고 회원가입 버튼을 누르면 아이디와 비밀번호 또는 닉네임을 입력해주세요라는 알림창이 나타난다.', async () => {
        const onChange = jest.fn();

        render(
            <RenderWithProvidersNoRoutes>
                <SignUpForm styled={LoginFormstyle} onChange={onChange} />
            </RenderWithProvidersNoRoutes>
        );

        const inputs = screen.getByPlaceholderText('이메일을 입력하세요...');

        expect(inputs).toBeInTheDocument();

        const btn = screen.getByText('회원가입');

        expect(btn).toBeInTheDocument();

        fireEvent.click(btn);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(
                '아이디와 비밀번호 또는 닉네임을 입력해주세요'
            );
        });
    });

    it('입력 필드에 값을 입력하면 상태가 업데이트된다.', () => {
        render(
            <SignUpForm
                styled={LoginFormstyle}
                userEmail="userEmail"
                userPassword="userPassword"
                userNickname="userNickname"
                userPasswordCheck="userPasswordCheck"
            />
        );

        const emailInput =
            screen.getByPlaceholderText('이메일을 입력하세요...');
        const passwordInput =
            screen.getByPlaceholderText('비밀번호를 입력하세요...');
        const passwordCheckInput =
            screen.getByPlaceholderText('비밀번호를 다시 입력하세요...');
        const nicknameInput =
            screen.getByPlaceholderText('닉네임을 입력하세요...');

        fireEvent.change(emailInput, {
            target: { value: 'vkfguqwl@naver.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'aaaa1234' } });
        fireEvent.change(passwordCheckInput, { target: { value: 'aaaa1234' } });
        fireEvent.change(nicknameInput, { target: { value: '팔협지' } });

        expect(emailInput).toHaveValue('vkfguqwl@naver.com');
        expect(passwordInput).toHaveValue('aaaa1234');
        expect(passwordCheckInput).toHaveValue('aaaa1234');
        expect(nicknameInput).toHaveValue('팔협지');
    });

    it('입력필드에 값을 입력하고 회원가입 버튼을 누르면 성공적으로 API 호출이 된다.', async () => {
        getSignUp.mockResolvedValue(true);

        render(
            <SignUpForm
                styled={LoginFormstyle}
                userEmail="userEmail"
                userPassword="userPassword"
                userNickname="userNickname"
                userPasswordCheck="userPasswordCheck"
            />
        );

        const submitButton = screen.getByText('회원가입');
        const emailInput =
            screen.getByPlaceholderText('이메일을 입력하세요...');
        const passwordInput =
            screen.getByPlaceholderText('비밀번호를 입력하세요...');
        const passwordCheckInput =
            screen.getByPlaceholderText('비밀번호를 다시 입력하세요...');
        const nicknameInput =
            screen.getByPlaceholderText('닉네임을 입력하세요...');

        fireEvent.change(emailInput, {
            target: { value: 'vkfguqwl@naver.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'aaaa1234' } });
        fireEvent.change(passwordCheckInput, { target: { value: 'aaaa1234' } });
        fireEvent.change(nicknameInput, { target: { value: '팔협지' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(getSignUp).toHaveBeenCalledWith({
                userEmail: 'vkfguqwl@naver.com',
                userPassword: 'aaaa1234',
                userNickname: '팔협지',
                userPasswordCheck: 'aaaa1234',
            });
        });
    });
});
