import { Construction } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardContent className="p-12 text-center">
          <Construction className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">This page is under construction</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;
