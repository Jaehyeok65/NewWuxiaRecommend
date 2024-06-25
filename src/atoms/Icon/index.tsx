import React from 'react';
import styled from 'styled-components';

interface IconProps {
  styled?: {
    fontSize?: string;
    color?: string;
  };
  icon?: boolean; // 예시로 boolean 타입 설정
  setIcon?: () => void; // 예시로 클릭 이벤트 핸들러
  children : React.ReactNode;
}

const Icons = styled.span<IconProps>`
  font-size: ${(props) => props.styled?.fontSize || '12px'};
  color: ${(props) => (props.icon ? props.styled?.color || 'black' : 'inherit')};
`;

const Icon: React.FC<IconProps> = ({ styled, children, icon, setIcon }) => {
  return (
    <Icons styled={styled} onClick={setIcon} icon={icon}>
      {children}
    </Icons>
  );
};

export default React.memo(Icon);
