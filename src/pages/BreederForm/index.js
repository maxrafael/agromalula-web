import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Input } from '@rocketseat/unform';
import { items } from '~/components/Header/menu';

import history from '~/services/history';

import { Container, Header, Data, Row } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('* campo obrigatório'),
  dose: Yup.number()
    .typeError('* deve informar um número inteiro')
    .required('* campo obrigatório'),
});

export default function BreederForm() {
  const [record, setRecord] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadRecord() {
      try {
        const { data } = await api.get('breeders', {
          params: { id },
        });

        setRecord(data);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (!newRecord()) {
      loadRecord();
    }
  }, []);

  function newRecord() {
    return !id;
  }

  function fixHttpData(data) {
    data = {
      ...data,
      sync: false,
    };
    return data;
  }

  async function handleSubmit(data) {
    data = fixHttpData(data);

    try {
      if (!id) {
        await api.post('breeders', data);
        toast.success('Reprodutor cadastrado.');
      } else {
        await api.put(`breeders/${record.id}`, data);
        toast.success('Cadastro atualizado.');
      }

      history.push(items.breeders.route);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <Header>
        <strong>
          {newRecord() ? 'Cadastro de reprodutor' : 'Edição de reprodutor'}
        </strong>
        <div>
          <button
            type="button"
            onClick={() => history.push(items.breeders.route)}
          >
            <MdKeyboardArrowLeft color="#fff" size={16} />
            <span>VOLTAR</span>
          </button>

          <button type="submit" form="Form">
            <MdCheck color="#fff" size={16} />
            <span>SALVAR</span>
          </button>
        </div>
      </Header>
      <Data
        id="Form"
        schema={schema}
        onSubmit={handleSubmit}
        initialData={record}
      >
        <Row>
          <div>
            <strong>NOME</strong>
            <Input name="name" />
          </div>
          <div>
            <strong>QUANTIDADE DE DOSES</strong>
            <Input name="dose" />
          </div>
        </Row>
      </Data>
    </Container>
  );
}
