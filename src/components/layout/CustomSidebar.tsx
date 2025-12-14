import { useState, createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebarContext must be used within CustomSidebarProvider');
  return context;
}

interface CustomSidebarProviderProps {
  children: ReactNode;
  side?: 'left' | 'right';
}

export function CustomSidebarProvider({ children, side = 'left' }: CustomSidebarProviderProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

interface CustomSidebarProps {
  children: ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export function CustomSidebar({ children, side = 'left', className }: CustomSidebarProps) {
  const { isOpen, toggle } = useSidebarContext();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={toggle} />
        )}
        <aside
          className={cn(
            'fixed top-0 z-50 h-screen w-64 bg-sidebar border-sidebar-border transition-transform duration-200',
            side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
            isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full',
            className
          )}
        >
          <div className={cn(
            "absolute top-4 z-50",
            side === 'left' ? "right-4" : "left-4"
          )}>
            <button onClick={toggle} className="p-1 hover:bg-sidebar-accent rounded-md">
              <X className="h-5 w-5" />
            </button>
          </div>
          {children}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar border-sidebar-border transition-all duration-200 flex-shrink-0 sticky top-0',
        side === 'left' ? 'border-r' : 'border-l',
        isOpen ? 'w-64' : 'w-0 overflow-hidden',
        className
      )}
    >
      {children}
    </aside>
  );
}

export function CustomSidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebarContext();

  return (
    <button
      onClick={toggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground',
        className
      )}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
}
