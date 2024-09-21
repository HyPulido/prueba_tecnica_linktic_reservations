import React from 'react';
import { selectLoad } from "../../redux/selectors";
import { CSpinner } from '@coreui/react-pro';
import { useAppSelector } from '../../hooks/hooks';
import logo from "../../assets/icons/logo.png";

interface LoadingProps {
  message: string | null;
}

const LoadingContainer: React.FC<LoadingProps> = ({ message }) => {
  const { loading } = useAppSelector(selectLoad);

  const showModal = () => {
    document.body.classList.add('modal-open');
  };

  const hideModal = () => {
    document.body.classList.remove('modal-open');
  };


  if (loading) {
    showModal()
  } else {
    hideModal()
  }

  return <>
    {/* {loading && (
      <div className="modal-container">
        <div className="loading-container d-flex justify-content-center text-center shadow-lg">
          <CSpinner color="bg-brang-primary" />
        </div>
      </div>
    )} */}
    {loading && (
      <div className="modal-container">
        <div className="loading-container d-flex justify-content-center text-center shadow-lg">
          <div className="spinner-with-image">
            <CSpinner color="success" className='p-4 m-0' />
            <img src={logo} alt="Loading" className="spinner-image" width={24} />
          </div>
        </div>
      </div>
    )}

  </>
};

export default LoadingContainer;

