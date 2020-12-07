/* eslint-disable radix */
/* eslint-disable react/sort-comp */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

import { MdKeyboardArrowLeft } from 'react-icons/md';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import { items } from '~/components/Header/menu';

import history from '~/services/history';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import Upload from '~/components/Upload';
import FileList from '~/components/FileList';

class File extends Component {
  state = {
    uploadedFiles: [],
  };

  async componentDidMount() {
    const response = await api.get(`files/2`);

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file.id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      })),
    });
  }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
  };

  processUpload = uploadedFile => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('files/2', data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url,
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async id => {
    await api.delete(`files/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { uploadedFiles } = this.state;
    return (
      <Container>
        <Header>
          <strong>Imagens do touro: </strong>
          <div>
            <button
              type="button"
              onClick={() => history.push(items.bulls.route)}
            >
              <MdKeyboardArrowLeft color="#fff" size={16} />
              <span>VOLTAR</span>
            </button>
          </div>
        </Header>
        <Data>
          <Content>
            <Upload onUpload={this.handleUpload} />
            {!!uploadedFiles.length && (
              <FileList files={uploadedFiles} onDelete={this.handleDelete} />
            )}
          </Content>
        </Data>
      </Container>
    );
  }
}

export default File;
