declare global {
  interface Window {
    Kakao: any;
  }
}

export const shareKakao = (route: any, poll_id: any) => {
  // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(import.meta.env.VITE_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }
    kakao.Link.sendScrap({
      requestUrl: route, // 페이지 url
      templateId: 103242, // 메시지템플릿 번호
      templateArgs: {
        poll_id: poll_id,
      },
    });
    /* kakao.Link.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: title, // 인자값으로 받은 title
        description: "친구가 타로카드를 공유했어요!", // 인자값으로 받은 title
        imageUrl: "https://i.postimg.cc/5yHTm09w/Main.png",
        link: {
          mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
          webUrl: route,
        },
      },
      buttons: [
        {
          title: "공유한 타로카드 보러가기",
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
      ],
    }); */
  }
};
