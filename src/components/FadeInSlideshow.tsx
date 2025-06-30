import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
}

const FadeInSlideshow: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await API.get("/api/photos");
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Gallery API did not return an array:", data);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center rounded">
        <p className="text-gray-600">No images in gallery yet.</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full max-w-xs mx-auto" style={{ height: "200px" }}>
      <AnimatePresence>
        <motion.img
          key={currentImage._id}
          src={currentImage.url}
          alt={currentImage.caption || "Gallery image"}
          className="absolute inset-0 mx-auto max-h-full max-w-full object-contain rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 2 } }} // slow fade in/out
        />
      </AnimatePresence>

      {currentImage.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 text-xs rounded-b-lg">
          {currentImage.caption}
        </div>
      )}
    </div>
  );
};

export default FadeInSlideshow;
