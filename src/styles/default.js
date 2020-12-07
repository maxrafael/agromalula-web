import { darken } from 'polished';

const button = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  border: '0',
  fontWeight: 'bold',
  color: '#fff',
  fontSize: '16px',
  transition: 'background 0.2s',
};

const actionButton = {
  ...button,
  background: '#1A78AA',

  '&:hover': {
    background: darken(0.03, '#1A78AA'),
  },
};

const cancelButton = {
  ...button,
  background: '#cccccc',

  '&:hover': {
    background: darken(0.03, '#cccccc'),
  },
};

const printButton = {
  ...button,
  background: '#A8CF45',

  '&:hover': {
    background: darken(0.03, '#A8CF45'),
  },
};

export { actionButton, cancelButton, printButton };
