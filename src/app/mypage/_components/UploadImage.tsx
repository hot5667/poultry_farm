import React from 'react';

interface UploadImageProps {
  uid: string;
  currentUserImage: string | null;
}
const UploadImage = ({ uid, currentUserImage }: UploadImageProps) => {
  return <div>UploadImage</div>;
};

export default UploadImage;
