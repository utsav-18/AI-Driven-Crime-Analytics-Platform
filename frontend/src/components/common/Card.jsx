import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn("bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
};
