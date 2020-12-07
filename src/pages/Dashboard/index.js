import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Header, Data, DataEmpty, Pagination } from './styles';

export default function Student() {
  return (
    <Container>
      <Header>
        <strong>Dashboard</strong>
      </Header>
      <>
        <Data />
      </>
    </Container>
  );
}
