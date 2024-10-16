// const [uploading, setUploading] = useState(false);
// const [preview, setPreview] = useState<string | null>(null); // 이미지 미리보기 상태
// const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택한 파일 상태
// const [confirmUpload, setConfirmUpload] = useState(false); // 업로드 확인 상태

import { create } from 'zustand';

interface UploadStore {
  uploading: boolean;
  preview: string | null;
  selectedFile: File | null;
  confirmUpload: boolean;
  setUploading: (uploading: boolean) => void;
  setPreview: (preview: string | null) => void;
  setSelectedFile: (file: File | null) => void;
  setConfirmUpload: (confirm: boolean) => void;
  resetUploadState: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  uploading: false,
  preview: null,
  selectedFile: null,
  confirmUpload: false,
  setUploading: (uploading) => set({ uploading }),
  setPreview: (preview) => set({ preview }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setConfirmUpload: (confirm) => set({ confirmUpload: confirm }),
  resetUploadState: () =>
    set({
      uploading: false,
      preview: null,
      selectedFile: null,
      confirmUpload: false,
    }),
}));
