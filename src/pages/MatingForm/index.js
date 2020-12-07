/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { parseISO } from 'date-fns';

import { items } from '~/components/Header/menu';

import MyDatePicker from '~/components/MyDatePicker';
import api from '~/services/api';

import 'react-datepicker/dist/react-datepicker.css';

import history from '~/services/history';

import { Container, Header, Data, Row, MyAsyncPicker } from './styles';

const schema = Yup.object().shape({
  matrix: Yup.mixed().required('* campo obrigatório'),
  first_option: Yup.mixed().required('* campo obrigatório'),
  second_option: Yup.mixed().required('* campo obrigatório'),
  date: Yup.date()
    .typeError('* deve informar uma data')
    .required('* campo obrigatório'),
});

export default function MatingForm() {
  const [record, setRecord] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadRecord() {
      const fetchRecordPromise = fetchMating();
      const matingData = (await fetchRecordPromise).data;

      console.tron.log(matingData);

      setRecord({
        ...matingData,
        date: parseISO(matingData.date),
      });

      console.tron.log(matingData);
    }

    if (!newRecord()) {
      loadRecord();
    }
  }, []);

  function fetchMating() {
    return api.get('matings', {
      params: { id },
    });
  }

  function fetchMatrix() {
    return api.get('matrices', { params: { status: 'ativa' } });
  }

  function fetchBreeder() {
    return api.get('breeders', { params: { dose: 0 } });
  }

  function newRecord() {
    return !id;
  }

  async function handleSubmit(data) {
    data = fixHttpData(data);

    try {
      if (!id) {
        await api.post('matings', data);

        toast.success('Acasalamento cadastrado.');
      } else {
        await api.put(`matings/${record.id}`, data);

        toast.success('Acasalamento atualizado.');
      }

      history.push(items.matings.route);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function fixHttpData(data) {
    data = {
      ...data,
      matrix_id: data.matrix.id,
      first_option_id: data.first_option.id,
      second_option_id: data.second_option.id,
      sync: false,
    };

    delete data.matrix;
    delete data.first_option;
    delete data.second_option;

    return data;
  }

  const filterOptions = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadMatrixOptions = async inputValue => {
    async function loadMatrix() {
      const { data } = await fetchMatrix();
      return data;
    }
    const data = await loadMatrix();

    return new Promise(resolve => {
      resolve(filterOptions(data, inputValue));
    });
  };

  const loadBreederOptions = async inputValue => {
    async function loadBreeder() {
      const { data } = await fetchBreeder();
      return data;
    }
    const data = await loadBreeder();

    return new Promise(resolve => {
      resolve(filterOptions(data, inputValue));
    });
  };

  return (
    <Container>
      <Header>
        <strong>
          {newRecord() ? 'Cadastro de acasalamento' : 'Edição de acasalamento'}
        </strong>
        <div>
          <button type="button" onClick={() => history.push('/matings')}>
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
        initialData={record}
        onSubmit={handleSubmit}
      >
        <div>
          <strong>MATRIZ</strong>
          <MyAsyncPicker
            className="InputValidation"
            name="matrix"
            loadOptions={loadMatrixOptions}
          />
        </div>
        <Row>
          <div>
            <strong>1º OPÇÃO</strong>
            <MyAsyncPicker
              className="InputValidation"
              name="first_option"
              loadOptions={loadBreederOptions}
            />
          </div>
          <div>
            <strong>2º OPÇÃO</strong>
            <MyAsyncPicker
              className="InputValidation"
              name="second_option"
              loadOptions={loadBreederOptions}
            />
          </div>
          <div>
            <strong>DATA</strong>
            <MyDatePicker
              className="MySelectDatePicker"
              name="date"
              dateFormat="dd/MM/yyyy"
              locale="pt"
            />
          </div>
        </Row>
      </Data>
    </Container>
  );
}
