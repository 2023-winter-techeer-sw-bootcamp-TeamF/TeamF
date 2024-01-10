import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
  //background-color: #000000;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 10;
  @media (max-width: 1300px), (max-height: 650px) {
    width: 85%;
  }
`;

const LogoContainer = styled.div`
  color: #ecb973;
  font-family: Cinzel;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  display: flex;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 88px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 1px solid #ecb973;
  background: rgba(236, 185, 115, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  cursor: pointer;
`;

const MenuItem = styled(Link)`
  color: #ecb973;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-right: 20px;
`;

const LargeLetter = styled.span`
  font-size: 26px;

  vertical-align: baseline;
  line-height: 1.1;
`;

const Navbar = () => {
  return (
    <NavContainer>
      <LogoContainer>
        <Link to="/">
          <LargeLetter>T</LargeLetter>AROT&nbsp;<LargeLetter>C</LargeLetter>
          OUNSELING
        </Link>
      </LogoContainer>

      <MenuContainer>
        <MenuItem to="/mypage"> MYPAGE</MenuItem>
        <MenuItem to="/login">
          <LoginButton>LOG IN</LoginButton>
        </MenuItem>
      </MenuContainer>
    </NavContainer>
  );
};

export default Navbar;
