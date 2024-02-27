// import { useState } from "react";
import { useState } from 'react';
import styled from 'styled-components';

const ToggleBtn = () => {
  const [isOn, setIsOn] = useState(true);
  const handlerIsOn = () => setIsOn(!isOn);

  return (
    <div onClick={handlerIsOn}>
      {isOn ? (
        <>
          <ToggleColor>컬러</ToggleColor>
          <ToggleButton>이미지</ToggleButton>
        </>
      ) : (
        <>
          <ToggleButton>컬러</ToggleButton>
          <ToggleColor>이미지</ToggleColor>
        </>
      )}
    </div>
  );
};

const ToggleColor = styled.button`
  width: 12.2rem;
  height: 4rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  border: none;
  font-size: 1.6rem;
  color: #861dee;
  font-weight: 400;
  border: 0.2rem solid #9935ff;
  background: #ffffff;
`;

const ToggleButton = styled.button`
  width: 12.2rem;
  height: 4rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.3rem;
  font-size: 1.6rem;
  font-weight: 400;
  border: none;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.gray900};
  border: none;
`;

export default ToggleBtn;

// &:focus {
//   border-radius: .6rem;
//   border: .2rem solid #9935ff;
//   background: #ffffff;
//   font-weight: 700;
//   color: #861dee;
// }
