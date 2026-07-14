export const THEME_STORAGE_KEY = 'varsal-theme'

export type Theme = 'light' | 'dark'

/**
 * Script inyectado antes de la hidratación para fijar data-theme
 * sin parpadeo (FOUC). Por defecto: light (tema corporativo principal).
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`
