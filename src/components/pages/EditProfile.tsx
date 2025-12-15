import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('editProfilePage')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input id="name" defaultValue="Yacine Zine" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t('userEmail')}</Label>
            <Input id="email" type="email" defaultValue="Yacine.zine@gmail.com" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-image">{t('profileImage')}</Label>
            <Input id="profile-image" type="file" />
          </div>

          <Button className="w-full sm:w-auto">
            {t('updateProfile')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('changePassword')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="old-password">{t('oldPassword')}</Label>
            <Input id="old-password" type="password" placeholder={t('oldPassword')} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-password">{t('newPassword')}</Label>
            <Input id="new-password" type="password" placeholder={t('newPassword')} />
          </div>

          <Button className="w-full sm:w-auto">
            {t('changePassword')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
