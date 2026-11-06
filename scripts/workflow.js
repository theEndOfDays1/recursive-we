// Remove DOMContentLoaded — Event delegation handles dynamically loaded router views automatically!
document.addEventListener("click", (e) => {
  // Check if click (or click on child element) happened inside a cost-tab-btn
  const button = e.target.closest(".cost-tab-btn");
  if (!button) return; // Exit if click wasn't on a tab button

  // Prevent default button behavior or link propagation if any
  e.preventDefault();

  const container = button.closest("#interactive-cost-display");
  if (!container) return;

  const tabButtons = container.querySelectorAll(".cost-tab-btn");
  const panels = container.querySelectorAll(".cost-panel");

  // Remove active states from buttons & panels
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  panels.forEach((panel) => panel.classList.remove("active"));

  // Add active state to clicked button
  button.classList.add("active");

  // Show corresponding panel
  const targetId = button.getAttribute("data-target");
  const targetPanel = container.querySelector(`#${targetId}`);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }
});







// Initialize Scroll-Reveal for Vertical Timeline Nodes
function initTimelineObserver() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  timelineItems.forEach((item) => observer.observe(item));
}

// Event listener for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimelineObserver);
} else {
  initTimelineObserver();
}





document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".workflow-tabs .tab-btn");
  const workflowTracks = document.querySelectorAll(".workflow-section .workflow-track");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and tracks
      tabButtons.forEach(btn => btn.classList.remove("active"));
      workflowTracks.forEach(track => track.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Find and activate the corresponding track based on data-tab attribute
      const targetTab = button.getAttribute("data-tab");
      const targetTrack = document.getElementById(`track-${targetTab}`);
      
      if (targetTrack) {
        targetTrack.classList.add("active");
      }
    });
  });
});