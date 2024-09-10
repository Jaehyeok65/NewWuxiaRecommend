import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RenderWithProvidersNoRoutes } from 'utill/RenderWtihQuery';
import LoginForm from '.';
import { getLogin } from '../../api/LoginAPI';

jest.mock('../../api/LoginAPI'); // 모듈 전체를 모킹

const alertMock = jest.fn();
window.alert = alertMock;
const setNickname = jest.fn();
const setLoginstate = jest.fn();

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

describe('Login Form Component Test', () => {
    it('styled Props나 input Props가 없다면 에러 발생 텍스트가 화면에 보인다.', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <LoginForm />
            </RenderWithProvidersNoRoutes>
        );

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();
    });

    it('styled Props나 input Props가 있다면 정상적으로 렌더링된다.', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <LoginForm styled={LoginFormstyle} />
            </RenderWithProvidersNoRoutes>
        );

        const userEmailInput =
            screen.getByPlaceholderText('이메일을 입력하세요...');
        expect(userEmailInput).toBeInTheDocument();

        const userPasswordInput =
            screen.getByPlaceholderText('비밀번호를 입력하세요...');
        expect(userPasswordInput).toBeInTheDocument();
    });

    it('아이디와 비밀번호를 입력하지 않은 상태에서 로그인 버튼을 누르면 아이디와 비밀번호를 입력해주세요 알림창이 나타난다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <LoginForm
                    styled={LoginFormstyle}
                    userName="userEmail"
                    userPassword="userPassword"
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        const LoginBtn = screen.getByText('로그인');

        fireEvent.click(LoginBtn);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(
                '아이디와 비밀번호를 입력해주세요'
            );
        });
    });

    it('비밀번호가 다를 경우 로그인 버튼을 클릭하면 화면에 비밀번호가 다릅니다! 텍스트가 렌더링된다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <LoginForm
                    styled={LoginFormstyle}
                    userName="userEmail"
                    userPassword="userPassword"
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        getLogin.mockReturnValue('비밀번호가 다릅니다!');

        const userEmail = screen.getByPlaceholderText('이메일을 입력하세요...');

        expect(userEmail).toBeInTheDocument();

        const userPassword =
            screen.getByPlaceholderText('비밀번호를 입력하세요...');

        expect(userPassword).toBeInTheDocument();

        fireEvent.change(userEmail, {
            target: { value: 'vkfguqwl@naver.com' },
        });

        fireEvent.change(userPassword, { target: { value: 'aaaa1234' } });

        const LoginBtn = screen.getByText('로그인');

        fireEvent.click(LoginBtn);

        const text = await screen.findByText('비밀번호가 다릅니다!');

        expect(text).toBeInTheDocument();
    });

    it('아이디가 존재하지 않을 경우 로그인 버튼을 클릭하면 화면에 존재하지 않는 아이디입니다! 텍스트가 렌더링된다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <LoginForm
                    styled={LoginFormstyle}
                    userName="userEmail"
                    userPassword="userPassword"
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        getLogin.mockReturnValue('존재하지 않는 아이디입니다!');

        const userEmail = screen.getByPlaceholderText('이메일을 입력하세요...');

        expect(userEmail).toBeInTheDocument();

        const userPassword =
            screen.getByPlaceholderText('비밀번호를 입력하세요...');

        expect(userPassword).toBeInTheDocument();

        fireEvent.change(userEmail, {
            target: { value: 'vkfguqwl@naver.com' },
        });

        fireEvent.change(userPassword, { target: { value: 'aaaa1234' } });

        const LoginBtn = screen.getByText('로그인');

        fireEvent.click(LoginBtn);

        const text = await screen.findByText('존재하지 않는 아이디입니다!');

        expect(text).toBeInTheDocument();
    });

    it('로그인 버튼을 클릭하여 로그인에 성공한다면 Navigate 함수가 호출되어 이전 페이지로 이동한다.', async () => {
        render(
            <RenderWithProvidersNoRoutes>
                <LoginForm
                    styled={LoginFormstyle}
                    userName="userEmail"
                    userPassword="userPassword"
                    setNickname={setNickname}
                    setLoginstate={setLoginstate}
                />
            </RenderWithProvidersNoRoutes>
        );

        getLogin.mockReturnValue('로그인에 성공하였습니다!');

        const userEmail = screen.getByPlaceholderText('이메일을 입력하세요...');

        expect(userEmail).toBeInTheDocument();

        const userPassword =
            screen.getByPlaceholderText('비밀번호를 입력하세요...');

        expect(userPassword).toBeInTheDocument();

        fireEvent.change(userEmail, {
            target: { value: 'vkfguqwl@naver.com' },
        });

        fireEvent.change(userPassword, { target: { value: 'aaaa1234' } });

        const LoginBtn = screen.getByText('로그인');

        fireEvent.click(LoginBtn);

        // waitFor로 비동기 작업이 끝날 때까지 기다린 후 Navigate가 호출되었는지 확인
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });
    });
});
