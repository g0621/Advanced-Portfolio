const is_vercel = process.env.CURRENT_DEPLOYMENT === 'VERCEL';
module.exports = {
  DB_URI: process.env.DB_URI,
  NAMESPACE: is_vercel ? 'https://gyanportfolio.vercel.app' : 'https://gyan-vardhan.herokuapp.com'
}

