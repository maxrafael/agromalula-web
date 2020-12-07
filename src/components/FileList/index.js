import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import ModalImage from 'react-modal-image';
import { Container, FileInfo, Preview } from './styles';

export default function FileList({ files, onDelete }) {
  return (
    <>
      <Container>
        {files.map(uploadedFile => (
          <li key={uploadedFile.id}>
            <FileInfo>
              <Preview src={uploadedFile.preview}>
                <ModalImage
                  small={uploadedFile.preview}
                  large={uploadedFile.url}
                  hideDownload
                  hideZoom
                />
              </Preview>
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}{' '}
                  {!!uploadedFile.url && (
                    <button
                      type="button"
                      onClick={() => onDelete(uploadedFile.id)}
                    >
                      Excluir
                    </button>
                  )}
                </span>
              </div>
            </FileInfo>

            <div>
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: '#1A78AA' },
                  }}
                  strokeWidth={10}
                  value={uploadedFile.progress}
                />
              )}

              {uploadedFile.url && (
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </Container>
    </>
  );
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
