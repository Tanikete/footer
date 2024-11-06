import { NextResponse } from 'next/server';
import axios from 'axios';

const registerUrl: string = process.env.NEXT_PUBLIC_REGISTER_USER_API || 'https://api.fcmilka.de/UserManagement/Registration';

export async function POST(request: Request) {
  try {
    // Retrieve form data from the request
    const formData = await request.formData();
    const data: Record<string, any> = {}; 

    // Convert FormData to a regular JSON object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log('Parsed FormData:', data);

    // Send data to the external API
    const registerApiResponse = await axios.post(registerUrl, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return the response from the external API
    return NextResponse.json(registerApiResponse.data, { status: registerApiResponse.status });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process form data' }, { status: 500 });
  }
}
