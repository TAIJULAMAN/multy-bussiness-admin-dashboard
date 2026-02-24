// Function to get the base API URL
// export const url = "http://10.10.20.57:8001/api/v1/";
// export const pdfUrl = "http://10.10.20.57:8001";
// export const imageUrl = "http://10.10.20.57:8001/uploads";

export const url = "https://p2zltbm7-8000.inc1.devtunnels.ms/api/v1/";
export const pdfUrl = "https://p2zltbm7-8000.inc1.devtunnels.ms";
export const imageUrl = "https://p2zltbm7-8000.inc1.devtunnels.ms//uploads";

export const getBaseUrl = () => {
  return url;
};

export const getImageBaseUrl = () => {
  return imageUrl;
};

export const getPDFUrl = () => {
  return pdfUrl;
};

export const getImageUrl = (imagePath) => {
  if (imagePath.includes("https")) {
    return imagePath;
  }
  return `${imageUrl}${imagePath}`;
};
