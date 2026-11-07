import { Icon, type IconName } from "@/components/atoms/Icon";
import { ToolIcon } from "@/components/atoms/ToolIcon";

interface SkillGroupProps {
  icon: IconName;
  title: string;
  items: string[];
}

/** A labelled group of tools, each with its mark. Names only: no levels, bars or ratings. */
export function SkillGroup({ icon, title, items }: SkillGroupProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-line pt-5">
      <h3 className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
        <span className="icon-draw grid size-8 place-items-center rounded-sm bg-accent-50 text-accent-600">
          <Icon name={icon} size={17} />
        </span>
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="inline-flex min-h-9 items-center gap-2 rounded-pill border border-line-strong bg-surface px-3 py-1.5 text-[14px] font-medium text-ink-soft"
          >
            <ToolIcon name={item} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
