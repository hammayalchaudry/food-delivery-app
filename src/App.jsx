import React, { useState } from 'react';

// list of 20 unique food items categorized properly
const FOOD_MENU = [
  // --- BURGERS ---
  { id: 1, name: 'Special Cheese Burger', price: 8.50, category: 'Burgers', emoji: '🍔', desc: 'Freshly grilled patty with premium cheese and secret sauce.' },
  { id: 2, name: 'Crispy Chicken Zinger', price: 9.00, category: 'Burgers', emoji: '🍗', desc: 'Crispy fried chicken breast fillet topped with fresh lettuce and mayo.' },
  { id: 3, name: 'Smoked BBQ Bacon Burger', price: 10.50, category: 'Burgers', emoji: '🥓', desc: 'Flame-broiled beef patty coated in smoky BBQ sauce with bacon.' },
  { id: 4, name: 'Spicy Jalapeno Burger', price: 8.99, category: 'Burgers', emoji: '🌶️', desc: 'Hot and spicy beef patty layered with fiery jalapenos.' },

  // --- PIZZAS ---
  { id: 5, name: 'Chicken Tikka Pizza', price: 14.50, category: 'Pizzas', emoji: '🍕', desc: 'Spicy chicken tikka chunks, onions, and premium mozzarella cheese.' },
  { id: 6, name: 'Pepperoni Feast Pizza', price: 15.00, category: 'Pizzas', emoji: '🍕', desc: 'Loaded with classic Italian pepperoni slices and extra cheese.' },
  { id: 7, name: 'Vegetarian Garden Pizza', price: 12.99, category: 'Pizzas', emoji: '🍕', desc: 'Fresh bell peppers, sweet corn, olives, mushrooms, and onions.' },
  { id: 8, name: 'Creamy Garlic Chicken Pizza', price: 15.50, category: 'Pizzas', emoji: '🍕', desc: 'Rich white garlic sauce base topped with grilled chicken cubes.' },

  // --- SIDES ---
  { id: 9, name: 'Classic French Fries', price: 3.50, category: 'Sides', emoji: '🍟', desc: 'Crispy golden potato fries perfectly salted.' },
  { id: 10, name: 'Loaded Cheese Fries', price: 5.50, category: 'Sides', emoji: '🧀', desc: 'Golden fries drenched in melted cheddar cheese sauce.' },
  { id: 11, name: 'Crispy Onion Rings', price: 4.00, category: 'Sides', emoji: '🧅', desc: 'Deep-fried battered onion rings served with dip.' },
  { id: 12, name: 'Hot Buffalo Wings', price: 6.99, category: 'Sides', emoji: '🪶', desc: '6 pieces of spicy chicken wings tossed in buffalo sauce.' },
  { id: 13, name: 'Garlic Bread Sticks', price: 4.50, category: 'Sides', emoji: '🥖', desc: 'Baked bread sticks brushed with rich garlic butter.' },

  // --- DESSERTS ---
  { id: 14, name: 'Chocolate Lava Cake', price: 5.00, category: 'Desserts', emoji: '🧁', desc: 'Warm chocolate cake with a gooey, molten chocolate center.' },
  { id: 15, name: 'New York Cheesecake', price: 6.00, category: 'Desserts', emoji: '🍰', desc: 'Classic creamy cheesecake slice with strawberry syrup.' },
  { id: 16, name: 'Fudgy Brownie with Ice Cream', price: 5.50, category: 'Desserts', emoji: '🍨', desc: 'Rich chocolate brownie served with a scoop of vanilla ice cream.' },
  { id: 17, name: 'Sweet Cinnamon Rolls', price: 4.00, category: 'Desserts', emoji: '🥮', desc: 'Soft baked rolls glazed with sugary sweet cinnamon icing.' },

  // --- BEVERAGES ---
  { id: 18, name: 'Chilled Coca Cola', price: 1.99, category: 'Beverages', emoji: '🥤', desc: 'Refreshing ice-cold classic soda can.' },
  { id: 19, name: 'Fresh Lime Mint Soda', price: 2.99, category: 'Beverages', emoji: '🍹', desc: 'A cooling blend of fresh lime juice, mint leaves, and soda.' },
  { id: 20, name: 'Creamy Mango Shake', price: 3.99, category: 'Beverages', emoji: '🥭', desc: 'Thick blend of sweet seasonal mangoes and milk.' }
];

