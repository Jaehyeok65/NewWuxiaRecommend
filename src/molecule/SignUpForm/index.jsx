import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getSignUp } from '../../api/LoginAPI';
import useDebounce from '../../hook/useDebounce';
import {
    CheckPassword,
    CheckId,
    CheckNickname,
    CheckRePassword,
} from '../../module/CheckValidation';
import  Text  from '../../atoms/Text';
import { useNavigate } from 'react-router-dom';
import styleds from 'styled-components';

const SignUpForm = ({
    styled,
    userEmail,
    userPassword,
    userNickname,
    userPasswordCheck,
}) => {
    const [input, setInput] = useState({
        userEmail: '',
        userPassword: '',
        userPasswordCheck: '',
        userNickname: '',
    });

    const [emailMessage, setEmailMessage] = useState({
        userEmail: '',
        effectiveness: false,
    }); //로그인시 아이디 유효성 메시지를 알려줌

    const [passwordMessage, setPasswordMessage] = useState({
        userPassword: '',
        effectiveness: false,
    }); //로그인시 비밀번호 유효성 메시지를 알려줌

    const [nicknameMessage, setNicknameMessage] = useState({
        userNickname: '',
        effectiveness: false,
    });

    const [passwordCheckMessage, setPasswordCheckMessage] = useState({
        userPasswordCheck: '',
        effectiveness: false,
    });

    const EmaildebounceVal = useDebounce(input.userEmail);

    const PassworddebounceVal = useDebounce(input.userPassword);

    const PasswordCheckdebounceVal = useDebounce(input.userPasswordCheck);

    const NicknamedebounceVal = useDebounce(input.userNickname);

    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    const getEmailMessage = useCallback(async () => {
        try {
            const result = await CheckId(EmaildebounceVal);
            setEmailMessage({
                userEmail: result[0],
                effectiveness: result[1],
            });
        } catch (error) {
            console.error(
                'Error occurred while getting nickname message:',
                error
            );
        }
    }, [EmaildebounceVal]);

    const getNicknameMessage = useCallback(async () => {
        try {
            const result = await CheckNickname(NicknamedebounceVal);
            setNicknameMessage({
                userNickname: result[0],
                effectiveness: result[1],
            });
        } catch (error) {
            console.error(
                'Error occurred while getting nickname message:',
                error
            );
        }
    }, [NicknamedebounceVal]);

    useEffect(() => {
        if (!EmaildebounceVal) return;
        if (EmaildebounceVal.trim() === '') return;
        getEmailMessage();
    }, [EmaildebounceVal]);

    useEffect(() => {
        if (!NicknamedebounceVal) return;
        if (NicknamedebounceVal.trim() === '') return;
        getNicknameMessage();
    }, [NicknamedebounceVal]);

    useEffect(() => {
        if (!PassworddebounceVal) return;
        if (PassworddebounceVal.trim() === '') return;
        const result = CheckPassword(PassworddebounceVal);
        setPasswordMessage({
            userPassword: result[0],
            effectiveness: result[1],
        });
    }, [PassworddebounceVal]);

    useEffect(() => {
        if (!PasswordCheckdebounceVal) return;
        if (PasswordCheckdebounceVal.trim() === '') return;
        const result = CheckRePassword(
            input.userPassword,
            input.userPasswordCheck
        );
        setPasswordCheckMessage({
            userPasswordCheck: result[0],
            effectiveness: result[1],
        });
    }, [PasswordCheckdebounceVal]);

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const Init = useCallback(() => {
        setInput({
            userEmail: '',
            userPassword: '',
            userNickname: '',
            userPasswordCheck: '',
        });
        setEmailMessage({
            userEmail: '',
            effectiveness: false,
        });
        setPasswordMessage({
            userPassword: '',
            effectiveness: false,
        });
        setNicknameMessage({
            userNickname: '',
            effectiveness: false,
        });
        setPasswordCheckMessage({
            userPasswordCheck: '',
            effectiveness: false,
        });
    }, []);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (
                input.userEmail === '' ||
                input.userPassword === '' ||
                input.userNickname === ''
            ) {
                alert('아이디와 비밀번호 또는 닉네임을 입력해주세요');
                return;
            }
            const result = await getSignUp(input);
            if (result) {
                memoizedNavigate('/login');
            }
            Init();
        },
        [input]
    );

    if (!styled || !input) return <div>에러 발생</div>;

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Input
                    type="email"
                    name={userEmail}
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
                <Input
                    type="password"
                    name={userPasswordCheck}
                    value={input.userPasswordCheck}
                    placeholder="비밀번호를 다시 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Text
                    styled={{
                        ...styled.text,
                        color: passwordCheckMessage.effectiveness
                            ? 'green'
                            : 'red',
                    }}
                >
                    {passwordCheckMessage.userPasswordCheck &&
                        passwordCheckMessage.userPasswordCheck}
                </Text>
                <Input
                    type="text"
                    name={userNickname}
                    value={input.userNickname}
                    placeholder="닉네임을 입력하세요..."
                    onChange={onChange}
                    styled={styled.input2}
                />
                <br />
                <Text
                    styled={{
                        ...styled.text,
                        color: nicknameMessage.effectiveness ? 'green' : 'red',
                    }}
                >
                    {nicknameMessage.userNickname &&
                        nicknameMessage.userNickname}
                </Text>
                <Button styled={styled.button}>회원가입</Button>
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

export default SignUpForm;
