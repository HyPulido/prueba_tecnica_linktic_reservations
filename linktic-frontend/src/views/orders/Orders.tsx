import React, { useEffect, useState } from "react";
import {
  CButton,
  CSmartTable,
  CCard,
  CCardHeader,
  CCardBody,
  CTabContent,
  CTabPane,
  CBadge,
} from "@coreui/react-pro";

import * as MarketsmsService from "../../services/MarketsmsService";
import { Link } from "react-router-dom";
// import { OrdersItems } from "../../models/Orders";
import { BIcon } from "../../components/icons/BIcon";
import { getBadgeOrderStatus } from "../../Utils/BaseApp";
import { OrdersItems } from "../../models/Orders";

interface OrdersProps { }

export const Orders: React.FC<OrdersProps> = ({ }: OrdersProps) => {
  const [orders, setOrders] = useState<OrdersItems[] | null>(null);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [details, setDetails] = useState<OrdersItems>();

  const getOrders = async () => {
    var response = await MarketsmsService.getOrders();

    if (response) {
      if (response.status === 200) {
        setOrders(response.data.items);
      }
    }
  };

  const showDetails = (message: OrdersItems) => {
    if (message) {
      setDetails(message);
      setVisibleDetails(true);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      key: "id",
      _style: { width: "4%" },
    },
    {
      key: "price",
      label: "Precio",
      _style: { width: "6%" },
    },
    {
      key: "address",
      label: "Dirección",
      _style: { width: "20%" },
    },
    {
      key: "order_status_name",
      label: "Estado",
      _style: { width: "10%" },
    },
    {
      key: "delivery_type_name",
      label: "Tipo de entrega",
      _style: { width: "5%" },
    },
    {
      key: "number_products",
      label: "N° Productos",
      _style: { width: "5%" },
    },
    {
      key: "created_at",
      label: "Fecha",
      _style: { width: "12%" },
    },
    {
      key: "operations",
      label: "Acción",
      _style: { width: "8%" },
    },
  ];

  return (
    <div className="col-12">
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Productos</strong>
        </CCardHeader>
        <CCardBody>
          <CTabContent className="rounded-bottom">
            <CTabPane
              className="p-3 active preview show"
              role="tabpanel"
              id="preview-578"
            >
              <CSmartTable
                activePage={2}
                cleaner
                clickableRows
                columns={columns}
                columnFilter
                columnSorter
                // footer
                loading={orders === null ? true : false}
                items={orders ?? []}
                itemsPerPageSelect
                itemsPerPage={50}
                pagination
                onFilteredItemsChange={(items) => {
                  // console.log(items)
                }}
                onSelectedItemsChange={(items) => {
                  // console.log(items)
                }}
                scopedColumns={{
                  address: (order: OrdersItems) => {
                    return (<td className="py-2 text-center">
                      {order.delivery_types_id == 1 ? "Reclama en tienda" : order.address}
                    </td>
                    )
                  },
                  order_status_name: (order: OrdersItems) => {
                    return (<td className="py-2 text-center">
                      <CBadge color={getBadgeOrderStatus(order.orders_statuses_id)}>{order.order_status_name}</CBadge>
                    </td>
                    )
                  },
                  number_products: (order: OrdersItems) => {
                    var total_products = 0;
                    order.products.forEach(element => {
                      total_products = total_products + element.quantity;

                    });
                    return (<td className="py-2 text-center">
                      {total_products}
                      {/* <CBadge color={getBadgeOrderStatus(order.orders_statuses_id)}>{order.order_status_name}</CBadge> */}
                    </td>
                    )
                  },
                  operations: (message: OrdersItems) => {
                    return (
                      <td className="py-2 text-center">
                        <Link to={"#"}>
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            className="m-1"
                            size="sm"
                            title="Ver más"
                            onClick={() => {
                              showDetails(message);
                            }}
                          >
                            <BIcon icon={"eye"} />
                          </CButton>
                        </Link>
                      </td>
                    );
                  },
                }}
                // selectable
                sorterValue={{ column: "status", state: "asc" }}
                tableFilter
                tableProps={{
                  className: "add-this-class",
                  responsive: true,
                  striped: true,
                  hover: true,
                }}
                tableBodyProps={{
                  className: "align-middle",
                }}
              />
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>

    </div>
  );
};
