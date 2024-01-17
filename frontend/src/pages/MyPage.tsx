import Navbar from "../component/Navbar";
import styled from "styled-components";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cardNumberAtom1 } from "../state/atom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  height: 200%;
`;

const Inside = styled.div`
  width: 81.75rem;
  margin-left: auto;
  margin-right: auto;
`;
const Folder = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  margin-left: 1rem;
`;

const MyDrawer = styled.p`
  color: #ecb973;

  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-left: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0.125rem;
  background: #ecb973;
  margin-top: 1rem;
`;

const Card = styled.div`
  width: 13.25rem;
  height: 22.80231rem;
  border-radius: 0.25rem;
  background: #e9e5da;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  cursor: pointer;
`;

const CardLine1 = styled.div`
  width: 11.8269375rem;
  height: 21.2rem;
  border-radius: 0.625rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 1rem;
`;

const CardLine2 = styled.div`
  width: 11.4628125rem;
  height: 18.91975rem;
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
  width: 3.0998125rem;
  height: 5.579625rem;
`;

const CardText = styled.p`
  width: 10.0003125rem;
  height: 10.0003125rem;
  color: #1d1d1d;
  text-align: center;
  font-family: "Italiana", sans-serif;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01625rem;
  text-transform: uppercase;
  margin-top: 1rem;
  margin-left: 0.7rem;
`;

const UserName = styled.p`
  color: #b88150;
  text-align: center;
  font-family: "Italiana", sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  letter-spacing: 0.07875rem;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-top: 2rem;

  margin-left: auto;
  margin-right: auto;
  gap: 2.5rem 2rem;
`;

function MyPage() {
  const num1 = useRecoilValue(cardNumberAtom1);
  console.log(num1);
  return (
    <>
      <Background>
        <Inside>
          <Navbar />
          <Folder>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="31"
              viewBox="0 0 37 31"
              fill="none"
            >
              <path
                d="M33.9688 6.35938H18.7918L13.7838 1.35313C13.5887 1.15642 13.3564 1.00042 13.1006 0.894206C12.8447 0.787987 12.5702 0.733661 12.2932 0.734382H3.03125C2.47181 0.734382 1.93528 0.956619 1.5397 1.3522C1.14411 1.74779 0.921875 2.28432 0.921875 2.84376V28.2652C0.922804 28.7955 1.13386 29.3038 1.5088 29.6787C1.88375 30.0537 2.39201 30.2647 2.92227 30.2656H34.1252C34.643 30.2652 35.1395 30.0593 35.5056 29.6931C35.8718 29.327 36.0777 28.8305 36.0781 28.3127V8.46876C36.0781 7.90932 35.8559 7.37279 35.4603 6.9772C35.0647 6.58162 34.5282 6.35938 33.9688 6.35938ZM2.32812 2.84376C2.32812 2.65728 2.4022 2.47843 2.53407 2.34657C2.66593 2.21471 2.84477 2.14063 3.03125 2.14063H12.2932C12.4791 2.14095 12.6573 2.2149 12.7889 2.3463L16.802 6.35938H2.32812V2.84376ZM34.6719 28.3127C34.6714 28.4576 34.6137 28.5963 34.5112 28.6988C34.4088 28.8012 34.27 28.8589 34.1252 28.8594H2.92227C2.76483 28.8589 2.61398 28.7962 2.50266 28.6849C2.39133 28.5735 2.32859 28.4227 2.32812 28.2652V7.76563H33.9688C34.1552 7.76563 34.3341 7.83971 34.4659 7.97157C34.5978 8.10343 34.6719 8.28228 34.6719 8.46876V28.3127Z"
                fill="#ECB973"
              />
            </svg>
            <MyDrawer>내 서랍</MyDrawer>
          </Folder>
          <Line />
          <Link
            to="/resultdetail"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Row>
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
                      어쩌구 할거에요♥
                    </CardText>
                  </CardLine2>
                  <UserName>ㆍUSERNAMEㆍ</UserName>
                </CardLine1>
              </Card>
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
                      어쩌구 할거에요♥
                    </CardText>
                  </CardLine2>
                  <UserName>ㆍUSERNAMEㆍ</UserName>
                </CardLine1>
              </Card>
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
                      어쩌구 할거에요♥
                    </CardText>
                  </CardLine2>
                  <UserName>ㆍUSERNAMEㆍ</UserName>
                </CardLine1>
              </Card>
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
                      어쩌구 할거에요♥
                    </CardText>
                  </CardLine2>
                  <UserName>ㆍUSERNAMEㆍ</UserName>
                </CardLine1>
              </Card>
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
                      어쩌구 할거에요♥
                    </CardText>
                  </CardLine2>
                  <UserName>ㆍUSERNAMEㆍ</UserName>
                </CardLine1>
              </Card>
            </Row>
          </Link>
        </Inside>
      </Background>
    </>
  );
}

export default MyPage;
