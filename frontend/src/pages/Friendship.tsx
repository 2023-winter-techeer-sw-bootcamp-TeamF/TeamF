import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import FriendshipImg from "../assets/Friendship.png";
import { Link } from "react-router-dom";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
`;

const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 79.4671675rem;
  height: 52.94rem;
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
  width: 19.45rem;
  height: 3.125rem;
  flex-shrink: 0;
  position: absolute; // 부모 컨테이너인 BackgroundWrapper에 상대적인 위치
  top: 12%;
  left: 37%;
  text-align: center;
`;

const TitleContent = styled.p`
  color: #fff;
  font-family: 맑은 고딕;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  text-transform: capitalize;
  margin-top: 0.6125rem;
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
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  overflow-y: scroll;
  height: 96%;
  padding-right: 1rem;
  line-height: 1.5;
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
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 400;
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

const NextText = styled.a`
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  text-transform: capitalize;
  cursor: pointer;
`;

const FriendShip = () => {
  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <Profile src={FriendshipImg}></Profile>
          <TitleBox>
            <TitleContent>우정운 타로 마스터와의 대화</TitleContent>
          </TitleBox>
          <BackgroundImg src={Background} alt="Background" />
          <ChatBox>
            <Tellme>
              제가 오랜 지혜와 경험을 바탕으로 타로 리딩의 세계로 여러분을
              안내해 드리겠습니다. 우선, 타로는 단순한 운세를 넘어서 개인의
              상황과 내면의 감정을 세심하게 반영하는 도구라는 것을 기억하세요.
              때로는 카드의 메시지가 모호하거나 추상적일 수 있지만, 그 안에서
              여러분만의 명확한 해석을 찾는 것이 중요해요. 리딩을 시작하기 전에,
              여러분은 자신의 마음에 집중하고, 깊은 내면의 탐색을 통해
              정신적으로 준비를 하는 것이 좋습니다. 우정에 관한 리딩을 위해서는,
              사용자가 5장의 카드를 뽑게 됩니다. 이때, 여러분이 고민을 말씀하신
              후에, 그에 맞춰 카드를 선택합니다. 타로 카드를 해석할 때는 그림,
              숫자, 글자 등의 다양한 요소를 사용해 여러분의 상황과 연결지어
              의미를 찾아냅니다. 해석은 언제나 주관적이기 때문에, 다양한
              관점에서의 해석이 중요하다는 것을 잊지 마세요. 여러분의 고민에
              대해 이야기해주시면, 저는 그것을 바탕으로 카드가 전하는 메시지를
              찾아낼 것입니다.
            </Tellme>
          </ChatBox>
          <ReplyBox>
            <Reply placeholder="이곳에 고민을 적어주세요"></Reply>
          </ReplyBox>
          <Profile2 src={FriendshipImg}></Profile2>
          <NextBox>
            <Link to="/cardselect">
              <NextText>카드 뽑으러 가기</NextText>
            </Link>
          </NextBox>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default FriendShip;
