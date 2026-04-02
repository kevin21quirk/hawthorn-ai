'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedBookingFlow from '@/components/AnimatedBookingFlow';

export default function ReservationsPage() {
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsBookingFlowOpen(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedBookingFlow 
        isOpen={isBookingFlowOpen} 
        onClose={handleClose} 
      />
    </div>
  );
}
