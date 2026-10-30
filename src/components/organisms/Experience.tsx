import type { HeadingParts } from "@/components/atoms/Heading";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { CourseCard, type CourseCardData } from "@/components/molecules/CourseCard";
import { ExperienceTabs, type ExperienceTabId } from "@/components/molecules/ExperienceTabs";
import { SkillGroup } from "@/components/molecules/SkillGroup";
import { TimelineItem, type TimelineItemData } from "@/components/molecules/TimelineItem";

export interface ExperienceProps {
  index: string;
  title: HeadingParts;
  tabsLabel: string;
  tabs: Record<ExperienceTabId, string>;
  stackLabel: string;
  timeline: TimelineItemData[];
  degree: { title: string; institution: string; campus: string; status: string };
  coursesTitle: string;
  courses: CourseCardData[];
  certificateLabel: string;
  english: { title: string; level: string };
  skillsTitle: string;
  skills: { id: string; icon: IconName; title: string; items: string[] }[];
  comingSoonLabel: string;
  newTabLabel: string;
}

/** Server-rendered section; only the tab switching runs on the client. */
export function Experience(props: ExperienceProps) {
  const work = (
    <div className="relative space-y-12">
      {props.timeline.map((item, i) => (
        <Reveal key={item.id} index={i}>
          <TimelineItem item={item} stackLabel={props.stackLabel} />
        </Reveal>
      ))}
      <span
        aria-hidden="true"
        className="timeline-rule absolute top-2 bottom-2 left-[5px] w-px bg-accent-600/60 md:left-[204px]"
      />
    </div>
  );

  const academic = (
    <>
      <div className="grid gap-5 md:grid-cols-12 md:gap-6">
        <article className="card flex flex-col gap-4 p-6 sm:p-8 md:col-span-8">
          <span className="icon-draw grid size-10 place-items-center rounded-sm bg-accent-600 text-on-accent">
            <Icon name="graduation" size={20} />
          </span>
          <h3 className="text-h3 text-ink">{props.degree.title}</h3>
          <p className="text-ink-soft">
            {props.degree.institution} · {props.degree.campus}
          </p>
          <p className="text-label text-accent-700">{props.degree.status}</p>
        </article>
        <article className="card flex flex-col gap-4 p-6 sm:p-8 md:col-span-4">
          <span className="icon-draw grid size-10 place-items-center rounded-sm bg-accent-50 text-accent-600">
            <Icon name="globe" size={20} />
          </span>
          <h3 className="text-h3 text-ink">{props.english.title}</h3>
          <p className="text-ink-soft">{props.english.level}</p>
        </article>
      </div>

      {props.courses.length > 0 && (
        <>
          <h3 className="text-h3 mt-14 mb-6 text-ink">{props.coursesTitle}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.courses.map((course) => (
              <li key={course.id}>
                <CourseCard
                  course={course}
                  certificateLabel={props.certificateLabel}
                  comingSoonLabel={props.comingSoonLabel}
                  newTabLabel={props.newTabLabel}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );

  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-paper-2 py-section-y">
      <div className="container-page">
        <ExperienceTabs
          index={props.index}
          title={props.title}
          tabsLabel={props.tabsLabel}
          tabs={props.tabs}
          panels={{ work, academic }}
        />

        <div className="mt-section-y">
          <Reveal>
            <h3 className="text-h3 mb-6 text-ink">{props.skillsTitle}</h3>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {props.skills.map((group, i) => (
              <li key={group.id}>
                <Reveal index={i} motion="pop">
                  <SkillGroup icon={group.icon} title={group.title} items={group.items} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
