'use server'

import { baseUrl } from '@/app/libs/baseUrl'

/**
 * Verify an OTP for email verification
 * @param email User's email
 * @param otp The OTP to verify
 * @returns Success status and any additional data
 */
export async function verifyOtp(email: string, otp: string) {
  try {
    const response = await fetch(`${baseUrl}/user/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'OTP verification failed')
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred during OTP verification')
    }
  }
}

/**
 * Resend OTP to the user's email
 * @param email User's email address
 * @returns Success status and any additional data
 */
export async function resendOtp(email: string) {
  try {
    const response = await fetch(`${baseUrl}/user/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to resend OTP')
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while resending OTP')
    }
  }
} 