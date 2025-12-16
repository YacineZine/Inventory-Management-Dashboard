# Inventory Management Dashboard

A modern, responsive Inventory Management Dashboard built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**. This application is designed to help businesses manage their inventory, suppliers, customers, purchases, and invoices efficiently. It features a comprehensive dashboard with real-time statistics, charts, and reports.

## Features

*   **Dashboard Overview:** Real-time visualization of key metrics such as total sales, daily movements, invoices, and average profit. Includes interactive charts for sales transactions and order distribution.
*   **Inventory Management:**
    *   **Manage Products:** Add, edit, delete, and view product details including stock levels, purchase prices, and selling prices.
    *   **Manage Categories:** Organize products into categories for better navigation and filtering.
    *   **Stock Reports:** Generate detailed reports on stock levels, including low-stock alerts and movement history.
    *   **Manage Units:** Define and manage units of measurement for products.
*   **Supplier & Customer Management:**
    *   **Manage Suppliers:** detailed records of suppliers, including contact information and transaction history.
    *   **Manage Customers:** specific customer profiles, order history, and contact details.
*   **Procurement & Sales:**
    *   **Manage Purchases:** Track purchase orders, manage receipts from suppliers, and update stock levels automatically.
    *   **Invoice Management:** Create, manage, and print invoices for sales. includes support for "PSC" (pieces) and "KG" units.
*   **Support Center:** A dedicated support section for users to find help, access FAQs, and contact support.
*   **User Profile:** Manage user settings, profile information, and authentication.
*   **Internationalization (i18n):** Fully localized interface with support for English and Arabic (RTL support included).
*   **Dark Mode:** Built-in dark mode support for better usability in low-light environments.
*   **Responsive Design:** Fully responsive layout optimized for desktops, tablets, and mobile devices.

## Tech Stack

*   **Framework:** [React](https://react.dev/) (v18)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (using Radix UI primitives)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **State Management & Data Fetching:** [React Query (TanStack Query)](https://tanstack.com/query/latest)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
*   **Internationalization:** [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
*   **Date Handling:** [Date-fns](https://date-fns.org/) & [React Day Picker](https://react-day-picker.js.org/)

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone git@github.com:YacineZine/Inventory-Management-Dashboard.git
    cd dashboard
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` directory with the optimized build assets.

## Project Structure

```
src/
├── components/          # Reusable UI components and page-specific components
│   ├── dashboard/       # Dashboard-specific widgets (Charts, Stats cards)
│   ├── layout/          # Layout components (Sidebar, Navbar)
│   ├── pages/           # Main page components (Dashboard, ManageProducts, etc.)
│   └── ui/              # Shadcn UI primitives (Button, Input, Card, etc.)
├── contexts/            # React Contexts (ThemeContext, etc.)
├── data/                # Mock data for development
├── i18n/                # Internationalization configuration and locales
├── lib/                 # Utility functions and helpers
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component with routing
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
