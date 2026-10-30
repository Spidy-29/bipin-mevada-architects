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
    label: "Principal Architect",
    value: "bipin@bmdesignstudio.in",
    href: "mailto:bipin@bmdesignstudio.in",
  },
  emailSecondary: {
    type: "email" as const,
    icon: Mail,
    label: "Studio Inquiry",
    value: "design@bmdesignstudio.in",
    href: "mailto:design@bmdesignstudio.in",
  },
  location: {
    type: "location" as const,
    icon: MapPin,
    label: "Studio",
    value: "508, MOUNT BIZPARK, Vaishnodevi Circle, Sardar Patel Ring Rd, near Malabar Exotica, opp. Dwarkesh Opulence, Tragad, Gujarat 382470",
  },
};

// Company Information
export const COMPANY_INFO = {
  name: "BM DESIGN",
  subtitle: "Studio",
  tagline: "Every plot has a story, and we’re here to help design it right.",
  copyright: `© ${new Date().getFullYear()} BM Design Studio. All rights reserved.`,
};
