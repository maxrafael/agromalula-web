import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import { items } from '~/components/Header/menu';

import history from '~/services/history';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import Upload from '~/components/Upload';
import FileList from '~/components/FileList';

export default function File() {
  const { id: bull } = useParams();

  const [uploadedFiles, setUploadedFiles] = useState({
    images: [],
  });

  useEffect(() => {
    // uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    loadRecords();
  }, []);

  async function loadRecords() {
    const response = await api.get(`files/${bull}`);

    const newData = response.data.map(file => ({
      id: file.id,
      name: file.name,
      readableSize: filesize(file.size),
      preview: file.url,
      uploaded: true,
      url: file.url,
    }));

    setUploadedFiles({ images: newData });
  }

  function updateFile(id, type, data) {
    setUploadedFiles(prevState => {
      const newValue = prevState[type].map(value => {
        return id === value.id ? { ...value, ...data } : value;
      });

      return {
        ...prevState,
        [type]: newValue,
      };
    });
  }

  function processUpload(upFile, type) {
    const data = new FormData();

    data.append('file', upFile.file, upFile.name);

    api
      .post(`files/${bull}`, data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total), 10);

          updateFile(upFile.id, type, {
            progress,
          });
        },
      })
      .then(response => {
        updateFile(upFile.id, type, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url,
          type,
        });
      })
      .catch(() => {
        updateFile(upFile.id, type, {
          error: true,
        });
      });
  }

  function handleUpload(files, type) {
    const uploaded = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      type,
    }));
    console.tron.log(uploaded);
    setUploadedFiles(prevState => {
      return {
        ...prevState,
        [type]: uploadedFiles[type].concat(uploaded),
      };
    });
    uploaded.forEach(e => processUpload(e, type));
  }

  async function handleDelete(id, type) {
    await api.delete(`files/${id}`);

    setUploadedFiles(prevState => {
      const removeValue = prevState[type].filter(value => id !== value.id);
      return {
        ...prevState,
        [type]: removeValue,
      };
    });
  }

  return (
    <Container>
      <Header>
        <strong>Imagens do touro: </strong>
        <div>
          <button type="button" onClick={() => history.push(items.bulls.route)}>
            <MdKeyboardArrowLeft color="#fff" size={16} />
            <span>VOLTAR</span>
          </button>
        </div>
      </Header>
      <Data>
        <Content>
          <Upload onUpload={e => handleUpload(e, 'images')} />
          {!!uploadedFiles.images.length && (
            <FileList
              files={uploadedFiles.images}
              onDelete={e => handleDelete(e, 'images')}
            />
          )}
        </Content>
      </Data>
    </Container>
  );
}
