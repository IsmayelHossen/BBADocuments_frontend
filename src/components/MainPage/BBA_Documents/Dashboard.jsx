/**
 * Signin Firebase
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "../../../index.css";
import { BaseUrl } from "./CommonUrl";

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const Dashboard = ({ alldata9 }) => {
  console.log(alldata9);
  const [Alldata, setdata] = useState([]);
  const [fileData, setfileData] = useState([]);
  useEffect(() => {
    getDataapicall();
    getDocument();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdata`).then((res) => {
      setdata(res.data.data);
    });
  };

  const getDocument = () => {
    axios.get(`${BaseUrl}/documents/docslist`).then((res) => {
      setfileData(res.data.data);
    });
  };
  return (
    <>
      <Helmet>
        <title>Dashboard - BBA Documents</title>
        <meta name="description" content="BBA DOCUMENTS" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title text-start">BBA Archive Dashboard</h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <Link to={`/docs/list`}>
                    <span className="dash-widget-icon">
                      <i className="fa fa-cubes" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>{fileData.length}</h3>
                      <span>Total Files</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon">
                    <i className="fa fa-usd" />
                  </span>
                  <div className="dash-widget-info">
                    <h3>44</h3>
                    <span>Personal</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <Link to={"/docs/cat"}>
                    <span className="dash-widget-icon">
                      <i className="fa fa-diamond" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>37</h3>
                      <span>BBA</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <Link to={"/docs/add"}>
                    <span className="dash-widget-icon">
                      <i className="fa fa-user" />
                    </span>
                    <div className="dash-widget-info">
                      <h3>{Alldata.length}</h3>
                      <span>Total Docuemnts Category </span>
                      {Alldata != null &&
                        Alldata.map((row, index) => (
                          <>
                            {/* <ul style={{listStyleType:'none'}}>
                        <li style={{display:"inline-block"}}>{row.name}</li>
                      </ul> */}
                          </>
                        ))}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default Dashboard;
