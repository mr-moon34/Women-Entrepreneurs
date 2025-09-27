# Women's Co-Op - Community Co-Op for Women Entrepreneurs

A modern web application built with React, TypeScript, and TailwindCSS for empowering women entrepreneurs through a community cooperative platform.

## Features

- **Multi-role Support**: Buyer, Seller, and Admin roles
- **Product Management**: Add, edit, and manage products
- **Shopping Cart**: Full e-commerce functionality
- **Order Management**: Complete order lifecycle
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and professional interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd womens-coop-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment

This project is configured for deployment on Render.com as a static site.

### Manual Deployment Steps:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload dist folder to Render:**
   - Go to Render.com
   - Create new Static Site
   - Upload the `dist` folder contents
   - Configure custom domain (optional)

### Automatic Deployment:

1. Connect your GitHub repository to Render
2. Render will automatically build and deploy on every push
3. The `render.yaml` file handles the configuration

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Buyer/          # Buyer-specific components
│   ├── Seller/         # Seller-specific components
│   ├── Admin/          # Admin components
│   ├── Common/         # Shared components
│   └── Layout/         # Layout components
├── context/            # React Context for state management
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
