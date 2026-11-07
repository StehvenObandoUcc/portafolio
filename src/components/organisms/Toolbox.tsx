import type { IconName } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { SkillGroup } from "@/components/molecules/SkillGroup";

export interface ToolboxProps {
  title: string;
  groups: { id: string; icon: IconName; title: string; items: string[] }[];
}

/** The tools, right after the hero so a recruiter sees the stack first. */
export function Toolbox({ title, groups }: ToolboxProps) {
  return (
    <section aria-labelledby="toolbox-title" className="pb-[clamp(56px,7vw,96px)]">
      <div className="container-page">
        <Reveal>
          <h2 id="toolbox-title" className="text-h3 mb-6 text-ink">
            {title}
          </h2>
        </Reveal>
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map((group, i) => (
            <li key={group.id}>
              <Reveal index={i} motion="pop">
                <SkillGroup icon={group.icon} title={group.title} items={group.items} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
