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
  key: "cardNumberAtom1",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const cardNumberAtom2 = atom<number>({
  key: "cardNumberAtom2",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const cardNumberAtom3 = atom<number>({
  key: "cardNumberAtom3",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const pollIdState = atom({
  key: "pollIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const replyState = atom({
  key: "replyState",
  default: "",
});

export const selectLuck = atom({
  key: "selectLuck",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const tarotMasterImg = atom({
  key: "tarotMasterImg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
