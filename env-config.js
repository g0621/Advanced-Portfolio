const prod = process.env.NODE_ENV === 'production';
const is_vercel = process.env.CURRENT_DEPLOYMENT === 'VERCEL';

module.exports = is_vercel ? {
    'process.env.BASE_URL': prod ? 'https://gyanportfolio.vercel.app' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://gyanportfolio.vercel.app',
    'process.env.DB_URI': prod ? 'mongodb+srv://<user_name>:<password>@cluster0-iurlx.mongodb.net/portfolio' : 'mongodb://localhost/portfolio',
    'process.env.DOMAIN': 'gyan0621.eu.auth0.com',
    'process.env.CLIENT_ID': '48nrZH2R1bCh19d9U38pwrFnlT4zNHkF'
} : {
    'process.env.BASE_URL': prod ? 'https://gyan-vardhan.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://gyan-vardhan.herokuapp.com',
    'process.env.DB_URI': prod ? 'mongodb+srv://<user_name>:<password>@cluster0-iurlx.mongodb.net/portfolio' : 'mongodb://localhost/portfolio',
    'process.env.DOMAIN': 'gyan0621.eu.auth0.com',
    'process.env.CLIENT_ID': '48nrZH2R1bCh19d9U38pwrFnlT4zNHkF'
}
//only public keys
