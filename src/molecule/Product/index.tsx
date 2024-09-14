import React from 'react';
import Title from '../../atoms/Title';
import Text from '../../atoms/Text';
import { FaHeart } from 'react-icons/fa';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import StarRate from '../StarRate';
import styled from 'styled-components';
import { Wuxia } from 'type/type';

const Content = styled.p`
    font-size: 13px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 4; // 원하는 라인수
    -webkit-box-orient: vertical;
`;

interface ProductProps {
    product: Wuxia;
    styled: any;
    icon: boolean;
    setIcon: any;
    setRateToggle: () => void;
    setTextToggle: () => void;
    clicked: any;
    init: any;
}

const Product = ({
    product,
    styled,
    icon,
    setIcon,
    setRateToggle,
    setTextToggle,
    clicked,
    init,
}: ProductProps) => {
    return (
        <React.Fragment>
            <img src={product.url} alt={product.title} />
            <div>
                <Title styled={styled.title}>{product.title}</Title>
                <Content>{product.content}</Content>
                <Button
                    onClick={setTextToggle}
                    styled={{
                        width: '100px',
                        marginBottom: '2%',
                        borderRadius: '4px',
                    }}
                >
                    설명 더보기
                </Button>
                <br />
                <Icon
                    styled={{ fontSize: '18px', color: 'red' }}
                    icon={icon}
                    setIcon={setIcon}
                >
                    <FaHeart data-testid="heart" />
                </Icon>
                <span
                    style={{
                        fontSize: '14px',
                        verticalAlign: 'top',
                        marginLeft: '8px',
                    }}
                >
                    {product.likes}
                </span>
                <Text styled={{ ...styled.text, marginTop: '2%' }}>
                    조회수 : {product.view}
                </Text>
                {clicked && (
                    <StarRate
                        rate={product.rate}
                        styled={{ fontSize: '12px', color: '#FFCF36' }}
                        clicked={clicked}
                        init={init}
                    />
                )}
                <Button
                    onClick={setRateToggle}
                    styled={{
                        width: '100px',
                        marginBottom: '2%',
                        borderRadius: '4px',
                    }}
                >
                    별점주기
                </Button>
                <a
                    href={`${product.link}`}
                    style={{ display: 'block', marginTop: '2%' }}
                >
                    바로가기 링크
                </a>
            </div>
        </React.Fragment>
    );
};

export default React.memo(Product);
