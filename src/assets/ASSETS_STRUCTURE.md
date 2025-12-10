# Assets Directory Structure

This document describes the organization of assets in the React app.

## Directory Structure

```
src/assets/
├── logo.png                    # Main logo
└── images/
    ├── hero/                   # Hero section images
    │   ├── hero-main.jpg
    │   ├── hero1.jpg
    │   ├── hero2.jpg
    │   ├── hero3.jpg
    │   └── hero4.jpg
    ├── about/                  # About page images
    │   ├── about-image.jpg
    │   └── about-profile.png
    ├── equipment/              # Equipment showcase images
    │   ├── equipment-hero.jpg
    │   ├── equipment-image1.png
    │   ├── equipment-image2.png
    │   ├── equipment-image4.png
    │   ├── equipment-rubber-dam.jpg
    │   ├── equipment-ultrasonic.jpg
    │   ├── image1_edited_edited.png
    │   ├── image2_edited_edited.png
    │   ├── image3_edited_edited.png
    │   ├── image4_edited_edited.png
    │   ├── image5_edited.jpg
    │   └── image6_edited.jpg
    ├── projects/               # Project thumbnail images
    │   ├── project1.jpg
    │   ├── project2.jpg
    │   ├── project3.jpg
    │   ├── project4.jpg
    │   ├── project5.jpg
    │   ├── project6.jpg
    │   ├── project7.jpg
    │   └── project8.jpg
    └── cases/                  # Case study images
        ├── guta-perka-*.jpg
        ├── itum-nekev-*.jpg
        ├── havharat-case*.jpg
        ├── machshir-case*.jpg
        ├── kifuf-case*.jpg
        ├── morphologia-case*.jpg
        ├── ripui-case*.jpg
        └── sium-case*.jpg
```

## Usage in Components

- **Home page**: Uses `images/hero/hero-main.jpg`
- **About page**: Uses `images/about/about-profile.png`
- **Cases page**: Uses `images/projects/project*.jpg` for thumbnails
- **Case Detail pages**: Uses `images/cases/*.jpg` for case study images
- **Equipment page**: Uses `images/equipment/*.png` and `images/equipment/*.jpg`

## Adding New Images

When adding new images:
1. Place them in the appropriate subdirectory
2. Update the import statements in the relevant component
3. For case images, update `src/data/casesData.js`

