
import React from 'react';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types/pos';
import { Button } from '@/components/ui/button';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onCheckout,
  total
}) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Cart Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({itemCount})
          </h2>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCart}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ShoppingCart className="w-12 h-12 mb-4" />
            <p>Cart is empty</p>
            <p className="text-sm">Add items to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.product.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="border-t p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (8.5%)</span>
              <span>${(total * 0.085).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>${(total * 1.085).toFixed(2)}</span>
            </div>
          </div>
          
          <Button
            onClick={onCheckout}
            className="w-full"
            size="lg"
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
