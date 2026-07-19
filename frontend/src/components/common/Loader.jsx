import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 h-full min-h-[200px]">
      <Loader2 className="w-8 h-8 text-blue-light animate-spin" />
      <p className="text-slate-500 font-medium">{text}</p>
    </div>
  );
};
