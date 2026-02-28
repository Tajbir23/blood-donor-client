import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    return null;
  }

  // Build headers — include server secret for VPN middleware bypass
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (process.env.SERVER_SECRET_KEY) {
    headers['X-Server-Key'] = process.env.SERVER_SECRET_KEY;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`, {
    cache: 'force-cache',
    next: {
      tags: ['refresh-token'],
      revalidate: 60 * 60 * 24
    },
    method: 'POST',
    body: JSON.stringify({ token: token.value }),
    headers,
  });
  const data = await response.json();

  if(!data){
    cookieStore.delete('token')
    redirect('/login')
  }

  const {refreshToken} = data;
  cookieStore.set('token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  return data;
};

export default getRefreshToken;
