import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getLogin } from '../../api/LoginAPI';
import Text from '../../atoms/Text';
import useDebounce from '../../hook/useDebounce';
import { CheckEmail, CheckPassword } from '../../module/CheckValidation';
import { useNavigate } from 'react-router-dom';
import styleds from 'styled-components';

const LoginForm = ({
    styled,
    userName,
    userPassword,
    setNickname,
    setLoginstate,
} : any) => {
    const [input, setInput] = useState({
        userEmail: '',
        userPassword: '',
    });

    const [emailMessage, setEmailMessage] = useState<any>({
        userEmail: '',
        effectiveness: false,
    }); //로그인시 아이디 유효성 메시지를 알려줌

    const [passwordMessage, setPasswordMessage] = useState<any>({
        userPassword: '',
        effectiveness: false,
    }); //로그인시 비밀번호 유효성 메시지를 알려줌

    const EmaildebounceVal = useDebounce(input.userEmail);

    const PassworddebounceVal = useDebounce(input.userPassword);

    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    useEffect(() => {
        if (!EmaildebounceVal) return;
        if (EmaildebounceVal.trim() === '') return;
        const result = CheckEmail(EmaildebounceVal);
        setEmailMessage({
            userEmail: result[0],
            effectiveness: result[1],
        });
    }, [EmaildebounceVal]);

    useEffect(() => {
        if (!PassworddebounceVal) return;
        if (PassworddebounceVal.trim() === '') return;
        const result = CheckPassword(PassworddebounceVal);
        setPasswordMessage({
            userPassword: result[0],
            effectiveness: result[1],
        });
    }, [PassworddebounceVal]);

    const onChange = useCallback((e : any) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const init = useCallback(() => {
        //상태 초기화
        setInput({
            userEmail: '',
            userPassword: '',
        });
    }, []);

    const Textinit = useCallback(() => {
        //유효성 메시지 초기화
        setEmailMessage({
            userEmail: '',
            effectiveness: false,
        });
        setPasswordMessage({
            userPassword: '',
            effectiveness: false,
        });
    }, []);

    const onSubmit = useCallback(
        async (e : any) => {
            e.preventDefault();
            if (input.userEmail === '' || input.userPassword === '') {
                window.alert('아이디와 비밀번호를 입력해주세요');
                return;
            }
            const loginresult = await getLogin(input);
            if (loginresult === '비밀번호가 다릅니다!') {
                setPasswordMessage({
                    userPassword: loginresult,
                    effectiveness: false,
                });
                setEmailMessage({
                    userEmail: '',
                    effectiveness: false,
                });
            } else if (loginresult === '존재하지 않는 아이디입니다!') {
                setPasswordMessage({
                    userPassword: '',
                    effectiveness: false,
                });
                setEmailMessage({
                    userEmail: loginresult,
                    effectiveness: false,
                });
            } else {
                // 로그인 성공했을 경우
                setNickname(loginresult);
                setLoginstate();
                init();
                Textinit();
                memoizedNavigate(-1);
            }
        },
        [input, setNickname, setLoginstate]
    );

    if (!styled || !input) return <div>에러 발생</div>;

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Input
                    type="email"
                    name={userName}
                    value={input.userEmail}
                    placeholder="이메일을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input1}
                />
                <br />
                <Text
                    styled={{
                        ...styled.text,
                        color: emailMessage.effectiveness ? 'green' : 'red',
                    }}
                >
                    {emailMessage.userEmail && emailMessage.userEmail}
                </Text>
                <Input
                    type="password"
                    name={userPassword}
                    value={input.userPassword}
                    placeholder="비밀번호를 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Text
                    styled={{
                        ...styled.text,
                        color: passwordMessage.effectiveness ? 'green' : 'red',
                    }}
                >
                    {passwordMessage.userPassword &&
                        passwordMessage.userPassword}
                </Text>
                <Button styled={styled.button}>로그인</Button>
            </Form>
        </Container>
    );
};

const Container = styleds.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styleds.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 500px;
  margin-top: 50px;
  padding : 0;

  @media only screen and (min-width: 768px) {
    width: 100%;
  }
`;

export default React.memo(LoginForm);
