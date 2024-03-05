import React from 'react';
import { CardContainer } from './CardContainer';
import PlusBtn from 'components/commons/buttons/PlusBtn';
import { useNavigate } from 'react-router-dom';
import routes from 'utils/constants/routes';
import styled from 'styled-components';

const AddCard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routes.post);
  };
  return (
    <FlexContainer>
      <PlusBtn onClick={handleClick} />
    </FlexContainer>
  );
};

const FlexContainer = styled(CardContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: auto;
`;
export default AddCard;