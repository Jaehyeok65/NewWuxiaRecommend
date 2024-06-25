import React, { useState } from 'react';
import Title from '../../atoms/Title';
import Icon from '../../atoms/Icon';
import Text from '../../atoms/Text';
import { FaHeart } from 'react-icons/fa';
import StarRate from '../StarRate';

const CardInfo = ({ product, styled } : { product : any, styled : any}) => {
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    const init = () => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i < product.rate ? true : false;
        }
        setClicked(clickStates);
    };

    if (!product || !styled) return <div>에러 발생</div>;

    return (
        <div>
            <Title styled={styled.title}>{product.title}</Title>
            <Text styled={styled.subtext}>{product.writer}</Text>
            <Icon styled={styled.icon} icon={true}>
                <FaHeart />
            </Icon>
            <span style={styled.span}>{product.likes}</span>
            <StarRate
                styled={{ fontSize: '12px', color: '#FFCF36' }}
                clicked={clicked}
                init={init}
            />
            <Text styled={styled.text}>view:{product.view}</Text>
        </div>
    );
};

export default React.memo(CardInfo);
