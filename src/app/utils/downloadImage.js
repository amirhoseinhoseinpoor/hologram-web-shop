export const downloadImage = (imageUrl, filename) => {
    if (!imageUrl) {
      console.error('No image URL provided for download.');
      return;
    }
  
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
  
    // Append the link to the body to make it clickable
    document.body.appendChild(link);
    link.click();
  
    // Remove the link from the document
    document.body.removeChild(link);
  };