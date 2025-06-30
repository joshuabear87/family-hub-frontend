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
        const { data } = await API.get('/api/photos'); // Use your API instance here
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
    <div className="relative h-full md:h-64 lg:h-80 overflow-hidden rounded shadow">
      <img
  src={currentImage.url}
  alt={currentImage.caption || 'Gallery image'}
  className="h-full w-full object-contain object-center mx-auto transition duration-500"
/>

      {/* Caption overlay */}
      {currentImage.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 text-sm">
          {currentImage.caption}
        </div>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
