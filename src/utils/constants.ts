export const PRODUCTION_HOST = 'https://tech-sphere-rogg.vercel.app/';
export const DEVELOPMENT_HOST = "http://localhost:3000/";
export const HOST = process.env.NODE_ENV === 'production'? PRODUCTION_HOST : DEVELOPMENT_HOST;