import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import FriendshipImg from "../assets/Friendship.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import LoadingPage from "../component/LoadingPage";
import {
  pollIdState,
  accessTokenState,
  replyState,
  selectLuck,
  tarotMasterImg,
} from "../state/atom.ts";

import "../assets/font-YUniverse-B.css";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
`;

const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 79.4671675rem;
  height: 52.94rem;
  margin: auto;
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Inside = styled.div`
  width: 81.75rem;
  margin-left: auto;
  margin-right: auto;
`;

const TitleBox = styled.div`
  border-radius: 1.875rem;
  background: rgba(51, 51, 51, 0.9);
  width: 22.75rem;
  height: 3.125rem;
  flex-shrink: 0;
  position: absolute; // 부모 컨테이너인 BackgroundWrapper에 상대적인 위치
  top: 12%;
  left: 36%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContent = styled.p`
  color: #fff;
  font-family: YUniverse-B;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-transform: capitalize;
`;

const Profile = styled.img`
  width: 4rem;
  height: 3.9375rem;
  flex-shrink: 0;
  border-radius: 9.375rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-811%, -366%);
`;

const ChatBox = styled.div`
  width: 39.625rem;
  height: 13.25rem;
  flex-shrink: 0;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 0.0625rem solid #ecb973;
  transform: translate(32%, -300%);
  padding: 1.375rem;
`;

const Tellme = styled.p`
  color: #ecb973;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  text-align: left;
  overflow-y: scroll;
  height: 96%;
  padding-right: 1rem;
  line-height: 1.4;
  white-space: pre-wrap;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 0.25rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
`;

const ReplyBox = styled.div`
  width: 39.625rem;
  height: 6.8125rem;
  border-radius: 1.25rem 0rem 1.25rem 1.25rem;
  border: 0.0625rem solid #fff;
  padding: 0.9375rem;
  display: flex;
  transform: translate(80%, -542%);
`;

const Reply = styled.textarea`
  color: #fff;
  background-color: #000;
  width: 37.5rem;
  text-align: left;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.4;
  overflow-y: scroll;
  padding-right: 1rem;
  outline: none;
  border: none;
  resize: none;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e1ded9; /* 연한 흰색 */
    border-radius: 0.25rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ffffff; /* 호버시 색상 변경 (흰색) */
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    background-color: #000;
    font-size: 1.4375rem;
    padding-right: 1rem;
  }
`;

const Profile2 = styled.img`
  width: 4rem;
  height: 3.9375rem;
  flex-shrink: 0;
  border-radius: 9.375rem;
  position: absolute;
  top: 104%;
  left: 50%;
  transform: translate(-811%, -441%);
`;

