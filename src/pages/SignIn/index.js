import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  user_name: Yup.string().required('Usuário é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ user_name, password }) {
    dispatch(signInRequest(user_name, password));
  }
  return (
    <>
      <img src={logo} alt="AgroMalula" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>SEU USUÁRIO</strong>
        <Input name="user_name" type="text" />
        <strong>SUA SENHA</strong>
        <Input name="password" type="password" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema '}
        </button>
      </Form>
    </>
  );
}
