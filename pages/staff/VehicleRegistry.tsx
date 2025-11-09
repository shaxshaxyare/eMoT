import React from 'react';
import GenericPlaceholder from '../../components/staff/GenericPlaceholder';
import { View } from '../../types';

interface VehicleRegistryProps {
    navigate: (view: View) => void;
}

const VehicleRegistry: React.FC<VehicleRegistryProps> = ({ navigate }) => {
  const quickActions = [
    { name: 'Search by VIN' },
    { name: 'Search by Plate' },
    { name: 'Search by Owner' },
    { name: 'View History' },
  ];

  return (
    <GenericPlaceholder 
      title="Vehicle Registry"
      description="Search master record (VIN/plate/owner); history and actions."
      quickActions={quickActions}
      navigate={navigate}
      backView="staff-applications"
    />
  );
};

export default VehicleRegistry;