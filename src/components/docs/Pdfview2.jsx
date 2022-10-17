import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";



import { Button, Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";

const Pdfview2 = () => {
    const useParam = useParams();
    let navigate = useNavigate();
    const PreviousPage = async () => {

        console.log(useParam.recordId);
        navigate(`/docs/list`);
        // <Navigate to={`/ViewDocuments/${useParam.recordId}`}></Navigate>
    }

    return (
        <>
            {console.log("render344")}
            <Helmet>
                <title>Dashboard - BBA DOCUMENTS</title>
                <meta name="description" content="BBA STORE" />
            </Helmet>
            {/* Header */}
            <div className="page-wrapper">
                <button onClick={PreviousPage} class="Button_Danger1  float-right" >

                    <span> Close</span>
                </button>
                {/* Page Content */}
                <div className="content container-fluid">


                    <div className="row">
                        <div className="col-md-12">

                            <iframe
                                src={`http://localhost:4123/uploadDoc/${useParam.name}`}
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
export default Pdfview2;