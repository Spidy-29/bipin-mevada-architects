// This file serves as a centralized place to manage all project images and videos
// You can easily add, remove, or update project items here without touching the component

export interface ProjectItem {
  id: number;
  image: string;
  video?: string; // Optional video file path
  featured?: boolean; // Optional property to make certain items larger in the grid
  type: 'image' | 'both'; // Type of media
}

// Add your project items here
export const projectItems: ProjectItem[] = [
  {
    id: 16,
    image: "/images/16.webp",
    featured: true,
    type: 'image',
  },
  {
    id: 15,
    image: "/images/15.webp",
    type: 'image',
  },
  {
    id: 1,
    image: "/images/1.jpg",
    type: 'image',
  },
  {
    id: 16,
    image:"/images/17.png",
    video: "/videos/5.mp4",
    type: 'both',
  },
  {
    id: 3,
    image: "/images/3.jpg",
    type: 'image',
  },
  {
    id: 2,
    image: "/images/2.jpg",
    type: 'image',
  },
  {
    id: 4,
    image: "/images/4.jpg",
    type: 'image',
  },
  {
    id: 5,
    image: "/images/5.jpg",
    type: 'image',
  },
  {
    id: 6,
    image: "/images/6.jpg",
    type: 'image',
  },
  {
    id: 7,
    image: "/images/11.jpg",
    type: 'image',
  },
  {
    id: 8,
    image: "/images/8.jpg",
    type: 'image',
  },
  {
    id: 9,
    image: "/images/9.jpg",
    type: 'image',
  },
  {
    id: 10,
    image: "/images/10.jpg",
    type: 'image',
  },
  {
    id: 11,
    image: "/images/7.jpg",
    type: 'image',
  },
  {
    id: 12,
    image: "/images/12.jpg",
    type: 'image',
  },
];

// Function to get all project items
export const getAllProjectItems = (): ProjectItem[] => {
  return projectItems;
};

// Function to get a specific project item by ID
export const getProjectItemById = (id: number): ProjectItem | undefined => {
  return projectItems.find((project) => project.id === id);
};

// Legacy function for backward compatibility
export const getAllProjectImages = (): ProjectItem[] => {
  return projectItems;
};

export const getProjectImageById = (id: number): ProjectItem | undefined => {
  return projectItems.find((project) => project.id === id);
};

// Export the old interface for backward compatibility
export interface ProjectImage extends ProjectItem {}
