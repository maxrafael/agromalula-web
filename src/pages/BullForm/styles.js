import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

import { actionButton, cancelButton } from '~/styles/default';

import MySelect from '~/components/MySelect';

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
        margin-right: 15px;
      }

      &:last-child {
        ${actionButton}
      }

      span {
        margin-left: 5px;
      }
    }
  }
`;

export const Data = styled(Form)`
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    margin-top: 20px;
    &:first-child {
      margin-top: 0px;
    }
  }

  input {
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-top: 8px;
    padding: 20px;

    &:disabled {
      background: #f5f5f5;
    }

    & + span {
      color: #ee4d64;
      font-size: 14px;
    }
  }
`;

export const Row = styled.div`
  margin-top: 20px;
  display: flex;
  & > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  span {
    color: #ee4d64;
    font-size: 14px;
  }
`;

export const StatusPicker = styled(MySelect)`
  margin-top: 8px;
  .react-select__control {
    border: 1px solid #dddddd;
    .react-select__value-container {
      height: 40px;
    }
  }
`;
