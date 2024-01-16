import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});
export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const cardNumberAtom = atom<number>({
  key: "cardNumberAtom",
  default: 1, // 초기 카드 번호 설정
});

interface CardInfo {
  card1: string;
  card2: string;
  card3: string;
}
export const cardInfoAtom = atom<CardInfo>({
  key: "cardInfoAtom",
  default: {
    card1: "",
    card2: "",
    card3: "",
  },
});
