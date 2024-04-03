export const generatePdf = (base64Data, fileName)=> {
    if (base64Data) {
      try {
        const binaryString = atob(base64Data);
        const binaryArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          binaryArray[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([binaryArray], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
  
        // Cleanup
        document.body.removeChild(downloadLink);
  
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error while handling download:", error);
      }
    }
  };
  export const getFileNameFromResponse = (response) => {
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition && contentDisposition.indexOf('filename') !== -1) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
            return matches[1].replace(/['"]/g, '');
        }
    }
  };