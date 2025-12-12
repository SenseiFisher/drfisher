# Dr. Fisher Endo - React App

This is a React application for Dr. Fisher Endo dental practice website.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/       # Reusable components (Header, Footer)
├── pages/           # Page components (Home, About, Cases, etc.)
├── data/            # Data files (cases data)
├── assets/          # Images and other static assets
├── App.js           # Main app component with routing
└── index.js         # Entry point
```

## Features

- React Router for navigation
- Responsive design
- RTL (Right-to-Left) support for Hebrew
- Case presentation pages
- Equipment showcase
- Contact form
- About page with credentials

## Technologies

- React 18
- React Router DOM 6
- CSS3

## Notes

- Make sure all images are placed in the `public/images/` or `src/assets/images/` directory
- The logo should be placed in `src/assets/logo.png`
- All case images should be imported in `src/data/casesData.js`
