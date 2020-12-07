import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  padding: 30px;
  width: 100%;
  height: 448px;
  max-width: 360px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      text-align: left;
      line-height: 16px;
      color: #444444;
    }

    input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 0 15px;
      height: 45px;
      margin: 8px 0 0;

      & + strong {
        margin-top: 20px;
      }

      &::placeholder {
        font-size: 16px;
        color: #999999;
      }
    }

    span {
      color: #f65e5e;
      align-self: flex-start;
      margin: 5px 0 10px;
      font-weight: bold;
    }

    button {
      margin: 15px 0 0;
      height: 44px;
      background: #1a78aa;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#1A78AA')};
      }
    }
  }
`;
