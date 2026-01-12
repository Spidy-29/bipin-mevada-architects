export type AssetType = 'image' | 'video' | 'pdf';
export type WorkCategory = 'architecture' | 'interior';
export type PropertyType = 'residential' | 'commercial' | 'hospitality' | 'institutional' | 'office' | string; // allowing string for flexibility but suggesting common ones
export type SpaceType = 'plot' | 'villa' | 'apartment' | 'penthouse' | 'office' | string;
export type Visibility = 'public' | 'hidden';

/**
 * Base entity interface containing common fields across different content types.
 * Helps in maintaining consistency for shared metadata fields.
 */
interface BaseEntity {
  /** Geographic location of the project/asset (e.g., "Surat, Gujarat") */
  location?: string;
  
  /** Year of completion or creation */
  year?: number;
  
  /** Category of the property (e.g., Residential, Commercial) */
  property_type?: PropertyType;
  
  /** Specific type of the space (e.g., Villa, Apartment) */
  space_type?: SpaceType;
  
  /** Whether the item should be highlighted in featured sections */
  is_featured: boolean;
  
  /** Order in which the item should generally be displayed (ascending) */
  display_order?: number;
  
  /** Visibility status controls whether the item is shown to end users */
  visibility: Visibility;
}

/**
 * Represents a specific architectural or interior design project.
 * A project serves as a container or context for multiple assets.
 */
export interface Project extends BaseEntity {
  /** Unique identifier for the project (e.g., P001, P002) */
  project_id: string;
  
  /** Display title of the project */
  project_title: string;
  
  /** Detailed description of the project */
  project_description?: string;
}

/**
 * Represents a media asset (Image, Video, or PDF) related to the portfolio.
 * Assets can belong to a specific project or be standalone.
 */
export interface Asset extends BaseEntity {
  /** Unique identifier for the asset (e.g., A001) */
  asset_id: string;
  
  /** Type of the media asset */
  asset_type: AssetType;
  
  /** Direct URL to the asset source (e.g., Google Drive link) */
  asset_url: string;
  
  /** 
   * Optional thumbnail URL for videos or PDFs. 
   * If not provided, the system may attempt to use the asset_url (for images) or a placeholder.
   */
  thumbnail_url?: string;
  
  /** Asset-specific title (often different from Project title) */
  title?: string;
  
  /** Asset-specific description or caption */
  description?: string;
  
  /** Link to the parent Project, if applicable */
  project_id?: string;
  
  /** High-level category relative to our work scope */
  work_category?: WorkCategory;

  /** 
   * Array of descriptive labels/tags for filtering or searching 
   * (e.g., ["Kitchen", "Modern", "Facade"])
   */
  labels?: string[];
}
