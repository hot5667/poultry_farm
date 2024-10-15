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

      // 기존 파일 삭제
      const { error: deleteError } = await browserClient.storage
        .from('avatars')
        .remove([filePath]);
      if (deleteError) console.error('파일 삭제 실패: ', deleteError);

      // Supabase Storage에 파일 업로드
      const { error: uploadError } = await browserClient.storage
        .from('avatars')
        .upload(filePath, selectedFile);
      if (uploadError) throw uploadError;

      // 이미지 URL 가져오기
      const { data } = browserClient.storage
        .from('avatars')
        .getPublicUrl(filePath);
      const publicUrl = data?.publicUrl;
      console.log('public===>', publicUrl);

      // User 테이블에 업데이트
      const { data: updateDawta, error: updateError } = await browserClient
        .from('User')
        .update({ UserImage: publicUrl })
        .eq('UserID', uid)
        .select();
      if (updateError) throw updateError;

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

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file); // 선택한 파일 저장
    setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    setConfirmUpload(true); // 업로드 확인 상태 설정
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 미리보기 URL 해제
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <div className="mb-4">
        {preview ? (
          <Image
            src={preview} // 미리보기 이미지 표시
            width={200}
            height={200}
            alt="Preview Image"
          />
        ) : currentUserImage ? (
          <Image
            src={currentUserImage}
            width={200}
            height={200}
            alt="User Image"
          />
        ) : (
          <Image
            src="/assets/default-profile.jpg"
            width={200}
            height={200}
            alt="default-image"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {confirmUpload && ( // 업로드 확인 상태에 따라 버튼 표시
        <div>
          <button onClick={uploadProfileImage} disabled={uploading}>
            업로드
          </button>
          <button
            onClick={() => {
              setConfirmUpload(false); // 업로드 확인 초기화
              setPreview(null); // 미리보기 해제
              setSelectedFile(null); // 선택한 파일 해제
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
