// import axios from "axios";
// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

// import { Button, Table } from "antd";
// import "../antdstyle.css";
// import { itemRender, onShowSizeChange } from "../paginationfunction";
// import { BaseUrl } from "./CommonUrl";
// import { ColorRing, LineWave } from "react-loader-spinner";
// //react pdf viwer

// import "../BBA_Documents/vendor.css";
// // react pdf viwer end
// import PDFViewer from "pdf-viewer-reactjs";

// const Test = () => {
//   const useParam = useParams();
//   let navigate = useNavigate();
//   const [DataLoader, setDataLoader] = useState(true);

//   const PreviousPage = async () => {
//     console.log(useParam.recordId);
//     navigate(`/ViewDocuments/${useParam.recordId}`);
//     // <Navigate to={`/ViewDocuments/${useParam.recordId}`}></Navigate>
//   };
//   useState(() => {
//     document.title = "DOCUMENTS VIEW";
//     setTimeout(() => {
//       setDataLoader(false);
//     }, 2000);
//   }, [useParam.name]);
//   //ghj
//   return (
//     <>
//       <Helmet>
//         <meta name="description" content="BBA STORE" />
//       </Helmet>
//       {/* Header */}
//       <div className="page-wrapper">
//         <div className="content container-fluid">
//           <div class="card-header1">
//             <div className="">
//               <h4
//                 className="text-center mx-auto mb-3 text-uppercase fddd"
//                 id="hddd"
//               >
//                 {useParam.name}
//               </h4>
//             </div>
//             {/* header  fgd*/}
//             <div className="d-flex justify-content-between align-items-center Page_header_title_search">
//               <div></div>

//               <div
//                 class="form-group has-search"
//                 style={{ marginBottom: "0px" }}
//               >
//                 <button
//                   onClick={() => navigate(-1)}
//                   class="Button_primary  float-right mt-4"
//                   data-dismiss="modal"
//                 >
//                   <span>Back</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Page Content */}

//           <div class="card-body1" style={{ padding: "6px 8px" }}>
//             {DataLoader && (
//               <>
//                 <div class="row">
//                   <div class="col-md-5"></div>
//                   <div class="col-md-2 mt-4">
//                     <ColorRing
//                       visible={true}
//                       height="80"
//                       width={100}
//                       ariaLabel="blocks-loading"
//                       wrapperStyle={{}}
//                       wrapperClass="blocks-wrapper"
//                       colors={[
//                         "#e15b64",
//                         "#f47e60",
//                         "#f8b26a",
//                         "#abbd81",
//                         "#849b87",
//                       ]}
//                     />
//                   </div>
//                   <div class="col-md-5"></div>
//                 </div>
//               </>
//             )}
//             {!DataLoader && (
//               <>
//                 <PDFViewer
//                   document={{
//                     url: "http://localhost:3000/59.pdf",
//                   }}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Test;
