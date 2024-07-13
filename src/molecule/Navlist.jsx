import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { getAdmin } from 'api/LoginAPI';

const NavLists = styled.div`
    button {
        &:hover {
            background-color: black;
            color: white;
            transform: translateY(-2px);
        }
        width: ${(props) => props.nav && '250px'};
        font-weight: ${(props) => props.nav && 'bold'};
    }

    position: ${(props) => props.nav && 'sticky'};
    top: ${(props) => props.nav && '65px'};
    z-index: ${(props) => props.nav && '20000'};
    background-color: white;
    display: ${(props) => props.nav && 'flex'};
    justify-content: ${(props) => props.nav && 'space-between'};
    width: ${(props) => props.nav && '80%'};
    margin: ${(props) => props.nav && '0 auto'};

    @media screen and (max-width: 1200px) {
        display: ${(props) => props.nav && 'none'};
    }
`;

const NavList = ({ list = [], styled, onClick, nav = false }) => {
    const isAdmin = getAdmin() === 'true';
    return (
        <NavLists styled={styled} nav={nav}>
            {list.map((item, index) => {
                if (item.name === '관리자' && !isAdmin) {
                    return null;
                }
                return (
                    <Link to={item.path} key={index}>
                        <Button styled={styled.btn} onClick={onClick}>
                            {item.name}
                        </Button>
                    </Link>
                );
            })}
        </NavLists>
    );
};

export default React.memo(NavList);
