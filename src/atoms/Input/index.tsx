import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    styled?: CSSProperties;
    auto?: string;
}

const Inputs = styled.input<InputProps>`
    border-radius: 3px;
    width: ${(props) => props.styled?.width || '200px'};
    margin: ${(props) => props.styled?.margin || '0px'};
    padding: ${(props) => props.styled?.padding || '0px'};
    max-width: ${(props) => props.styled?.maxWidth};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { name, value, onChange, placeholder, styled, type, auto, ...rest },
        ref
    ) => {
        return (
            <Inputs
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                styled={styled}
                placeholder={placeholder}
                ref={ref}
                autoComplete={auto}
                {...rest}
            />
        );
    }
);

export default Input;
