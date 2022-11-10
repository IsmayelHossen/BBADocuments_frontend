import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
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
  const useParam = useParams();
  const [filteredData, setfilteredData] = useState({});

  const [fileData, setfileData] = useState([]);
  const [categoryData, setcategoryData] = useState("");
  const [FilterSearch, setFilterSearch] = useState("");
  useEffect(() => {
    document.title = "BBA DOCUMENT LIST";
    getDataapicall();
    getDocument();
    getCategory();
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

  //search and filter

  const handleOnchangeforlast_id = async (e) => {
    const filter = e.target.value;
    console.log(filter);
    if (filter != "") {
      setFilterSearch(e.target.value);
      axios
        .get(`${BaseUrl}/documents/all_documents_filter/${filter}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);
          setdata("");
          setfileData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getDocument();
    }
  };
  //get last stage filter data
  const lastStageFilterDataBack = (filterSearch) => {
    axios
      .get(`${BaseUrl}/documents/all_documents_filter/${filterSearch}`)
      .then((response) => {
        console.log(response.data);
        // console.log(response.data.data);
        setdata("");
        setfileData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const SearchData = (e) => {
    //first of all  filter check
    if (FilterSearch == "") {
      swal("Please Filter data select first", "", "warning");
    } else {
      const search = e.target.value;
      setsearchdata(e.target.value);
      console.log(search);
      if (FilterSearch == "" && search == "") {
        getDocument();
      } else if (search == "") {
        lastStageFilterDataBack(FilterSearch);
      } else {
        axios
          .get(
            `${BaseUrl}/documents/all_documents_search/${search}/${FilterSearch}`
          )
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

  const getCategory = () => {
    axios.get(`${BaseUrl}/documents/category/view`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setcategoryData(res.data.data);
    });
  };
  const date = new Date().toLocaleTimeString();

  const columns = [
    {
      title: "Entry Date",
      dataIndex: "DATENTIME",
    },
    {
      title: "Held on the date",
      dataIndex: "MEETING_DATE",
    },
    {
      title: "Documents Type",
      dataIndex: "NAME",
    },
    {
      title: "Document Id",
      dataIndex: "MEETING_ID",
    },

    {
      title: "File Name",
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
  ];

  return (
    <>
      {console.log("render344")}
      <Helmet>
        <title>Dashboard - BBA ARCHIVE</title>
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
              BBA ARCHIVE LIST
            </h4>
            <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div class="row ">
                <div class="col-md-7">
                  <div className="mb-2 row">
                    <label for="inputtext" class="col-sm-2 col-form-label">
                      {" "}
                      Filter
                    </label>
                    <div className="col-sm-10">
                      <select
                        class="form-select form-control bba_documents-form-control"
                        {...register("document_type", {
                          onChange: (e) => {
                            handleOnchangeforlast_id(e);
                          },
                          required: true,
                        })}
                      >
                        <option value="">Select Type</option>
                        {categoryData.length > 0 && (
                          <>
                            {categoryData.map((row, index) => (
                              <option value={row.CATEGORY_NAME}>
                                {row.CATEGORY_NAME}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
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
                      placeholder="Search by Id,filename,held date"
                      onChange={(e) => SearchData(e)}
                    />
                  </div>
                </div>
              </div>

              <div class="ml-4">
                <button class="Button_success">
                  Total File:({fileData.length})
                </button>
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
                      width="800"
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
