# Coimbatore Cafe - Premium Coffee Experience

## Overview

This is a modern full-stack web application for Coimbatore Cafe, a premium coffee shop owned by Razerbills Groups Private Ltd. The application features a sophisticated React frontend with Tailwind CSS styling, Express.js backend, PostgreSQL database with Drizzle ORM, and Razorpay payment integration. The app includes a unique 3D drink customizer, animated UI components using Framer Motion, and comprehensive e-commerce functionality for online coffee ordering and delivery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite for fast development and building
- **Styling**: Tailwind CSS with custom coffee-themed design system and CSS variables
- **UI Components**: Radix UI primitives with shadcn/ui components for consistent, accessible design
- **Animations**: Framer Motion for smooth page transitions, scroll reveals, and interactive elements
- **State Management**: TanStack React Query for server state and custom hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **3D Visualization**: Custom 3D coffee cup component for drink customization

### Backend Architecture
- **Framework**: Express.js with TypeScript running in ESM mode
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Custom JWT-based authentication system
- **API Design**: RESTful API with proper error handling and request logging middleware
- **File Structure**: Modular separation with shared schema between client and server

### Database Design
- **Database**: PostgreSQL with connection via environment variables
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Tables**: Users, Categories, Products, Orders, Order Items, Cart Items, and Wishlist
- **Data Types**: Proper use of UUIDs, decimals for pricing, timestamps, and JSON fields for customizations

### Authentication System
- **User Management**: Registration and login with email/password
- **Session Handling**: JWT tokens with proper validation
- **Authorization**: Protected routes and middleware for user-specific data
- **User Profiles**: Extended user metadata including full name, phone, and address

### Payment Integration
- **Payment Gateway**: Razorpay integration for Indian market
- **Payment Methods**: Support for UPI, credit/debit cards, net banking, and digital wallets
- **Order Management**: Complete order lifecycle from cart to delivery tracking
- **Security**: Secure payment processing with proper error handling

### E-commerce Features
- **Product Catalog**: Categorized menu items with images, descriptions, and pricing
- **Shopping Cart**: Persistent cart with quantity management and customizations
- **Order System**: Full order management with status tracking and delivery updates
- **Customization Engine**: Advanced 3D drink customizer with size, strength, milk type, and extras

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **framer-motion**: Animation library for smooth transitions and interactions
- **react-hook-form** & **@hookform/resolvers**: Form handling with validation

### UI and Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework with custom coffee theme
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Database and Backend
- **drizzle-orm** & **drizzle-kit**: Type-safe ORM and migration tool
- **@neondatabase/serverless**: PostgreSQL database connection
- **express**: Web framework for Node.js
- **zod**: Runtime type validation and schema definition

### Payment Processing
- **razorpay**: Payment gateway integration for Indian market
- Support for UPI, cards, net banking, and wallets

### Development Tools
- **typescript**: Type safety across the application
- **vite**: Fast build tool and development server
- **esbuild**: Fast bundler for production builds
- **tsx**: TypeScript execution for development server