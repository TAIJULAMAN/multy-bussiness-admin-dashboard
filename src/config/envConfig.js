// Function to get the base API URL
export const url = "http://10.10.20.57:8001/api/v1/";
export const imageUrl = "http://10.10.20.57:8001/uploads";

export const getBaseUrl = () => {
  return url;
};

export const getImageBaseUrl = () => {
  return imageUrl;
};

export const getImageUrl = (imagePath) => {
  if (imagePath.includes("http")) {
    return imagePath;
  }
  return `${imageUrl}${imagePath}`;
};
