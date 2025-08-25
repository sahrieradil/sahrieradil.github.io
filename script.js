document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#quick-links .nav-item');
  const panes = document.querySelectorAll('.tab-pane');
  const tabContent = document.querySelector('.tab-content');

  if (tabs.length === 0 || panes.length === 0 || !tabContent) return;

  let lockedTab = null; // currently settled tab

  // helper: show a pane
  function showPane(tab) {
    const paneId = tab.dataset.tab;
    if (!paneId) return;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    panes.forEach(p => p.classList.remove('active'));
    const pane = document.getElementById(paneId);
    if (pane) pane.classList.add('active');

    tabContent.classList.add('active'); // reveal container
  }

  // helper: hide all
  function hideAll() {
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    tabContent.classList.remove('active'); // hide container
  }

  // hover to preview
  tabs.forEach(tab => {
    tab.addEventListener('mouseover', () => {
      if (lockedTab !== tab) showPane(tab);
    });

    tab.addEventListener('mouseleave', () => {
      if (!lockedTab) hideAll();
      else showPane(lockedTab);
    });

    // click to lock/settle or toggle off
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      if (lockedTab === tab) {
        // 👇 same tab clicked again → collapse
        lockedTab = null;
        hideAll();
      } else {
        lockedTab = tab;
        showPane(tab);
      }
    });
  });
});
