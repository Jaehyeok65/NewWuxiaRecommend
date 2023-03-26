import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getLogin } from '../../api/LoginAPI';
import { Text } from '../../atoms/Text';
import useDebounce from '../../hook/useDebounce';
import { CheckEmail, CheckPassword } from '../../module/CheckValidation';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({
    styled,
    userName,
    userPassword,
    setNickname,
    setLoginstate,
}) => {
    const [input, setInput] = useState({
        userEmail: '',
        userPassword: '',
    });

    const [emailMessage, setEmailMessage] = useState({
        userEmail: '',
        effectiveness: false,
    }); //로그인시 아이디 유효성 메시지를 알려줌

    const [passwordMessage, setPasswordMessage] = useState({
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

    const onChange = useCallback((e) => {
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
        async (e) => {
            e.preventDefault();
            if (input.userEmail === '' || input.userPassword === '') {
                alert('아이디와 비밀번호를 입력해주세요');
                return;
            }
            const nickname = await getLogin(input);
            if (nickname) {
                // 로그인 성공했을 경우
                setNickname(nickname);
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
        <React.Fragment>
            <form onSubmit={onSubmit}>
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
            </form>
        </React.Fragment>
    );
};

export default React.memo(LoginForm);
