import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Product } from '../types/pos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample products data with SKUs for barcode scanning
  const products: Product[] = [
    { id: '1', name: 'Espresso', price: 2.50, category: 'Coffee', sku: '1001', inStock: true },
    { id: '2', name: 'Cappuccino', price: 4.25, category: 'Coffee', sku: '1002', inStock: true },
    { id: '3', name: 'Latte', price: 4.75, category: 'Coffee', sku: '1003', inStock: true },
    { id: '4', name: 'Americano', price: 3.00, category: 'Coffee', sku: '1004', inStock: true },
    { id: '5', name: 'Croissant', price: 3.50, category: 'Pastry', sku: '2001', inStock: true },
    { id: '6', name: 'Muffin', price: 2.75, category: 'Pastry', sku: '2002', inStock: true },
    { id: '7', name: 'Bagel', price: 2.25, category: 'Pastry', sku: '2003', inStock: true },
    { id: '8', name: 'Green Tea', price: 2.00, category: 'Tea', sku: '3001', inStock: true },
    { id: '9', name: 'Earl Grey', price: 2.25, category: 'Tea', sku: '3002', inStock: true },
    { id: '10', name: 'Chamomile', price: 2.50, category: 'Tea', sku: '3003', inStock: true },
    { id: '11', name: 'Sandwich', price: 8.50, category: 'Food', sku: '4001', inStock: true },
    { id: '12', name: 'Salad', price: 9.25, category: 'Food', sku: '4002', inStock: true },
  ];

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.inStock;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search and Categories */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onAddToCart(product)}
            >
              <div className="p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Package className="w-12 h-12 mb-4" />
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Export products for use in barcode scanner
export const getProducts = (): Product[] => [
  { id: '1', name: 'Espresso', price: 2.50, category: 'Coffee', sku: '1001', inStock: true },
  { id: '2', name: 'Cappuccino', price: 4.25, category: 'Coffee', sku: '1002', inStock: true },
  { id: '3', name: 'Latte', price: 4.75, category: 'Coffee', sku: '1003', inStock: true },
  { id: '4', name: 'Americano', price: 3.00, category: 'Coffee', sku: '1004', inStock: true },
  { id: '5', name: 'Croissant', price: 3.50, category: 'Pastry', sku: '2001', inStock: true },
  { id: '6', name: 'Muffin', price: 2.75, category: 'Pastry', sku: '2002', inStock: true },
  { id: '7', name: 'Bagel', price: 2.25, category: 'Pastry', sku: '2003', inStock: true },
  { id: '8', name: 'Green Tea', price: 2.00, category: 'Tea', sku: '3001', inStock: true },
  { id: '9', name: 'Earl Grey', price: 2.25, category: 'Tea', sku: '3002', inStock: true },
  { id: '10', name: 'Chamomile', price: 2.50, category: 'Tea', sku: '3003', inStock: true },
  { id: '11', name: 'Sandwich', price: 8.50, category: 'Food', sku: '4001', inStock: true },
  { id: '12', name: 'Salad', price: 9.25, category: 'Food', sku: '4002', inStock: true },
];

export default ProductGrid;
