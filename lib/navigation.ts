export type NavigationLabel =
  | "home"
  | "work"
  | "experience"
  | "about"
  | "contact";

export type NavigationItem = {
  labelKey: NavigationLabel;
  href: string;
  type: "route" | "section";
};

export const mainNavigationItems = [
  { labelKey: "home", href: "/", type: "route" },
  { labelKey: "work", href: "projects", type: "section" },
  { labelKey: "experience", href: "experience", type: "section" },
  { labelKey: "about", href: "about", type: "section" },
] as const satisfies readonly NavigationItem[];

export const contactNavigationItem = {
  labelKey: "contact",
  href: "contact",
  type: "section",
} as const satisfies NavigationItem;

export const navigationItems = [
  ...mainNavigationItems,
  contactNavigationItem,
] as const;

export function getNavigationHref(
  link: NavigationItem,
  pathname: string,
) {
  if (link.type === "route") return link.href;
  return pathname === "/" ? `#${link.href}` : `/#${link.href}`;
}
