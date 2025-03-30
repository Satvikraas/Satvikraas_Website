// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import AProductList from './AProductList';
import AddProduct from './Addproduct';


const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302;
  }
});


const AdminPP = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [btnName,setBtnName] = useState('ADD')
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
  };

  const fetchAllProducts = async () => {
    try {
      const accessToken = getAccessToken();
    
      if (!accessToken) {
        
        return;
      }

      const response = await api.get('/api/productController/getAllProducts', {        
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data?.data) {
        setProducts(response.data.data);
        
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching Products:', error);
      }
       finally {
      
    }
  };

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/productController/getAllProducts')
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.data && Array.isArray(data.data)) {
  //         setProducts(data.data);
  //         // console.log(data)
          
  //       } else {
  //         console.error('Invalid response format from the backend');
  //       }
  //     })
  //     .catch(error => console.error('Error fetching products:', error));
  // }, []);

  const handlemodelopen = () => {
    
    if(isModalOpen){
      
      setBtnName("ADD")
    }
    else
    setBtnName("Close")
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="app">
       <div>
      <button onClick={handlemodelopen}>{btnName}</button>
      {isModalOpen && <AddProduct />}
      {/* {isModalOpen && <EditProduct />} */}
    </div>
    {!isModalOpen && <AProductList  products={products} />}
      
      
    </div>
  );
};

export default AdminPP;