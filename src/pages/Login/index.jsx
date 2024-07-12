import React from 'react';
import Title from '../../atoms/Title';
import LoginForm from '../../molecule/LoginForm';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Text from 'atoms/Text';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const LoginFormstyle = {
    input1: {
        margin: '2% 0px 0px 0px',
        padding: '12px',
        width: '100%',
        maxwidth: '420px',
    },
    input2: {
        margin: '2% 0px 0px 0px',
        padding: '12px',
        width: '100%',
        maxwidth: '420px',
    },
    button: {
        margin: '2% 0px 10% 0px',
        padding: '12px',
        width: '100%',
        borderRadius: '4px',
        marginTop: '2%',
        maxwidth: '420px',
    },
    text: {
        margin: '10px 0px 0px 0px',
    },
};

const Login = ({ setLoginstate, setNickname }) => {
    return (
        <MainFrame>
            <Title
                styled={{
                    textAlign: 'center',
                    fontSize: '25px',
                    marginTop: '2%',
                }}
            >
                Login
            </Title>
            <LoginForm
                styled={LoginFormstyle}
                userName="userEmail"
                userPassword="userPassword"
                setLoginstate={setLoginstate}
                setNickname={setNickname}
            />
            <StyledLink to="/signup">
                <Text
                    styled={{
                        textAlign: 'center',
                        fontSize: '14px',
                        marginTop: '3%',
                    }}
                >
                    회원가입 하러가기
                </Text>
            </StyledLink>
        </MainFrame>
    );
};

export default React.memo(Login);
