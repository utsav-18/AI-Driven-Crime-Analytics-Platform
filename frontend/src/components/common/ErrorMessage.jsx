import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message = "Something went wrong", retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 h-full min-h-[200px] text-center">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-navy-900">Error Loading Data</h3>
        <p className="text-slate-500 mt-1 max-w-sm">{message}</p>
      </div>
      {retry && (
        <button 
          onClick={retry}
          className="mt-4 px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
