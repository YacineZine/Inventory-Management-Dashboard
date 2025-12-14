import type { ReactNode } from 'react';
import { CustomSidebarProvider } from './CustomSidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { useLanguage } from '@/hooks/useLanguage';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isRTL } = useLanguage();
  
  return (
    <CustomSidebarProvider side={isRTL ? "right" : "left"}>
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 bg-background p-6">
          {children}
        </main>
      </div>
    </CustomSidebarProvider>
  );
}
