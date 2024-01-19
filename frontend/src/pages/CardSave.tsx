import Navbar from "../component/Navbar";
import styled from "styled-components";
import BackgroundImg1 from "../assets/Background.png";
import LinkBtn from "../assets/LinkButton.png";
import ShareBtn from "../assets/ShareButton.png";
import LoadingPage from "../component/LoadingPage";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { shareKakao } from "../utils/shareKakaoLink";
import { useRecoilValue } from "recoil";
import { pollIdState, accessTokenState } from "../state/atom.ts";
import { useEffect, useState } from "react";
import axios from "axios";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 81.75rem;
  margin-left: auto;
  margin-right: auto;
  margin: auto;
`;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 79.4671675rem;
  height: 52.94rem;
  margin: auto;
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  width: 17.36506rem;
  height: 29.88406rem;
  border-radius: 0.25rem;
  background: #e9e5da;
  display: flex;
  justify-content: center;
`;

const CardLine1 = styled.div`
  width: 15.50738rem;
  height: 27.78406rem;
  border-radius: 0.625rem;
  border: 0.03rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 0.97rem;
`;

const CardLine2 = styled.div`
  width: 15.02281rem;
  height: 24.79569rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 0.3125rem;
  margin-left: 0.125rem;
`;

const TaroExs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TaroEx = styled.img`
  width: 4.16306rem;
  height: 7.4935rem;
`;

const CardText = styled.p`
  color: #1d1d1d;
  text-align: center;
  font-family: Italiana;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0225rem;
  text-transform: uppercase;
  padding: 0.7rem;
  height: 15.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
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
`;

const UserName = styled.p`
  color: #b88150;
  text-align: center;
  font-family: "Italiana", sans-serif;
  font-size: 1.1875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;

  letter-spacing: 0.08313rem;
  text-transform: uppercase;
  margin-top: 0.4rem;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 0.5rem;
  top: 22%;
  left: 28%;
`;

const RightBox = styled.div`
  width: 17.36506rem;
  height: 29.88406rem;
  border-radius: 0.25rem;
  border: 0.125rem solid #ecb973;
  background: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5rem;
`;

const ShareIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 4.31rem;
`;

const ShareText = styled.p`
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0225rem;
  text-transform: capitalize;
`;

const ShareButton = styled.button`
  width: 10.375rem;
  height: 2.1875rem;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ShareButtonIcon = styled.div`
  width: 1.375rem;
  height: 1.375rem;
`;

const ShareButtonText = styled.p`
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0175rem;
  text-transform: capitalize;
`;

const SaveButton = styled.button`
  width: 10.375rem;
  height: 2.1875rem;
  border-radius: 0.9375rem;
  background: #ecb973;
  cursor: pointer;
  border: none;
`;

const SaveButtonText = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0175rem;
  text-transform: capitalize;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
`;
const LinkButton = styled.img`
  width: 100%;
  height: 100%;
`;

const ShareButtonIcon1 = styled.img`
  width: 100%;
  height: 100%;
`;

interface ImgType {
  explanation: string;
  image_url: string;
  eng_name: string;
}
function CardSave() {
  const captureDivRef = useRef(null);
  const poll_id = useRecoilValue(pollIdState);
  const accessToken = useRecoilValue(accessTokenState);
  const pollId = useRecoilValue(pollIdState);

  const [tarotImage, setTarotImage] = useState<ImgType[]>([]);
  const [explanation, setExplanation] = useState("");
  const [luck, setLuck] = useState("");

  useEffect(() => {
    const callData = async () => {
      try {
        const response = await axios.get(`/mypage/detail?poll_id=${pollId}`, {
          headers: {
            authorization: accessToken,
          },
        });
        setTarotImage(response.data.data.card);
        setExplanation(response.data.data.result[0].explanation);
        setLuck(response.data.data.result[0].luck);
      } catch (error) {
        console.error("타로 결과를 불러오는데 실패했습니다:", error);
      }
    };

    callData();
  }, [accessToken, pollId]);

  const downloadButton = () => {
    if (captureDivRef.current) {
      html2canvas(captureDivRef.current).then((canvas) => {
        saveImg(canvas.toDataURL("image/jpg"), "image.jpg");
      });
    }
  };

  const saveImg = (uri: string, filename: string) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  const shareButton = () => {
    shareKakao(`http://localhost:5000/share/`, poll_id);
  };

  return (
    <>
      <Background>
        <Inside>
          <LoadingPage></LoadingPage>
          <Navbar />
          <BackgroundWrapper>
            <BackgroundImg src={BackgroundImg1} />
            <Cards>
              <Card ref={captureDivRef} id="captureDiv">
                <CardLine1>
                  <CardLine2>
                    <TaroExs>
                      {tarotImage.map((number) => (
                        <TaroEx src={number.image_url} />
                      ))}
                    </TaroExs>
                    <CardText>{explanation}</CardText>
                  </CardLine2>
                  <UserName>ㆍ{luck}ㆍ</UserName>
                </CardLine1>
              </Card>

              <RightBox>
                <ShareIcon>
                  <ShareButtonIcon1 src={ShareBtn}></ShareButtonIcon1>
                </ShareIcon>
                <ShareText>
                  나의 타로 운세를 저장하고
                  <br /> 공유해보세요!
                </ShareText>
                <Buttons>
                  <ShareButton>
                    <ShareButtonIcon>
                      <LinkButton src={LinkBtn}></LinkButton>
                    </ShareButtonIcon>
                    <ShareButtonText onClick={shareButton}>
                      링크 공유하기
                    </ShareButtonText>
                  </ShareButton>

                  <SaveButton>
                    <SaveButtonText onClick={downloadButton}>
                      카드 다운로드받기
                    </SaveButtonText>
                  </SaveButton>
                </Buttons>
              </RightBox>
            </Cards>
          </BackgroundWrapper>
        </Inside>
      </Background>
    </>
  );
}

export default CardSave;
