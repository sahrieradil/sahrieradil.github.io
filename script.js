const tabs = document.querySelectorAll('.tab-menu .nav-item');
const panes = document.querySelectorAll('.tab-pane');

// Map each tab to a direction
const directions = {
  home: "slide-up",
  services: "slide-left",
  projects: "slide-right",
  about: "slide-left",
  contact: "slide-right"
};

tabs.forEach(tab => {
  tab.addEventListener('mouseover', () => {
    // Remove active + animations from all
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => {
      p.classList.remove('active', 'slide-left', 'slide-right', 'slide-up');
    });

    // Add active + animation to current
    tab.classList.add('active');
    const pane = document.getElementById(tab.dataset.tab);
    pane.classList.add('active', directions[tab.dataset.tab]);
  });
});
