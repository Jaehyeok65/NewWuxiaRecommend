import React from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import Title from '../../atoms/Title';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    text-decoration: none;
    color : inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Cards = styled.div`
    border : 1px solid #fff;
    border-radius : 8px;
    overflow : hidden;
    height : 100%;
    width : 100%;
    max-width : 200px;

    
    > div {
        text-align : center;
        color : inherit;
        text-decoration : none;
    }
    > img {
        width : 100%;
        height : ${props => props.styled.height ? props.styled.height : '100%'}
    }
    &:hover {
        transform : translateY(-4px);
        cursor : pointer;
    }

    @media screen and (max-width: 600px) {
        > img {
            width : 100%;
            height : ${props => props.styled.mobileheight ? props.styled.mobileheight : '100%'}
        }
    }
`




const Card = ( { url, styled, title, subtitle , link }) => {


    return(
        <StyledLink to={`/detail/${title}`}>
        <Cards styled={styled}>
            <img src={url} alt="이미지" />
            <Title styled={{fontSize : '12px', color : 'inherit'}}>{title}</Title>
            <Text styled={{fontSize : '12px', color : 'gray'}}>{subtitle}</Text>
        </Cards>
        </StyledLink>
    )
}


export default React.memo(Card);