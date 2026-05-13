const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Create subdirectories with index.html for each route
const routes = [
    { src: 'about', dest: 'about-us' },
    { src: 'menu', dest: 'menu' },
    { src: 'blogs', dest: 'blogs' },
    { src: 'faq', dest: 'faq' }
];

routes.forEach(route => {
    const routeName = route.dest;
    const srcName = route.src;

    const routeDir = path.join(distDir, routeName);

    // Create directory if it doesn't exist
    if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
    }

    // Copy the HTML file as index.html in the subdirectory
    const sourceFile = path.join(distDir, `${srcName}.html`);
    const destFile = path.join(routeDir, 'index.html');

    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Created: ${routeName}/index.html`);
    } else {
        console.warn(`Source file not found: ${sourceFile}`);
    }
});

console.log('Done! Subdirectories created with index.html files for SEO.');
