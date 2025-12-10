# Setup Instructions

## Moving Images to React App

To complete the setup, you need to move your images from the old structure to the new React app structure:

### 1. Logo
Move `logo.png` to `src/assets/logo.png`

### 2. Images
Move all images from the `images/` folder to `src/assets/images/`

You can do this manually or use the following PowerShell command:

```powershell
# Copy all images
Copy-Item -Path "images\*" -Destination "src\assets\images\" -Recurse
```

### 3. Update Image Imports

After moving images, make sure all image imports in the React components are correct. The components are already set up to import from `../assets/images/` or `../assets/logo.png`.

### 4. Install Dependencies

Run:
```bash
npm install
```

### 5. Start Development Server

Run:
```bash
npm start
```

## Notes

- The React app uses ES6 imports for images, so all images need to be in the `src/assets/` directory
- Make sure all case images referenced in `src/data/casesData.js` exist in `src/assets/images/`
- The logo should be at `src/assets/logo.png`

