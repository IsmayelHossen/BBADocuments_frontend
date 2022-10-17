/**
 * Vendor Add Information component
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../../index.css";
import "../BBA_Documents/vendor.css";
import { Link } from "react-router-dom";

import ViewDocuments from "./ViewDocuments";
import { BaseUrl } from "./CommonUrl";
// import Dashboard from "../MainPage/Main/Dashboard";

const Create_Document = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [file, setFile] = useState([]);
  const [intialValue, setintialValue] = useState({
    id: "",
    name: "",
  });
  const [fileData, setfileData] = useState([]);
  const [progress, setProgress] = useState("");
  const [progressShow, setprogressShow] = useState(false);
  useEffect(() => {
    document.title = "Documents Add form";

    getDataapicall();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdata`).then((res) => {
      console.log(res.data.data);
      console.log("hghghgh");

      console.log();
      setdata(res.data.data);
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    reset: reset1,
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  // submit for store vendor  data info
  const onSubmit = (data) => {
    setprogressShow(true);
    const date = new Date().toLocaleString();
    console.log(date);
    const formData = new FormData();
    formData.append("datentime", date);
    formData.append("id", data.id);
    formData.append("name", data.name);
    console.log(data);
    if (data.documents.length > 1) {
      for (let i = 0; i < data.documents.length; i++) {
        formData.append("documents", data.documents[i]);
      }
    } else {
      formData.append("documents", data.documents[0]);
    }
    axios
      .post(`${BaseUrl}/documents/process_post`, formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response) {
          console.log(response.data.data);
          window.$("#exampleModal").modal("hide");
          getDataapicall();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditIndividual = (id) => {
    console.log(Alldata);
    //set update id
    setUpdateId(id);

    const result = Alldata.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };

  const onSubmitUpdate = async (data) => {
    if (data.document_id == "") {
      data.document_id = UpdateDataFound.DOCUMENT_ID;
    }
    if (data.name == "") {
      data.name = UpdateDataFound.NAME;
    }
    if (data.id == "") {
      data.id = UpdateDataFound.ID;
    }

    console.log(data);

    const updateResult = await axios
      .put(`${BaseUrl}/documents/update/${data.id}`, data)
      .then((response) => {
        if (response.data.success) {
          getDataapicall();
          swal({
            title: "Updated Successfully!",
            icon: "success",
            button: "Ok!",
          });
          reset1();
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(data);
      });

    // console.log(UpdateDataFound);
  };

  //data delete
  const DeleteIndividual_vendor = (id) => {
    setvendorDeleteId(id);

    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/documents/delete/${id}`)
          .then((response) => {
            if (response.data.success) {
              getDataapicall();
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

  //search vendor
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getDataapicall();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/documents/search/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);
          setdata("");
          setdata(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "Time",
      dataIndex: "DATENTIME",
    },

    {
      title: "Documents Type",
      dataIndex: "NAME",
    },

    {
      title: "Documents ID",
      dataIndex: "DOCUMENT_ID",
    },
    {
      title: "Documents Details",

      render: (text, record) => (
        <>
          <Link
            className="btn btn-success"
            to={`/viewDocuments/${record.ID}/${record.DOCUMENT_ID}`}
          >
            <span class="fa fa-eye"></span>
          </Link>
        </>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <div className="">
            <a
              className="btn btn-primary"
              href="#"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                EditIndividual(record.ID);
              }}
            >
              <i
                className="fa fa-pencil"
                style={{ fontSize: "24px", color: "white" }}
              />
            </a>
            &nbsp; &nbsp; &nbsp;
            <a
              className="btn btn-danger"
              href="#"
              onClick={() => {
                DeleteIndividual_vendor(record.ID);
              }}
            >
              <i
                className="fa fa-trash-o"
                style={{ fontSize: "24px", color: "white" }}
              />
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {console.log("render344")}
      <Helmet>
        <title>Dashboard - BBA Document </title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  Welcome To Documents Management
                </h4>
              </div>
              {/* header */}
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    value={searchdata}
                    name="searchStatus"
                    placeholder="Search"
                    onChange={(e) => SearchData(e)}
                  />
                </div>
                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Document</span>
                </button>
              </div>
            </div>
            <div class="card-body1">
              {/* /Page Header */}
              <div
                class="modal custom-modal fade "
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                {/* ADD DOCUMENT START */}

                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                        <i class="fa fa-plus"></i> Add Document
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}

                        <div class="col-md-12">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Document
                                Id
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control Vendor-form-control"
                                  placeholder="Id"
                                  {...register("id", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Documents
                                Type
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control Vendor-form-control"
                                  id="validationDefault03"
                                  placeholder=" Name"
                                  {...register("name", {
                                    // onChange: (e) => {handleOnchange(e)},
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Documents
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="file"
                                  id="customFile"
                                  {...register("documents", {
                                    required: true,
                                  })}
                                  multiple
                                />
                              </div>
                              {progressShow && (
                                <>
                                  <div class="progress mb-2">
                                    <div
                                      class="progress-bar progress-bar-striped bg-success"
                                      role="progressbar"
                                      style={{ width: `${progress}%` }}
                                    >
                                      {progress}%
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="SubmitFooter">
                              <button
                                type="submitupdate"
                                class="Button_success"
                              >
                                <span>Add</span>
                              </button>
                              <button
                                type="button"
                                class="Button_Danger1"
                                data-dismiss="modal"
                              >
                                <span> Close</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*ADD DOCUMENT END*/}

              {/* table start */}
              <div className="row">
                <div className="col-md-12">
                  {!DataLoader && (
                    <>
                      {/* DataLoader */}
                      <p className="text-center mt-5">
                        {" "}
                        <i
                          class="fa fa-spinner fa-spin fa-3x fa-fw"
                          style={{ color: "green", fontSiz: "20px" }}
                        ></i>
                        <span class="sr-only">Loading...</span>
                      </p>
                    </>
                  )}
                  {DataLoader && (
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: Alldata.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={Alldata}
                        rowKey={(record) => record.id}
                        onChange={console.log("chnage")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{ fontWeight: "600", color: "#5265ac" }}
                      >
                        <i className="fa fa-pencil m-r-5" /> Update Document
                        {/*UpdateDataFound.id*/}
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    {/* handleSubmit1(onSubmit1) */}
                    {/* vendor update form */}
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}
                        <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                          <div className="mb-2 row" style={{ display: "none" }}>
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control Vendor-form-control"
                                placeholder="Id"
                                defaultValue={UpdateDataFound.ID}
                                {...register1("id")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> document
                              id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control Vendor-form-control"
                                placeholder="Id"
                                defaultValue={UpdateDataFound.DOCUMENT_ID}
                                {...register1("document_id")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row ">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Documents
                              Type
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control Vendor-form-control"
                                placeholder=" Id"
                                id="validationDefault07"
                                defaultValue={UpdateDataFound.NAME}
                                {...register1("name")}
                              />
                            </div>
                          </div>

                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Update</span>
                            </button>
                            <button
                              type="button"
                              class="Button_Danger1"
                              data-dismiss="modal"
                            >
                              <span> Close</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default Create_Document;
