import styled from 'styled-components';

import { cancelButton } from '~/styles/default';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  strong {
    flex: 1;
    color: #444444;
    font-size: 24px;
    font-weight: bold;
  }
  div {
    display: flex;

    button {
      width: 112px;
      height: 36px;

      &:first-child {
        ${cancelButton}
      }

      span {
        margin-left: 5px;
      }
    }
  }
`;

export const Data = styled.div`
  height: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  /* max-width: 400px; */
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
