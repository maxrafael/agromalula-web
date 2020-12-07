import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';

export default function FileList({ files }) {
  console.tron.log(files);
  return (
    <>
      <Container>
        {files.map(uploadedFile => (
          <li key={uploadedFile.id}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}
                  {uploadedFile.url && (
                    <button type="button" onClick={() => {}}>
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
                    path: { stroke: '#4d85ee' },
                  }}
                  value={uploadedFile.progress}
                />
              )}

              {uploadedFile.url && (
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="222" />
                </a>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#A8CF45" />
              )}
              {uploadedFile.error && <MdError size={24} color="#ee4d64" />}
            </div>
          </li>
        ))}
      </Container>
    </>
  );
}
