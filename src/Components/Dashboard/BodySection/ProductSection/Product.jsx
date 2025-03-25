import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreatePlantPot() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    qty: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object for multipart/form-data
      const productFormData = new FormData();
      
      // Add text fields
      productFormData.append("name", formData.name);
      productFormData.append("price", Number(formData.price));
      productFormData.append("description", formData.description);
      productFormData.append("qty", Number(formData.qty));
      
      // Add image file if available
      if (imageFile) {
        productFormData.append("image", imageFile);
      } else if (formData.imageUrl) {
        productFormData.append("imageUrl", formData.imageUrl);
      }

      console.log("Sending data with image...");
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/plantpots/`, 
        productFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      console.log("Response:", response.data);
      toast.success("Tạo sản phẩm thành công!");
      navigate("/dashboard/products"); // 
      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        qty: "",
      });
      setImageFile(null);
      setImagePreview("");
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Không thể tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Tạo Sản Phẩm Mới</h2>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Tên Sản Phẩm</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô Tả</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Giá (VNĐ)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="qty">Số Lượng Kho</label>
            <input
              type="number"
              id="qty"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUpload">Tải Lên Ảnh</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        {imagePreview && (
          <div className="image-preview-container">
            <h3>Xem trước ảnh:</h3>
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="image-preview" 
            />
          </div>
        )}

        {/* <div className="form-group">
          <label htmlFor="imageUrl">Hoặc đường dẫn Ảnh (URL)</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            placeholder="Nhập URL ảnh nếu không tải lên file"
          />
        </div> */}

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Tạo sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  );
}