import { $, $$ } from './utils';

const handleLinkClick = (e) => {
    const { hash } = e.target;

    if (!hash) return;

    e.preventDefault();

    const el = $(hash);

    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

$$('a').forEach((link) => {
    link.addEventListener('click', handleLinkClick);
});
