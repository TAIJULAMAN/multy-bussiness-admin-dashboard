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
          {/* User Info */}
          {ndaData && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                NDA Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {ndaData.userName}
                </div>
                <div>
                  <strong>Email:</strong> {ndaData.email}
                </div>
                <div>
                  <strong>Role:</strong> {ndaData.userRole}
                </div>
                <div>
                  <strong>Date:</strong> {ndaData.date}
                </div>
                <div>
                  <strong>Contact:</strong> {ndaData.contactNumber}
                </div>
                <div>
                  <strong>Passport:</strong> {ndaData.passportNumber}
                </div>
              </div>
            </div>
          )}

          {/* PDF Viewer */}
          {(pdfUrl && pdfUrl !== "N/A") || ndaData?.nda ? (
            <div className="w-full">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                NDA Agreement Document
              </h2>

              <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    {numPages && (
                      <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 text-sm"
                          >
                            ← Previous
                          </button>
                          <span className="text-sm text-gray-600">
                            Page {pageNumber} of {numPages}
                          </span>
                          <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 text-sm"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    )}

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
                          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                            <h4 className="font-medium text-red-900 mb-2">
                              PDF Loading Failed
                            </h4>
                            <p className="text-sm text-red-700 mb-4">
                              The PDF viewer couldn't load the document. Try the
                              options below:
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <a
                                href={pdfFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                              >
                                📄 Open in New Tab
                              </a>
                              <a
                                href={pdfFileUrl}
                                download
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                              >
                                📥 Download PDF
                              </a>
                            </div>
                          </div>
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

              {/* Extracted Text */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  📄 Extracted Text Content
                </h3>

                {textLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">
                      Extracting text from PDF...
                    </span>
                  </div>
                )}

                {textError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">⚠️ {textError}</p>
                  </div>
                )}

                {!textLoading && !textError && pdfText && (
                  <div className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {pdfText}
                    </pre>
                  </div>
                )}

                {!textLoading && !textError && !pdfText && (
                  <p className="text-gray-500 text-sm italic">
                    No text content extracted yet.
                  </p>
                )}
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
