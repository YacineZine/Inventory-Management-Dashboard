import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-12 text-center">
          <Avatar className="w-32 h-32 mx-auto mb-6">
            <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
              <User className="h-16 w-16" />
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-bold mb-2">Yacine Zine</h1>
          <p className="text-muted-foreground mb-6">Yacine.zine@gmail.com</p>

          <Button onClick={() => navigate('/edit-profile')}>
            {t('editProfile')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
