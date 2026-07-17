import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dishes from './components/Dishes';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [step, setStep] = useState(0); // 0: None, 1: Info/Checkout Form, 2: Receipt Page

  // Customer Information State
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const deliveryCharges = 2.00;
  const itemPriceEstimate = 8.50; // Per item average price
  const subTotal = cartCount * itemPriceEstimate;
  const totalBill = subTotal + deliveryCharges;

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const handleCheckoutClick = () => {
    if (cartCount === 0) {
      alert("Aap ka cart khali hai! Pehle koi lazeez khana add karein. 🍔");
    } else {
      setStep(1); // Open Information Form
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Meherbani karke saari information darj karein!");
      return;
    }
    setStep(2); // Move to Receipt Page
  };

  const handleCloseAndReset = () => {
    setCartCount(0);
    setCustomerInfo({ name: '', phone: '', address: '' });
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar cartCount={cartCount} onCheckout={handleCheckoutClick} />
      
      <Hero />
      <Dishes addToCart={addToCart} />
      <About />
      <Footer />

      {/* --- STEP 1: CUSTOMER INFORMATION & BILL DETAILS MODAL --- */}
      {step === 1 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl transform scale-100 transition duration-300">
            <h3 className="text-2xl font-black text-zinc-900 text-center mb-1">📋 Checkout Details</h3>
            <p className="text-gray-500 text-center text-xs mb-6">Please provide delivery address and confirm details.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: Form */}
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ayesha Khan" 
                    className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-600 outline-none text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 03001234567" 
                    className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-600 outline-none text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Delivery Address</label>
                  <textarea 
                    name="address"
                    required
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="House#, Street#, Area, Lahore" 
                    rows="3"
                    className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-600 outline-none text-zinc-900"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-600/20 hover:bg-orange-700 transition cursor-pointer mt-2"
                >
                  Confirm Order
                </button>
              </form>

              {/* Right Side: Order Summary */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm mb-3 border-b pb-1">Order Summary</h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Total Items selected:</span>
                      <span className="font-bold text-zinc-900">{cartCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-zinc-900">${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges:</span>
                      <span className="font-bold text-orange-600">+ ${deliveryCharges.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-300 pt-3 mt-4">
                  <div className="flex justify-between text-base font-black text-zinc-900 mb-4">
                    <span>Total Bill:</span>
                    <span>${totalBill.toFixed(2)}</span>
                  </div>
                  {/* Cancel / Add More Button Fully Fixed Here */}
                  <button 
                    type="button"
                    onClick={() => setStep(0)}
                    className="w-full bg-zinc-200 text-zinc-700 py-2.5 rounded-xl font-semibold hover:bg-zinc-300 transition cursor-pointer text-xs"
                  >
                    Cancel / Add More Food
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STEP 2: PROFESSIONAL RECEIPT (INVOICE) PAGE --- */}
      {step === 2 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] px-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border-t-8 border-orange-600 relative">
            <div className="text-center">
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-black text-zinc-900 mt-2">Order Confirmed!</h3>
              <p className="text-gray-500 text-xs mt-1">Thank you for ordering from CravingBites.</p>
            </div>

            {/* Receipt Details Box */}
            <div className="mt-6 border-t border-b border-dashed border-zinc-200 py-4 space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[10px]">Customer Name</span>
                <span className="font-bold text-zinc-900 text-sm">{customerInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[10px]">Phone Number</span>
                <span className="font-medium text-zinc-900">{customerInfo.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[10px]">Delivery Address</span>
                <span className="font-medium text-zinc-800">{customerInfo.address}</span>
              </div>
              <div className="bg-zinc-50 p-3 rounded-xl space-y-1.5 border">
                <div className="flex justify-between text-gray-600">
                  <span>Items Count:</span>
                  <span className="font-bold text-zinc-900">{cartCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges:</span>
                  <span>${deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900 text-sm pt-1 border-t">
                  <span>Paid Amount:</span>
                  <span className="text-orange-600">${totalBill.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-[11px] text-gray-400">
              <p>🛵 Your fresh food will arrive in 30 minutes!</p>
            </div>

            <button 
              onClick={handleCloseAndReset}
              className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm mt-5 hover:bg-zinc-800 transition cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
