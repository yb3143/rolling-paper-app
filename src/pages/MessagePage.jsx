import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TextFieldInput,
  TextFieldDropDown,
  TextFieldTextEditor,
} from 'components/commons/form';
import GNB from 'components/commons/header/GNB';
import Primary from 'components/commons/buttons/PrimaryBtn';
import person from 'assets/images/profiles/person.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { AUTH } from 'utils/constants/API';
import { instance } from 'api/';

const MessagePage = () => {
  const { postId } = useParams();
  const [imageURLs, setImageURLs] = useState([]);
  const navigate = useNavigate();
  const createMessage = data => {
    return instance.post(`4-24/recipients/${postId}/messages/`, data);
  };

  useEffect(() => {
    const getProfileImages = async () => {
      const response = await instance.get(AUTH.profileImages);
      setImageURLs(response.data.imageUrls);
    };
    getProfileImages();
  }, []);

  const initialSelectedItem = ['지인', 'Noto Sans'];
  const [formValues, setFormValues] = useState({
    sender: '',
    relationship: initialSelectedItem[0],
    content: '',
    font: initialSelectedItem[1],
    profileImageURL: null,
  });
  useEffect(() => {
    if (imageURLs.length > 0) {
      setFormValues(prevState => ({
        ...prevState,
        profileImageURL: imageURLs[0],
      }));
    }
  }, [imageURLs]);

  const [isBtnDisabled, setIsBtnDisabled] = useState(
    !(formValues.sender && formValues.content),
  );

  const inputDisabled = false;
  const dropDownDisabled = false;
  const error = { message: '' };

  const listItems = ['친구', '지인', '동료', '가족'];
  const listFontFamily = [
    'Noto Sans',
    'Pretendard',
    '나눔명조',
    '나눔손글씨 손편지체',
  ];

  const handleInputChange = e => {
    setFormValues(prevState => ({ ...prevState, sender: e.target.value }));
  };

  const handleImageChange = image => {
    setFormValues(prevState => ({ ...prevState, profileImageURL: image }));
  };

  const handleRelationshipChange = relationship => {
    setFormValues(prevState => ({ ...prevState, relationship }));
  };

  const handleEditorChange = e => {
    setFormValues(prevState => ({ ...prevState, content: e.target.value }));
  };

  const handleFontChange = font => {
    setFormValues(prevState => ({ ...prevState, font }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const jsonFormValues = JSON.stringify(formValues);
    try {
      const response = await createMessage(jsonFormValues);
      navigate(`/post/${response.data.recipientId}`);
    } catch (err) {}
  };

  useEffect(() => {
    setIsBtnDisabled(!(formValues.sender.trim() && formValues.content.trim()));
  }, [formValues.sender, formValues.content]);

  return (
    <>
      <GNB />
      <AddMessageForm className="message-container">
        <NameContainer>
          <Description>From</Description>
          <NameInput
            placeholder={'이름을 입력해주세요.'}
            disabled={inputDisabled}
            error={error}
            handleChange={handleInputChange}
          />
          <ProfileContainer>
            <Description>프로필 이미지</Description>
            <div className="container">
              <ProfileImg $selectedImage={formValues.profileImageURL}>
                {!formValues.profileImageURL && (
                  <img src={person} alt="기본 이미지" />
                )}
              </ProfileImg>
              <div>
                <h3>프로필 이미지를 선택해주세요!</h3>
                <SampleImages>
                  {imageURLs.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="샘플 이미지"
                      onClick={() => handleImageChange(image, index)}
                    />
                  ))}
                </SampleImages>
              </div>
            </div>
          </ProfileContainer>
          <RelationshipContainer>
            <Description>상대와의 관계</Description>
            <RelationshipDropDown
              disabled={dropDownDisabled}
              error={error}
              initialSelectedItem={initialSelectedItem[0]}
              listItems={listItems}
              handleChange={handleRelationshipChange}
            />
          </RelationshipContainer>
          <TextEditorContainer>
            <Description>내용을 입력해주세요</Description>
            <TextEditor handleChange={handleEditorChange} />
          </TextEditorContainer>
          <FontSelectContainer>
            <Description>폰트 선택</Description>
            <FontFamilyDropDown
              disabled={dropDownDisabled}
              error={error}
              initialSelectedItem={initialSelectedItem[1]}
              listItems={listFontFamily}
              handleChange={handleFontChange}
            />
          </FontSelectContainer>
          <StyledPrimary disabled={isBtnDisabled} onClick={handleSubmit}>
            생성하기
          </StyledPrimary>
        </NameContainer>
      </AddMessageForm>
    </>
  );
};

const AddMessageForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: relative;
  inset: 0;
  padding: 4.7rem 0;
  gap: 5rem;

  z-index: 1;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  position: relative;
`;

const Description = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.6rem;
  letter-spacing: -0.01em;
  text-align: left;
`;

const NameInput = styled(TextFieldInput)`
  width: 72rem;
  margin-top: 1.2rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 72rem;
  gap: 3.2rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

  position: relative;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.2rem;
  }
  h3 {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.6rem;
    letter-spacing: -0.01em;
    text-align: left;
    color: ${({ theme }) => theme.gray500};
  }
`;
const ProfileImg = styled.div`
  width: 8rem;
  height: 8rem;
  padding: 2.4rem;
  border-radius: 10rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.gray300};
  background-image: url(${props => props.$selectedImage});
  background-size: cover;
`;
const SampleImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60.5rem;
  img {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 10rem;
    border: 0.1rem;
  }
`;
const RelationshipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 5rem;

  position: relative;
`;
const RelationshipDropDown = styled(TextFieldDropDown)``;
const TextEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 5rem;
`;
const TextEditor = styled(TextFieldTextEditor)``;
const FontSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 3.8rem;
`;
const FontFamilyDropDown = styled(TextFieldDropDown)``;
const StyledPrimary = styled(Primary)`
  width: 72rem;
`;

export default MessagePage;
