import { FaBoxOpen, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';

const ProgressBar = () => {
  return (
    <div className="flex items-center justify-between mb-8 mx-auto" style={{ maxWidth: '80%' }}>
      {/* Shipping Step */}
      <div className="flex flex-col items-center">
        <FaBoxOpen className="text-2xl text-white bg-black border-2 border-black p-2 rounded-full" />
        <span className="text-sm font-bold">Shipping</span>
      </div>
      <div className="flex-grow border-t border-gray-300 mx-2"></div>
      {/* Payment Step */}
      <div className="flex flex-col items-center">
        <FaCreditCard className="text-2xl text-white bg-black border-2 border-black p-2 rounded-full" />
        <span className="text-sm font-bold">Payment</span>
      </div>
      <div className="flex-grow border-t border-gray-300 mx-2"></div>
      {/* Review Step */}
      <div className="flex flex-col items-center">
        <FaClipboardCheck className="text-2xl text-black border-2 border-black bg-white p-2 rounded-full" />
        <span className="text-sm font-bold">Review</span>
      </div>
    </div>
  );
};

export default ProgressBar;