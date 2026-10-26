import { Icon, type IconName } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";

interface SkillGroupProps {
  icon: IconName;
  title: string;
  items: string[];
}

/** A labelled group of tools. Names only: no levels, bars or ratings. */
export function SkillGroup({ icon, title, items }: SkillGroupProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-line pt-5">
      <h4 className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
        <span className="grid size-8 place-items-center rounded-sm bg-accent-50 text-accent-600">
          <Icon name={icon} size={17} />
        </span>
        {title}
      </h4>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item}>
            <Tag tone="outline">{item}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}
