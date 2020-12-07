import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FiPrinter } from 'react-icons/fi';

import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Header, Data, Pagination, DataEmpty } from './styles';

export default function Enrollment() {
  const [search, setSearch] = useState([]);
  const [records, setRecords] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRecords(1);
  }, []);

  function dateFormatted(date) {
    return format(parseISO(date), 'dd/MM/yyyy', {
      locale: pt,
    });
  }

  async function loadRecords(currentPage) {
    const { data } = await api.get('matings', {
      params: { search, page: currentPage },
    });

    const newData = data.content.map(mating => ({
      ...mating,
      matrix: mating.matrix.name,
      breederOne: mating.first_option.name,
      breederTwo: mating.second_option.name,
      date: dateFormatted(mating.date),
    }));

    setPage(currentPage);
    setLastPage(data.lastPage);
    setRecords(newData);
  }

  async function handleDelete({ id }) {
    if (window.confirm(`Tem certeza que deseja excluir o acasalamento?`))
      try {
        await api.put(`/matings/${id}`, { status: 'deleted', sync: false });
        // await api.delete(`/matings/${id}`);

        const newRecords = records.filter(record => record.id !== id);

        let newPage = newRecords.length ? page : page - 1;
        if (newPage === 0) {
          newPage = 1;
        }

        loadRecords(newPage);

        toast.success('Acasalamento excluido.');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  function handlePrevPage() {
    const currentPage = page - 1;
    loadRecords(currentPage);
  }

  function handleNextPage() {
    const currentPage = page + 1;
    loadRecords(currentPage);
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando acasalamentos</strong>
        <div>
          <button type="button" onClick={() => {}}>
            <FiPrinter color="#fff" size={16} />
            <span>IMPRIMIR</span>
          </button>
          <button type="button" onClick={() => history.push('/matings/add')}>
            <MdAdd color="#fff" size={16} />
            <span>CADASTRAR</span>
          </button>
        </div>
        <span>
          <MdSearch color="#999999" size={16} />
          <input
            name="search"
            placeholder="Buscar"
            onKeyDown={event => event.key === 'Enter' && loadRecords(1)}
            onChange={handleSearch}
          />
        </span>
      </Header>
      {records.length ? (
        <>
          <Data>
            <thead>
              <tr>
                <th>MATRIZ</th>
                <th>1º OPÇÃO</th>
                <th>2º OPÇÃO</th>
                <th>DATA</th>
                <th aria-label="Vazia" />
              </tr>
            </thead>
            <tbody>
              {records.map(mating => (
                <tr key={mating.id}>
                  <td>{mating.matrix}</td>
                  <td>{mating.breederOne}</td>
                  <td>{mating.breederTwo}</td>
                  <td>{mating.date}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => history.push(`/matings/${mating.id}`)}
                    >
                      editar
                    </button>
                    <button type="button" onClick={() => handleDelete(mating)}>
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Data>

          <Pagination>
            <button
              type="button"
              disabled={page === 1}
              onClick={handlePrevPage}
            >
              Anterior
            </button>
            <button type="button" disabled={lastPage} onClick={handleNextPage}>
              Próxima
            </button>
          </Pagination>
        </>
      ) : (
        <DataEmpty>
          <span>Nenhum registro encontrado</span>
        </DataEmpty>
      )}
    </Container>
  );
}
