import { url } from "../config/envConfig";

export const imageUrl = (image) => {
  // Check if image is a string and then proceed with logic
  if (typeof image === 'string') {
    return image.startsWith('http')
      ? image
      : image.startsWith('/')
      ? `${url}${image}`
      : `${url}${image}`;
  } else {
    // Handle cases where image is not a string
    return `https://avatar.iran.liara.run/public/50`;
  }
};

