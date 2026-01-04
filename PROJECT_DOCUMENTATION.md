# Bipin Mevada Architects - Project Documentation (Revamped)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Pages & Routing](#pages--routing)
5. [Key Components](#key-components)
6. [Design System](#design-system)
7. [Asset Management](#asset-management)
8. [Development Workflow](#development-workflow)

---

## Project Overview

**Bipin Mevada Architects** is a premium architectural portfolio website reimagined with a modern, minimalist design aesthetic. The project emphasizes negative space, elegant typography, and smooth transitions to showcase the studio's portfolio of residential and commercial projects.

### Core Philosophy
- **Structure & Silence**: The design language mirrors the architectural philosophy of the studio.
- **Visual First**: High-quality imagery takes center stage with masonry layouts and large hero sections.
- **Responsiveness**: A seamless experience across mobile, tablet, and desktop devices.

---

## Technology Stack

### Core Frameworks
| Technology | Description |
|------------|-------------|
| **React** | v18.3.1 - UI Library |
| **Vite** | v5.4 - Build Tool & Dev Server |
| **TypeScript** | v5.8 - Static Typing |
| **Tailwind CSS** | v3.4 - Utility-first Styling |

### UI & Animation
- **Radix UI**: Accessible UI primitives (Dialog, Slot, etc.).
- **Shadcn UI**: Reusable component patterns using Tailwind and Radix.
- **Lucide React**: Iconography.
- **Class Variance Authority (CVA)**: Managing component variants.
- **Clsx & Tailwind-Merge**: Conditional class handling.

---

## Project Structure

```
bipin-mevada-architects/
│
├── public/                  # Static assets
│   ├── images/              # Project images (1.jpg, etc.)
│   └── ...
│
├── src/
│   ├── assets/              # Importable assets (logo, specific graphics)
│   ├── components/
│   │   ├── ui/              # Shadcn/Radix UI primitives (Button, etc.)
│   │   ├── Footer.tsx       # Site Footer
│   │   ├── GridBackground.tsx # Subtle background effect
│   │   ├── Header.tsx       # Main Navigation
│   │   └── NavLink.tsx      # Navigation helper
│   │
│   ├── hooks/               # Custom React hooks (use-toast, etc.)
│   ├── lib/                 # Utilities (cn, utils.ts)
│   ├── pages/
│   │   ├── About.tsx        # Studio Info & Contact
│   │   ├── Index.tsx        # Homepage
│   │   ├── NotFound.tsx     # 404 Page
│   │   ├── Portfolio.tsx    # Full Project Gallery
│   │   └── ProjectDetail.tsx # Single Project View
│   │
│   ├── App.tsx              # Root with Routes
│   ├── main.tsx             # Entry Point
│   └── index.css            # Global Styles & Tailwind Config
```

---

## Pages & Routing

The application uses `react-router-dom` for client-side routing.

1.  **Homepage (`/`)**:
    *   **Hero**: Full-screen visual with "Structure & Silence" branding.
    *   **Featured Projects**: A selection of key works.
    *   **Gallery Preview**: Grid of visual stories.
    *   **About Preview**: Brief studio introduction.

2.  **Portfolio (`/portfolio`)**:
    *   **Filterable Grid**: Filter projects by Architecture, Interior, or Video.
    *   **Masonry Layout**: Dynamic layout adapting to screen size.
    *   **Project Cards**: Hover effects revealing details.

3.  **Project Detail (`/project/:id`)**:
    *   **Dynamic Routing**: Loads data based on URL ID.
    *   **Hero Image**: Large cover image.
    *   **Details Grid**: Location, Area, Type, Status.
    *   **Gallery**: Sequential display of project images.
    *   **Navigation**: Next/Previous project links.

4.  **About (`/about`)**:
    *   **Studio Philosophy**: detailed text.
    *   **Services**: List of architectural services.
    *   **Contact**: Functional contact form (UI only) and social links.

---

## Key Components

### UI Primitives (`src/components/ui`)
Re-usable low-level components built with **Shadcn UI** patterns.
- **Button**: Supports multiple variants (`default`, `outline`, `architectural`, `minimal`).
- **Toast**: For user feedback (used in Contact form).

### Smart Components
- **Header**: Responsive navbar that changes style on scroll.
- **GridBackground**: A fixed geometric background pattern that adds depth without distraction.

---

## Design System

### Colors
Defined in `tailwind.config.ts` and CSS variables:
- **Background**: White/Clean for a gallery feel.
- **Foreground**: High contrast dark gray/black for text.
- **Muted**: Softer grays for secondary text (`text-muted-foreground`).
- **Accent**: Subtle interactions.

### Typography
- **Font Serif**: Used for Headings (Elegant, Editorial).
- **Font Sans**: Used for Body text (Clean, Readable).

### Animations
- **Fade Up**: Elements animate in as they enter the viewport.
- **Hover States**: Subtle scaling and opacity shifts on project cards.

---

## Asset Management

**Images** are currently hosted in the `public/images/` directory.
- Naming convention: `1.jpg`, `2.jpg`, etc.
- Referenced in code as absolute paths (e.g., `/images/1.jpg`).

**Data Management**:
- Project data is currently defined in `src/pages/ProjectDetail.tsx` (Dictionary) and `src/pages/Portfolio.tsx` (List).
- **Future Improvement**: Move this data to a centralized JSON or separate TypeScript file (e.g., `src/data/projects.ts`) for single-source-of-truth.

---

## Development Workflow

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
# Runs on localhost:8080 or available port
```

### Production Build
```bash
npm run build
# Outputs to dist/ directory
```

### Adding a New Project
1.  Add images to `public/images/`.
2.  Add entry in `projectsData` in `src/pages/ProjectDetail.tsx`.
3.  Add entry in `portfolioItems` in `src/pages/Portfolio.tsx`.

