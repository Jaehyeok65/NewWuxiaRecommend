import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchInput from '../molecule/SearchInput';
import Button from '../atoms/Button';
import Icon from 'atoms/Icon';
import { getLogout } from '../api/LoginAPI';
import useDebounce from '../hook/useDebounce';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineMedium } from 'react-icons/ai';

const Head = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: sticky;
    top: 0;
    z-index: 20000;
    align-items: center;
    background-color: white;
    margin: 0 auto;
    width: 100%;
    @media screen and (min-width: 1200px) {
        width: 80%;
    }
`;

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

const LoginContainer = styled.div`
    margin-left: 10px;
`;

const FirstGridContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-left: 4%;
`;

const SecondGridContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 5px 10px;
`;
const ThirdGridContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 95%;
    height: 100%;
`;

const loginbtnstyle = {
    width: '80px',
    border: 'none',
    padding: '0px',
};

const SearchInputstyle = {
    //SearchInput의 스타일 지정
    input: {
        padding: '12px',
        margin: '4px 8px',
    },
    btn: {
        padding: '0px',
        margin: '0px',
        border: 'none',
        width: '80px',
        height: '100px',
    },
    div: {
        pcwidth: '50%',
        mobilewidth: '30%',
        textAlign: 'right',
    },
};

const HeadTextstyle = {
    text: {
        fontSize: '16px',
    },
    icon: {
        fontSize: '50px',
        margin: '4px 8px',
    },
    btn: {
        border: 'none',
        padding: '12px 20px',
    },
    head: {
        pcwidth: '70%',
        mobilewidth: '100%',
    },
};

const Header = (
    {
        onClick,
        onClickLoginModal,
        onClickSignUpModal,
        loginstate,
        setLoginstate,
        setNickname,
    },
    ref
) => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    const debounceVal = useDebounce(input);

    useEffect(() => {
        if (!debounceVal) return;
        if (debounceVal.trim() === '') return;
        navigate(`/search/검색결과/${debounceVal}`);
    }, [debounceVal]);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onClear = () => {
        setInput('');
    };

    const onLogoutClick = () => {
        setLoginstate();
        setNickname();
        window.sessionStorage.clear();
    };

    return (
        <Head>
            <FirstGridContainer>
                <Button onClick={onClick} styled={loginbtnstyle}>
                    <Icon styled={{ fontSize: '30px' }}>
                        <FaBars data-testid="side" />
                    </Icon>
                </Button>
            </FirstGridContainer>
            <SecondGridContainer>
                <StyledLink to="/">
                    <Icon styled={{ fontSize: '55px' }}>
                        <AiOutlineMedium />
                    </Icon>
                </StyledLink>
            </SecondGridContainer>
            <ThirdGridContainer>
                <SearchInput
                    styled={SearchInputstyle}
                    values={input}
                    name="search"
                    onChange={onChange}
                    onClear={onClear}
                />
                <LoginContainer>
                    {loginstate ? (
                        <Button
                            onClick={onClickLoginModal}
                            styled={loginbtnstyle}
                        >
                            <StyledLink to="/login">로그인</StyledLink>
                        </Button>
                    ) : (
                        <Button
                            onClick={() => getLogout(onLogoutClick)}
                            styled={loginbtnstyle}
                        >
                            로그아웃
                        </Button>
                    )}
                </LoginContainer>
            </ThirdGridContainer>
        </Head>
    );
};

const ForwardHead = React.forwardRef(Header);

export default React.memo(ForwardHead);
