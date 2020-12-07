import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import { toast } from 'react-toastify';

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

  async function loadRecords(currentPage) {
    try {
      const { data } = await api.get('breeders', {
        params: { search, page: currentPage },
      });

      const newData = data.content.rows.map(breeder => ({
        ...breeder,
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
    if (window.confirm(`Tem certeza que deseja excluir o reprodutor?`))
      try {
        await api.put(`/breeders/${id}`, { status: 'deleted', sync: false });

        const newRecords = records.filter(breeder => breeder.id !== id);

        let newPage = newRecords.length ? page : page - 1;
        if (newPage === 0) {
          newPage = 1;
        }

        loadRecords(newPage);

        toast.success('Reprodutor excluido.');
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
        <strong>Gerenciando reprodutores</strong>
        <button type="button" onClick={() => history.push('/breeders/add')}>
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
                <th>DOSES</th>
                <th aria-label="Vazia" />
              </tr>
            </thead>
            <tbody>
              {records.map(breeder => (
                <tr key={breeder.id}>
                  <td>{breeder.name}</td>
                  <td>{breeder.dose}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => history.push(`/breeders/${breeder.id}`)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(breeder)}
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
