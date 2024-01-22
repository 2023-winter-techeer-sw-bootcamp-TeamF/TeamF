import Navbar from "../component/Navbar";
import styled from "styled-components";
import BackgroundImg1 from "../assets/Background.png";
import LinkBtn from "../assets/LinkButton.png";
import ShareBtn from "../assets/ShareButton.png";
import LoadingPage from "../component/LoadingPage";
import { shareKakao } from "../utils/shareKakaoLink";
import { useRecoilValue } from "recoil";
import { pollIdState, accessTokenState } from "../state/atom.ts";
import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import "../assets/font-YUniverse-B.css";
import "../assets/font-S-CoreDream-3Light.css";

>>>>>>> 385c1f7aeac41ab07e4b7f0b4a7601c2575121e3

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardLine2 = styled.div`
  width: 15.02281rem;
  height: 24.79569rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 0.3125rem;
  //margin-left: 0.125rem;
`;

const TaroExs = styled.div<TaroExsProps>`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.8rem;
  justify-content: ${(props) =>
    props.tarotImage === 1 || props.tarotImage === 3 ? "center" : "flex-start"};
  overflow-x: auto;
  margin-right: 0.7rem;
  margin-left: 0.7rem;

  &::-webkit-scrollbar {
    width: 0.1875rem; /* 스크롤바의 너비 */
    height: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 0.3125rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
`;
interface TaroExsProps {
  tarotImage: number;
}

const TaroEx = styled.img`
  width: 4.16306rem;
  height: 7.4935rem;
`;

const CardText = styled.p`
  color: #b88150; //#1d1d1d -> #b88150
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.3;
  //letter-spacing: -0.0225rem;
  text-transform: uppercase;
  margin: 0.7rem; //padding -> margin
  padding-right: 0.3rem;
  height: 15rem;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    //background-color: #e1ded9; /* 연한 흰색 */
    background-color: #b8815034; /* 스크롤바 색상 변경 */
    border-radius: 0.25rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ffffff; /* 호버시 색상 변경 (흰색) */
  }
`;

const UserName = styled.p`
  color: #b88150;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.1875rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 0.08313rem;
  text-transform: uppercase;
  margin-top: 0.5rem;
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
  //gap: 4.5rem;
  justify-content: space-evenly;
`;

const ShareIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  //margin-top: 4.31rem;
`;

const ShareText = styled.p`
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 300;
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
  gap: 0.3rem;
  cursor: pointer;
`;

const ShareButtonIcon = styled.div`
  width: 1.375rem;
  height: 1.375rem;
`;

const ShareButtonText = styled.p`
  color: #ecb973;
  text-align: center;
  font-family: S-CoreDream-3Light;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  //letter-spacing: -0.0175rem;
  text-transform: capitalize;
`;

const SaveButton = styled.button`
  width: 10.375rem;
  height: 2.1875rem;
  border-radius: 0.9375rem;
  background: #ecb973;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButtonText = styled.p`
  color: #000;
  text-align: center;
  font-family: S-CoreDream-3Light;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  //letter-spacing: -0.0175rem;
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
  const poll_id = useRecoilValue(pollIdState);
  const accessToken = useRecoilValue(accessTokenState);
  const pollId = useRecoilValue(pollIdState);
  const [tarotImage, setTarotImage] = useState<ImgType[]>([]);
  const [explanation, setExplanation] = useState("");
  const [luck, setLuck] = useState("");

  useEffect(() => {
    const callData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/polls/detail?poll_id=${pollId}`,
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        setTarotImage(response.data.data.card);
        setExplanation(response.data.data.result[0].explanation);
        setLuck(response.data.data.result[0].luck);
      } catch (error) {
        console.error("타로 결과를 불러오는데 실패했습니다:", error);
      }
    };

    callData();
  }, [accessToken, pollId]);

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
              <Card>
                <CardLine1>
                  <CardLine2>
                    <TaroExs tarotImage={tarotImage.length}>
                      {tarotImage.map((image, index) => (
                        <TaroEx key={index} src={image.image_url} />
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
                  <Link to="/mypage">
                    <SaveButton>
                      <SaveButtonText>MYPAGE로 이동하기</SaveButtonText>
                    </SaveButton>
                  </Link>
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
