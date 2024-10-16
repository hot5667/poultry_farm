'use client';
import { useUploadStore } from '@/store/useUploadStore';
import browserClient from '@/util/supabase/client';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useEffect } from 'react';

interface UploadImageProps {
  uid: string;
  currentUserImage: string | null;
  session: Session;
}

const UploadImage = ({ uid, currentUserImage, session }: UploadImageProps) => {
  const {
    uploading,
    preview,
    selectedFile,
    confirmUpload,
    setUploading,
    setPreview,
    setSelectedFile,
    setConfirmUpload,
    resetUploadState,
  } = useUploadStore();

  // 프로필 이미지 업로드 함수
  const uploadProfileImage = async () => {
    if (!selectedFile) return;
    const fileExtension = selectedFile.name.split('.').pop();
    const filePath = `avatars/${uid}/avatar_${Date.now()}.${fileExtension}`;

    try {
      setUploading(true);

      if (!session) {
        alert('로그인이 필요합니다.');
        return;
      }

      // 기존 파일 삭제 및 새 파일 업로드
      const { error: uploadError } = await browserClient.storage
        .from('avatars')
        .upload(filePath, selectedFile);
      if (uploadError) throw uploadError;

      const { data } = browserClient.storage
        .from('avatars')
        .getPublicUrl(filePath);
      const publicUrl = data?.publicUrl;

      const { data: updateData } = await browserClient
        .from('User')
        .update({ UserImage: publicUrl })
        .eq('UserID', uid)
        .select();

      if (updateData) {
        setPreview(null); // 미리보기 해제
        alert('프로필 이미지 수정 완료!');
        window.location.reload();
      }
    } catch (error) {
      console.error('프로필 이미지 수정 실패', error);
    } finally {
      setUploading(false);
      resetUploadState(); // 상태 초기화
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    setConfirmUpload(true); // 업로드 확인 상태 설정
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-4">
        {preview ? (
          <Image
            src={preview}
            width={200}
            height={200}
            alt="Preview Image"
            className="h-52"
          />
        ) : (
          <Image
            src={currentUserImage || '/assets/default-profile.jpg'}
            width={200}
            height={200}
            alt="User Image"
          />
        )}
      </div>
      <label className="block text-center">
        <span className="text-sm font-medium text-gray-700">
          프로필 이미지 업로드
        </span>
        <div className="mt-2 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="-mx-1 w-48 text-center p-1 text-sm text-gray-500 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-b-2 disabled:opacity-50"
          />
        </div>
      </label>

      {uploading && <p>Uploading...</p>}
      {confirmUpload && (
        <div className="flex justify-around">
          <button
            className="hover:underline text-sm font-medium text-gray-700"
            onClick={uploadProfileImage}
            disabled={uploading}
          >
            업로드
          </button>
          <button
            className="hover:underline text-sm font-medium text-gray-700"
            onClick={() => {
              resetUploadState(); // 업로드 취소
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
