import React from 'react';
import styled from 'styled-components';

const Date = ({ date, isModal }) => {
  return <StyledDate isModal={isModal}>{date}</StyledDate>;
};

const StyledDate = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.005rem;
  color: ${({ theme }) => theme.gray400};
  ${props =>
    !props.isModal &&
    `
    position: absolute;
  bottom: 0;
  left: 0;
  `}
`;

export default Date;