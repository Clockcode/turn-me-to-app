// lib/firebaseAdmin.ts
import { cert, getApps, initializeApp, App as AdminApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: AdminApp;

const projectId = process.env.FIREBASE_PROJECT_ID!;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'); // important on Vercel

if (!getApps().length) {
  console.log("creating admin app")
  adminApp = initializeApp({
    credential: cert({projectId,clientEmail,privateKey}),});
} else {
  adminApp = getApps()[0]!;
}

export const adminAuth = getAuth(adminApp);
