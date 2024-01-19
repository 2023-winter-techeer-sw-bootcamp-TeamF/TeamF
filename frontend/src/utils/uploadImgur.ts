import axios from "axios";

export const uploadImgur = (url: any) => {
  const apiBase = "https://api.imgur.com/3/image";
  axios
    .post(
      apiBase,
      {
        image: url,
        type: "base64",
      },
      {
        headers: {
          Authorization:
            "Client-ID " + import.meta.env.VITE_SHARE_IMGUR_CLIENT_ID,
        },
      }
    )
    .then((res) => {
      console.log(res.data.data.link);
    })
    .catch((e) => {
      console.log(e);
    });
};
