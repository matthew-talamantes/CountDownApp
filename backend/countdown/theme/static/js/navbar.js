document.addEventListener('alpine:init', () => {
    Alpine.data('navbar', () => ({
        windowWidth: window.innerWidth,
        updateWidth() { this.windowWidth = window.innerWidth;},
    }));
});