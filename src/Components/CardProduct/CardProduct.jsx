import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../CardProduct/CardProduct.css';    

const ProductCard = ({ 
    product, 
    onFavorite,  
    isFavorite = false 
  }) => {
    // Thêm debugging và validation
    console.log('ProductCard received product:', product);
    
    // Kiểm tra đối tượng product có hợp lệ không
    if (!product || typeof product !== 'object') {
      console.error('Invalid product object:', product);
      return <div className="product-card error">Sản phẩm không hợp lệ</div>;
    }
    
    const { id, name, imageUrl, price, qty } = product;
  
    const handleFavoriteClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onFavorite) {
        onFavorite(product);
      }
    };
  
    return (
      <div className="product-card">
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <AiFillHeart className="icon favorite" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}
        </div>
        
        <Link  className="product-link">
          <div className="product-image">
            {imageUrl ? (
              <img src={imageUrl} alt={name} />
            ) : (
              <div className="no-image">Không có hình</div>
            )}
          </div>
          
          <div className="product-info">
            <h3 className="product-name">{name}</h3>
            <div className="product-details">
              <span className="product-price">{Number(price).toLocaleString()} VNĐ</span>
              <span className="product-stock">Còn: {qty}</span>
            </div>
          </div>
        </Link>
        
        <div className="product-actions">
          <Link to={`/products-detail/${id}`} className="btn-view">
            Xem chi tiết
          </Link>
          
        </div>
      </div>
    );
  };
  
  export default ProductCard;