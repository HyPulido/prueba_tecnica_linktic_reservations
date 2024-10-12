import CIcon from "@coreui/icons-react";
import {
  cilFastfood,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react-pro";

const Nav = [
  {
    component: CNavItem,
    className: "mt-3",
    name: "Reservas",
    to: "/reservations",
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon text-dark" />,
  },
];

export default Nav;
