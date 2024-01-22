import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, refreshTokenState } from "../state/atom.ts";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "../assets/font-S-CoreDream-3Light.css";

const NavContainer = styled.nav`
  //background-color: #000000;
  width: 100%;
  height: 4.375rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 10;
`;

const LogoContainer = styled.div`
  color: #ecb973;
  font-family: Cinzel;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  display: flex;
  margin-left: 1.25rem;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 5.5rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(236, 185, 115, 0);
  color: #ecb973;
  font-family: S-CoreDream-3Light;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  cursor: pointer;

  &:hover {
    opacity: 0.7;

    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const MenuItem = styled.div`
  color: #ecb973;
  font-family: S-CoreDream-3Light;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-right: 1.25rem;
  cursor: pointer;
`;

const LargeLetter = styled.span`
  font-size: 1.625rem;

  vertical-align: baseline;
  line-height: 1.1;
`;

const LogoutButton = styled.button`
  width: 5.5rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(236, 185, 115, 0);
  color: #ecb973;
  font-family: S-CoreDream-3Light;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const accessTokenValue = useRecoilValue(accessTokenState);
  const handleLogout = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/fortuneselect");
  };

  const handlePageNavigation = (path: string) => {
    if (!accessTokenValue) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <NavContainer>
      <LogoContainer onClick={() => navigate("/fortuneselect")}>
        <LargeLetter>T</LargeLetter>AIROT&nbsp;
      </LogoContainer>
      <MenuContainer>
        <MenuItem onClick={() => handlePageNavigation("/mypage")}>
          MYPAGE
        </MenuItem>
        {accessToken ? (
          <LogoutButton onClick={handleLogout}>LOG OUT</LogoutButton>
        ) : (
          <LoginButton onClick={() => navigate("/login")}>LOG IN</LoginButton>
        )}
      </MenuContainer>
    </NavContainer>
  );
};

export default Navbar;
