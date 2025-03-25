'use server'

import { User } from "@/lib/types/userType"

export const registerAsUser = async (data: User) => {
    try {
        // Check if there's a file to upload
        if (data.profileImage) {
            // Use FormData for file uploads
            const formData = new FormData();
            
            // Append the file
            formData.append('profileImage', data.profileImage);
            
            // Clone the data object without the file
            const userData = { ...data };
            // @ts-expect-error - Ignoring the type error when deleting an optional property
            delete userData.profileImage;
            
            formData.append('userData', JSON.stringify(userData));
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            
            return response.json();
        } else {
            // No file, use JSON
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            if (!response.ok) {
                throw new Error('Failed to register');
            }
        
            return response.json();
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: 'Registration failed' };
    }
}

