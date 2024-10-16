import {create} from 'zustand';

interface InputStore {
  nickname: string;
  introduction: string;
  error: string | null;
  setNickname: (nickname: string) => void;
  setIntroduction: (introduction: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useInputStore = create<InputStore>((set) => ({
  nickname: '',
  introduction: '',
  error: null,
  setNickname: (nickname) => set({ nickname }),
  setIntroduction: (introduction) => set({ introduction }),
  setError: (error) => set({ error }),
  reset: () => set({ nickname: '', introduction: '' }),
}));
