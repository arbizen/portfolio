'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface PDFViewerProps {
  src: string;
  title?: string;
  className?: string;
}

export default function PDFViewer({ src, title = 'PDF Viewer', className = '' }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
        {/* <div className="flex gap-2">
          <Link
            className="flex gap-1 items-center text-blue-600 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors"
            href={src}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={14} /> Open in New Tab
          </Link>
          <Link
            className="flex gap-1 items-center text-green-600 font-medium text-sm bg-green-50 hover:bg-green-100 px-3 py-2 rounded-md transition-colors"
            href={src}
            target="_blank"
            download
          >
            <Download size={14} /> Download
          </Link>
        </div> */}
      </div>
      
      <div className="relative w-full h-[800px] sm:h-[600px] border border-gray-300 rounded overflow-hidden bg-gray-50">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 text-sm">Loading PDF...</p>
            </div>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                PDF Preview Not Available
              </h3>
              <p className="text-gray-600 mb-4">
                Your browser might not support PDF preview. Please download or open in a new tab to view the document.
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={16} /> Open in New Tab
                </Link>
                <Link
                  href={src}
                  download
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <Download size={16} /> Download PDF
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`${src}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            className="w-full h-full rounded"
            title={title}
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ border: 'none' }}
          />
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm mb-3">
          Having trouble viewing the PDF?
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            className="inline-flex gap-2 items-center text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors"
            href={src}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} /> 
            Open in New Tab
          </Link>
          <Link
            className="inline-flex gap-2 items-center text-green-600 font-medium bg-green-50 hover:bg-green-100 px-4 py-2 rounded-md transition-colors"
            href={src}
            target="_blank"
            download
          >
            <Download size={16} /> 
            Download Resume
          </Link>
        </div>
      </div>
    </div>
  );
} 