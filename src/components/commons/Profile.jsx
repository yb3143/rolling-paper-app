import styled from 'styled-components';

/**
 *
 * @param {object} prop
 * @param {string} prop.src 이미지 주소
 * @param {boolean} isModal 모달 사용 여부
 */
const Profile = ({ src, isModal }) => {
  return (
    <ImgContainer isModal={isModal}>
      <img src={`${src}`} alt="프로필 이미지" />
    </ImgContainer>
  );
};

const ImgContainer = styled.div`
  width: ${props => (props.isModal ? '5.6rem' : '2.8rem')};
  height: ${props => (props.isModal ? '5.6rem' : '2.8rem')};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  border: 0.1rem solid
    ${({ theme, isModal }) => (isModal ? theme.gray200 : theme.white)};
`;

export default Profile;
