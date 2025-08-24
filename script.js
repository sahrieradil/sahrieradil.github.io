// Make script robust and wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.nav-item');
  const panes = document.querySelectorAll('.tab-pane');

  if (!tabs || tabs.length === 0) return;

  // Map each tab to a direction (used only if you add .tab-pane elements)
  const directions = {
    home: 'slide-up',
    services: 'slide-left',
    projects: 'slide-right',
    about: 'slide-left',
    contact: 'slide-right'
  };

  // Always allow nav items to toggle "active" visually.
  tabs.forEach(tab => {
    // use mouseover for hover visual; you can add click if needed
    tab.addEventListener('mouseover', () => {
      // Remove active from all nav items
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // If panes exist and this tab has a data-tab -> toggle pane classes safely
      const paneId = tab.dataset.tab;
      if (!paneId || panes.length === 0) return;

      panes.forEach(p => p.classList.remove('active', 'slide-left', 'slide-right', 'slide-up'));
      const pane = document.getElementById(paneId);
      if (pane) pane.classList.add('active', directions[paneId] || 'slide-up');
    });

    // also support keyboard/click for accessibility
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tab.focus();
      tab.dispatchEvent(new Event('mouseover'));
    });
  });
});
