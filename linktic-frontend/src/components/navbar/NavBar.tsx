import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CBadge,
  CNavGroup,
  CSidebarToggler,
  CCloseButton,
  CHeader,
  CContainer,
  CHeaderToggler,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CHeaderDivider,
} from '@coreui/react-pro';


import CIcon from '@coreui/icons-react';

import { cilApplicationsSettings, cilMenu, cilPuzzle, cilSpeedometer } from '@coreui/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'



// ... importaciones necesarias

const Navbars = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <CSidebar
        colorScheme="light"
        size="lg"
        overlaid
        placement="start"
        visible={sidebarVisible}
      >

        <CSidebarToggler onClick={toggleSidebar} />
      </CSidebar>

      <div className="wrapper d-flex flex-column">

        <CHeader position="sticky" className={`mb-4 ${sidebarVisible ? 'header-collapsed' : 'header-expanded'}`}>
          <div className="header-content">
            <CHeaderToggler className="ps-1" onClick={toggleSidebar}>
              <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
          </div>
        </CHeader>
      </div>
    </div>

  );
};

export default Navbars;