const NextBox = styled.div`
  width: 14.6875rem;
  height: 5rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 1px solid #ecb973;
  background: rgba(236, 185, 115, 0);
  transform: translate(85%, -689%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NextBox2 = styled.div`
  width: 14.6875rem;
  height: 7rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 1px solid #ecb973;
  background: rgba(236, 185, 115, 0);
  transform: translate(85%, -489%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.7rem;
`;

const NextText = styled.a`
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  text-transform: capitalize;
  cursor: pointer;
  line-height: 1.4;
`;

const NextText2 = styled.a`
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-transform: capitalize;
  cursor: pointer;
  line-height: 1.4;
`;

const FriendShip = () => {
  const navigate = useNavigate();
  const setPollId = useSetRecoilState(pollIdState);
  const accessToken = useRecoilValue(accessTokenState);
  const [reply, setReply] = useRecoilState(replyState);
  const [writestart, setWriteStart] = useState(false);
  const tellMeText = `아이고~ 어서와라,
이 할머니는 네가 우정을 찾아나가는 여정을 함께할 우정운 타로 마스터 마틸드 란다.
타로점을 볼 때 주의할 점과 타로점을 보는 방법에 대해 알려줄테니 잘 들어보렴.
타로는 단순한 운세가 아니라 네 상황이나 감정을 반영하는 거란다.
추상적이거나 모호한 대답은 해석을 어렵게 만들어버릴 수 있단다. 그러니 명확한 답을 원한다면, 고민을 얘기하기 전에 네 마음에 집중하고 내면을 좀 더 탐색해보렴.
우정운은 총 5장의 카드를 뽑는단다. 네가 고민을 얘기하고 나면 카드를 뽑을텐데, 네 고민과 카드의 그림, 숫자, 글자를 함께 고려해서 이 할머니가 그 의미를 알아보마.
해석은 주관적일 수 있으니 여러 시각에서 생각해보는 게 중요하단 걸 꼭 기억하렴.
자, 이제 네 고민을 얘기해보려무나. 이 할머니가 귀 기울여 들어줄게.`;
  const setLuckType = useSetRecoilState(selectLuck);
  const [taroMaster, setTaroMaster] = useState("");
  const settarotMasterImg = useSetRecoilState(tarotMasterImg);
  // const로 선언했을 때 불변값이라 값을 변화하면 에러 생김
  const getText = (): void => {
    axios
      .get("/api/v1/tarot/option", {
        params: {
          //await: 비동기 함수 안에서 promise 객체가 처리될 때까지 기다림
          luckType: "우정운",
          luckOpt: 0,
        },
      })
      .then((res) => {
        setTaroMaster(res.data.data.master_name);
        setLuckType(3);
        settarotMasterImg(FriendshipImg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 다 적었다는 버튼 클릭 시
  const [writeDone, setWriteDone] = useState(false);

  const textChange = () => {
    setWriteDone(true);
    setComeout(2);
  };
  //한글자씩 나오게 하는 로직
  const [blobTitle2, setBlobTitle2] = useState("");
  const [count2, setCount2] = useState(0);
  const completionWord2 = "너의 친구들을 한번 알아보러 가보자꾸나..🔍";

  useEffect(() => {
    if (writeDone) {
      const typingInterval = setInterval(() => {
        setBlobTitle2((prevTitleValue) => {
          if (count2 < completionWord2.length) {
            const newChar = completionWord2[count2];
            const result = prevTitleValue ? prevTitleValue + newChar : newChar;
            setCount2(count2 + 1);
            return result;
          } else {
            clearInterval(typingInterval);
            setTimeout(() => {
              navigate("/cardselect5");
            }, 2000);
            return prevTitleValue;
          }
        });
      }, 30);

      return () => {
        clearInterval(typingInterval);
      };
    }
  });
  const handleNextButton = async () => {
    try {
      const response = await axios.post(
        "/api/v1/polls",
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log("성공", response.data);
      setPollId(response.data.data.pollId);
      textChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
    setWriteStart(true);
  };
  //한글자씩 나오게 하는 로직
  const [blobTitle, setBlobTitle] = useState("");
  const [count, setCount] = useState(0);
  const completionWord = tellMeText;
  const [comeout, setComeout] = useState(0);

  useEffect(() => {
    if (comeout === 0) {
      const typingInterval = setInterval(() => {
        setBlobTitle((prevTitleValue) => {
          const result = prevTitleValue
            ? prevTitleValue + completionWord[count]
            : completionWord[0];
          setCount(count + 1);

          if (count >= completionWord.length - 1) {
            setCount(0);
            setComeout(1);
          }

          return result;
        });
      }, 30);
      return () => {
        clearInterval(typingInterval);
      };
    }
  });

  //자동으로 스크롤이 내려가게 하는 로직
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [blobTitle]);

  useEffect(() => {
    getText();
  }, []);

  return (
    <BackgroundColor>
      <Inside>
        <LoadingPage></LoadingPage>
        <Navbar />
        <BackgroundWrapper>
          <Profile src={FriendshipImg}></Profile>
          <TitleBox>
            <TitleContent>{taroMaster} 타로 마스터와의 대화</TitleContent>
          </TitleBox>
          <BackgroundImg src={Background} alt="Background" />
          <ChatBox>
            <Tellme ref={chatBoxRef} className="chatBox">
              {blobTitle}
            </Tellme>
          </ChatBox>
          {comeout === 0 ? (
            <></>
          ) : (
            <>
              <ReplyBox>
                <Reply
                  placeholder="이곳에 고민을 적어주세요"
                  value={reply}
                  onChange={handleReplyChange}
                ></Reply>
              </ReplyBox>
              {writestart ? (
                <>
                  <Profile2 src={FriendshipImg}></Profile2>
                  {!writeDone ? (
                    <NextBox>
                      <NextText onClick={handleNextButton}>
                        다 적었으면 알려주세요.
                      </NextText>
                    </NextBox>
                  ) : (
                    <NextBox2>
                      <NextText2>{blobTitle2}</NextText2>
                    </NextBox2>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default FriendShip;
