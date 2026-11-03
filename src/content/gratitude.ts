/**
 * The Gratitude page (/gratitude): people and organizations who helped Mike along the way.
 * Add a person or an organization by adding an object to the right list. `link` is optional.
 * Site rule: no em dashes in copy, use a plain hyphen.
 */

export type Thanks = {
  name: string;
  /** Short line under the name: a role, an organization, a place. */
  context?: string;
  story: string;
  link?: { label: string; href: string };
};

export const gratitude = {
  eyebrow: "With Thanks To",
  heading: "Gratitude",
  intro:
    "Nobody gets anywhere alone. These are the people and organizations who stepped up for me and my family when it mattered.",
};

export const people: Thanks[] = [
  {
    name: "Ryan Granahan",
    context: "WellnessLiving",
    story:
      "Ryan hired me at WellnessLiving when I needed it most. My first child was about to be born and I needed stable income. He took a chance on me, and that job gave my family security at the most important moment of my life. I'm grateful to him to this day.",
    link: { label: "LinkedIn", href: "https://www.linkedin.com/in/ryan-granahan/" },
  },
];

/**
 * Local groups that helped fundraise for the kids' outdoor nature school program.
 */
export const organizations: Thanks[] = [
  // To come from Mike: Kinsmen, Lions Club and similar local groups. The section is hidden while empty.
];

export const organizationsIntro =
  "These local groups helped me raise the money to send my kids to an outdoor nature school program [program name]. Their generosity gave my kids time in the woods they'll never forget.";
