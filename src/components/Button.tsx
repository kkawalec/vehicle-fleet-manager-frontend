import React from 'react';
import styled from '@emotion/styled';

interface Props {
  text: string;
  bgColor: string;
}

const Button = ({
  text,
  bgColor = 'black',
  ...props
}: Props & React.HTMLProps<HTMLButtonElement>) => {
  return <StyledButton bgColor={bgColor}>{text}</StyledButton>;
};

const StyledButton = styled.button<{ bgColor: string }>`
  padding: 8px 12px;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;

export default Button;
