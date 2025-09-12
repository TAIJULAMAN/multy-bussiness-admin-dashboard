import PageHeading from "../../Components/Shared/PageHeading";
import { useLocation } from "react-router-dom";
import { getPDFUrl } from "../../config/envConfig";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Worker configuration with matching version
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.93/build/pdf.worker.min.js`;

export default function DocumentPage() {
  const location = useLocation();
  const { ndaData, pdfUrl } = location.state || {};
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Text extraction states
  const [pdfText, setPdfText] = useState("");
  const [textLoading, setTextLoading] = useState(false);
  const [textError, setTextError] = useState(null);

  // ✅ Construct proper PDF URL
  const pdfFileUrl = ndaData?.nda ? `${getPDFUrl()}/${ndaData.nda}` : null;

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.log("DocumentPage - NDA Data:", ndaData);
    console.log("DocumentPage - PDF URL:", pdfFileUrl);
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError(error.message);
    setLoading(false);
  };

  // ✅ Extract text from PDF
  useEffect(() => {
    if (!pdfFileUrl) return;

    const extractText = async () => {
      setTextLoading(true);
      setTextError(null);

      try {
        const loadingTask = pdfjs.getDocument({ url: pdfFileUrl }); // FIXED
        const pdf = await loadingTask.promise;

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str).join(" ");
          extractedText += strings + "\n\n";
        }

        setPdfText(extractedText);
      } catch (err) {
        console.error("Error extracting text:", err);
        setTextError("Could not extract text from this PDF document.");
      } finally {
        setTextLoading(false);
      }
    };

    extractText();
  }, [pdfFileUrl]);

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div className="p-5">
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center p-5">
          <PageHeading title={`${ndaData?.userName || "User"} NDA`} />
        </div>

        {/* Document Content */}
        <div className="p-8 space-y-6">
          {/* PDF Viewer */}
          {(pdfUrl && pdfUrl !== "N/A") || ndaData?.nda ? (
            <div className="w-full">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                NDA Agreement Document
              </h2>

              <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <div className="flex justify-center bg-gray-100 p-4">
                      {!error ? (
                        <Document
                          file={pdfFileUrl}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={onDocumentLoadError}
                        >
                          <Page
                            pageNumber={pageNumber}
                            width={Math.min(800, window.innerWidth - 100)}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                          />
                        </Document>
                      ) : (
                        <div className="w-full">
                          <iframe
                            src={pdfFileUrl}
                            width="100%"
                            height="600px"
                            className="border-0"
                            title="PDF Document"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No NDA document available</p>
              <p className="text-gray-400 text-sm mt-2">
                Please select an NDA from the table to view its document
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
