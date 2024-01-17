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

export const cardNumberAtom1 = atom<number>({
  key: "cardNumberAtom",
  default: 0,
});

export const cardNumberAtom2 = atom<number>({
  key: "cardNumberAtom",
  default: 0,
});

export const cardNumberAtom3 = atom<number>({
  key: "cardNumberAtom",
  default: 0,
});
export const pollIdState = atom({
  key: "pollIdState",
  default: "",
});

export const replyState = atom({
  key: "replyState",
  default: "",
});
