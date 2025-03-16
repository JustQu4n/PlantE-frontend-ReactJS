import { useState, useEffect } from 'react';
import './listing.css';
import { BsArrowRightShort } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../../../Assets/images (1).png'; // Fallback image

const Listing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteProducts');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plantpots/`);
        console.log('API Response:', response.data);
        
        // Determine if response data is an array or needs extraction
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // Try to find an array in the response
          for (const key in response.data) {
            if (Array.isArray(response.data[key])) {
              productsData = response.data[key];
              break;
            }
          }
        }
        
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle favorites
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.includes(productId);
      const newFavorites = isAlreadyFavorite
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId];
      
      // Save to localStorage
      localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Sample products for fallback
  const sampleProducts = [
    { _id: '1', name: 'Annual Vince', imageUrl: img, price: 120000, qty: 10 },
    { _id: '2', name: 'Coffee Plant', imageUrl: img, price: 150000, qty: 8 },
    { _id: '3', name: 'Button Fern', imageUrl: img, price: 90000, qty: 15 },
    { _id: '4', name: 'Spider Plant', imageUrl: img, price: 85000, qty: 12 }
  ];

  // Use sample products if no products from API or during loading
  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <div className="lisitingSection">
      <div className="heading flex">
        <h1>Sản Phẩm Nổi Bật</h1>
        <Link to="/product-list" className="btn flex">
          Xem Tất Cả <BsArrowRightShort className="icon" />
        </Link>
      </div>

      {loading ? (
        <div className="loading">Đang tải sản phẩm...</div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <p>Đang hiển thị dữ liệu mẫu</p>
        </div>
      ) : (
        <div className="secContainer flex">
          {displayProducts.slice(0, 10).map((product) => (
            <Link 
              to={`/products-detail/${product.id}`} 
              className="singleItem" 
              key={product.id}
            >
              <div 
                className="favoriteIcon" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
              >
                {favorites.includes(product.id) ? 
                  <AiFillHeart className="icon favorite" /> : 
                  <AiOutlineHeart className="icon" />
                }
              </div>
              <img 
                src={product.imageUrl || img} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = img;
                }}
              />
              <h3>{product.name}</h3>
              <div className="price">{product.price?.toLocaleString()} VNĐ</div>
              <div className="stock">Còn lại: {product.qty}</div>
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 && !loading && !error && (
        <div className="noProducts">
          <p>Hiện tại chưa có sản phẩm nào</p>
        </div>
      )}
    </div>
  );
};

export default Listing;