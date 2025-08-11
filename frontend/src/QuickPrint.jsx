import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
// import "./pdf-worker.js";
// import { pdfjs } from "pdfjs-dist";
// z
// const handleFileChange = async (e) => {
//   const file = e.target.files[0];
//   if (file && file.type === "application/pdf") {
//     const fileReader = new FileReader();
//     fileReader.onload = async function () {
//       const typedArray = new Uint8Array(this.result);
//       const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
//       setPageCount(pdf.numPages); // your state update
//     };
//     fileReader.readAsArrayBuffer(file);
//   }
// };


export default function QuickPrintPage() {
  const [printType, setPrintType] = useState("Color");
  const [paperSize, setPaperSize] = useState("A4");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const fileInputRef = useRef(null);

  const pricePerPage = printType === "Color" ? 5 : 2;
  const total = pageCount * pricePerPage;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type === "application/pdf") {
        await extractPdfPageCount(selectedFile);
      } else {
        setPageCount(quantity); // non-PDF fallback
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (droppedFile.type === "application/pdf") {
        await extractPdfPageCount(droppedFile);
      } else {
        setPageCount(quantity);
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeFile = () => {
    setFile(null);
    setPageCount(1);
  };

  const extractPdfPageCount = async (pdfFile) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      setPageCount(pdf.numPages);
    };
    reader.readAsArrayBuffer(pdfFile);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
            Choose Specifications
          </h2>

          {/* File Upload */}
          <div
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`mb-8 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              file
                ? "border-green-400 bg-green-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            {file ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-red-500 hover:text-red-600 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 font-medium">Drag & Drop your file here</p>
                <p className="text-gray-400 text-sm">or click to upload</p>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />
          </div>

          {/* Print Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Print Type
              </label>
              <select
                value={printType}
                onChange={(e) => setPrintType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Color</option>
                <option>Black & White</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Paper Size
              </label>
              <select
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>A4</option>
                <option>A3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column — Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:sticky md:top-6 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
            Order Summary
          </h2>
          <ul className="divide-y divide-gray-200 mb-6">
            <li className="flex justify-between py-3">
              <span className="text-gray-600">File:</span>
              <span className="font-medium">
                {file ? file.name : "No file uploaded"}
              </span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-600">Pages:</span>
              <span className="font-medium">{pageCount}</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-600">Print Type:</span>
              <span className="font-medium">{printType}</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-600">Paper Size:</span>
              <span className="font-medium">{paperSize}</span>
            </li>
            <li className="flex justify-between py-3 font-semibold text-lg">
              <span>Total:</span>
              <span>₹{total}</span>
            </li>
          </ul>
          <button
            disabled={!file}
            className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
              file
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}


