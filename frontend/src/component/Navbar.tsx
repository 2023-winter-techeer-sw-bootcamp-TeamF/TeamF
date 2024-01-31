import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, refreshTokenState } from "../state/atom.ts";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import "../assets/font-S-CoreDream-3Light.css";

const NavContainer = styled.nav`
  // background-color: #000000;
  width: 100%;
  height: 4.375rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 10;
`;

const LogoContainer = styled(motion.div)`
  color: #ecb973;
  font-family: Cinzel;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  display: flex;
  margin-left: 1.25rem;
  &:hover {
    font-weight: 1200;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  cursor: pointer;
`;

const MenuContainer = styled(motion.div)`
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
    // opacity: 0.7;
    border-color: #ffbf00;
    color: #ffbf00;
    font-weight: bold;

    // transition: transform 0.1s ease, opacity 0.3s ease;
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
  &:hover {
    // opacity: 0.7;
    color: #ffbf00;
    font-weight: bold;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const MenuItem2 = styled.div`
  color: #ecb973;
  font-family: S-CoreDream-3Light;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-right: 2.5rem;
  cursor: pointer;
  &:hover {
    // opacity: 0.7;
    color: #ffbf00;
    font-weight: bold;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
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
    // opacity: 0.7;
    color: #ffbf00;
    border-color: #ffbf00;
    font-weight: bold;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const Navbar = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const accessTokenValue = useRecoilValue(accessTokenState);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAccessToken("");
    setRefreshToken("");
  };

  const handlePageNavigation = () => {
    if (!accessTokenValue) {
      navigate("/login");
    } else {
      navigate("/mypage");
    }
  };

  return (
    <NavContainer>
      <LogoContainer
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          originX: 0,
          position: "relative",
          fontWeight: "bold",
        }}
        whileTap={{ scale: 0.85 }}
        transition={{ duration: 0.04, ease: "linear" }}
      >
        <Link to="/">
          <LargeLetter>T</LargeLetter>AIROT&nbsp;
        </Link>
      </LogoContainer>
      <MenuContainer>
        <MenuItem2 onClick={handlePageNavigation}> MYPAGE</MenuItem2>

        {accessToken ? (
          <MenuItem>
            <LogoutButton onClick={handleLogout}>LOG OUT</LogoutButton>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link to="/login">
              <LoginButton>LOG IN</LoginButton>
            </Link>
          </MenuItem>
        )}
      </MenuContainer>
    </NavContainer>
  );
};

export default Navbar;
