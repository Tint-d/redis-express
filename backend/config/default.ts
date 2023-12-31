// export = {
//   // express
//   port: 3001,

//   // bcrypt
//   saltRounds: 10,

//   //Track Status
//   orderTrackStatus: {
//     preparing: "PREPARING",
//     shipped: "SHIPPED",
//     deliverd: "DELIVERD",
//   },
// };

import dotenv from "dotenv";
dotenv.config();

// Redis
export const redisPort = 6379;
export const redisHost = "127.0.0.1";
export const verifyEmailEX = 300;
export const refreshTokenCacheEX = 1000;
export const cartCacheEx = 2000;

// OAuth
export const oauth2ClientId = process.env.CLIENT_ID as string;
export const oauth2ClientSecret = process.env.CLIENT_SECRET as string;
export const oauth2RefreshToken = process.env.REFRESH_TOKEN as string;
export const oauth2AccessToken = process.env.ACCESS_TOKEN as string;

// clodinaryName
export const cloudinaryName = process.env.CLOUDINARY_NAME;
export const cloudinaryAPIKey = process.env.CLOUDINARY_API_KEY;
export const cloudinaryAPISecret = process.env.CLOUDINARY_API_SECERT;

//  JWT
export const accessTokenSecret = process.env.JWT_SECRET;
export const refreshTokenSecret = process.env.JWT_SECRET_REFRESH;
export const verificationSecret = process.env.JWT_VERIFACTION_SECRET;
export const passwordResetSecret = process.env.JWT_PASSWORD_RESET_SECRET;
export const accessTokenTtl = "3h";
export const refreshTokenTtl = "10h";
export const verificationTokenTtl = "5m";
export const passwordResetTokenTtl = "5m";

// Nodemailer
export const emailSender = "98thintzawhtun@gmail.com";
export const smtpHost = "smtp.gmail.com";
export const smtpPort = "smtp.gmail.com";
export const nodemailerAuthType = "OAuth2";

// Multer
export const fileMaxSize = 2 * 1024 * 1024;

// Rate Limiter
export const window = 24 * 60 * 60 * 1000; // 24 hrs in milliseconds
export const maxRequest = 500; // Limit each IP to 100 requests per `window`
export const rateLimitMessage =
  "You have exceeded the 500 requests in 24 hrs limit!";

// stripe

export const stripeKey = process.env.STRIPE_KEY;
