import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";

import swal from "sweetalert";
import "../../../index.css";

import "../BBA_Documents/vendor.css";
import { BaseUrl } from "./CommonUrl";
import { LineWave } from "react-loader-spinner";

const DocumentList = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState("90");

  const [counter, setCounter] = useState(1);
  const [file, setFile] = useState([]);
  const [intialValue, setintialValue] = useState({
    id: "",
    name: "",
  });
  const useParam = useParams();
  const [filteredData, setfilteredData] = useState({});

  const [fileData, setfileData] = useState([]);
  useEffect(() => {
    document.title = "BBA DOCUMENT LIST";
    getDataapicall();
    getDocument();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const getDocument = () => {
    axios.get(`${BaseUrl}/documents/docslist`).then((res) => {
      setDataLoader(false);
      setfileData(res.data.data);
    });
  };

  //search vendor
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getDocument();
    } else {
      axios
        .get(`${BaseUrl}/documents/all_documents_searchh/${search}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);
          setdata("");
          setfileData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //data delete
  const DeleteIndividual = (id, filename) => {
    // setvendorDeleteId(id, filename);
    console.log(id);

    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/documents/delete/docs/${id}/${filename}`)
          .then((response) => {
            if (response.data.success) {
              getDocument();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Record is not delete!");
      }
    });
  };

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/docslist`).then((res) => {
      console.log(res.data.data);
      setdata(res.data.data);
      const filteredData = res.data.data.filter(
        (data) => data.record_id == useParam.id
      );
      console.log(filteredData);
      setfilteredData(filteredData[0]);
    });
  };
  const date = new Date().toLocaleTimeString();

  const columns = [
    {
      title: "Date",
      dataIndex: "DATENTIME",
    },
    {
      title: "Documents Type",
      dataIndex: "NAME",
    },

    {
      title: "Documents Name",
      dataIndex: "FILENAME",
    },
    {
      title: "Download",
      render: (text, rowKey) => (
        <>
          <Link to={`/docs/pdfView/${rowKey.FILENAME}/${rowKey.ID}`}>
            <span class="fa fa-download"></span>({" "}
            {rowKey.F_SIZE / 1024 > 1023
              ? (rowKey.F_SIZE / 1024 / 1024).toPrecision(3) + " mb"
              : Math.ceil(rowKey.F_SIZE / 1024) + " kb"}
            )
          </Link>
        </>
      ),
    },

    {
      title: "Action",
      render: (text, rowKey) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            DeleteIndividual(rowKey.ID, rowKey.FILENAME);
          }}
        >
          <i
            className="fa fa-trash-o m-r-5"
            style={{ fontSize: "26px", color: "red" }}
          />
        </a>
      ),
    },
  ];

  return (
    <>
      {console.log("render344")}
      <Helmet>
        <title>Dashboard - BBA DOCUMENT</title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="card-header1">
            <h4
              className="text-center mx-auto mb-3 text-uppercase fddd"
              id="hddd"
            >
              BBA DOCUMENT LIST({fileData.length})
            </h4>
            <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div
                class="form-group has-search"
                style={{ marginBottom: "0px" }}
              >
                <span class="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  class="form-control bba_documents-form-control"
                  value={searchdata}
                  name="searchStatus"
                  placeholder="Search"
                  onChange={(e) => SearchData(e)}
                />
              </div>
            </div>
          </div>
          <div class="card-body1">
            <div className="row">
              <div className="col-md-12">
                {DataLoader && (
                  <>
                    <LineWave
                      style={{ color: "red" }}
                      height="200"
                      width="600"
                      color="#4fa94d"
                      ariaLabel="line-wave"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      firstLineColor="red"
                      middleLineColor="yellow"
                      lastLineColor=""
                    />
                  </>
                )}
                {!DataLoader && (
                  <div className="table-responsive vendor_table_box">
                    <Table
                      className="table-striped"
                      pagination={{
                        total: fileData.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      // bordered
                      dataSource={fileData}
                      rowKey={(rowKey) => rowKey.id}
                      onChange={console.log("change")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DocumentList;
