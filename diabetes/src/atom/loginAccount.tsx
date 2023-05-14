import { atom } from "recoil";

export const loginAccount = atom<string>({
  key: 'loginAccount',
  default: '',
});