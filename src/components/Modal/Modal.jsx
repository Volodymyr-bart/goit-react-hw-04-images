import PropTypes from 'prop-types';
import { Modal } from '@mui/material';
import { Overlay, ModalImg, ModalBox } from './Modal.styled';

export const ModalWindow = ({ onHandleClose, url, tags }) => {
  return (
    <Modal open={true} onClose={onHandleClose}>
      <Overlay onClick={onHandleClose}>
        <ModalBox>
          <ModalImg src={url} alt={tags} />
        </ModalBox>
      </Overlay>
    </Modal>
  );
};

ModalWindow.propTypes = {
  onHandleClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
