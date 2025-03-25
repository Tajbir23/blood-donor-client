# LifeDrop - Blood Donation Platform

LifeDrop is a comprehensive blood donation platform built for Kurigram district, connecting blood donors with those in need during emergencies. The platform facilitates quick and efficient blood donation matching, making it easier for people to find blood donors in critical situations.

![LifeDrop Platform](public/hero-image.jpg)

## Features

- **Find Blood Donors**: Quickly search for donors by blood type and location
- **Emergency SOS**: Request urgent blood donation in critical situations
- **Donor Registration**: Register as a blood donor to help save lives
- **Health Advice**: Get professional advice about blood donation
- **Blog**: Read informative articles about blood donation and health
- **Donation**: Support the platform through financial contributions

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Language**: TypeScript
- **UI Components**: Custom components with responsive design
- **Icons**: React Icons
- **Maps**: Leaflet for location services
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Context API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/tajbir23/blood-donor-client.git
   cd lifedrop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google Maps (if using)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# File Upload (if using cloud storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   ├── actions/           # Server actions
│   └── libs/              # Utility functions
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Shared libraries
│   └── types/            # TypeScript type definitions
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@lifedrop.com or join our Slack channel.

## Acknowledgments

- Thanks to all contributors who have helped shape LifeDrop
- Special thanks to the blood donation community
- Inspired by the need for efficient blood donation systems in rural areas
