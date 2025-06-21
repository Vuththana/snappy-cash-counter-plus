
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Receipt } from 'lucide-react';
import { CartItem } from '../types/pos';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  total: number;
  items: CartItem[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentComplete,
  total,
  items
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const finalTotal = total * 1.085; // Including tax
  const tax = total * 0.085;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'contactless', name: 'Contactless Payment', icon: Smartphone },
  ];

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowReceipt(true);
    }, 2000);
  };

  const handleComplete = () => {
    setShowReceipt(false);
    setSelectedPaymentMethod('');
    onPaymentComplete();
  };

  const handleClose = () => {
    if (!isProcessing) {
      setSelectedPaymentMethod('');
      setShowReceipt(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            {showReceipt ? 'Payment Complete' : 'Payment'}
          </DialogTitle>
        </DialogHeader>

        {!showReceipt ? (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="space-y-2">
                {paymentMethods.map(method => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-5 h-5 mr-3" />
                        <span>{method.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={!selectedPaymentMethod || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Receipt className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600">Payment Successful!</h3>
              <p className="text-gray-600">Amount: ${finalTotal.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">
                Transaction completed at {new Date().toLocaleString()}
              </p>
            </div>
            <Button onClick={handleComplete} className="w-full">
              Complete Order
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
