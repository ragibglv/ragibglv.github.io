/* ========================================
   THEME TOGGLE - DAY/NIGHT MODE
   ======================================== */

(function () {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply theme on page load (before DOM ready to prevent flash)
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        const themeToggle = document.querySelector('.theme-toggle');

        if (themeToggle) {
            // Update toggle button state
            updateToggleButton(savedTheme);

            // Toggle theme on click
            themeToggle.addEventListener('click', function () {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                // Apply new theme
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);

                // Update button
                updateToggleButton(newTheme);
            });
        }
    });

    function updateToggleButton(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');

        if (theme === 'dark') {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
})();
