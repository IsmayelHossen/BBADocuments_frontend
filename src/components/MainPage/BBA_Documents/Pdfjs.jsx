import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import "../BBA_Documents/pdf.css";
const Pdfjs = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: "http://localhost:3000/59.pdf",
    page,
    canvasRef,
  });

  return (
    <div>
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
              class="btn  btn-sm opacity-50"
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
              class="btn  btn-sm opacity-50"
            >
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          )}
        </div>
        {/* Main viewer */}
        {!pdfDocument && <span>Loading...</span>}
        <p class="text-center pt-2">
          {" "}
          Page {page} of {pdfDocument?.numPages}
        </p>
        <canvas ref={canvasRef} class="canvasclass" />
      </div>
    </div>
  );
};
export default Pdfjs;
