import React from 'react';
import GenericPlaceholder from '../../components/staff/GenericPlaceholder';
import { View } from '../../types';

interface CertificatesProps {
    navigate: (view: View) => void;
}

const Certificates: React.FC<CertificatesProps> = ({ navigate }) => {
  const quickActions = [
    { name: 'Generate Registration' },
    { name: 'Print Certificate' },
    { name: 'Add QR/Hologram Overlay' },
  ];

  return (
    <GenericPlaceholder 
      title="Certificates"
      description="Generate/print registration; QR and hologram overlay."
      quickActions={quickActions}
      navigate={navigate}
      backView="staff-applications"
    />
  );
};

export default Certificates;