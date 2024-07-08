import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import StarRate from '../StarRate';
import Text from '../../atoms/Text';
import Title from '../../atoms/Title';

const Cards = styled.div`
    position: relative;
    border: 1px solid #fff;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 300px;
    max-height: 300px;
    max-width: 300px;
    cursor: pointer;

    &:hover {
        transform: translateY(-4px);

        .textoverlay {
            opacity: 1;
        }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const TextOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.3s ease;

    > div {
        margin-bottom: 4%;
    }

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        color: red;
        margin: 3% 3% 0% 0%;
        z-index: 9999;
        cursor: pointer;
    }

    > h4 {
        margin: 10%;
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

const LikesText = styled.span`
    line-height: 1;
    vertical-align: top;
`;

const Card = ({ styled, product }) => {
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    const init = () => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i < product.rate ? true : false;
        }
        setClicked(clickStates);
    };

    return (
        <StyledLink to={`/detail/${product?.title}`}>
            <Cards styled={styled} data-testid="card">
                {product?.url && (
                    <Image src={product?.url} alt={product?.title} />
                )}
                <TextOverlay className="textoverlay">
                    <div>
                        <FaHeart /> <LikesText>{product?.likes}</LikesText>
                    </div>
                    <Title styled={{ fontSize: '17px', color: 'inherit' }}>
                        {product?.title}
                    </Title>
                    <Text styled={{ fontSize: '12px', color: 'inherit' }}>
                        {product?.writer}
                    </Text>
                    <StarRate
                        styled={{ fontSize: '12px', color: '#FFCF36' }}
                        clicked={clicked}
                        init={init}
                    />
                    <Text styled={{ fontSize: '12px', color: 'inherit' }}>
                        조회수 : {product.view}
                    </Text>
                </TextOverlay>
            </Cards>
        </StyledLink>
    );
};

export default React.memo(Card);
