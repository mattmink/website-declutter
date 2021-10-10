import http from './http';

const GOOGLE_SITE_KEY = '6Lfpnr8cAAAAAMxgt7xp-w6AWaeY9tBsiIiiruID';
const googleAPI = `https://www.google.com/recaptcha/api.js?render=${GOOGLE_SITE_KEY}`;
const captchaTemplate = `<div class="m-captcha-inner">
    <div class="m-captcha-control">
        <button id="captchaButton"></button>
        <div class="check">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.973 533.973">
                <path
                        d="M477.931,52.261c-12.821-12.821-33.605-12.821-46.427,0l-266.96,266.954l-62.075-62.069
                        c-12.821-12.821-33.604-12.821-46.426,0L9.616,303.572c-12.821,12.821-12.821,33.604,0,46.426l85.289,85.289l46.426,46.426
                        c12.821,12.821,33.611,12.821,46.426,0l46.426-46.426l290.173-290.174c12.821-12.821,12.821-33.605,0-46.426L477.931,52.261z" />
            </svg>
        </div>
    </div>
    I'm not a robot
</div>`;

let isCaptchaLoaded = false;

const loadCaptcha = () => (isCaptchaLoaded ? Promise.resolve(window.grecaptcha) : new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = googleAPI;
    script.onload = () => {
        isCaptchaLoaded = true;
        resolve(window.grecaptcha);
    };
    document.head.appendChild(script);
}));

export default async function createCaptcha(el, onSuccess) {
    const captcha = document.createElement('div');
    captcha.className = 'm-captcha';
    captcha.innerHTML = captchaTemplate;

    const captchaButton = captcha.querySelector('#captchaButton');
    const captchaControl = captcha.querySelector('.m-captcha-control');

    const grecaptcha = await loadCaptcha();

    captchaButton.addEventListener('click', (e) => {
        e.preventDefault();

        captchaButton.disabled = true;

        grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(GOOGLE_SITE_KEY, { action: 'submit' });
            console.log(token);
            const verified = await http.get(`/.netlify/functions/verifyCaptcha?token=${token}`);
            captchaControl.classList.add('verified');
            onSuccess();
        });
    });

    el.innerHTML = '';
    el.appendChild(captcha);
}
