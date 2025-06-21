import React, { useState } from 'react';
import { Scan, User, Truck } from 'lucide-react';
import ProductGrid, { getProducts } from '../components/ProductGrid';
import Cart from '../components/Cart';
import PaymentModal from '../components/PaymentModal';
import BarcodeScanner from '../components/BarcodeScanner';
import CustomerManager from '../components/CustomerManager';
import DelivererManager from '../components/DelivererManager';
import { Button } from '@/components/ui/button';
import { CartItem, Product, Customer, Deliverer } from '../types/pos';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<number | null>(null);
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);
  const [isCustomerManagerOpen, setIsCustomerManagerOpen] = useState(false);
  const [isDelivererManagerOpen, setIsDelivererManagerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedDeliverer, setSelectedDeliverer] = useState<Deliverer | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentComplete = () => {
    const orderNumber = Math.floor(Math.random() * 10000) + 1000;
    setCurrentOrder(orderNumber);
    clearCart();
    setSelectedCustomer(null);
    setSelectedDeliverer(null);
    setIsPaymentModalOpen(false);
    
    // Show success message for 3 seconds
    setTimeout(() => {
      setCurrentOrder(null);
    }, 3000);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">POS System</h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBarcodeScannerOpen(true)}
                  className="flex items-center"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  Scan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCustomerManagerOpen(true)}
                  className="flex items-center"
                >
                  <User className="w-4 h-4 mr-2" />
                  {selectedCustomer ? selectedCustomer.name : 'Customer (Optional)'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDelivererManagerOpen(true)}
                  className="flex items-center"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  {selectedDeliverer ? selectedDeliverer.name : 'Deliverer (Optional)'}
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </div>
              {currentOrder && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Order #{currentOrder} Complete!
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Products Section */}
        <div className="flex-1 p-6">
          <ProductGrid onAddToCart={addToCart} />
        </div>

        {/* Cart Section */}
        <div className="w-96 bg-white border-l shadow-lg">
          <Cart
            items={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
            onCheckout={handleCheckout}
            total={total}
          />
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={isBarcodeScannerOpen}
        onClose={() => setIsBarcodeScannerOpen(false)}
        onProductFound={addToCart}
        products={getProducts()}
      />

      {/* Customer Manager Modal */}
      <CustomerManager
        isOpen={isCustomerManagerOpen}
        onClose={() => setIsCustomerManagerOpen(false)}
        onCustomerSelect={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
      />

      {/* Deliverer Manager Modal */}
      <DelivererManager
        isOpen={isDelivererManagerOpen}
        onClose={() => setIsDelivererManagerOpen(false)}
        onDelivererSelect={setSelectedDeliverer}
        selectedDeliverer={selectedDeliverer}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        total={total}
        items={cartItems}
      />
    </div>
  );
};

export default Index;
