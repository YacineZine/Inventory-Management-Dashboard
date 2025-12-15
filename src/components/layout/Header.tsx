import { Search, User, Moon, Sun, Globe, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { CustomSidebarTrigger } from './CustomSidebar';
import { useLanguage } from '@/hooks/useLanguage';

export function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <header className="h-16 bg-header border-b border-sidebar-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <CustomSidebarTrigger className="lg:hidden text-header-foreground hover:bg-sidebar-accent hover:text-primary" />
        <div className="relative w-full max-w-[200px] sm:max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('search')}
            className="pl-10 bg-sidebar border-sidebar-border text-foreground"
          />
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-header-foreground hover:bg-sidebar-accent hover:text-primary"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-header-foreground hover:bg-sidebar-accent hover:text-primary"
            >
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              {language === 'en' ? '✓ ' : ''}English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('ar')}>
              {language === 'ar' ? '✓ ' : ''}العربية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-header-foreground hover:bg-sidebar-accent hover:text-primary">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Yacine Zine</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/edit-profile')}>
              {t('editProfile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')}>
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Actions */}
      <div className="flex md:hidden items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-sidebar-accent hover:text-primary">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            {/* Theme Toggle */}
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Language Toggle */}
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              {language === 'en' ? '✓ ' : ''}English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('ar')}>
              {language === 'ar' ? '✓ ' : ''}العربية
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Profile Links */}
            <DropdownMenuLabel>Account (Yacine Zine)</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="h-4 w-4 mr-2" />
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/edit-profile')}>
              {t('editProfile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')}>
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
