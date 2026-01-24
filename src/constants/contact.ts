import { Instagram, Facebook, MessageCircle, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  value: string;
}

export interface ContactInfo {
  type: "email" | "location";
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

// Social Media Links
export const SOCIAL_LINKS: SocialLink[] = [
  { 
    icon: MessageCircle, 
    href: "https://wa.me/919825346592", 
    label: "WhatsApp", 
    value: "+91 98253-46592" 
  },
  { 
    icon: Instagram, 
    href: "https://instagram.com/bipin_mevada_architects/", 
    label: "Instagram", 
    value: "@bipinmevada" 
  },
  // { 
  //   icon: Facebook, 
  //   href: "https://facebook.com", 
  //   label: "Facebook", 
  //   value: "Bipin Mevada Architects" 
  // },
];

// Contact Information
export const CONTACT_INFO = {
  email: {
    type: "email" as const,
    icon: Mail,
    label: "Email",
    value: "bipin.mevada@yahoo.com",
    href: "mailto:bipin.mevada@yahoo.com",
  },
  location: {
    type: "location" as const,
    icon: MapPin,
    label: "Studio",
    value: "Ghatlodia, Ahmedabad",
  },
};

// Company Information
export const COMPANY_INFO = {
  name: "BIPIN MEVADA",
  subtitle: "Architects",
  tagline: "We define architecture not by what is added, but by the space that is created.",
  copyright: `© ${new Date().getFullYear()} Bipin Mevada Architects. All rights reserved.`,
};
