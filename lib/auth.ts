import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendEmail } from "./mailer";

const uri = process.env.MONGODB_URI;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
const client = new MongoClient(uri ? uri : "");
const db = client.db();

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000", "http://192.168.1.198:3000", serverUrl],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your e-mail address",
        text: `Click on the following link to verify your e-mail address: ${url}`,
      })
    }
  },
});
