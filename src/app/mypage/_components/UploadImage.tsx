import browserClient from '@/util/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface UploadImageProps {
  uid: string;
  currentUserImage: string | null;
}

const UploadImage = ({ uid, currentUserImage }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // 이미지 미리보기 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택한 파일 상태
  const [confirmUpload, setConfirmUpload] = useState(false); // 업로드 확인 상태

  // 프로필 이미지 업로드 함수
  const uploadProfileImage = async () => {
    if (!selectedFile) return;

    const filePath = `avatars/${uid}/avatar.${selectedFile.name.split('.').pop()}`; // 사용자 ID를 포함하여 고유한 경로 생성

    try {
      setUploading(true);
      // Supabase Storage에 파일 업로드
      const { error: uploadError } = await browserClient.storage
        .from('avatars')
        .upload(filePath, selectedFile);
      if (uploadError) throw uploadError;
      alert('프로필 이미지 수정 완료!');
    } catch (error) {
      alert(`프로필 이미지 수정 실패: ${error}`);
    } finally {
      setUploading(false);
      setPreview(null); // 미리보기 해제
      setSelectedFile(null); // 선택한 파일 해제
      setConfirmUpload(false); // 업로드 확인 초기화
    }
  };

  return <div>UploadImage</div>;
};

export default UploadImage;
