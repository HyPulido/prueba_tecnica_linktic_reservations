import CIcon from "@coreui/icons-react";
import {
  cibWhatsapp,
  cilCode,
  cilContact,
  cilFastfood,
  cilList,
  cilMonitor,
  cilSpeedometer,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react-pro";
import { BIcon } from "../components/icons/BIcon";
import { parseClassName } from "react-toastify/dist/utils";

const Nav = [
  {
    component: CNavItem,
    className: "mt-3",
    name: "Productos",
    to: "/products",
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon text-dark" />,
  },
    {
    component: CNavItem,
    name: "Pedidos",
    to: "/orders",
    icon: <CIcon icon={cilList} customClassName="nav-icon text-dark" />,
  },
  // {
  //   component: CNavTitle,
  //   name: "SERVICIOS",
  // },
  // {
  //   component: CNavGroup,
  //   name: "Mensajes",
  //   icon: <BIcon icon={'chat-dots'} className="text-warning" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Enviar",
  //       to: "/messages/send",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Logs",
  //       to: "/messages/logs",
  //     },
  //   ],
  // },
];

export default Nav;