function App() {
  // Cart state storing product IDs and their quantities
  const [cart, setCart] = useState({});
  const [step, setStep] = useState(0); // 0: Menu, 1: Checkout Form, 2: Final Receipt

  // Customer Information Details State
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const deliveryCharges = 2.00;

  // Add Item to Cart function
  const addToCart = (id) => {
    setCart(prevCart => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1
    }));
  };

  // Remove Item from Cart function
  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  // Calculate total count of items in cart
  const totalCartCount = Object.values(cart).reduce((total, qty) => total + qty, 0);

  // Calculate subtotal bill dynamically based on item prices
  const subTotal = Object.keys(cart).reduce((total, id) => {
    const item = FOOD_MENU.find(m => m.id === parseInt(id));
    return total + (item ? item.price * cart[id] : 0);
  }, 0);

  const totalBill = subTotal > 0 ? subTotal + deliveryCharges : 0;

  const handleCheckoutClick = () => {
    if (totalCartCount === 0) {
      alert("Your cart is empty! Please add some delicious food items first. 🍔");
    } else {
      setStep(1); // Proceed to checkout info form
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill out all the required information fields!");
      return;
    }
    setStep(2); // Redirect to success invoice receipt page
  };

  const handleCloseAndReset = () => {
    setCart({});
    setCustomerInfo({ name: '', phone: '', address: '' });
    setStep(0);
  };

  // Group items by category for beautiful display
  const categories = ['Burgers', 'Pizzas', 'Sides', 'Desserts', 'Beverages'];

  return (
    <div className="min-h-screen bg-zinc-50 relative antialiased text-zinc-900 font-sans">
      
      {/* --- STEP 0: ADVANCED FOOD MENU MARKETPLACE --- */}
      {step === 0 && (
        <div>
          {/* Top Navbar Header */}
          <header className="bg-white border-b sticky top-0 z-50 px-4 py-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-black text-orange-600 tracking-tight">CravingBites 🍔</h1>
              <button 
                onClick={handleCheckoutClick}
                className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 cursor-pointer"
              >
                🛒 Cart <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-black">{totalCartCount}</span>
              </button>
            </div>
          </header>

          {/* Intro Text Section */}
          <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-3">Delicious Food, Fast Delivery! ⚡</h2>
              <p className="text-gray-500 text-sm md:text-base">Explore our huge menu featuring 20 mouth-watering food items, drinks, and sweets!</p>
            </div>

            {/* Displaying Items Category Wise */}
            {categories.map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-xl md:text-2xl font-black text-zinc-800 border-b pb-2 mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-orange-600 rounded-sm inline-block"></span>
                  {category}
                </h3>

                {/* Grid Layout for Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {FOOD_MENU.filter(item => item.category === category).map(item => (
                    <div key={item.id} className="bg-white rounded-2xl border border-zinc-200 shadow-md overflow-hidden p-5 flex flex-col justify-between hover:shadow-xl transition duration-200">
                      <div>
                        <div className="text-4xl mb-3">{item.emoji}</div>
                        <h4 className="font-bold text-zinc-900 text-base mb-1">{item.name}</h4>
                        <p className="text-gray-500 text-xs mb-4 leading-relaxed min-h-[32px]">{item.desc}</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-base font-black text-orange-600">${item.price.toFixed(2)}</span>
                          {cart[item.id] > 0 && (
                            <span className="text-xs bg-orange-50 text-orange-600 font-bold px-2 py-0.5 rounded-md">
                              Qty: {cart[item.id]}
                            </span>
                          )}
                        </div>

                        {/* Increment / Decrement Counter buttons */}
                        {cart[item.id] > 0 ? (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="flex-1 bg-zinc-200 text-zinc-800 py-2 rounded-xl font-bold text-sm hover:bg-zinc-300 transition cursor-pointer text-center"
                            >
                              ➖
                            </button>
                            <button 
                              onClick={() => addToCart(item.id)}
                              className="flex-1 bg-zinc-900 text-white py-2 rounded-xl font-bold text-sm hover:bg-zinc-800 transition cursor-pointer text-center"
                            >
                              ➕
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addToCart(item.id)}
                            className="w-full bg-zinc-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-zinc-800 transition cursor-pointer text-center"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </main>

          {/* Persistent Floating Bottom Bar if item is in Cart */}
          {totalCartCount > 0 && (
            <div className="fixed bottom-0 inset-x-0 bg-white border-t p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Selected Items: <span className="font-bold text-zinc-900">{totalCartCount}</span></p>
                  <p className="text-lg font-black text-zinc-900">Subtotal: <span className="text-orange-600">${subTotal.toFixed(2)}</span></p>
                </div>
                <button 
                  onClick={handleCheckoutClick}
                  className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-orange-700 transition cursor-pointer"
                >
                  🚀 Review & Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- STEP 1: DYNAMIC CHECKOUT FORM & BREAKDOWN --- */}
      {step === 1 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4 backdrop-blur-sm overflow-y-auto py-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl transform scale-100 transition duration-300 my-auto">
            <h3 className="text-2xl font-black text-zinc-900 text-center mb-1">📋 Delivery & Checkout Details</h3>
            <p className="text-gray-500 text-center text-xs mb-6">Complete your personal details to finalize your order.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Input Container */}
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe" 
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
                    placeholder="e.g. +1 234 567 890" 
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
                    placeholder="Apartment#, Street Name, City, State" 
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

              {/* Advanced Live Order Summary */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col justify-between max-h-[350px]">
                <div className="overflow-y-auto pr-1">
                  <h4 className="font-bold text-zinc-900 text-sm mb-3 border-b pb-1 sticky top-0 bg-zinc-50">Items Summary</h4>
                  
                  {/* Itemized List rows */}
                  <div className="space-y-2 mb-4">
                    {Object.keys(cart).map(id => {
                      const item = FOOD_MENU.find(m => m.id === parseInt(id));
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-xs text-zinc-700">
                          <span className="truncate max-w-[150px]">{item.emoji} {item.name} <span className="text-gray-400 font-bold">x{cart[id]}</span></span>
                          <span className="font-semibold text-zinc-900">${(item.price * cart[id]).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-500 border-t pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-zinc-900">${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span className="font-bold text-orange-600">+ ${deliveryCharges.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between text-base font-black text-zinc-900 mb-3">
                    <span>Total Cost:</span>
                    <span>${totalBill.toFixed(2)}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setStep(0)}
                    className="w-full bg-zinc-200 text-zinc-700 py-2 rounded-xl font-semibold hover:bg-zinc-300 transition cursor-pointer text-xs"
                  >
                    Modify Cart Items
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STEP 2: PROFESSIONAL FINAL INVOICE RECEIPTS --- */}
      {step === 2 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] px-4 backdrop-blur-sm overflow-y-auto py-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-t-8 border-orange-600 relative my-auto">
            <div className="text-center">
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-black text-zinc-900 mt-2">Order Confirmed Successfully!</h3>
              <p className="text-gray-500 text-xs mt-1">Thank you for placing your order with CravingBites.</p>
            </div>

            {/* Receipt Content Details Box */}
            <div className="mt-6 border-t border-b border-dashed border-zinc-200 py-4 space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[10px]">Customer Name</span>
                <span className="font-bold text-zinc-900 text-sm">{customerInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[10px]">Contact Info</span>
                <span className="font-medium text-zinc-900">{customerInfo.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[10px]">Shipping Destination</span>
                <span className="font-medium text-zinc-800">{customerInfo.address}</span>
              </div>
              
              {/* Detailed Breakdown inside Receipt */}
              <div className="bg-zinc-50 p-3 rounded-xl space-y-2 border max-h-[140px] overflow-y-auto">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block border-b pb-1">Purchased Products</span>
                {Object.keys(cart).map(id => {
                  const item = FOOD_MENU.find(m => m.id === parseInt(id));
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between text-[11px] text-zinc-700">
                      <span>{item.name} (x{cart[id]})</span>
                      <span>${(item.price * cart[id]).toFixed(2)}</span>
                    </div>
                  );
                })}
                <div className="flex justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-200">
                  <span>Standard Delivery:</span>
                  <span>${deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900 text-xs pt-1 border-t">
                  <span>Grand Total Paid:</span>
                  <span className="text-orange-600">${totalBill.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-[11px] text-gray-400">
              <p>🛵 Your hot food will be delivered to your doorstep within 30 minutes!</p>
            </div>

            <button 
              onClick={handleCloseAndReset}
              className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm mt-5 hover:bg-zinc-800 transition cursor-pointer"
            >
              Back to Main Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
