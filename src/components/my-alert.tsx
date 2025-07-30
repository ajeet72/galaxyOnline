// components/MyAlert.tsx
import React from 'react';

export default function MyAlert({ type, children }: { type: 'info' | 'warning' | 'error'; children: React.ReactNode }) {
  const bg = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded border ${bg[type]}`}>
      {children}
    </div>
  );
}
