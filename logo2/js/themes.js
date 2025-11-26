// const easingInput = document.getElementById('easing');
const themeButtons = document.querySelectorAll('[data-theme]');

const termsColors = ['yellow','black','gray','white']

function setTheme(themeName) {
  const s = svgEl();
  if (!s) return;
  const g = s.getElementById('logo_container');
  if (!g) return;

  termsColors.forEach(c => g.classList.remove(c));
  if (themeName) g.classList.add(themeName);

  updateLiveVars();
}

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-theme');
    setTheme(theme);
    restartAnimations();
  });
});
