import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 transition-all duration-300 rounded-full font-medium tracking-wide uppercase text-sm";
  
  const variants = {
    primary: "bg-brand-red text-white hover:bg-black hover:scale-105 shadow-lg shadow-brand-red/20",
    outline: "border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white",
    text: "text-brand-dark hover:text-brand-red px-0 underline-offset-4 hover:underline"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};