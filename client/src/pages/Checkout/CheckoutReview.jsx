import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';

const CheckoutReview = () => {
  const navigate = useNavigate();

  // Hard-coded example items
  const cartItems = [
    { id: 1, name: 'Furniture Item 1', price: 100, quantity: 2, image: 'path/to/image1.jpg' },
    { id: 2, name: 'Furniture Item 2', price: 200, quantity: 1, image: 'path/to/image2.jpg' },
    { id: 3, name: 'Furniture Item 3', price: 150, quantity: 3, image: 'path/to/image3.jpg' },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 20; // Example shipping fee
  const subtotal = totalPrice + shippingFee;

  const handleConfirmOrder = () => {
    // Save order details to state or context
    navigate('/checkout-confirmation');
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span>Total Price:</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Fee:</span>
          <span>${shippingFee}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>
        <button onClick={handleConfirmOrder} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutReview;