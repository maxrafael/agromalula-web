import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import { items } from '~/components/Header/menu';

import MyDatePicker from '~/components/MyDatePicker';

import history from '~/services/history';

import { Container, Header, Data, Row, StatusPicker } from './styles';
import api from '~/services/api';

import { statusOptionsBulls } from '~/data';

const schema = Yup.object().shape({
  name: Yup.string().required('* campo obrigatório'),
  birthday: Yup.date()
    .typeError('* deve informar uma data')
    .required('* campo obrigatório'),
  situation: Yup.mixed().required('* campo obrigatório'),
});

export default function BullForm() {
  const [record, setRecord] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadRecord() {
      try {
        const { data } = await api.get('bulls', {
          params: { id },
        });

        setRecord({
          ...data,
          situation: [
            {
              id: data.status,
              title: data.status,
            },
          ],
          birthday: parseISO(data.birthday),
        });
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
      status: data.situation.id,
      sync: false,
    };

    delete data.situation;

    return data;
  }

  async function handleSubmit(data) {
    data = fixHttpData(data);

    try {
      if (!id) {
        await api.post('bulls', data);

        toast.success('Touro cadastrado.');
      } else {
        await api.put(`bulls/${record.id}`, data);

        toast.success('Cadastro atualizado.');
      }

      history.push(items.bulls.route);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <Header>
        <strong>{newRecord() ? 'Cadastro de touro' : 'Edição de touro'}</strong>
        <div>
          <button type="button" onClick={() => history.push(items.bulls.route)}>
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
            <Input name="name" placeholder="NSML-0000" />
          </div>
          <div>
            <strong>DATA DE NASCIMENTO</strong>
            <MyDatePicker
              className="MySelectDatePicker"
              name="birthday"
              dateFormat="dd/MM/yyyy"
              locale="pt"
            />
          </div>
          <div>
            <strong>STATUS</strong>
            <StatusPicker
              className="InputValidation"
              name="situation"
              options={statusOptionsBulls}
            />
          </div>
        </Row>
      </Data>
    </Container>
  );
}
