import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    imageUrl: ""
  });
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/plantpots/${id}`);
        setProduct(response.data);
        setFormData({
          name: response.data.name || "",
          description: response.data.description || "",
          price: response.data.price || "",
          qty: response.data.qty || "",
          imageUrl: response.data.imageUrl || ""
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Không thể tải thông tin sản phẩm");
        toast.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        qty: Number(formData.qty)
      };

      const response = await axios.put(`http://localhost:3002/api/plantpots/${id}`, updatedData);
      setProduct(response.data);
      toast.success("Cập nhật sản phẩm thành công!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(err.response?.data?.error || "Không thể cập nhật sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete product
  const handleDelete = async () => {
    setLoading(true);

    try {
      await axios.delete(`http://localhost:3002/api/plantpots/${id}`);
      toast.success("Xóa sản phẩm thành công!");
      navigate("/dashboard/products"); // Redirect to products list
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.response?.data?.error || "Không thể xóa sản phẩm");
      setDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) {
    return (
      <div className="product-detail-container loading">
        <div className="loader"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container error">
        <h3>Đã xảy ra lỗi</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/dashboard/products')} className="btn-back">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h2>{isEditing ? "Chỉnh sửa sản phẩm" : "Chi tiết sản phẩm"}</h2>
        <div className="action-buttons">
          {!isEditing && (
            <>
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
              <button className="btn-delete" onClick={() => setDeleteConfirm(true)}>
                Xóa
              </button>
            </>
          )}
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            Quay lại
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm</label>
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
            <label htmlFor="description">Mô tả</label>
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
              <label htmlFor="qty">Số lượng kho</label>
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
            <label htmlFor="imageUrl">Đường dẫn hình ảnh</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          {formData.imageUrl && (
            <div className="image-preview">
              <img src={formData.imageUrl} alt={formData.name} />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Đang xử lý..." : "Cập nhật"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: product.name || "",
                  description: product.description || "",
                  price: product.price || "",
                  qty: product.qty || "",
                  imageUrl: product.imageUrl || ""
                });
              }}
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div className="product-info">
          <div className="product-image">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <div className="no-image">Không có hình ảnh</div>
            )}
          </div>

          <div className="product-details">
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Giá:</span>
                <span className="meta-value price">{product.price.toLocaleString()} VND</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Tồn kho:</span>
                <span className="meta-value">{product.qty} sản phẩm</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">ID:</span>
                <span className="meta-value">{product._id}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Ngày tạo:</span>
                <span className="meta-value">
                  {new Date(product.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Cập nhật lần cuối:</span>
                <span className="meta-value">
                  {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>{product.name}</strong>?</p>
            <p className="warning">Lưu ý: Hành động này không thể hoàn tác!</p>
            
            <div className="modal-actions">
              <button 
                className="btn-confirm-delete" 
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Xác nhận xóa"}
              </button>
              <button 
                className="btn-cancel" 
                onClick={() => setDeleteConfirm(false)}
                disabled={loading}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;