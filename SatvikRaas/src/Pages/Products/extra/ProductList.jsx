import Product from './Product.jsx';
import './ProductList.css';

const ProductList = ({ products }) => {
  

  return (
    <div className="product-list">
      
      {products.map((product,i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
};

export default ProductList;