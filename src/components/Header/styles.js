import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30 px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Bar = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const NavBar = styled(Link)`
  text-decoration: none;
  color: ${props => (props.active === 'true' ? '#444444' : '#999999')};
  font-size: 15px;
  display: inline;
  font-weight: bold;
  padding-right: 20px;
  transition: color 0.2s;
  ${props =>
    props.active === 'false' &&
    css`
      &:hover {
        color: ${darken(0.1, '#999999')};
      }
    `}
  & + li {
    padding: 0 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #dddddd;
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
    }

    button {
      line-height: 16px;
      margin-top: 4px;
      font-size: 14px;
      color: #1a78aa;
      background: none;
      border: 0;
    }
  }
`;
