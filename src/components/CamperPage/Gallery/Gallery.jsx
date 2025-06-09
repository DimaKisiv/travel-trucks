import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ images, startIndex = 0, camperName = "camper" }) => {
  if (!images?.length) return null;

  const galleryItems = images.map((img, idx) => ({
    original: img.original,
    thumbnail: img.thumb,
    originalAlt: `Interior view of ${camperName} camper, photo ${idx + 1}`,
    thumbnailAlt: `Thumbnail of ${camperName} camper, photo ${idx + 1}`,
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
        renderItem={item => (
          <img
            src={item.original}
            alt={item.originalAlt}
            loading="lazy"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
        renderThumbInner={item => (
          <img
            src={item.thumbnail}
            alt={item.thumbnailAlt}
            loading="lazy"
            style={{ width: "100%", borderRadius: "4px" }}
          />
        )}
      />
    </div>
  );
};

export default Gallery;
