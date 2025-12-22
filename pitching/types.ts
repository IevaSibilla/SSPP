import React from 'react';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}