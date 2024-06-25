import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  styled?: CSSProperties;
  onClick?: () => void;
  color?: string;
}

const Buttons = styled.button<ButtonProps>`
  background: white;
  border-radius: ${(props) => props.styled?.borderRadius || '3px'};
  border: ${(props) => props.styled?.border || '1px solid gray'};
  color: ${(props) => props.color || 'black'};
  padding: ${(props) => props.styled?.padding || '12px'};
  margin: ${(props) => props.styled?.margin || '0px'};
  margin-bottom: ${(props) => props.styled?.marginBottom || '0px'};
  margin-top: ${(props) => props.styled?.marginTop || '0px'};
  font-size: ${(props) => props.styled?.fontSize || '12px'};
  text-align: ${(props) => props.styled?.textAlign || 'center'};
  width: ${(props) => props.styled?.width || 'auto'};
  display: ${(props) => props.styled?.display || 'inline-block'};
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  font-weight: ${(props) => props.styled?.fontWeight || 'normal'};
  max-width: ${(props) => props.styled?.maxWidth};
  
  &:hover {
    cursor: pointer;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick, styled, color }) => {
  return (
    <Buttons onClick={onClick} styled={styled} color={color}>
      {children}
    </Buttons>
  );
};

export default React.memo(Button);
