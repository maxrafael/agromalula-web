import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdFolderOpen } from 'react-icons/md';

import { toast } from 'react-toastify';

import { parseISO, differenceInMonths } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Header, Data, DataEmpty, Pagination } from './styles';

export default function Matrix() {
  const [search, setSearch] = useState([]);
  const [records, setRecords] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRecords(1);
  }, []);

  function dateFormatted(date) {
    return differenceInMonths(new Date(), parseISO(date));
  }

  async function loadRecords(currentPage) {
    try {
      const { data } = await api.get('bulls', {
        params: { search, page: currentPage },
      });

      const newData = data.content.rows.map(bull => ({
        ...bull,
        birthday: `${dateFormatted(bull.birthday)} ${
          dateFormatted(bull.birthday) > 1 ? 'Meses' : 'Mês'
        }`,
      }));

      setPage(currentPage);
      setLastPage(data.lastPage);
      setRecords(newData);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function handleDeleteRecord({ id }) {
    if (window.confirm(`Tem certeza que deseja excluir o touro?`))
      try {
        await api.put(`/bulls/${id}`, { status: 'deleted', sync: false });

        const newRecords = records.filter(bull => bull.id !== id);

        let newPage = newRecords.length ? page : page - 1;
        if (newPage === 0) {
          newPage = 1;
        }

        loadRecords(newPage);

        toast.success('Touro excluido.');
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

  return (
    <Container>
      <Header>
        <strong>Gerenciando touros</strong>
        <button type="button" onClick={() => history.push('/bulls/add')}>
          <MdAdd color="#fff" size={16} />
          <span>CADASTRAR</span>
        </button>
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
                <th>NOME</th>
                <th>IDADE</th>
                <th>PREÇO</th>
                <th>STATUS</th>
                <th>OBSERVAÇÕES</th>
                <th>FOTOS</th>
                <th aria-label="Vazia" />
              </tr>
            </thead>
            <tbody>
              {records.map(bull => (
                <tr key={bull.id}>
                  <td>{bull.name}</td>
                  <td>{bull.birthday}</td>
                  <td>R$ 8.000,00</td>
                  <td>{bull.status}</td>
                  <td>Touro ronconlho com andrologico negativo</td>
                  <td>
                    <button
                      type="button"
                      bullID={bull.id}
                      onClick={() => history.push(`/files/${bull.id}`)}
                    >
                      <MdFolderOpen color="#999" size={20} />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => history.push(`/bulls/${bull.id}`)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(bull)}
                    >
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
