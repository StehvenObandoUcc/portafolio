import { IconLink } from "@/components/atoms/IconButton";
import type { IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export interface SocialLinkData {
  id: string;
  icon: IconName;
  label: string;
  href: string;
  external: boolean;
}

interface SocialLinksProps {
  links: SocialLinkData[];
  label: string;
  comingSoonLabel: string;
  className?: string;
}

export function SocialLinks({ links, label, comingSoonLabel, className }: SocialLinksProps) {
  return (
    <ul aria-label={label} className={cn("flex items-center gap-1", className)}>
      {links.map((link) => (
        <li key={link.id}>
          <IconLink
            href={link.href}
            external={link.external}
            icon={link.icon}
            label={link.label}
            comingSoonLabel={comingSoonLabel}
          />
        </li>
      ))}
    </ul>
  );
}
