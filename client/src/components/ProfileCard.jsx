import React from 'react';
import styled from 'styled-components';
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaUserTag, FaMapMarker, FaUser, FaEdit, FaLock } from 'react-icons/fa'; // Import React Icons
import coverImage from '../assets/images/logoDark.png';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-secondary-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CoverImage = styled.img`
  width: 85%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  margin-top: -40px;
`;

const ProfileName = styled.h2`
  font-size: 28px;
  margin: 10px 0;
  text-align: center;
`;

const ProfileEmail = styled.p`
  font-size: 19px;
  color: var(--text-secondary-color);
  text-align: center;
  margin-top: 8px;
`;

const ProfileDetails = styled.div`
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled.span`
  font-size: 18px;
  margin-right: 8px;
`;

const RoleCard = styled.div`
  background-color: var(--primary-300);
  color: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  text-align: center;
  margin-top: 20px;
`;

const EditButton = styled.button`
  background-color: var(--primary-500);
  color: var(--primary-100);
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }

  & > svg {
    margin-right: 8px;
  }
`;

const ChangePasswordButton = styled.button`
  background-color: var(--primary-600);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #c82333;
  }

  & > svg {
    margin-right: 8px;
  }
`;

const ProfileCard = () => {
  const { user } = useDashboardContext();
  const { name, email, imageUrl, lastName, location, role, _id } = user;

  const handleEditClick = () => {
    // Add your edit logic here
    console.log('Edit button clicked');
  };

  const handleChangePasswordClick = () => {
    // Add your change password logic here
    console.log('Change Password button clicked');
  };

  return (
    <ProfileContainer>
      <CoverImage src={coverImage || 'default-cover-image.jpg'} alt="Cover" />
      <ProfileImage
        src={imageUrl || 'https://cdn-icons-png.flaticon.com/512/219/219970.png'}
        alt="Profile"
      />
      <IconContainer>
        <RoleCard>
          <p style={{ textTransform: 'capitalize', fontSize: '20px', fontWeight: '500' }}>
            {role}
          </p>
        </RoleCard>
      </IconContainer>
      <ProfileName>
        {name} {lastName}
      </ProfileName>
      <ProfileEmail>{email}</ProfileEmail>
      <ProfileDetails>
        <IconContainer>
          <Icon>
            <FaMapMarker />
          </Icon>
          <p>{location}</p>
        </IconContainer>
        <IconContainer>
          <Icon>
            <FaUser />
          </Icon>
          <p>{_id}</p>
        </IconContainer>
      </ProfileDetails>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <EditButton onClick={handleEditClick}>
          <FaEdit /> Edit
        </EditButton>
        <ChangePasswordButton onClick={handleChangePasswordClick}>
          <FaLock /> Change Password
        </ChangePasswordButton>
      </div>
    </ProfileContainer>
  );
};

export default ProfileCard;
