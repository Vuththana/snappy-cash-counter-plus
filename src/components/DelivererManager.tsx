
import React, { useState } from 'react';
import { Truck, Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Deliverer } from '../types/pos';

interface DelivererManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onDelivererSelect: (deliverer: Deliverer | null) => void;
  selectedDeliverer: Deliverer | null;
}

const DelivererManager: React.FC<DelivererManagerProps> = ({
  isOpen,
  onClose,
  onDelivererSelect,
  selectedDeliverer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDeliverer, setNewDeliverer] = useState({
    name: '',
    phone: '',
    vehicle: ''
  });

  // Sample deliverers data - in a real app, this would come from a database
  const [deliverers] = useState<Deliverer[]>([
    { id: '1', name: 'Mike Johnson', phone: '(555) 111-2222', vehicle: 'Motorcycle' },
    { id: '2', name: 'Sarah Wilson', phone: '(555) 333-4444', vehicle: 'Car' },
    { id: '3', name: 'David Brown', phone: '(555) 555-6666', vehicle: 'Bicycle' },
  ]);

  const filteredDeliverers = deliverers.filter(deliverer =>
    deliverer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deliverer.phone.includes(searchTerm) ||
    (deliverer.vehicle && deliverer.vehicle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddDeliverer = () => {
    if (newDeliverer.name.trim()) {
      const deliverer: Deliverer = {
        id: Date.now().toString(),
        name: newDeliverer.name.trim(),
        phone: newDeliverer.phone.trim(),
        vehicle: newDeliverer.vehicle.trim() || undefined
      };
      
      onDelivererSelect(deliverer);
      setNewDeliverer({ name: '', phone: '', vehicle: '' });
      setShowAddForm(false);
      onClose();
    }
  };

  const handleSelectDeliverer = (deliverer: Deliverer) => {
    onDelivererSelect(deliverer);
    onClose();
  };

  const handleRemoveDeliverer = () => {
    onDelivererSelect(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            Deliverer Management
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {selectedDeliverer && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-green-900">Current Deliverer:</p>
                <p className="text-green-800">{selectedDeliverer.name}</p>
                <p className="text-sm text-green-600">{selectedDeliverer.phone}</p>
                {selectedDeliverer.vehicle && (
                  <p className="text-sm text-green-600">{selectedDeliverer.vehicle}</p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveDeliverer} className="text-green-600">
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
                placeholder="Search deliverers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredDeliverers.map(deliverer => (
                <div
                  key={deliverer.id}
                  className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSelectDeliverer(deliverer)}
                >
                  <p className="font-medium">{deliverer.name}</p>
                  <p className="text-sm text-gray-600">{deliverer.phone}</p>
                  {deliverer.vehicle && (
                    <p className="text-sm text-gray-600">{deliverer.vehicle}</p>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowAddForm(true)}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Deliverer
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <Input
                type="text"
                value={newDeliverer.name}
                onChange={(e) => setNewDeliverer(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Deliverer name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                type="tel"
                value={newDeliverer.phone}
                onChange={(e) => setNewDeliverer(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle</label>
              <Input
                type="text"
                value={newDeliverer.vehicle}
                onChange={(e) => setNewDeliverer(prev => ({ ...prev, vehicle: e.target.value }))}
                placeholder="Car, Motorcycle, Bicycle..."
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleAddDeliverer}
                disabled={!newDeliverer.name.trim()}
                className="flex-1"
              >
                Add Deliverer
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

export default DelivererManager;
