
import React, { useState } from 'react';
import { Scan, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '../types/pos';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: Product) => void;
  products: Product[];
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  isOpen,
  onClose,
  onProductFound,
  products
}) => {
  const [barcode, setBarcode] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleScan = () => {
    if (!barcode.trim()) return;
    
    setIsSearching(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const product = products.find(p => p.sku === barcode.trim());
      
      if (product) {
        onProductFound(product);
        setBarcode('');
        onClose();
      } else {
        alert('Product not found with barcode: ' + barcode);
      }
      
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Scan className="w-5 h-5 mr-2" />
            Scan Barcode
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter or scan barcode:
            </label>
            <Input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scan barcode or type manually..."
              autoFocus
              className="font-mono"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleScan}
              disabled={!barcode.trim() || isSearching}
              className="flex-1"
            >
              {isSearching ? (
                'Searching...'
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Find Product
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
