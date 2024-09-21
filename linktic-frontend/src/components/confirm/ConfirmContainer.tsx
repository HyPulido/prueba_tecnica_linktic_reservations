import React from 'react';
import { selectConfirm } from "../../redux/selectors";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { hideConfirm, noConfirm, yesConfirm } from '../../redux/features/confirmSlice';

const ConfirmContainer: React.FC = () => {
  const { show, message } = useAppSelector(selectConfirm);
  const dispatch = useAppDispatch();

  return <>
    {show && (
      <CModal visible={show}
        onClose={() => { dispatch(hideConfirm()) }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirmación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{message}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { dispatch(noConfirm()) }}>
            No
          </CButton>
          <CButton color="danger" onClick={() => { dispatch(yesConfirm()) }}>
            Sí
          </CButton>
        </CModalFooter>
      </CModal>
    )}
  </>
};

export default ConfirmContainer;

