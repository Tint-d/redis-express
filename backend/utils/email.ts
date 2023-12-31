import { google } from "googleapis";
import {
  getEmailSender,
  getNodemailerAuthType,
  getOauth2AccessToken,
  getOauth2ClientId,
  getOauth2ClientSecret,
  getOauth2RefreshToken,
  getSmtpHost,
  getSmtpPort,
} from "./appConfig";

import nodemailer from "nodemailer";

// oAuth2
const oauth2ClientId = getOauth2ClientId();
const oauth2ClientSecret = getOauth2ClientSecret();
const oauth2AccessToken = getOauth2AccessToken();
const oauth2RefreshToken = getOauth2RefreshToken();
const oauth2RedirectUri = "https://developers.google.com/oauthplayground";

// Nodemailer
const emailSender = getEmailSender();
const smtpHost = getSmtpHost();
const smtpPort = getSmtpPort();
const nodemailerAuthType = getNodemailerAuthType();

// Connection Data for creating a transporter
const connectionData = {
  host: smtpHost,
  port: smtpPort,
  secure: true,
  auth: {
    type: nodemailerAuthType,
    user: emailSender,
    clientId: oauth2ClientId,
    clientSecret: oauth2ClientSecret,
    refreshToken: oauth2RefreshToken,
    accessToken: oauth2AccessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
const oAuth2Client = new google.auth.OAuth2(
  oauth2ClientId as string,
  oauth2ClientSecret as string,
  oauth2RedirectUri
);
oAuth2Client.setCredentials({ refresh_token: oauth2RefreshToken as string });

export const sendVerificationEmail = async (email: string, link: string) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oauth2",
        user: "98thintzawhtun@gmail.com",
        clientId: oauth2ClientId as string,
        clientSecret: oauth2ClientSecret as string,
        refreshToken: oauth2RefreshToken as string,
        accessToken: accessToken,
      } as any,
    });
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <98thintzahtun@gmail.com>',
      to: email,
      subject: "Verification Link",
      text: "Hello world?",
      html: `verfity ${link}`,
    });
  } catch (error) {
    console.error(error);
  }
};
