import React, { useState, useEffect, useRef } from 'react'
import './top.css'
import { BiSearchAlt } from 'react-icons/bi'
import { TbMessageCircle } from 'react-icons/tb'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { BsArrowRightShort, BsQuestionCircle } from 'react-icons/bs'
import axios from 'axios'
import { Link } from 'react-router-dom'
import img from '../../../../Assets/gilbert.jpg'
import img2 from '../../../../Assets/images (2).png'
import video from '../../../../Assets/video.mp4'

const Top = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Xử lý tìm kiếm khi người dùng nhập
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        searchProducts();
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce để tránh gọi API quá nhiều lần

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Ẩn kết quả tìm kiếm khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hàm tìm kiếm sản phẩm
  const searchProducts = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Fetch tất cả sản phẩm từ API
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plantpots/`);
      
      let allProducts = [];
      if (Array.isArray(response.data)) {
        allProducts = response.data;
      } else if (response.data && typeof response.data === 'object') {
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            allProducts = response.data[key];
            break;
          }
        }
      }
      
      // Tìm kiếm client-side
      const filteredProducts = allProducts.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = product.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || descMatch;
      });
      
      setSearchResults(filteredProducts);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Planti.</h1>
          <p>Hello Gilbert, Welcome back!</p>
        </div>

        <div className="searchBar flex" ref={searchRef}>
          <input 
            type="text" 
            placeholder='Tìm kiếm sản phẩm' 
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
            onFocus={() => {
              if (searchResults.length > 0) setShowResults(true);
            }}
          />
          <BiSearchAlt className="icon" onClick={searchProducts} />
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="searchResults">
              {loading ? (
                <div className="searchLoading">Đang tìm kiếm...</div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.slice(0, 5).map((product) => (
                    <Link 
                      to={`/products-detail/${product.id}`} 
                      key={product._id}
                      className="searchResultItem"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="productImage">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} />
                        ) : (
                          <div className="noImage"></div>
                        )}
                      </div>
                      <div className="productInfo">
                        <h4>{product.name}</h4>
                        <p>{product.price?.toLocaleString()} VNĐ</p>
                      </div>
                    </Link>
                  ))}
                  <div className="viewAllResults">
                    <Link 
                      to={`/dashboard/products?search=${searchQuery}`}
                      onClick={() => setShowResults(false)}
                    >
                      Xem tất cả kết quả ({searchResults.length})
                    </Link>
                  </div>
                </>
              ) : searchQuery.trim() !== '' ? (
                <div className="noResults">Không tìm thấy sản phẩm nào</div>
              ) : null}
            </div>
          )}
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className="icon" />
          <MdOutlineNotificationsNone className="icon" />
          <div className="adminImage">
            <img src={img} alt="Admin Image" />
          </div>
        </div>

      </div>

      {/* Rest of the component remains unchanged */}
      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Create and sell extraordinary products</h1>
          <p>The world's fast growing industry today are natural made products!</p>

          <div className="buttons flex">
            <button className="btn">Explore More</button>
            <button className="btn transparent">Top Sellers</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        {/* Rest of the existing code... */}
      </div>
    </div>
  )
}

export default Top