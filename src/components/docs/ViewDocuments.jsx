import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import swal from "sweetalert";

import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { useForm } from "react-hook-form";
import Dashboard from "../MainPage/Main/Dashboard";

const ViewDocuments = () => {
  const useParam = useParams();
  const [data, setdata] = useState([]);


  const [vendorDeleteId, setvendorDeleteId] = useState("");

  const [DataLoader, setDataLoader] = useState(true);
  const [filteredData, setfilteredData] = useState({})

  const [Alldata, setAlldata] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [searchdata, setsearchdata] = useState();
  const [progress, setProgress] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getDataapicall();
    getDocuments();
  }, [])


  const getDocuments = () => {
    axios.get(`http://localhost:4123/documents/filedata/${useParam.id}`).then((res) => {
      console.log(res.data.data);
      console.log("ruhul")

      console.log();
      setfileData(res.data.data);
    });
  }


  const getDataapicall = () => {
    axios.get('http://localhost:4123/documents/getdata').then((res) => {
      console.log(res.data.data);
      console.log("hghghgh")

      console.log();
      setdata(res.data.data);
      const filteredData = res.data.data.filter((data) => (
        data.ID == useParam.id
      ));
      console.log(filteredData);
      setfilteredData(filteredData[0]);

    });
  }

  const SearchData = (e) => {
    console.log(e.target.value)
    //e.preventDefault();
    // setsearchdata(e.target.value);
    const searchdata = e.target.value;
    if (searchdata == "") {
      getDocuments();
    } else {
      const serachbylowercase = searchdata.toLowerCase();
      axios
        .get(`http://localhost:4123/documents/searchd/${serachbylowercase}/${filteredData.NAME}`)
        .then((response) => {
          // console.log(response.data.data);
          // setdata("");
          setfileData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }



  const DeleteIndividual_vendor = (id, filename) => {
    setvendorDeleteId(id);
    console.log(id)
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {

        const abc = await axios
          .delete(`http://localhost:4123/documents/delete/docs/${id}/${filename}`)
          .then((response) => {
            if (response.data.success) {
              getDocuments();
            }
          })
          .catch((error) => {
            console.log("okd");
            console.log(error);
          });
      } else {
        swal("Record is not delete!");
      }
    });
  };
  // submit for store vendor  data info
  const onSubmit = (data) => {
    
    const date = new Date().toLocaleString();
    console.log(date);
    const formData = new FormData();
     formData.append("datentime", date);
    formData.append("idp", useParam.id);
    formData.append("id", useParam.document_id);
    console.log(data)
    if (data.add_more_file.length > 1) {
      for (let i = 0; i < data.add_more_file.length; i++) {
        formData.append("add_more_file", data.add_more_file[i]);
      }

    }
    else {
      formData.append("add_more_file", data.add_more_file[0]);
    }
    axios
      .post("http://localhost:4123/documents/add_moreFile", formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          setProgress(Math.round((100 * data.loaded) / data.total));
        }
      }
      ).then((response) => {
        if (response) {
          console.log(response.data.data);
          window.$("#exampleModal").modal("hide");
          getDocuments()
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <>
      {console.log("render344")}
      <Helmet>
        <title>Dashboard - BBA Documents</title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">

          <div className="">
            <h4
              className="text-center mx-auto mb-3 text-uppercase fddd"
              id="hddd"
            >
              BBA DOCUMENT LIST<br></br>
              Documents Type: {filteredData.NAME}
            </h4>
          </div>

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
            <div>
              <button type="button"
                class="Button_success"
                data-toggle="modal"
                data-target="#exampleModal"> <i className="fa fa-plus" /> Add More File</button>
            </div>
          </div>

          {/* add more file start */}
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
                    <i class="fa fa-plus"></i> Add More File
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
                            <span style={{ color: "red" }}>*</span>Documents
                          </label>
                          <div className="col-sm-8">

                            <input
                              type='file'
                              id='customFile'
                              {...register("add_more_file", {

                                required: true,
                              })}
                              multiple
                            />


                          </div>

                          <div class="progress">
                            <div
                              class="progress-bar progress-bar-striped bg-success"
                              role="progressbar"
                              style={{ width: `${progress}%` }}
                            >
                              {progress}%
                            </div>
                          </div>
                        </div>


                        <div className="SubmitFooter">
                          <button type="submitupdate" class="Button_success">
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

          {/* add more file end */}
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
                  <table class="table table-hover">
                    <tbody>
                      <tr>
                        <th>SN</th>
                        <th>Date</th>

                        <th>Document</th>
                        <th>Download</th>
                        <th>Action</th>

                      </tr>

                    </tbody>
                    <tbody>
                      {fileData.map((row, index) => (

                        <tr>
                          <td>{index + 1}</td>
                          <td>{row.DATENTIME}</td>
                          <td>{row.FILENAME}</td>
                          <td>

                            <Link to={`/pdfview/${row.FILENAME}/${row.ID}`}><span class="fa fa-download">

                            </span>( {((row.F_SIZE / 1024) > 1023) ?

                              (row.F_SIZE / 1024 / 1024).toPrecision(3) + " mb" :
                              Math.ceil(row.F_SIZE / 1024) + " kb"}

                              )

                            </Link>


                          </td>
                          <td className="">
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                DeleteIndividual_vendor(row.ID, row.FILENAME);
                              }}
                            >
                              <i className="fa fa-trash-o m-r-5" style={{ fontSize: "36px", color: "red" }} />
                            </a>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>


    </>
  )
}
export default ViewDocuments;