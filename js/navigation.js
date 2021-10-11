import { $, $$, getScrollbarWidth } from './utils';


/**
 * MOBILE MENU TOGGLE
 */
 const $menuToggle = $('#menuToggle');
 const isMenuOpen = () => document.body.classList.contains('menu-open');

 const openNavMenu = () => {
     const scrollBarWidth = getScrollbarWidth();
     if (scrollBarWidth > 0) {
         document.body.style.paddingRight = `${scrollBarWidth}px`;
     }
     document.body.classList.remove('menu-closing');
     document.body.classList.add('menu-open');
     $menuToggle.setAttribute('aria-label', 'Close Menu');
     $menuToggle.setAttribute('aria-expanded', true);
 }

 const closeNavMenu = () => {
     if (!isMenuOpen()) return;
     document.body.classList.add('menu-closing');
     document.body.classList.remove('menu-open');
     document.body.style.paddingRight = null;
     setTimeout(() => {
         document.body.classList.remove('menu-closing');
         $menuToggle.setAttribute('aria-label', 'Open Menu');
         $menuToggle.setAttribute('aria-expanded', false);
     }, 2500);
 };
 const toggleNavMenu = () => {
     if (isMenuOpen()) closeNavMenu();
     else openNavMenu();
 };

 $menuToggle.addEventListener('click', toggleNavMenu);
 $('#mainNav').addEventListener('click', ({ target }) => {
     if (target.id === 'mainNav') closeNavMenu();
 });

/**
 * SCROLL TO SECTION ON LINK CLICK
 */
const handleLinkClick = (e) => {
    const { hash } = e.target;

    if (!hash) return;

    e.preventDefault();

    const el = $(hash);

    if (!el) return;

    closeNavMenu();
    el.scrollIntoView({ behavior: 'smooth' });
}

$$('a').forEach((link) => {
    link.addEventListener('click', handleLinkClick);
});
