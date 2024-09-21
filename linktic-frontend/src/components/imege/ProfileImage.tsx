import React from 'react';
import { useImage } from 'react-image';

const ProfileImage = ({ src }: { src: string }) => {
  const { src: profileImageSrc } = useImage({
    srcList: src,
    useSuspense: false, // No usar suspense para poder manejar errores
  });

  return <img src={profileImageSrc} alt="Profile" />;
};

export default ProfileImage;
