
import { Asset, Project } from '../types/cms';

export const mockAssets: Asset[] = [
  {
    asset_id: 'A001',
    asset_type: 'image',
    asset_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    title: 'Modern Villa Exterior',
    project_id: 'P001',
    work_category: 'architecture',
    property_type: 'residential',
    space_type: 'villa',
    is_featured: true,
    visibility: 'public',
    display_order: 1,
    labels: ['modern', 'villa', 'exterior']
  },
  {
    asset_id: 'A002',
    asset_type: 'image',
    asset_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
    title: 'Minimalist Interior',
    project_id: 'P001',
    work_category: 'interior',
    property_type: 'residential',
    is_featured: true,
    visibility: 'public',
    display_order: 2,
    labels: ['interior', 'minimalist']
  },
  {
      asset_id: 'A003',
      asset_type: 'image',
      asset_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80',
      title: 'Office Complex',
      project_id: 'P002',
      work_category: 'architecture',
      property_type: 'office',
      is_featured: true,
      visibility: 'public',
      display_order: 3,
      labels: ['office', 'corporate']
    }
];

export const mockProjects: Project[] = [
  {
    project_id: 'P001',
    project_title: 'The Stone House',
    project_description: 'A contemporary residential villa focusing on natural materials.',
    location: 'Ahmedabad',
    property_type: 'residential',
    is_featured: true,
    visibility: 'public',
    display_order: 1,
    year: 2023
  },
  {
    project_id: 'P002',
    project_title: 'Tech Park One',
    project_description: 'Modern office space designed for collaboration.',
    location: 'Gandhinagar',
    property_type: 'office',
    is_featured: true,
    visibility: 'public',
    display_order: 2,
    year: 2024
  }
];
