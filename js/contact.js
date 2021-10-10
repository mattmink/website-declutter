import { $, $$ } from './utils';
import createCaptcha from './captcha';

const form = $('#contactForm');
const button = form.querySelector('button').parentElement;
const alert = document.createElement('div');
const phone = $('#phone');
const phoneParts = $$('#phone span');

function showPhone() {
    String.fromCharCode(...'53514951495752534955'.match(/\d{1,2}/g).reverse())
        .match(/(\d{3})(\d{3})(\d{4})/)
        .slice(1)
        .forEach((part, i) => {
            phoneParts[i].innerText = part;
        });
    phone.classList.remove('obfuscate');
}

const showAlert = (type, message) => {
    alert.className = `alert alert-${type}`;
    alert.innerText = message;
    form.insertBefore(alert, button);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form);

    alert.remove();

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
        .then(({ status, statusText }) => {
            if (status >= 400) throw new Error(statusText);
            showAlert('success', 'Thank you for reaching out! I\'ll get back to you as soon as I can');
        })
        .catch((error) => {
            showAlert('error', 'Something seems to have gone wrong while sending the message. Please try again, or give me a call instead.')
        });
});

createCaptcha($('#phoneCaptcha'), showPhone);
