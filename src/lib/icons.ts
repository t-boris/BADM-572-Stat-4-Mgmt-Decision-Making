import {
  BarChart3,
  Sigma,
  Dice5,
  Target,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Sigma,
  Dice5,
  Target,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? HelpCircle;
}
