import React from 'react';
import styled from 'styled-components';


const Icons = styled.span`
    font-size : ${props => props.styled.fontSize};
    color : ${props => props.icon ? props.styled.color : 'black'};
`;

const Icon = ( { styled, children, icon, setIcon, color }) => {

    
    return(
        <Icons styled={styled} onClick={setIcon} icon={icon}>
            { children }
        </Icons>
    )
}

export default Icon;
