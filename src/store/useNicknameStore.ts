import { create } from 'zustand';

interface NicknameStore {
  nickname: string;
  isEditing: boolean;
  setNickname: (nickname: string) => void;
  toggleEditing: () => void;
}
export const useNicknameStore = create<NicknameStore>((set) => ({
  nickname: '',
  isEditing: false,
  setNickname: (nickname) => set({ nickname }),
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}));
