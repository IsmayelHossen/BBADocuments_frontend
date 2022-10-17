import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";



import { Button, Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import { BaseUrl } from "./CommonUrl";

const PdfView = () => {
    const useParam = useParams();
    let navigate = useNavigate();
const PreviousPage=async()=>{
    
    console.log(useParam.recordId);
    navigate(`/ViewDocuments/${useParam.recordId}`);
   // <Navigate to={`/ViewDocuments/${useParam.recordId}`}></Navigate>
}

    return (
        <>
            <Helmet>
                <title>Dashboard - BBA DOCUMENTS</title>
                <meta name="description" content="BBA STORE" />
            </Helmet>
            {/* Header */}
            <div className="page-wrapper">
            <div class="card-header1">
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  {useParam.name}
                </h4>
              </div>
              {/* header */}
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div></div>
                  
              
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <button  onClick={()=>navigate(-1)} class="Button_Danger1  float-right mt-4" data-dismiss="modal">
                    
                    <span>Back</span>
                    </button>
                </div>
                
              </div>
            </div>
               
                    {/* Page Content */}
                    <div className="content container-fluid">


                        <div className="row">
                            <div className="col-md-12">

                                <iframe
                                    src={`${BaseUrl}/uploadDoc/${useParam.name}`}
                                    width="100%"
                                    height="500%"

                                >
                                    {" "}
                                </iframe>


                            </div>
                        </div>

                    </div>
            </div>

        </>
    )
}
export default PdfView;