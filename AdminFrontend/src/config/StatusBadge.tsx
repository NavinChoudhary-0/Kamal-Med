import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { color: 'bg-blue-100 text-blue-800', icon: Package },
    shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
};

const StatusBadge = ({ status }: { status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
};

export {StatusBadge, statusConfig};