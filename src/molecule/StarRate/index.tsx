import React, { useEffect } from 'react';
import styled, { CSSProperties } from 'styled-components';
import Icon from '../../atoms/Icon';
import { FaStar } from 'react-icons/fa';

interface StarRateProps {
    styled?: {
        textAlign?: CSSProperties['textAlign'];
        fontSize?: string;
        color?: string;
    };
    handleStar?: (index: number) => void;
    clicked?: boolean[];
    init?: () => void;
    rate?: number | null;
}

const Star = styled.div<{ styled?: { textAlign?: string } }>`
    text-align: ${(props) => props.styled?.textAlign || 'left'};
`;

const StarRate: React.FC<StarRateProps> = ({
    styled,
    handleStar,
    clicked,
    init,
    rate,
}) => {
    const array = [0, 1, 2, 3, 4];

    useEffect(() => {
        if (init) {
            init();
        }
    }, [init]);

    return (
        <Star data-testid="star" styled={styled}>
            {array.map((item) => (
                <Icon
                    styled={styled}
                    icon={clicked ? clicked[item] : false}
                    key={item}
                    setIcon={handleStar ? () => handleStar(item) : undefined}
                >
                    <FaStar data-testid="stars" />
                </Icon>
            ))}
            {rate ? (
                <span style={{ fontSize: '14px' }}>
                    &nbsp;{rate.toFixed(1)} / 5.0
                </span>
            ) : null}
        </Star>
    );
};

export default React.memo(StarRate);
