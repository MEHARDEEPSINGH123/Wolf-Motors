'use client';

import React from 'react';
import { useWolfData } from '@/context/WolfDataContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismissToast } = useWolfData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const borderColors = {
          success: 'border-forest/60 bg-obsidian-surface/95 text-wolf-white shadow-forest-glow',
          info: 'border-silver/40 bg-obsidian-surface/95 text-wolf-white',
          warning: 'border-amber-600/50 bg-obsidian-surface/95 text-wolf-white',
          crimson: 'border-crimson/70 bg-obsidian-surface/95 text-wolf-white shadow-crimson-glow',
        };

        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-forest-light shrink-0" />,
          info: <Info className="w-5 h-5 text-silver shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          crimson: <AlertTriangle className="w-5 h-5 text-crimson-light shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${borderColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 pr-2">
              <h4 className="text-xs uppercase tracking-widest font-bold text-silver-light">
                {toast.title}
              </h4>
              <p className="text-xs text-wolf-muted mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-silver hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
