import React, { useState } from 'react';
import { DownloadIcon } from './Icons';

// Declare global variables from CDN scripts
declare const html2canvas: any;
declare const jspdf: any;

interface DownloadPdfButtonProps {
  rootElementId: string;
  fileName: string;
  toggleButtonId: string;
}

const DOWNLOAD_BUTTON_ID = 'download-pdf-button';

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({ rootElementId, fileName, toggleButtonId }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const elementToCapture = document.getElementById(rootElementId);
    if (!elementToCapture) {
      console.error('Element to capture not found!');
      return;
    }

    setIsGenerating(true);

    // Temporarily hide buttons to prevent them from appearing in the PDF
    const downloadButton = document.getElementById(DOWNLOAD_BUTTON_ID);
    const toggleButton = document.getElementById(toggleButtonId);
    if (downloadButton) downloadButton.style.display = 'none';
    if (toggleButton) toggleButton.style.display = 'none';

    try {
      const canvas = await html2canvas(elementToCapture, {
        scale: 2, // Higher scale for better quality and sharpness
        useCORS: true, // Important for external images like the avatar
        logging: false,
        width: elementToCapture.scrollWidth,
        height: elementToCapture.scrollHeight,
        windowWidth: elementToCapture.scrollWidth,
        windowHeight: elementToCapture.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Use the exact canvas dimensions for the PDF page to ensure a perfect 1:1 copy
      const pdf = new jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore buttons' visibility
      if (downloadButton) downloadButton.style.display = 'flex';
      if (toggleButton) toggleButton.style.display = 'flex';
      setIsGenerating(false);
    }
  };

  return (
    <button
      id={DOWNLOAD_BUTTON_ID}
      onClick={handleDownload}
      disabled={isGenerating}
      className="fixed bottom-6 right-24 bg-brand-teal text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-200 z-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Descargar PDF"
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="hidden sm:inline">Generando...</span>
        </>
      ) : (
        <>
          <DownloadIcon className="w-6 h-6" />
          <span className="hidden sm:inline">Descargar PDF</span>
        </>
      )}
    </button>
  );
};

export default DownloadPdfButton;