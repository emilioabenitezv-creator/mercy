import React from 'react';

const FULL = ['VISA', 'Mastercard', 'AMEX', 'Mercado Pago', 'OXXO', 'PayPal'];
const COMPACT = ['VISA', 'MC', 'AMEX', 'MP', 'OXXO'];

export default function PaymentMethods({ compact = false, className = '' }) {
  const list = compact ? COMPACT : FULL;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {list.map((m) => (
        <span key={m} className="px-2 py-1 bg-[#111111] border border-white/[0.08] rounded text-[10px] font-mono text-[#A0A0A0] whitespace-nowrap">
          {m}
        </span>
      ))}
    </div>
  );
}
