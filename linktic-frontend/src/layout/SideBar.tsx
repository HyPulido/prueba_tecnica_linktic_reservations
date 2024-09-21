import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFooter,
  CHeader,
  CImage,
  CProgress,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import {
  CContainer,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
} from "@coreui/react-pro";
import {
  cilAccountLogout,
  cilBasket,
  cilBell,
  cilChart,
  cilCreditCard,
  cilMenu,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
  cilUserUnfollow,
} from "@coreui/icons";
// import logo from "../assets/icons/logo.svg";
import logo from "../assets/icons/logo.png";
import logoFull from "../assets/icons/logo-full.svg";
import { Link, NavLink } from "react-router-dom";
import "../scss/SideBar.scss";
import AppSidebarNav from "./AppSidebarNav";
import navigation from "./Nav";
import avatar from "../assets/avatar.png";
import { BIcon } from "../components/icons/BIcon";
import { getUser, isAdmin, isUserLogin, userLogout } from "../Utils/Auth";
import { UsersItems } from "../models/Users";
import { env } from "../Utils/Environment";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toggler } from "../redux/selectors";
import { startupSnapshot } from "v8";
import { setUnfoldable } from "../redux/features/togglerSlice";
// import { startUnfoldable } from "../redux/features/togglerSlice";

interface SideBarProps {
  children: ReactNode; // Definición de children como ReactNode
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<UsersItems>()


  useEffect(() => {
    const current = getUser()
    if (current) {
      setCurrentUser(current)
    }
  }, [])


  if (!isAdmin()) {
    delete navigation[7]
  }

  if (!isUserLogin()) {
    sessionStorage.setItem('redirect_path', window.location.pathname);
    userLogout()
  }

  const logout = () => {
    userLogout()
  };

  // Sidebar
  const [sidebarShow, setSidebarShow] = useState(true);
  // const [unfoldable, setUnfoldable] = useState(false);
  


  const dispatch=useAppDispatch();
  const { unfoldable } = useAppSelector(toggler)

  const headerRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  const toggleHeader = () => {
    setSidebarShow(!sidebarShow);
    if (unfoldable) {
      dispatch(setUnfoldable({unfoldable: !unfoldable}));
      // setUnfoldable(!unfoldable);
      if (headerRef.current) {
        headerRef.current.classList.remove("ctm-header");
      }
    }
  };

  const toggleSidebar = () => {
    // setUnfoldable(!unfoldable);
    dispatch(setUnfoldable({unfoldable: !unfoldable}));

    if (!unfoldable) {
      if (headerRef.current) {
        headerRef.current.classList.add("ctm-header");
      }
    } else {
      if (headerRef.current) {
        headerRef.current.classList.remove("ctm-header");
      }
    }
  };

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        colorScheme="light"
        // size="md"
        placement="start"
        visible={sidebarShow}
      >
        <CSidebarBrand className="d-none d-md-flex">
          <CImage className="sidebar-brand-full" src={logoFull} height={60} />
          <CImage className="sidebar-brand-narrow" src={logo} height={35} />
        </CSidebarBrand>
        <CSidebarNav className="content">
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler className="d-none d-lg-flex" onClick={toggleSidebar} />
      </CSidebar>
      <div
        className="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent"
        ref={headerRef}
      >
        <CHeader position="sticky" className="mb-1 p-0">
          <CContainer fluid>
            <CHeaderToggler className="ps-1" onClick={toggleHeader}>
              <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
            <CHeaderBrand className="mx-auto d-md-none">
              <CIcon icon={logo} height={48} />
            </CHeaderBrand>
            {/* <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav> */}

            {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}


