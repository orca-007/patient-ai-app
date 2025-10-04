import React, { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children, cols = 2, className = "" }) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
  };

  return (
    <div className={`grid gap-4 ${gridColsClass[cols]} ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveStackProps {
  children: ReactNode;
  direction?: "row" | "col";
  className?: string;
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({ children, direction = "row", className = "" }) => {
  const directionClass = direction === "row" 
    ? "flex-col md:flex-row" 
    : "flex-col";

  return (
    <div className={`flex gap-4 ${directionClass} ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small';
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({ children, variant = "body", className = "" }) => {
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
};

interface ResponsiveButtonProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg touch-manipulation ${className}`}
    >
      {children}
    </button>
  );
};

interface ResponsiveInputProps {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const ResponsiveInput: React.FC<ResponsiveInputProps> = ({ type = "text", placeholder, value, onChange, className = "" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-3 md:py-2 text-base border rounded-lg ${className}`}
    />
  );
};

interface ResponsiveFormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const ResponsiveFormField: React.FC<ResponsiveFormFieldProps> = ({ label, children, className = "" }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-1">
        {label}
      </label>
      {children}
    </div>
  );
};

export function useMediaQuery(query: string): boolean {
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

interface MobileOnlyProps {
  children: ReactNode;
}

export const MobileOnly: React.FC<MobileOnlyProps> = ({ children }) => {
  return <div className="md:hidden">{children}</div>;
};

interface DesktopOnlyProps {
  children: ReactNode;
}

export const DesktopOnly: React.FC<DesktopOnlyProps> = ({ children }) => {
  return <div className="hidden md:block">{children}</div>;
};

interface TouchOverlayProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const TouchOverlay: React.FC<TouchOverlayProps> = ({ children, onClose, isOpen }) => {
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
};
