// Mobile Header Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.floating-header').classList.toggle('menu-open');
    });
};

// Sign-In Modal Elements
const modal = document.getElementById('signInModal');
const closeModalBtn = document.getElementById('closeModal');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const submitBtn = document.getElementById('submitBtn');
const modalTitle = document.querySelector('.modal-header h2');

// Open Sign-In Modal
document.querySelectorAll('a[href="#signin"], .nav-link-btn').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) modal.classList.add('active');
    });
});

// Close Sign-In Modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// Client / Developer Role Toggle
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const isDev = btn.dataset.role === 'developer';
        if (submitBtn) {
            submitBtn.textContent = isDev ? 'Sign In as Developer' : 'Sign In as Client';
        }
    });
});

// JS (index_4.js)
// Replace the toggle click event handler in your JS file:

let isSignUpMode = false;

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'toggleAuth') {
        e.preventDefault();
        
        const promptText = document.getElementById('authPromptText');
        const authLink = document.getElementById('toggleAuth');
        const activeRole = document.querySelector('.toggle-btn.active');
        const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
        const confirmPasswordInput = document.getElementById('confirmPasswordInput');
        const googleAuthText = document.getElementById('googleAuthText');
        const roleName = (activeRole && activeRole.dataset.role === 'developer') ? 'Developer' : 'Client';

        isSignUpMode = !isSignUpMode;

        if (isSignUpMode) {
            if (modalTitle) modalTitle.textContent = 'Create an Account';
            if (submitBtn) submitBtn.textContent = `Sign Up as ${roleName}`;
            if (promptText) promptText.textContent = "Already have an account? ";
            if (authLink) authLink.textContent = 'Sign In';
            if (googleAuthText) googleAuthText.textContent = 'Sign Up with Google';
            
            if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'flex';
            if (confirmPasswordInput) confirmPasswordInput.required = true;
        } else {
            if (modalTitle) modalTitle.textContent = 'Welcome Back';
            if (submitBtn) submitBtn.textContent = `Sign In as ${roleName}`;
            if (promptText) promptText.textContent = "Don't have an account? ";
            if (authLink) authLink.textContent = 'Sign Up';
            if (googleAuthText) googleAuthText.textContent = 'Sign In with Google';

            if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'none';
            if (confirmPasswordInput) {
                confirmPasswordInput.required = false;
                confirmPasswordInput.value = '';
            }
        }
    }
});

document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.password-toggle-btn');
    if (!toggleBtn) return;

    const wrapper = toggleBtn.closest('.password-input-wrapper');
    const input = wrapper.querySelector('input');
    const eyeOpen = toggleBtn.querySelector('.eye-open');
    const eyeClosed = toggleBtn.querySelector('.eye-closed');

    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';

    eyeOpen.style.display = isHidden ? 'none' : 'block';
    eyeClosed.style.display = isHidden ? 'block' : 'none';
});




// Contact Modal Functionality
const contactModal = document.getElementById('contactModal');
const closeContactBtn = document.getElementById('closeContactModal');
const projectDetailsField = document.getElementById('projectDetailsField');

document.querySelectorAll('a[href="#contact"], .header-cta').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (contactModal) contactModal.classList.add('active');
    });
});

document.querySelectorAll('.project-inquire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = btn.dataset.projectName || 'a project';
        
        if (projectDetailsField) {
            projectDetailsField.value = `Hi, I am interested in a project similar to: ${projectName}.`;
        }
        
        if (contactModal) contactModal.classList.add('active');
    });
});

if (closeContactBtn) {
    closeContactBtn.addEventListener('click', () => contactModal.classList.remove('active'));
}

if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) contactModal.classList.remove('active');
    });
}
