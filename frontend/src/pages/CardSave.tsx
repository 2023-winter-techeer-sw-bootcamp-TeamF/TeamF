import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import BackgroundImg1 from "../assets/Background.png";
import { Link } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 81.75rem;
  margin-left: auto;
  margin-right: auto;
`;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 79.4671675rem;
  height: 52.94rem;
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
  cursor: pointer;
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
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 6.5rem;
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

const ShareIcon = styled.svg`
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

const ShareButtonIcon = styled.svg`
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

function CardSave() {
  return (
    <>
      <Background>
        <Inside>
          <Navbar />
          <BackgroundWrapper>
            <BackgroundImg src={BackgroundImg1} />
            <Cards>
              <Card>
                <CardLine1>
                  <CardLine2>
                    <TaroExs>
                      <TaroEx src={TaroEx1} />
                      <TaroEx src={TaroEx2} />
                      <TaroEx src={TaroEx3} />
                    </TaroExs>
                    <CardText>
                      어쩌구 저쩌구 어쩌구 어쩌구 저쩌구 어쩌구 저쩌 어쩌구
                      저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                      저쩌구 어쩌구 저쩌 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                      저쩌구 어쩌구 저 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
                      어쩌구 할거에요♥어쩌구 저쩌구 어쩌구 어쩌구 저쩌구 어쩌구
                      저쩌 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                      저쩌구 어쩌구 저쩌구 어쩌구 저쩌 어쩌구 저쩌구 어쩌구
                      저쩌구 어쩌구 저쩌구 어쩌구 저 어쩌구 저쩌구 어쩌구 저쩌구
                      어쩌구 저쩌구 어쩌구 할거에요♥
                    </CardText>
                  </CardLine2>
                  <UserName>ㆍUSERNAMEㆍ</UserName>
                </CardLine1>
              </Card>
              <RightBox>
                <ShareIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <circle cx="20" cy="20" r="20" fill="#ECB973" />
                    <path
                      d="M24.7733 23.4382C24.1406 23.4414 23.5166 23.5885 22.9474 23.8686C22.3783 24.1486 21.8785 24.5545 21.4849 25.0564L15.3055 21.1436C15.5307 20.4074 15.5307 19.6195 15.3055 18.8833L21.4849 14.9706C22.1121 15.7571 22.994 16.2935 23.9742 16.4846C24.9545 16.6758 25.9699 16.5093 26.8406 16.0148C27.7113 15.5202 28.3811 14.7295 28.7313 13.7827C29.0815 12.8359 29.0895 11.7941 28.754 10.8419C28.4184 9.88968 27.7609 9.08847 26.8979 8.58022C26.035 8.07197 25.0223 7.88947 24.0392 8.06506C23.0561 8.24065 22.1661 8.763 21.5268 9.53956C20.8876 10.3161 20.5403 11.2968 20.5466 12.3078C20.5506 12.6907 20.6075 13.0711 20.7157 13.438L14.5363 17.3507C13.9907 16.6552 13.245 16.1487 12.4026 15.9016C11.5601 15.6544 10.6626 15.6788 9.8345 15.9714C9.00637 16.264 8.28861 16.8103 7.78073 17.5346C7.27285 18.2588 7 19.1251 7 20.0135C7 20.9018 7.27285 21.7681 7.78073 22.4924C8.28861 23.2166 9.00637 23.7629 9.8345 24.0555C10.6626 24.3481 11.5601 24.3725 12.4026 24.1254C13.245 23.8782 13.9907 23.3718 14.5363 22.6762L20.7157 26.5889C20.6075 26.9558 20.5506 27.3362 20.5466 27.7191C20.5466 28.5658 20.7945 29.3934 21.2589 30.0974C21.7234 30.8014 22.3835 31.3501 23.1558 31.6741C23.9281 31.9981 24.778 32.0829 25.5979 31.9177C26.4178 31.7526 27.1709 31.3448 27.762 30.7462C28.3531 30.1475 28.7557 29.3847 28.9188 28.5543C29.0819 27.7238 28.9982 26.8631 28.6783 26.0809C28.3584 25.2986 27.8166 24.63 27.1215 24.1597C26.4265 23.6893 25.6093 23.4382 24.7733 23.4382ZM24.7733 9.73929C25.2749 9.73929 25.7652 9.88994 26.1822 10.1722C26.5993 10.4544 26.9243 10.8556 27.1163 11.3249C27.3082 11.7942 27.3584 12.3107 27.2606 12.8089C27.1627 13.3072 26.9212 13.7649 26.5665 14.1241C26.2119 14.4833 25.76 14.7279 25.2681 14.827C24.7761 14.9261 24.2662 14.8753 23.8028 14.6809C23.3394 14.4865 22.9433 14.1572 22.6647 13.7348C22.386 13.3124 22.2373 12.8158 22.2373 12.3078C22.2373 11.6266 22.5045 10.9733 22.9801 10.4916C23.4557 10.0099 24.1007 9.73929 24.7733 9.73929ZM11.2479 22.582C10.7463 22.582 10.256 22.4314 9.83896 22.1491C9.42192 21.8669 9.09687 21.4657 8.90493 20.9964C8.71298 20.5271 8.66276 20.0106 8.76061 19.5124C8.85846 19.0141 9.1 18.5564 9.45466 18.1972C9.80933 17.838 10.2612 17.5934 10.7531 17.4943C11.2451 17.3952 11.755 17.446 12.2184 17.6404C12.6818 17.8348 13.0779 18.1641 13.3565 18.5865C13.6352 19.0089 13.7839 19.5055 13.7839 20.0135C13.7839 20.6947 13.5167 21.348 13.0411 21.8297C12.5655 22.3114 11.9205 22.582 11.2479 22.582ZM24.7733 30.2876C24.2717 30.2876 23.7814 30.137 23.3644 29.8548C22.9473 29.5725 22.6223 29.1714 22.4303 28.702C22.2384 28.2327 22.1882 27.7162 22.286 27.218C22.3839 26.7197 22.6254 26.2621 22.9801 25.9029C23.3347 25.5436 23.7866 25.299 24.2786 25.1999C24.7705 25.1008 25.2804 25.1517 25.7438 25.3461C26.2072 25.5405 26.6033 25.8697 26.8819 26.2921C27.1606 26.7145 27.3093 27.2111 27.3093 27.7191C27.3093 28.4003 27.0421 29.0536 26.5665 29.5353C26.0909 30.017 25.4459 30.2876 24.7733 30.2876Z"
                      fill="black"
                    />
                  </svg>
                </ShareIcon>
                <ShareText>
                  나의 타로 운세를 저장하고
                  <br /> 공유해보세요!
                </ShareText>
                <Buttons>
                  <ShareButton>
                    <ShareButtonIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M11.6983 16.1364C11.7463 16.1843 11.7843 16.2412 11.8103 16.3038C11.8362 16.3664 11.8496 16.4335 11.8496 16.5012C11.8496 16.569 11.8362 16.6361 11.8103 16.6987C11.7843 16.7613 11.7463 16.8181 11.6983 16.866L10.8433 17.7202C9.97283 18.5907 8.79228 19.0797 7.56131 19.0797C6.33033 19.0797 5.14978 18.5907 4.27935 17.7202C3.40892 16.8498 2.91992 15.6693 2.91992 14.4383C2.91992 13.2073 3.40892 12.0268 4.27935 11.1563L6.35131 9.08353C7.18821 8.24568 8.31376 7.75948 9.49747 7.72449C10.6812 7.6895 11.8335 8.10837 12.7184 8.89533C12.7692 8.94047 12.8106 8.99517 12.8402 9.05631C12.8699 9.11745 12.8872 9.18383 12.8912 9.25166C12.8952 9.31949 12.8858 9.38744 12.8635 9.45164C12.8412 9.51583 12.8065 9.57501 12.7614 9.62579C12.7162 9.67658 12.6615 9.71797 12.6004 9.74762C12.5393 9.77726 12.4729 9.79457 12.405 9.79856C12.3372 9.80255 12.2693 9.79314 12.2051 9.77087C12.1409 9.7486 12.0817 9.7139 12.0309 9.66876C11.3427 9.0574 10.4469 8.73211 9.52674 8.75943C8.60659 8.78675 7.73166 9.16461 7.08091 9.81572L5.0081 11.8851C4.33095 12.5622 3.95053 13.4807 3.95053 14.4383C3.95053 15.3959 4.33095 16.3143 5.0081 16.9915C5.68525 17.6686 6.60367 18.0491 7.56131 18.0491C8.51894 18.0491 9.43736 17.6686 10.1145 16.9915L10.9687 16.1364C11.0166 16.0885 11.0735 16.0504 11.1361 16.0245C11.1987 15.9985 11.2658 15.9852 11.3335 15.9852C11.4013 15.9852 11.4684 15.9985 11.531 16.0245C11.5936 16.0504 11.6504 16.0885 11.6983 16.1364ZM17.72 4.27704C16.849 3.40769 15.6686 2.91943 14.438 2.91943C13.2074 2.91943 12.0271 3.40769 11.1561 4.27704L10.301 5.13126C10.2531 5.17917 10.2151 5.23604 10.1892 5.29864C10.1632 5.36123 10.1499 5.42832 10.1499 5.49607C10.1499 5.56382 10.1632 5.63091 10.1892 5.6935C10.2151 5.75609 10.2531 5.81296 10.301 5.86087C10.3977 5.95762 10.529 6.01198 10.6658 6.01198C10.7335 6.01198 10.8006 5.99863 10.8632 5.97271C10.9258 5.94678 10.9827 5.90878 11.0306 5.86087L11.8848 5.0015C12.562 4.32435 13.4804 3.94393 14.438 3.94393C15.3957 3.94393 16.3141 4.32435 16.9912 5.0015C17.6684 5.67865 18.0488 6.59706 18.0488 7.5547C18.0488 8.51234 17.6684 9.43075 16.9912 10.1079L14.9184 12.1867C14.2677 12.8378 13.3927 13.2157 12.4726 13.243C11.5524 13.2703 10.6566 12.945 9.96841 12.3337C9.91763 12.2885 9.85845 12.2538 9.79426 12.2316C9.73006 12.2093 9.66211 12.1999 9.59428 12.2039C9.52645 12.2079 9.46007 12.2252 9.39893 12.2548C9.33779 12.2845 9.28309 12.3259 9.23795 12.3767C9.1928 12.4274 9.15811 12.4866 9.13584 12.5508C9.11356 12.615 9.10416 12.683 9.10815 12.7508C9.11214 12.8186 9.12945 12.885 9.15909 12.9461C9.18873 13.0073 9.23013 13.062 9.28091 13.1071C10.1657 13.8936 11.3177 14.3121 12.501 14.2771C13.6843 14.2422 14.8095 13.7563 15.6463 12.9189L17.7183 10.8461C18.1498 10.4152 18.4923 9.90351 18.7259 9.34021C18.9596 8.77691 19.08 8.17307 19.0802 7.56322C19.0803 6.95337 18.9603 6.34947 18.7269 5.78604C18.4935 5.22262 18.1513 4.71072 17.72 4.27962V4.27704Z"
                          fill="#ECB973"
                        />
                      </svg>
                    </ShareButtonIcon>
                    <ShareButtonText>링크 공유하기</ShareButtonText>
                  </ShareButton>

                  <Link to="/mypage">
                    <SaveButton>
                      <SaveButtonText>내 서랍에 저장하기</SaveButtonText>
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
