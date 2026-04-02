'use client';

import { useState } from 'react';
import AnimatedBookingFlow from '@/components/AnimatedBookingFlow';

export default function ReservationsPage() {
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedBookingFlow 
        isOpen={isBookingFlowOpen} 
        onClose={() => setIsBookingFlowOpen(false)} 
      />
    </div>
  );
}
