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

  
  const Navbars = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [headerExpanded, setHeaderExpanded] = useState(true);
  
    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
      setHeaderExpanded(!sidebarVisible); // Expandir/cerrar el header al abrir/cerrar el sidebar
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
          {/* Contenido del Sidebar */}

          <CSidebarBrand>Sidebar Brand</CSidebarBrand>
          <CSidebarNav>
            {/* Elementos de navegación del Sidebar */}
            {/* ... */}
            <CNavTitle>Nav Title</CNavTitle>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    Nav item
                </CNavItem>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    With badge
                    <CBadge color="primary ms-auto">NEW</CBadge>
                </CNavItem>
                <CNavGroup toggler="Nav dropdown">
                    <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
                    </CNavItem>
                    <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
                    </CNavItem>
                </CNavGroup>
          </CSidebarNav>
          <CSidebarToggler />
        </CSidebar>
  
        <div className={`flex-grow-1 ${headerExpanded ? 'header-expanded' : 'header-collapsed'}`}>
          {/* Header */}
          {/* ... */}
          <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
              <CHeaderToggler className="ps-1"  onClick={toggleSidebar}>
                <CIcon icon={cilMenu} size="lg" />
              </CHeaderToggler>
              <CHeaderBrand className="mx-auto d-md-none">
                {/* Logo u otros elementos del header */}
              </CHeaderBrand>
              <CHeaderNav className="d-none d-md-flex me-auto">
                {/* Elementos de navegación del Header */}
                <CHeaderNav className="d-none d-md-flex me-auto">
           <CNavItem>
             <CNavLink to="/dashboard" component={NavLink}>
               Dashboard
             </CNavLink>
           </CNavItem>
           <CNavItem>
             <CNavLink to="/login" component={NavLink}>
               Login
             </CNavLink>
           </CNavItem>
         </CHeaderNav>
              </CHeaderNav>
              <CHeaderToggler className="px-md-0 me-md-3">
                <CIcon icon={cilApplicationsSettings} size="lg" />
              </CHeaderToggler>
            </CContainer>
            <CHeaderDivider />
          </CHeader>
      
  
          {/* Contenido principal de la página */}
          {/* ... */}
        </div>
      </div>
    );
  };
  
  
  export default Navbars;
  