import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailBackground = styled.div`
  width: 965px;
  height: 719px;
  border-radius: 4px;
  background: #e9e5da;
  margin-top: 2rem;

  display: flex;
  justify-content: center;
`;

const DetailLine1 = styled.div`
  width: 940px;
  height: 680px;
  border-radius: 10px;
  border: 0.5px solid #b88150;
  background: rgba(217, 217, 217, 0);

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  flex-direction: column;
`;

const DetailLine2 = styled.div`
  width: 929px;
  height: 634px;
  border-radius: 8px 8px 0px 0px;
  border: 0.5px solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Date = styled.p`
  display: flex;
  width: 177px;
  height: 41px;
  flex-direction: column;
  justify-content: center;
  color: #b88150;
  text-align: center;
  font-family: "Italiana", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const Title = styled.p`
  color: #b99e6f;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 4.5rem;
  margin-top: 30px;
`;

const Worry = styled.p`
  display: flex;
  width: 374px;
  height: 40.761px;
  flex-direction: column;
  justify-content: center;
  color: #b99e6f;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 13px;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 76px;
  margin-top: 2rem;
`;

const CardBackground = styled.div`
  width: 141.75px;
  height: 243px;
  border-radius: 15px;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaroEx = styled.img`
  width: 125.135px;
  height: 225.243px;
`;

function ResultDetail() {
  return (
    <>
      <Background>
        <Inside>
          <Navbar />
          <Details>
            <DetailBackground>
              <DetailLine1>
                <DetailLine2>
                  <Title>당신의 고민 . . .</Title>
                  <Worry>
                    일하는데 스트레스를 너무 많이 받습니다. 이직을 하면 좋을 지
                    아니면 더 적응을 해야할 지 알려주세요.
                  </Worry>
                  <Cards>
                    <CardBackground>
                      <TaroEx src={TaroEx1} />
                    </CardBackground>
                    <CardBackground>
                      <TaroEx src={TaroEx2} />
                    </CardBackground>
                    <CardBackground>
                      <TaroEx src={TaroEx3} />
                    </CardBackground>
                  </Cards>
                </DetailLine2>
                <Date>ㆍ2024.00.00ㆍ</Date>
              </DetailLine1>
            </DetailBackground>
          </Details>
        </Inside>
      </Background>
    </>
  );
}

export default ResultDetail;
