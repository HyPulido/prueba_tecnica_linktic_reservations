import React, { useRef, useState } from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react-pro';
import { createRoot } from 'react-dom/client';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

interface ConfirmDialogProps {
  header: string;
  message: string;
  onConfirm?: () => void;
  onReject?: () => void;
  onClose: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ header, message, onConfirm, onReject, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  const accept = () => {
    setVisible(false)
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const reject = () => {
    setVisible(false)
    if (onReject) {
      onReject();
    }
    onClose();
  };

  return (
    <CModal visible={visible} onClose={onClose} ref={modalRef} size='sm'>
      <CModalHeader closeButton className='fw-bold'>{header}</CModalHeader>
      <CModalBody className='text-center pt-0'>
        <CIcon icon={cilTrash} className='text-danger text-center' size='xxl' />
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border mt-3">
          {message}
        </div>
      </CModalBody>
      <CModalFooter className='pt-0'>
        <CButton color='dark' variant='outline' onClick={reject}>
          No
        </CButton>
        <CButton color="danger" className="text-light" onClick={accept}>
          Si
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

interface ConfirmDialogOptions {
  header: string;
  message: string;
  onConfirm?: () => void;
  onReject?: () => void;
}

const confirmDialog
 = ({ header, message, onConfirm, onReject }: ConfirmDialogOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const handleClose = () => {
      reject();
    };

    const handleConfirm = () => {
      resolve();
    };

    const root = createRoot(div)

    root.render(
      <ConfirmDialog
        header={header}
        message={message}
        onConfirm={() => {
          onConfirm?.();
          handleConfirm();
        }}
        onReject={() => {
          onReject?.();
          handleClose();
        }}
        onClose={handleClose}
      />
    );
  });
};

export default confirmDialog;