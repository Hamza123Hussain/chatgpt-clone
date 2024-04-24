import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

const ServiceAccount = JSON.parse(
  process.env.Firebase_Service_Account as string
)

if (!getApps().length) {
  // if no apps made
  admin.initializeApp({
    // new app will be made with help of service account credentials
    credential: admin.credential.cert(ServiceAccount),
  })
}

const adminDb = admin.firestore() // giving admin access of firestore
export { adminDb }
