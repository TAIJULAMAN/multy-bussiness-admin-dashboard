import React from 'react';
import { imageUrl } from '../server.js';
import { Image } from 'antd';

const UsernameImage = ({ name, email, image }) => {
  return (
    <div className="start-center gap-3 rounde">
      {image && (
        <Image
          preview={true}
          src={imageUrl(image)}
          className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
          alt={name}
        />
      )}
      <div>{name && <p className="text-base">{name}</p>}</div>
    </div>
  );
};

export default UsernameImage;
