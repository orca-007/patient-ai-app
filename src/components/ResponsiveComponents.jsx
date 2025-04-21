import React from 'react';

// This file contains responsive utility components and styles for mobile optimization

// Responsive container that adjusts padding based on screen size
export function ResponsiveContainer({ children, className = "" }) {
  return (
    <div className={`w-full px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Grid layout that switches between column and row based on screen size
export function ResponsiveGrid({ children, cols = 2, className = "" }) {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
  };

  return (
    <div className={`grid gap-4 ${gridColsClass[cols] || 'grid-cols-1 md:grid-cols-2'} ${className}`}>
      {children}
    </div>
  );
}

// Stack that changes direction based on screen size
export function ResponsiveStack({ children, direction = "row", className = "" }) {
  const directionClass = direction === "row" 
    ? "flex-col md:flex-row" 
    : "flex-col";

  return (
    <div className={`flex gap-4 ${directionClass} ${className}`}>
      {children}
    </div>
  );
}

// Responsive text that adjusts size based on screen
export function ResponsiveText({ children, variant = "body", className = "" }) {
  const sizeClass = {
    h1: "text-2xl md:text-4xl font-bold",
    h2: "text-xl md:text-3xl font-bold",
    h3: "text-lg md:text-2xl font-semibold",
    body: "text-sm md:text-base",
    small: "text-xs md:text-sm"
  };

  return (
    <div className={`${sizeClass[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Responsive button with touch-friendly sizing on mobile
export function ResponsiveButton({ children, onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg touch-manipulation ${className}`}
    >
      {children}
    </button>
  );
}

// Responsive input with larger touch targets on mobile
export function ResponsiveInput({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-3 md:py-2 text-base border rounded-lg ${className}`}
    />
  );
}

// Responsive form field with stacked label on mobile
export function ResponsiveFormField({ label, children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

// Media query hook for responsive logic in components
export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Responsive visibility components
export function MobileOnly({ children }) {
  return <div className="md:hidden">{children}</div>;
}

export function DesktopOnly({ children }) {
  return <div className="hidden md:block">{children}</div>;
}

// Touch-friendly overlay for mobile interactions
export function TouchOverlay({ children, onClose, isOpen }) {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
