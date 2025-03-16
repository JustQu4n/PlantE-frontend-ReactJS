import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../../CardProduct/CardProduct';
import { toast } from 'react-toastify';
import '../ProductList/productList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          // Hiển thị đầy đủ log để xác định vấn đề
          console.log('Đang tải dữ liệu sản phẩm...');
          
          // Sử dụng endpoint chính xác và thêm log đầy đủ
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plantpots`);
          
          // Kiểm tra tất cả các keys trong response.data để tìm mảng
          if (response.data && typeof response.data === 'object') {
            // Tìm tất cả các properties có giá trị là mảng
            const arrayProperties = [];
            for (const key in response.data) {
              if (Array.isArray(response.data[key])) {
                arrayProperties.push({
                  key,
                  length: response.data[key].length
                });
              }
            }
          }
          
          // Thử lấy dữ liệu từ các cấu trúc phổ biến
          let productsData = [];
          
          // Trường hợp 1: Response là mảng trực tiếp
          if (Array.isArray(response.data)) {
            productsData = response.data;
          } 
          // Trường hợp 2: Response có property là mảng
          else if (response.data && typeof response.data === 'object') {
            for (const key in response.data) {
              if (Array.isArray(response.data[key]) && response.data[key].length > 0) {
                productsData = response.data[key];
                break;
              }
            }
          }
          
          // Trường hợp 3: Response là một đối tượng sản phẩm đơn lẻ
          if (productsData.length === 0 && response.data && typeof response.data === 'object' && 
              !Array.isArray(response.data) && (response.data._id || response.data.id)) {
            productsData = [response.data];
          }
          
          console.log('Final products data:', productsData);
          
          // Nếu vẫn không có dữ liệu, thử fetch với endpoint khác
          if (productsData.length === 0) {
            console.log('Trying alternative endpoint...');
            const altResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/plantpots/all`);
            console.log('Alternative API Response:', altResponse.data);
            
            if (Array.isArray(altResponse.data)) {
              productsData = altResponse.data;
            } else if (altResponse.data && typeof altResponse.data === 'object') {
              for (const key in altResponse.data) {
                if (Array.isArray(altResponse.data[key])) {
                  productsData = altResponse.data[key];
                  break;
                }
              }
            }
          }
          
          console.log('Setting products state with:', productsData);
          setProducts(productsData);
        } catch (error) {
          setError(error.message || 'Không thể tải danh sách sản phẩm');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProducts();
    }, []);
  
    // Trong trường hợp không có dữ liệu thực, sử dụng dữ liệu mẫu
    const sampleProducts = [
      {
        _id: '1',
        name: 'Cây phong lá đỏ',
        price: 250000,
        qty: 15,
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
        description: 'Cây cảnh đẹp cho không gian sống'
      },
      {
        _id: '2',
        name: 'Xương rồng mini',
        price: 120000,
        qty: 30,
        imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a',
        description: 'Cây cảnh nhỏ xinh dễ chăm sóc'
      },
      {
        _id: '3',
        name: 'Sen đá',
        price: 85000,
        qty: 25,
        imageUrl: 'https://images.unsplash.com/photo-1463154545680-d59320fd685d',
        description: 'Loại cây cảnh đẹp mắt và dễ sống'
      }
    ];
    
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Đang tải sản phẩm...</p>
        </div>
      );
    }
    
    // Sử dụng dữ liệu mẫu nếu không có dữ liệu thực
    const productList = (Array.isArray(products) && products.length > 0) 
      ? products 
      : sampleProducts;

    
    return (
      <div className="product-list-container">
        <h2>Danh sách sản phẩm</h2>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <p className="using-sample-note">
              {productList === sampleProducts ? '(Đang sử dụng dữ liệu mẫu)' : ''}
            </p>
          </div>
        )}
        
        <div className="product-grid">
          {productList.map((product, index) => (
            <ProductCard 
              key={product.id || `sample-${index}`}
              product={product}
              isFavorite={false}
            />
          ))}
        </div>
        
        {productList === sampleProducts && !error && (
          <div className="sample-data-notice">
            <p>Đang hiển thị dữ liệu mẫu vì không tìm thấy sản phẩm thực</p>
          </div>
        )}
      </div>
    );
  };
  
  export default ProductList;