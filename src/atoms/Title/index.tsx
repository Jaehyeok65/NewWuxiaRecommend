import React, { CSSProperties } from 'react';
import styled from 'styled-components';

interface TitleProps {
  children: React.ReactNode;
  styled: CSSProperties;
  onClick?: () => void;
}

// styled-components를 사용하여 스타일이 적용된 div 컴포넌트를 생성합니다.
const Titles = styled.div<TitleProps>`
  font-weight: bold;
  font-size: ${(props) => props.styled.fontSize || '20px'};
  margin-bottom: ${(props) => props.styled.marginBottom || '0px'};
  text-align: ${(props) => props.styled.textAlign || 'left'};
  margin-top: ${(props) => props.styled.marginTop || '0px'};
  cursor: pointer;
  color: ${(props) => props.styled.color || 'black'};
`;

const Title: React.FC<TitleProps> = ({ children, styled, onClick }) => {
  return (
    <Titles styled={styled} onClick={onClick}>
      {children}
    </Titles>
  );
};

export default React.memo(Title);