document.addEventListener('DOMContentLoaded', () => {
  // Initialize tab system
  initTabSystem();
  
  // Add click handlers for CTA buttons
  initCTAButtons();
});

function initTabSystem() {
  const tabs = document.querySelectorAll('#quick-links .nav-item');
  const panes = document.querySelectorAll('.tab-pane');
  const tabContent = document.querySelector('.tab-content');

  // Early return if elements don't exist
  if (tabs.length === 0 || panes.length === 0 || !tabContent) {
    console.warn('Tab system elements not found');
    return;
  }

  let lockedTab = null;

  // Helper: Show a specific pane
  function showPane(tab) {
    const paneId = tab.dataset.tab;
    if (!paneId) return;

    // Update tab states
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update pane states
    panes.forEach(p => p.classList.remove('active'));
    const pane = document.getElementById(paneId);
    if (pane) pane.classList.add('active');

    // Show tab content container
    tabContent.classList.add('active');
    
    // Update ARIA attributes for accessibility
    tab.setAttribute('aria-selected', 'true');
    pane.setAttribute('aria-hidden', 'false');
  }

  // Helper: Hide all panes
  function hideAll() {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    
    panes.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-hidden', 'true');
    });
    
    tabContent.classList.remove('active');
  }

  // Set up tab event listeners
  tabs.forEach(tab => {
    // Set initial ARIA attributes
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('aria-controls', tab.dataset.tab);
    
    // Hover to preview
    tab.addEventListener('mouseover', () => {
      if (lockedTab !== tab) showPane(tab);
    });

    tab.addEventListener('mouseleave', () => {
      if (!lockedTab) hideAll();
      else showPane(lockedTab);
    });

    // Click to lock/settle or toggle off
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      if (lockedTab === tab) {
        // Same tab clicked again → collapse
        lockedTab = null;
        hideAll();
      } else {
        lockedTab = tab;
        showPane(tab);
      }
    });
    
    // Keyboard navigation support
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tab.click();
      }
    });
  });

  // Set initial ARIA attributes for panes
  panes.forEach(pane => {
    pane.setAttribute('role', 'tabpanel');
    pane.setAttribute('aria-hidden', 'true');
  });
  
  tabContent.setAttribute('role', 'tablist');
}

function initCTAButtons() {
  const cvButton = document.querySelector('.cta-1');
  const contactButton = document.querySelector('.cta-2');
  
  if (cvButton) {
    cvButton.addEventListener('click', () => {
      // Add CV download functionality here
      console.log('CV button clicked - implement download functionality');
      // Example: window.open('path/to/cv.pdf', '_blank');
    });
  }
  
  if (contactButton) {
    contactButton.addEventListener('click', () => {
      // Add contact functionality here
      console.log('Contact button clicked - implement contact functionality');
      // Example: scroll to contact section or open contact modal
    });
  }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Error boundary for any potential issues
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});
