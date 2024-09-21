import React, { useEffect, useState } from "react";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CSmartTable,
  CCard,
  CCardHeader,
  CCardBody,
  CTabContent,
  CTabPane,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CBadge,
  CForm,
  CCol,
  CFormInput,
  CModalFooter,
  CDatePicker,
  CFormSelect,
} from "@coreui/react-pro";

import * as MarketsmsService from "../../services/MarketsmsService";
import { Link } from "react-router-dom";
import { ProductsItems } from "../../models/Products";
import { BIcon } from "../../components/icons/BIcon";
import { customMessage, getBadgeProductStatus, showToastTR } from "../../Utils/BaseApp";
import { cilPencil, cilPlus } from "@coreui/icons";

interface ProductsProps { }

export const Products: React.FC<ProductsProps> = ({ }: ProductsProps) => {
  const [messages, setMessages] = useState<ProductsItems[] | null>(null);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [details, setDetails] = useState<ProductsItems>();
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const [editProduct, setEditProduct] = useState(false);


  const getProducts = async () => {
    var response = await MarketsmsService.getProducts();

    if (response) {
      if (response.status === 200) {
        setMessages(response.data.items);
      }
    }
  };

  const [formData, setFormData] = useState({
    upc_code: "",
    name: "",
    price: "",
    stock: 0,
    products_categories_id: 0,
    products_statuses_id: 0,
    products_units_measurement_id: 0
  });

  useEffect(() => {
    console.log("Entra aqui");
    if (details) {
      console.log("Entra aqui 2");

      setFormData({
        upc_code: details.upc_code,
        name: details.name,
        price: details.price,
        stock: details.stock,
        products_categories_id: details.products_categories_id,
        products_statuses_id: details.products_statuses_id,
        products_units_measurement_id: details.products_units_measurement_id
      });
    }
  }, [details]);

  // const showDetails = (message: ProductsItems) => {
  //   if (message) {
  //     setDetails(message);
  //     setVisibleDetails(true);
  //   }
  // };

  useEffect(() => {
    getProducts();
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    var { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setVisible(false);

      if (details) {

        setEditProduct(false);
        console.log("TODO::Aqui se debe llamar la api de editar");
        if (details?.id) {
          var response = await MarketsmsService.updateProduct(formData, details.id);

          if (response) {
            if (response?.status === 200) {
              showToastTR(customMessage(response.code_app), 200, "success");
            } else {
              showToastTR(customMessage(response.code_app), 2000, "error");
            }
          }
        } else {
          showToastTR("Selecciona un producto para actualizar", 2000, "error");
        }

      } else {
        console.log("TODO::Aqui se debe llamar la api de crear");
        var response = await MarketsmsService.createProduct(formData);

        if (response) {
          if (response?.status === 200) {
            showToastTR(customMessage(response.code_app), 200, "success");
          } else {
            showToastTR(customMessage(response.code_app), 2000, "error");
          }
        }
      }

      getProducts();

      // createAccount();
      setFormData({
        upc_code: "",
        name: "",
        price: "",
        stock: 0,
        products_categories_id: 0,
        products_statuses_id: 0,
        products_units_measurement_id: 0
      });
    }
    setValidated(true);
  };

  const columns = [
    {
      key: "id",
      _style: { width: "4%" },
    },
    {
      key: "upc_code",
      label: "upc",
      _style: { width: "6%" },
    },
    {
      key: "name",
      label: "Nombre",
      _style: { width: "7%" },
    },
    {
      key: "stock",
      label: "Stock",
      _style: { width: "10%" },
    },
    {
      key: "category_name",
      label: "Categoria",
      _style: { width: "5%" },
    },
    {
      key: "price",
      label: "Precio",
      _style: { width: "6%" },
    },
    {
      key: "unit_measurement_name",
      label: "Unidad de medida",
      _style: { width: "10%" },
    },
    {
      key: "product_status_name",
      label: "Estado",
      _style: { width: "7%" },
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
          <CButton onClick={() => setVisible(!visible)}>
            <CIcon icon={cilPlus} /> Agregar
          </CButton>

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
                loading={messages === null ? true : false}
                items={messages ?? []}
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
                  product_status_name: (product: ProductsItems) => {
                    return (<td className="py-2 text-center">
                      <CBadge color={getBadgeProductStatus(product.products_statuses_id)}>{product.product_status_name}</CBadge>
                    </td>)
                  },
                  operations: (product: ProductsItems) => {
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
                              setDetails(product);
                              setEditProduct(true);
                              setVisible(true);
                            }}
                          >
                            <CIcon icon={cilPencil} />
                            {/* <BIcon icon={"eye"} /> */}
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

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader closeButton>
          <CModalTitle id="LiveDemoExampleLabel">Agregar producto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={12}>
              <CFormInput
                value={formData.upc_code}
                type="text"
                name="upc_code"
                minLength={1}
                placeholder="Ejm. 123456789"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba un número de upc code valido."
                id="validationCustom02"
                label="Upc code *"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                value={formData.name}
                type="text"
                name="name"
                minLength={2}
                placeholder="Nombre del contacto"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba un nombre valido para el producto."
                id="validationCustom01"
                label="Nombre"
                onChange={handleChange}
              />
            </CCol>

            <CCol md={12}>
              <CFormInput
                value={formData.price}
                type="text"
                name="price"
                minLength={2}
                placeholder="20.500"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba un precio valido para la cuenta."
                id="validationCustom01"
                label="Precio"
                onChange={handleChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                value={formData.stock}
                type="text"
                name="stock"
                minLength={0}
                placeholder="0"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba una cantidad valida para el producto."
                id="validationCustom01"
                label="Stock"
                onChange={handleChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect size="sm" className="mb-0" aria-label="Small select example" name="products_categories_id" onChange={handleChange}>
                <option>Categoria</option>
                <option value="1">Carnes</option>
                <option value="2">Lacteos</option>
                <option value="3">Frutas</option>
              </CFormSelect>
            </CCol>


            <CCol md={12}>
              <CFormSelect size="sm" className="mb-0" aria-label="Small select example" name="products_statuses_id" onChange={handleChange}>
                <option>Estado</option>
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </CFormSelect>
            </CCol>

            <CCol md={12}>
              <CFormSelect size="sm" className="mb-0" aria-label="Small select example" name="products_units_measurement_id" onChange={handleChange}>
                <option>Unidad de medida</option>
                <option value="1">Unidad</option>
                <option value="2">Libra</option>
              </CFormSelect>
            </CCol>


            {/* 
      "category_id": 1,
      "stock": 12,
      "product_category_id": 1,
      "products_units_measurement_id":1 */}
            <CModalFooter className="pb-0">
              <CButton color="light" onClick={() => setVisible(false)}>
                Cerrar
              </CButton>
              <CButton color="primary" type="submit">
                {editProduct ? "Actualizar Contacto" : "Guardar Contacto"}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
};
