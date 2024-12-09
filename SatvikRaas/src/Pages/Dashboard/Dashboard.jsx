import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import satvikLogo from '../../Assets/Logo/logo.png';
import { LayoutDashboard } from 'lucide-react';
import AdminPP from './AdminPP.jsx';
import axios from 'axios';
// import CreateWarehouseModal from './CreateWarehouseModal';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302;
  }
});

const DashboardCard = ({ title, value, percentage, period }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    <div className="card-content">
      <span className="card-value">{value}</span>
      <span className="percentage-badge">
        {percentage}% ↑ {period}
      </span>
    </div>
  </div>
);



const ProductList = ({ products }) => (
  <div className="products-section">
    <h2 className="section-title">All Products</h2>
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);


const totalSale = (recentOrders) => {
  let sum = 0;
  for (let order of recentOrders) {
     sum += order.totalAmount;
  }
  return sum;
};
const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};
const handleShipment = async (razorpayOrderId) => {
  try {
    const accessToken = getAccessToken();
    
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

    const response = await api.post(`/api/admin/createdelhiveryorder/${razorpayOrderId}`, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

   console.log(response);
    
  } catch (error) {
    console.error('Pickup order error:', error);
    // Optional: Add error handling logic
  }
};

const DashboardView = ({ recentOrders ,totalCustomers,totalProductSold,totalWearhouses}) => (
  <>
  
    <div className="dashboard-cards">
      <DashboardCard title="Product Sold" value={totalProductSold} percentage={50} period="this week" />
      <DashboardCard title="Total Orders" value={recentOrders.length} percentage={80} period="this week" />
      <DashboardCard title="Total Customer" value={totalCustomers.length} percentage={50} period="this week" />
      <DashboardCard title="Total Sales" value={totalSale(recentOrders)} percentage={80} period="this week" />
    </div>

    <h1>Wearhouses...</h1>

    <div className="dashboard-cards-1">
    {totalWearhouses.map((wearhous, index)=>(
     <div className="card">
     <h3 className="card-title">{wearhous.name}</h3>
     <div className="card-content">
       <span className="card-value">{wearhous.address}</span>
      <span className="percentage-badge">{wearhous.phone}</span>
     </div>
   </div>

    )

    )}
    </div>

    <div className="orders-section">
      <div className="orders-header">
        <h2 className="orders-title">Recent Orders</h2>
        <div className="filters">
          <select className="select-filter">
            <option>Select</option>
            <option>CREATED</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <select className="select-filter">
            <option>Date</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>RazorpayOrderId</th>
              <th>Customer Name</th>
              <th>Order Date</th>              
              <th>Location</th>
              <th>Delivery Amount</th>
              <th>Total Weight</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.razorpayOrderId}</td>
                <td>sky{index}</td>
                <td>{order.createdAt}</td>                
                <td>{order.address.city}-{order.address.country}</td>
                <td>{order.totalAmount}</td>
                <td>{order.totalWeight}</td>
                <td>
                  <button onClick={(event) => handleShipment(order.razorpayOrderId)} style={{backgroundColor: 'green', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px'}}>
                    MAKE FORWARD ORDER
                  </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');  
  const [isLoading, setIsLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalCustomers,setTotalCustomers]=useState([]);
  const [totalProductSold,setTotalProductSold]=useState(0);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [totalWearhouses,setTotalWearhouses]=useState([]);
  
  const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
  };
  const createWarehouse = async (warehouseData) => {
    try {
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        console.error('No access token found');
        return;
      }
      console.log(warehouseData);
     
  
      const response = await api.post('/api/admin/createwarehouse', warehouseData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
  
      console.log('Warehouse creation response:', response);
     alert("Warehouse creation successfully");
    } catch (error) {
      console.error('Error creating warehouse:', error);
      // Handle error (show error message, etc.)
    }
  };
  

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const accessToken = getAccessToken();
    
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const response = await api.get('/api/admin/getAllOrders', {        
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(response);

      if (response.data?.data) {
        setRecentOrders(response.data.data);
      } else {
        setRecentOrders([]);
      }
    } catch (error) {
      console.error('Error fetching Orders:', error);
      setRecentOrders([]);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllCustomers = async () => {
    try {
      setIsLoading(true);
      const accessToken = getAccessToken();
    
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const response = await api.get('/api/admin/getAllUsers', {        
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(response);

      if (response.data?.data) {
        setTotalCustomers(response.data.data);
      } else {
        setTotalCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching Orders:', error);
      setRecentOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItemSold = async () => {
    try {
      setIsLoading(true);
      const accessToken = getAccessToken();
    
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const response = await api.get('/api/admin/getTotalItemSold', {        
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(response);

      if (response) {
        setTotalProductSold(response.data);
      } else {
        setTotalProductSold(0);
      }
    } catch (error) {
      console.error('Error fetching Orders:', error);
      setRecentOrders([]);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllWearhouses = async () => {
    try {
      setIsLoading(true);
      const accessToken = getAccessToken();
    
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const response = await api.get('/api/admin/getAllWearhouses', {        
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(response);

      if (response.data?.data) {
        setTotalWearhouses(response.data.data);
      } else {
        setTotalWearhouses([]);
      }
    } catch (error) {
      console.error('Error fetching Orders:', error);
      setTotalWearhouses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect to fetch orders when dashboard view is selected
  useEffect(() => {
    if (currentView === 'dashboard') {
      fetchAllOrders();
      fetchAllCustomers();
      fetchItemSold();
      fetchAllWearhouses();
    }
  }, [currentView]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={satvikLogo} alt="Satvik Logo" className="logo" />
        </div>
        <nav className="nav-menu">
          <button 
            className="action-button" 
            aria-label="User Account"
          >
            <LayoutDashboard 
              className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')} 
            />
          </button>
          <a 
            href="#" 
            className={`nav-item ${currentView === 'All-Products' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('All-Products');
            }}
          >
            📦 All Products
          </a>
          <a href="#" className="nav-item">
            📝 Orders
          </a>
          <a href="#" className="nav-item">
            📄 Draft
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">
            {currentView === 'dashboard' ? 'Dashboard' : 'All Products'}
          </h1>
          <div className="user-section">
            <button className="power-btn">⚙️</button>
            <div className="user-info">
              <div className="avatar"></div>
              <span>Anish Patil</span>
            </div>
          </div>
        </div>

      
      
      </div>
    </div>
  );
};

export default Dashboard;