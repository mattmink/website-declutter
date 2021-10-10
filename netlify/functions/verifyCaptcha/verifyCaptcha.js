require('dotenv').config();

const axios = require('axios');

const secret = process.env.GOOGLE_RECAPTCHA_SECRET;
const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

const encode = obj => Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const handler = async (event) => {
    try {
        const { token } = event.queryStringParameters;

        const { data } = await axios.post(verifyUrl, encode({ secret, response: token }), { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

        console.log(data);

        if (!data || !data.success || data.score < .5) throw Error();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'You are not a robot' }),
        };
    } catch (error) {
        return { statusCode: 500, body: 'You are a robot' };
    }
}

module.exports = { handler }
