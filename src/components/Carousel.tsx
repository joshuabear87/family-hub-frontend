import React, { useState, useEffect } from 'react';
import API from '../api/axios';

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
}

const Carousel: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await API.get('/api/photos');
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error('Gallery API did not return an array:', data);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
        <p className="text-gray-600">No images in gallery yet.</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-gray-100" style={{ height: '200px' }}>
      {/* Image container */}
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <img
          src={currentImage.url}
          alt={currentImage.caption || 'Gallery image'}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Caption overlay */}
      {currentImage.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 text-xs">
          {currentImage.caption}
        </div>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
