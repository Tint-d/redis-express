import config from "config";

// Bcrypt
export const getSaltRounds = () => config.get("saltRounds");

// Port
export const getPort = () => config.get("port");

// Redis
export const getRedisHost = () => config.get("redisHost");
export const getRedisPort = () => config.get("redisPort");
export const getRedisUrl = () => config.get("redisUrl");
export const getVerifyEmailEX = () => config.get("verifyEmailEX");
export const getRefreshTokenCacheEX = () => config.get("refreshTokenCacheEX");
export const getCartCacheEx = () => config.get("cartCacheEx");

// JWT
export const getAccessTokenSecret = () => config.get("accessTokenSecret");
export const getRefreshTokenSecret = () => config.get("refreshTokenSecret");
export const getVerificationSecret = () => config.get("verificationSecret");
export const getPasswordResetSecret = () => config.get("passwordResetSecret");

export const getAccessTokenTtl = () => config.get("accessTokenTtl");
export const getRefreshTokenTtl = () => config.get("refreshTokenTtl");
export const getVerificationTokenTtl = () => config.get("verificationTokenTtl");
export const getPasswordResetTokenTtl = () =>
  config.get("passwordResetTokenTtl");

// Cloudinary
export const getCloudinaryName = () => config.get("cloudinaryName");
export const getCloudinaryAPIKey = () => config.get("cloudinaryAPIKey");
export const getCloudinaryAPISecret = () => config.get("cloudinaryAPISecret");

// OAuth2
export const getOauth2ClientId = () => config.get("oauth2ClientId");
export const getOauth2ClientSecret = () => config.get("oauth2ClientSecret");
export const getOauth2RedirectUri = () => config.get("oauth2RedirectUri");
export const getOauth2RefreshToken = () => config.get("oauth2RefreshToken");
export const getOauth2AccessToken = () => config.get("oauth2AccessToken");

// Nodemailer
export const getEmailSender = () => config.get("emailSender");
export const getSmtpHost = () => config.get("smtpHost");
export const getSmtpPort = () => config.get("smtpPort");
export const getNodemailerAuthType = () => config.get("nodemailerAuthType");

// Stripe
export const getStripeKey = () => config.get("stripeKey");

// Multer
export const getFileMaxSize = () => config.get("fileMaxSize");

// Rate Limiter
export const getWindow = () => config.get("window");
export const getMaxRequest = () => config.get("maxRequest");
export const getRateLimitMessage = () => config.get("rateLimitMessage");

// Order Track Status
export const getOrderTrackStatus = () => config.get("orderTrackStatus");

export const getToken = () => config.get("cloudinaryName");

export const getSan = () => config.get("sankyitar");
