import React from 'react';
import styled from '@emotion/styled';
import colors from '../colors';

type Size = 'small' | 'large';

interface Props {
  text: string;
  bgColor: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  size?: Size;
}

const Button = ({
  text,
  bgColor = colors.MID_GREY,
  onClick,
  disabled = false,
  type = 'button',
  size = 'large',
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      bgColor={bgColor}
      type={type}
      size={size}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ bgColor: string; size: Size }>`
  padding: ${({ size }) => (size === 'large' ? '8px 12px' : '4px 6px')};
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  height: ${({ size }) => (size === 'large' ? '40px' : '30px')};
`;

export default Button;
