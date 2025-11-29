import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 dark:from-cyan-900 dark:via-cyan-800 dark:to-cyan-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Package className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t('login')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" type="email" placeholder={t('email')} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input id="password" type="password" placeholder={t('password')} />
          </div>
          
          <Button className="w-full" onClick={() => navigate('/')}>
            {t('login')}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            <button
              onClick={() => navigate('/signup')}
              className="text-primary hover:underline"
            >
              {t('dontHaveAccount')}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
