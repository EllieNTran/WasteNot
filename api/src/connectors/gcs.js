/**
 * Upload a file to GCS via your backend API
 * @param {string} fileUri - Local file URI (from image picker or camera)
 * @param {string} destinationBlobName - Name of the object in the GCS bucket
 */
export async function uploadObjectToBucket(fileUri, destinationBlobName) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: 'image/jpeg', // adjust based on your file type
      name: destinationBlobName,
    });

    const response = await fetch('YOUR_BACKEND_API_URL/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`File uploaded successfully: ${result.url}`);
    return result;
  } catch (error) {
    console.error(`Error uploading file: ${error.message}`);
    throw error;
  }
}

/**
 * Get download URL for an object in GCS
 * @param {string} objectName - The name of the object you want to retrieve
 */
export async function getObjectUrl(objectName) {
  try {
    const response = await fetch(`YOUR_BACKEND_API_URL/download/${objectName}`);
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