            {/* Notifications Menus */}
            {/* <CHeaderNav className="d-sm-flex ms-auto">
              <CDropdown variant="nav-item">
                <CDropdownToggle className="" caret={false}>
                  <CNavLink href="#">
                    <span className="d-inline-block mx-2 position-relative">
                      <CIcon icon={cilBell} size="lg" />
                      <CBadge
                        className="border border-light p-1"
                        color="danger"
                        position="top-end"
                        shape="rounded-circle"
                      >
                        <span className="visually-hidden">New alerts</span>
                      </CBadge>
                    </span>
                  </CNavLink>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0">
                  <CDropdownHeader className="bg-light fw-semibold py-2">You have 5 notifications</CDropdownHeader>
                  <CDropdownItem href="#">
                    <CIcon icon={cilUserFollow} className="me-2 text-success" />
                    New user registered
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilUserUnfollow} className="me-2 text-danger" />
                    User deleted
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilChart} className="me-2 text-info" />
                    Sales report is ready
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilBasket} className="me-2 text-success" />
                    New client
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilSpeedometer} className="me-2 text-warning" />
                    Server overloaded
                  </CDropdownItem>
                  <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10">
                    <strong>Server</strong>
                  </CDropdownHeader>
                  <CDropdownItem>
                    <div className="text-uppercase mb-1">
                      <small>CPU Usage</small>
                    </div>
                    <CProgress color="info" value={25}>
                    </CProgress>
                    <small className="text-medium-emphasis">348 Processes. 1/4 Cores.</small>
                  </CDropdownItem>
                  <CDropdownItem>
                    <div className="text-uppercase mb-1">
                      <small>Memory Usage</small>
                    </div>
                    <CProgress color="warning" value={70}>

                    </CProgress>
                    <small className="text-medium-emphasis">11444GB/16384MB</small>
                  </CDropdownItem>
                  <CDropdownItem>
                    <div className="text-uppercase mb-1">
                      <small>SSD 1 Usage</small>
                    </div>
                    <CProgress color="danger" value={95}>

                    </CProgress>
                    <small className="text-medium-emphasis">243GB/256GB</small>
                  </CDropdownItem> 
                </CDropdownMenu>
              </CDropdown>

            </CHeaderNav> */}


            <CHeaderNav className="ms-3">
              {/* Perfil */}
              <CDropdown variant="nav-item">
                <CDropdownToggle className="py-0" caret={false}>
                  <CAvatar src={(currentUser?.profile_image_url !== null && currentUser?.profile_image_url != "") ? currentUser?.profile_image_url : avatar} size="md" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0">
                  <CNavLink
                    onClick={logout}
                    component={NavLink}
                    className="p-0"
                  >
                    <CDropdownItem>
                      <CIcon
                        icon={cilAccountLogout}
                        className="me-2 text-danger"
                      />
                      Cerrar sesión
                    </CDropdownItem>
                  </CNavLink>




                  {/* <CDropdownItem href="/home">
                    <CIcon icon={cilEnvelopeOpen} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilTask} className="me-2" />
                    Tasks
                    <CBadge color="danger" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilCommentSquare} className="me-2" />
                    Comments
                    <CBadge color="warning" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
                  <CDropdownItem href="#">
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilSettings} className="me-2" />
                    Settings
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilCreditCard} className="me-2" />
                    Payments
                    <CBadge color="secondary" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilFile} className="me-2" />
                    Projects
                    <CBadge color="primary" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Lock Account
                  </CDropdownItem> */}
                </CDropdownMenu>
              </CDropdown>
            </CHeaderNav>
          </CContainer>
          {/* <CHeaderDivider /> */}
          {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>  */}
        </CHeader>

        <div className="body flex-grow-1 px-1">{children}</div>

        <CFooter>
          <div>
            <Link
              to={env('PUBLIC_URL')}
              target="_blank"
              rel="noopener noreferrer"
            >
              MarketSms
            </Link>

            <span className="ms-1">
              &copy; {year} Todos los derechos reservados.
            </span>
          </div>
          <div className="ms-auto">
            <span className="me-1">Hecho por</span>
            <Link
              to={env('PUBLIC_URL')}
              target="_blank"
              rel="noopener noreferrer"
            >
              MarketSms
            </Link>
          </div>
        </CFooter>
      </div>
    </>
  );
};

export default SideBar;
