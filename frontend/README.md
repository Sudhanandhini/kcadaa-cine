# KCADAA Website

A modern, responsive website for the Karnataka Cine Art-Directors and Assistants Association built with React, Vite, and Tailwind CSS.

## Features

- ✅ Fully responsive design
- ✅ Modern UI with Tailwind CSS
- ✅ Multiple pages (Home, About, Members, Gallery, Events, Contact)
- ✅ React Router for navigation
- ✅ Smooth animations
- ✅ Contact form
- ✅ Newsletter subscription
- ✅ Gallery with image viewer
- ✅ Event showcase

## Tech Stack

- **React 18** - Frontend library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Framer Motion** - Animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd kcadaa-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
kcadaa-website/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Hero.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Members.jsx
│   │   ├── Gallery.jsx
│   │   ├── Events.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Color Scheme

- **Primary Blue**: #0066B2
- **Accent Yellow**: #FFC107
- **Text**: Gray scale

## Pages

1. **Home** - Landing page with welcome section, services, and board members
2. **About** - Association history, mission, vision, and timeline
3. **Members** - Board members, committee members, art directors, and assistants
4. **Gallery** - Photo gallery with lightbox viewer
5. **Events** - Event showcase with descriptions and images
6. **Contact** - Contact information and message form

## Customization

### Updating Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#0066B2',
    dark: '#004d87',
  },
  accent: {
    DEFAULT: '#FFC107',
    dark: '#FFA000',
  },
}
```

### Adding Images

Replace placeholder images in the component files with your actual images. You can:
- Add images to `src/assets/`
- Use external image URLs
- Use an image hosting service

### Updating Content

Content can be updated by editing the respective page files in `src/pages/`.

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to Netlify

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 Karnataka Cine Art Directors and Assistants Association

## Contact

- Phone: +91 74110 41975
- Email: kcadaa.blr@gmail.com
- Website: www.kcadaa.com
