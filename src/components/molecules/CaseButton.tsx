"use client";

import { Icon } from "@/components/atoms/Icon";
import { CASE_EVENT } from "@/components/molecules/ProjectGallery";

/** Opens the project's gallery straight at its case study. */
export function CaseButton({ id, label, ariaLabel }: { id: string; label: string; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => window.dispatchEvent(new CustomEvent(CASE_EVENT, { detail: id }))}
      className="group/case inline-flex items-center gap-2 self-start text-[14px] font-medium text-accent-600"
    >
      <span className="link-underline">{label}</span>
      <Icon name="arrow-right" size={15} className="transition-transform duration-300 ease-out group-hover/case:translate-x-1" />
    </button>
  );
}
