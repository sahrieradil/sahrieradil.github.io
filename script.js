// ============================================================
// ENTRY POINT
// - When the page (DOM) finishes loading, run setup functions.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();  // Call function that handles tab functionality
  setupCTAs();  // Call function that handles CV/Contact buttons
});
/**
 * setupTabs()
 * Handles the behavior of the tab navigation:
 *  - Shows a content panel when a tab is clicked or hovered.
 *  - Clicking the active tab again hides the panel.
 *  - Uses ARIA attributes for accessibility (screen readers).
 */
function setupTabs() {
  // Get the nav container that holds all the tab buttons
  const tabList   = document.getElementById('quick-links');

  // Get all tab buttons inside the nav container
  const tabs      = tabList ? tabList.querySelectorAll('.nav-item[role="tab"]') : [];

  // Get the container that holds all tab panels
  const container = document.getElementById('tab-content');

  // Get all the individual tab content panels inside the container
  const panes     = container ? container.querySelectorAll('.tab-pane') : [];

  // If the elements don't exist (safety check), stop running the function
  if (!tabList || !container || tabs.length === 0 || panes.length === 0) return;

  // "locked" keeps track of the currently active tab
  // null means no tab is active (collapsed)
  let locked = null;

  // Utility function: hides all tabs and all panes
  const hideAll = () => {
    tabs.forEach(t => { 
      t.classList.remove('active');            // Remove active class from all tabs
      t.setAttribute('aria-selected', 'false'); // Mark tab as not selected (accessibility)
    });
    panes.forEach(p => { 
      p.hidden = true;                         // Hide every content pane
    });
    container.classList.remove('active');      // Hide the tab content box
  };

  // Utility function: shows a specific tab + its content pane
  const show = (tab) => {
    const id = tab.dataset.tab;                // Get the target panel ID from data-tab attribute
    const pane = id ? document.getElementById(id) : null; // Find the panel with that ID
    if (!pane) return;                         // If no matching panel, stop

    // Reset all tabs and panels
    tabs.forEach(t => { 
      t.classList.remove('active'); 
      t.setAttribute('aria-selected', 'false'); 
    });
    panes.forEach(p => { 
      p.hidden = true; 
    });

    // Mark the clicked tab as active
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Show the matching panel
    pane.hidden = false;
    container.classList.add('active');         // Show the tab content container
  };

  // Loop through every tab and add event listeners
  tabs.forEach(tab => {
    // Allow Enter or Space key to trigger a tab (keyboard accessibility)
    tab.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { // If Enter or Space is pressed
        e.preventDefault();                     // Prevent page scroll
        tab.click();                            // Simulate a click on the tab
      }
    });

    // When user hovers over a tab (only if nothing is locked)
   // tab.addEventListener('mouseover', () => { 
   //   if (!locked) show(tab);                   // Show the content temporarily
   // });

    // When user moves mouse away from tab (only if nothing is locked)
   // tab.addEventListener('mouseleave', () => { 
   //   if (!locked) hideAll();                   // Hide again
   // });

    // When user clicks on a tab
    tab.addEventListener('click', e => {
      e.preventDefault();                       // Prevent link from refreshing page
      if (locked === tab) {                     // If clicked tab is already active
        locked = null;                          // Unlock it (collapse mode)
        hideAll();                              // Hide all content
      } else {
        locked = tab;                           // Lock the clicked tab as active
        show(tab);                              // Show its content
      }
    });
  });

  // Initial state: everything hidden until interaction
  hideAll();
}
/**
 * setupCTAs()
 * Wires up the two Call-To-Action buttons:
 *  - "CV" button (could open/download your CV file)
 *  - "Contact" button (could open email or scroll to contact form)
 */
function setupCTAs() {
  // Find the CV button
  const cvBtn = document.querySelector('.cta-1');

  // Find the Contact button
  const contactBtn = document.querySelector('.cta-2');

  // If CV button exists, attach a click handler
  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      // Example: open your CV PDF in new tab
      // window.open('cv.pdf', '_blank');
      console.log('TODO: hook up CV download/open'); // Temporary log
    });
  }

  // If Contact button exists, attach a click handler
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      // Example: open mail client
      // window.location.href = 'mailto:you@example.com';
      console.log('TODO: hook up contact action');   // Temporary log
    });
  }
}
