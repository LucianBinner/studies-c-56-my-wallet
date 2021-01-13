import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface IContainerProps {
  menuIsOpen: boolean;
}

interface IToggleThemeFooterProps {
  menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
  grid-area: AS;

  background-color: ${({ theme }) => theme.colors.secondary};
  padding-left: 20px;

  border-right: 1px solid ${({ theme }) => theme.colors.gray};

  position: relative;

  @media (max-width: 600px) {
    padding-left: 20px;

    position: fixed;
    z-index: 2;

    width: 170px;

    height: ${(props) => (props.menuIsOpen ? '100vh' : '70px')};
    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray};
      `};
  }
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-left: 10px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

export const MenuItemLink = styled(Link)`
  color: ${({ theme }) => theme.colors.info};
  text-decoration: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transform: opacity 0.5s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

export const MenuItemButton = styled.button`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.info};

  border: none;
  background: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transform: opacity 0.5s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 5px;
  font-size: 22px;

  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};

  display: none;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ToggleThemeFooter = styled.footer<IToggleThemeFooterProps>`
  display: none;
  position: absolute;
  bottom: 30px;
  display: ${(props) => (props.menuIsOpen ? 'flex' : 'none')};
`;
