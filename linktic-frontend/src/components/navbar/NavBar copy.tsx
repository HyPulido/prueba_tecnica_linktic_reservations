import React from 'react';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarNav,
  CNavLink,
  //   CToggler,
  CSidebarBrand,
  CNavbarToggler,
  CSidebar,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CBadge,
  CNavGroup,
  CSidebarToggler,
  CHeader,
  CHeaderToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderDivider,
  CSidebarHeader,
  CCloseButton,
} from '@coreui/react-pro';
import { Link, NavLink } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilApplicationsSettings, cilMenu, cilPuzzle, cilSpeedometer } from '@coreui/icons';
import logo from '../../assets/icons/logo.png';


const Navbarsa = () => {
  return (

    //     <div className="sidebar sidebar-show">
    //   <ul className="sidebar-nav">
    //     <li className="nav-title">Nav Title</li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="#">
    //         <i className="nav-icon cil-speedometer"></i> Nav item
    //       </a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="#">
    //         <i className="nav-icon cil-speedometer"></i> With badge
    //         <span className="badge bg-primary">NEW</span>
    //       </a>
    //     </li>
    //     <li className="nav-item nav-group">
    //       <a className="nav-link nav-group-toggle" href="#">
    //         <i className="nav-icon cil-puzzle"></i> Nav dropdown
    //       </a>
    //       <ul className="nav-group-items">
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">
    //             <i className="nav-icon cil-puzzle"></i> Nav dropdown item
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">
    //             <i className="nav-icon cil-puzzle"></i> Nav dropdown item
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li className="nav-item mt-auto">
    //       <a className="nav-link nav-link-success" href="https://coreui.io">
    //         <i className="nav-icon cil-cloud-download"></i> Download CoreUI</a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link nav-link-danger" href="https://coreui.io/pro/">
    //         <i className="nav-icon cil-layers"></i> Try CoreUI
    //         <strong>PRO</strong>
    //       </a>
    //     </li>
    //   </ul>
    //   <button className="sidebar-toggler" type="button"></button>
    // </div>



    // <div>

    //     <CSidebar colorScheme='light' className='sidebar sidebar-fixed'>
    //         <CSidebarBrand>Sidebar Brand</CSidebarBrand>
    //         <CSidebarNav>
    //         <CNavTitle>Nav Title</CNavTitle>
    //         <CNavItem href="#">
    //             <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
    //             Nav item
    //         </CNavItem>
    //         <CNavItem href="#">
    //             <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
    //             With badge
    //             <CBadge color="primary ms-auto">NEW</CBadge>
    //         </CNavItem>
    //         <CNavGroup toggler="Nav dropdown">
    //             <CNavItem href="#">
    //             <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
    //             </CNavItem>
    //             <CNavItem href="#">
    //             <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
    //             </CNavItem>
    //         </CNavGroup>
    //         </CSidebarNav>
    //         <CSidebarToggler />
    //     </CSidebar> 


    // <div className="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent">

    // <CHeader position="sticky" className="mb-4">
    //       <CContainer fluid>
    //         <CHeaderToggler
    //           className="ps-1"
    //         //   onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
    //         >
    //           <CIcon icon={cilMenu} size="lg" />
    //         </CHeaderToggler>
    //         <CHeaderBrand className="mx-auto d-md-none">
    //           <CIcon icon={logo} height={48}  />
    //         </CHeaderBrand>
    //         <CHeaderNav className="d-none d-md-flex me-auto">
    //           <CNavItem>
    //             <CNavLink to="/dashboard" component={NavLink}>
    //               Dashboard
    //             </CNavLink>
    //           </CNavItem>
    //           <CNavItem>
    //             <CNavLink to="/login" component={NavLink}>
    //               Login
    //             </CNavLink>
    //           </CNavItem>
    //         </CHeaderNav>
    //         <CHeaderToggler
    //           className="px-md-0 me-md-3"
    //         //   onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
    //         >
    //           <CIcon icon={cilApplicationsSettings} size="lg" />
    //         </CHeaderToggler>
    //       </CContainer>
    //       <CHeaderDivider />
    //       {/* <CContainer fluid>
    //         <AppBreadcrumb />
    //       </CContainer> */}
    //     </CHeader>
    // </div>
    // </div>

    <div>

      <CSidebar
        colorScheme="light"
        size="lg"
        overlaid
        placement="end"
        visible={true}

      >

        <CSidebarBrand>Sidebar Brand</CSidebarBrand>
        <CSidebarNav>
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
        <CSidebarHeader className="bg-transparent">
          <CCloseButton
            className="float-end"

          />

          <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
              <CHeaderToggler
                className="ps-1"
              >
                <CIcon icon={cilMenu} size="lg" />
              </CHeaderToggler>
              <CHeaderBrand className="mx-auto d-md-none">
                <CIcon icon={logo} height={48} />
              </CHeaderBrand>
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
              <CHeaderToggler
                className="px-md-0 me-md-3"
              >
                <CIcon icon={cilApplicationsSettings} size="lg" />
              </CHeaderToggler>
            </CContainer>
            <CHeaderDivider />
          </CHeader>
        </CSidebarHeader>
      </CSidebar>



    </div>


  );
};

export { Navbarsa };
