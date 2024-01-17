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

export const pollIdState = atom({
  key: "pollIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const replyState = atom({
  key: "replyState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const selectLuck = atom({
  key: "selectLuck",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
