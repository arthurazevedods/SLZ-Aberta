import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface DataCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const DataCard = ({ title, description, icon: Icon, gradient }: DataCardProps) => {
  return (
    <Card className="group cursor-pointer border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DataCard;
