
import React, { useState } from 'react';
import { User, Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Customer } from '../types/pos';

interface CustomerManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerSelect: (customer: Customer | null) => void;
  selectedCustomer: Customer | null;
}

const CustomerManager: React.FC<CustomerManagerProps> = ({
  isOpen,
  onClose,
  onCustomerSelect,
  selectedCustomer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Sample customers data - in a real app, this would come from a database
  const [customers] = useState<Customer[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 456-7890' },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    if (newCustomer.name.trim()) {
      const customer: Customer = {
        id: Date.now().toString(),
        name: newCustomer.name.trim(),
        email: newCustomer.email.trim(),
        phone: newCustomer.phone.trim()
      };
      
      onCustomerSelect(customer);
      setNewCustomer({ name: '', email: '', phone: '' });
      setShowAddForm(false);
      onClose();
    }
  };

  const handleSelectCustomer = (customer: Customer) => {
    onCustomerSelect(customer);
    onClose();
  };

  const handleRemoveCustomer = () => {
    onCustomerSelect(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="w-5 h-5 mr-2" />
            Customer Management
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {selectedCustomer && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-blue-900">Current Customer:</p>
                <p className="text-blue-800">{selectedCustomer.name}</p>
                <p className="text-sm text-blue-600">{selectedCustomer.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveCustomer} className="text-blue-600">
                Remove
              </Button>
            </div>
          </div>
        )}

        {!showAddForm ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCustomers.map(customer => (
                <div
                  key={customer.id}
                  className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowAddForm(true)}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Customer
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <Input
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Customer name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                placeholder="customer@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                type="tel"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleAddCustomer}
                disabled={!newCustomer.name.trim()}
                className="flex-1"
              >
                Add Customer
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManager;
