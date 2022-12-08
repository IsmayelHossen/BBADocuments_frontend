import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import "../BBA_Documents/pdf.css";
import { BaseUrl } from "./CommonUrl";
const PdfView = () => {
  const useParam = useParams();
  let navigate = useNavigate();
  const [DataLoader, setDataLoader] = useState(true);
  const [pdfzoom, setpdfzoom] = useState(1);
  const PreviousPage = async () => {
    console.log(useParam.recordId);
    navigate(`/ViewDocuments/${useParam.recordId}`);
    // <Navigate to={`/ViewDocuments/${useParam.recordId}`}></Navigate>
  };
  useState(() => {
    document.title = "DOCUMENTS VIEW";
    setTimeout(() => {
      setDataLoader(false);
    });
  }, [useParam.name]);

  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const PdfZoomIn = () => {
    if (pdfzoom <= 2) {
      setpdfzoom((previous) => previous + 0.1);
    }
  };
  const PdfZoomOut = () => {
    if (pdfzoom >= 0.8) {
      setpdfzoom((previous) => previous - 0.1);
    }
  };

  const { pdfDocument, pdfPage } = usePdf({
    // file: `${BaseUrl}/uploadDoc/${useParam.name}`,
    file: "http://localhost:3000/72.pdf",
    page,
    canvasRef,
    scale: pdfzoom,
  });

  return (
    <>
      <Helmet>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="card-header1">
            <div className="">
              <h4
                className="text-center mx-auto mb-3 text-uppercase fddd"
                id="hddd"
              >
                {useParam.name}
              </h4>
            </div>
            {/* header  fgd*/}
            <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div></div>

              <div
                class="form-group has-search"
                style={{ marginBottom: "0px" }}
              >
                <button
                  onClick={() => navigate(-1)}
                  class="Button_primary  float-right mt-4"
                  data-dismiss="modal"
                >
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}

          <div class="card-body1" style={{ padding: "6px 8px" }}>
            <div class="d-flex justify-content-between">
              <div>
                <p class="text-center pt-2 pl-4">
                  {" "}
                  Page {page} of {pdfDocument?.numPages}
                </p>
              </div>
              <div>
                <a
                  href={`${BaseUrl}/uploadDoc/${useParam.name}`}
                  // href="http://localhost:3000/72.pdf"
                  class="btn btn-primary btn-sm mr-2"
                  onClick={PdfZoomIn}
                  download
                >
                 <i class="fa fa-download" aria-hidden="true"></i>

                </a>
                <button class="btn btn-success btn-sm" onClick={PdfZoomIn}>
                  Zoom <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button class="btn btn-danger btn-sm ml-2" onClick={PdfZoomOut}>
                  Zoom <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            {!DataLoader && (
              <>
                {/* <iframe
                      src={`${BaseUrl}/uploadDoc/${useParam.name}`}
                      width="97%"
                      height="500%"
                      style={{ margin: "0 auto" }}
                    >
                      {" "}
                    </iframe> */}
                {Boolean(pdfDocument && pdfDocument.numPages) && (
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${(page / pdfDocument?.numPages) * 100}%`,
                      }}
                    >
                      {Math.ceil((page / pdfDocument?.numPages) * 100)}%
                    </div>
                  </div>
                )}

                <div
                  class="ebookMain_div"
                  style={{
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      left: 0,
                      position: "absolute",
                      top: "50%",
                      transform: "translate(24px, -50%)",
                      zIndex: 1,
                    }}
                  >
                    {/* Button to go to the previous page */}
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        class="btn  btn-success btn-sm opacity-100"
                      >
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translate(-24px, -50%)",
                      zIndex: 1,
                    }}
                  >
                    {/* Button to go to the next page */}
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                      <button
                        disabled={page === pdfDocument.numPages}
                        onClick={() => setPage(page + 1)}
                        class="btn  btn-success btn-sm "
                      >
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
                  {/* Main viewer */}
                  {!pdfDocument && (
                    <div class="row">
                      <div class="col-md-5"></div>
                      <div class="col-md-2 mt-4">
                        <ColorRing
                          visible={true}
                          height="80"
                          width={100}
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      </div>
                      <div class="col-md-5"></div>
                    </div>
                  )}

                  <canvas ref={canvasRef} class="canvasclass" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default PdfView;
