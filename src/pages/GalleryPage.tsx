import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import API from "../api/axios";

interface Photo {
  _id: string;
  url: string;
  title?: string;
}

const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPhoto, setEditPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch photos on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/api/photos");
        setPhotos(data);
      } catch (err: any) {
        console.error("Failed to fetch photos:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title.trim());

      const { data } = await API.post("/api/photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPhotos([...photos, data]);
      setSelectedFile(null);
      setTitle("");
      setShowUploadInput(false);
    } catch (err: any) {
      console.error("Failed to upload photo:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await API.delete(`/api/photos/${id}`);
      setPhotos(photos.filter((photo) => photo._id !== id));
      setEditPhoto(null);
    } catch (err: any) {
      console.error("Failed to delete photo:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editPhoto) return;

    try {
      setLoading(true);
      const { data } = await API.put(`/api/photos/${editPhoto._id}`, { title: editPhoto.title });
      setPhotos(photos.map((p) => (p._id === data._id ? data : p)));
      setEditPhoto(null);
    } catch (err: any) {
      console.error("Failed to update photo:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 sm:mx-4 md:mx-10 lg:mx-20 xl:mx-40 py-5">
      <h1 className="text-3xl mb-4 text-center">Family Gallery</h1>

      {/* Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setShowUploadInput(!showUploadInput)}
          className="text-green-600 shadow-md text-2xl px-3 py-2 rounded-full transition-transform duration-200 hover:bg-green-200"
        >
          <FaPlus />
        </button>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`text-blue-600 shadow-md text-2xl px-3 py-2 rounded-full transition-transform duration-200 hover:bg-blue-200 ${
            editMode ? "bg-blue-200" : ""
          }`}
        >
          <FaEdit />
        </button>
      </div>

      {/* Upload Section */}
      {showUploadInput && (
        <div className="mb-8">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Photo title (optional)"
            className="border rounded px-3 py-2 mb-2 w-full"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 w-full"
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-5 gap-2">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className={`bg-white rounded-lg shadow hover:shadow-md transition p-1 cursor-pointer ${
              editMode ? "ring-2 ring-blue-400" : ""
            }`}
            onClick={() => editMode && setEditPhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title || "Uploaded Photo"}
              className="w-full h-32 object-cover rounded"
            />
            {photo.title && (
              <p className="text-center text-sm mt-1">{photo.title}</p>
            )}
          </div>
        ))}
        {photos.length === 0 && !loading && (
          <p className="col-span-full text-center text-gray-500">
            No photos uploaded yet.
          </p>
        )}
        {loading && (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        )}
      </div>

      {/* Edit Modal */}
      {editPhoto && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded shadow p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Edit Photo</h2>
            <img
              src={editPhoto.url}
              alt={editPhoto.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <input
              type="text"
              value={editPhoto.title || ""}
              onChange={(e) =>
                setEditPhoto({ ...editPhoto, title: e.target.value })
              }
              className="border rounded px-3 py-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(editPhoto._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditPhoto(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
