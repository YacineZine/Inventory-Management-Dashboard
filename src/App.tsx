import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppLayout } from "./components/layout/AppLayout";

import Dashboard from "./components/pages/Dashboard";


import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import StockReport from "./components/pages/StockReport";
import InvoiceEntry from "./components/pages/InvoiceEntry";
import InvoiceDetails from "./components/pages/InvoiceDetails";
import ManageSuppliers from "./components/pages/ManageSuppliers";
import ManageProducts from "./components/pages/ManageProducts";
import ManageCategories from "./components/pages/ManageCategories";
import ManagePurchases from "./components/pages/ManagePurchases";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import ComingSoon from "./components/pages/ComingSoon";
import NotFound from "./components/pages/NotFound";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<AppLayout><Dashboard /></AppLayout>}>
              <Route path="/" element={<Dashboard />} />
            </Route>

            <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
            <Route path="/edit-profile" element={<AppLayout><EditProfile /></AppLayout>} />
            <Route path="/stock" element={<AppLayout><StockReport /></AppLayout>} />
            <Route path="/invoices" element={<AppLayout><InvoiceEntry /></AppLayout>} />
            <Route path="/invoice/:id" element={<AppLayout><InvoiceDetails /></AppLayout>} />
            <Route path="/suppliers" element={<AppLayout><ManageSuppliers /></AppLayout>} />
            <Route path="/products" element={<AppLayout><ManageProducts /></AppLayout>} />

            <Route path="/customers" element={<AppLayout><ComingSoon title="Manage Customers" /></AppLayout>} />
            <Route path="/units" element={<AppLayout><ComingSoon title="Manage Units" /></AppLayout>} />
            <Route path="/categories" element={<AppLayout><ManageCategories /></AppLayout>} />
            <Route path="/purchases" element={<AppLayout><ManagePurchases /></AppLayout>} />
            <Route path="/support" element={<AppLayout><ComingSoon title="Support" /></AppLayout>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
