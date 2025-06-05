import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Gallery = ({ images, startIndex = 0 }) => {
  if (!images?.length) return null;

  const galleryItems = images.map(img => ({
    original: img.original,
    thumbnail: img.thumb,
  }));

  return (
    <div>
      <ImageGallery
        items={galleryItems}
        startIndex={startIndex}
        showPlayButton={false}
        showFullscreenButton={true}
        showIndex={true}
        showBullets={true}
      />
    </div>
  );
};

export default Gallery;