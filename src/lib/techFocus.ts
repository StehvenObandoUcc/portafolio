/** Fired by the logo wall; the project grid listens and filters to the tool. */
export const TECH_EVENT = "portfolio:tech";

export interface TechFocus {
  id: string;
  label: string;
  /** Stack names that count as this tool. */
  includes: string[];
}
