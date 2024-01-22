import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, refreshTokenState } from "../state/atom.ts";
import { useNavigate } from "react-router-dom";
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
    opacity: 0.7;

    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const MenuItem = styled(Link)`
  color: #ecb973;
  font-family: S-CoreDream-3Light;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-right: 2.5rem;
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
  margin-right: 1.25rem;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  const handleLogout = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/fortuneselect");
  };

  return (
    <NavContainer>
      <LogoContainer
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.7, originX: 0, position: "relative" }}
      >
        <Link to="/fortuneselect">
          <LargeLetter>T</LargeLetter>AIROT&nbsp;
        </Link>
      </LogoContainer>
      <MenuContainer
        initial={{ scale: 1 }}
        whileHover={{ originX: 1, zIndex: 1000 }}
      >
        <motion.div whileHover={{ scale: 1.6 }}>
          <MenuItem to="/mypage"> MYPAGE</MenuItem>
        </motion.div>
        <motion.div whileHover={{ scale: 1.3, overflow: "visible" }}>
          {accessToken ? (
            <LogoutButton onClick={handleLogout}>LOG OUT</LogoutButton>
          ) : (
            <MenuItem to="/login">
              <LoginButton>LOG IN</LoginButton>
            </MenuItem>
          )}
        </motion.div>
      </MenuContainer>
    </NavContainer>
  );
};

export default Navbar;
