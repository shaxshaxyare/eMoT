import React from 'react';
import GenericPlaceholder from '../../components/staff/GenericPlaceholder';
import { View } from '../../types';

interface OwnershipTransferProps {
    navigate: (view: View) => void;
}

const OwnershipTransfer: React.FC<OwnershipTransferProps> = ({ navigate }) => {
  const quickActions = [
    { name: 'Validate Buyer/Seller' },
    { name: 'Check for Dues' },
    { name: 'Issue New Certificate' },
  ];

  return (
    <GenericPlaceholder 
      title="Ownership Transfer"
      description="Validate buyer/seller, dues clear, issue new certificate."
      quickActions={quickActions}
      navigate={navigate}
      backView="staff-applications"
    />
  );
};

export default OwnershipTransfer;