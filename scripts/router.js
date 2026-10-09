// 1. Map URL hash paths to your partial HTML files
const routes = {
    '#/': 'pages/home.html',
    '#/home': 'pages/home.html',
    '#/about': 'pages/about.html',
    '#/projects': 'pages/projects.html',
    '#/workflow': 'pages/workflow.html',
    '#/devs': 'pages/devs.html',
};

const mainContent = document.getElementById('app');

// 2. Fetch and render content based on the current hash
// async function renderPage() {
//     // Reads whatever comes after the # (e.g. "#/about"), or defaults to "#/"    
//     const currentHash = window.location.hash || '#/';
//     const filePath = routes[currentHash] || routes['#/home'];

//     try {
//         const response = await fetch(filePath);
//         if (!response.ok) throw new Error('Page not found');
//         const html = await response.text();
//         mainContent.innerHTML = html;
//     } catch (error) {
//         mainContent.innerHTML = '<h2>404 - Page Not Found</h2>';
//     }

//     focusedLink();
// };

// Updated renderPage function
async function renderPage() {
    const currentHash = window.location.hash || '#/';
    const filePath = routes[currentHash] || routes['#/home'];

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Page not found');
        const html = await response.text();
        
        // 1. Inject the HTML into the page
        mainContent.innerHTML = html;

        // 2. Find and execute all <script> tags inside the injected HTML
        mainContent.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Copy all attributes (like src, type, defer)
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Copy inline JavaScript code if present
            newScript.textContent = oldScript.textContent;

            // Replace the static script tag with the dynamic executable one
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

    } catch (error) {
        mainContent.innerHTML = '<h2>404 - Page Not Found</h2>';
    }

    focusedLink();
}





// 3. Listen for URL hash changes (clicks or back/forward actions)
window.addEventListener('hashchange', renderPage);

// 4. Load current page on initial load or browser refresh
document.addEventListener('DOMContentLoaded', renderPage);

// Loop through the links in the header. 
// Check the href attributes. Check the router. 
// Does the value in the link attribute match the URL? 
// If yes, style that element.

function focusedLink() {
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('link-focused')
        
        const currentLink = link.hash;
        const currentURL = window.location.hash;
    
        currentLink === currentURL && link.classList.add('link-focused');
    });
};