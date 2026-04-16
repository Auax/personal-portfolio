"use client";

import * as PhosphorIcons from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type PhosphorIconName = keyof typeof PhosphorIcons;

export function PhosphorIcon({
  name,
  size = 24,
  ...props
}: {
  name: PhosphorIconName;
  size?: number;
  // Most phosphor icons accept `color`, `weight`, `size`, and `className`.
  // We keep this generic to avoid maintaining a huge prop surface.
  [key: string]: unknown;
}) {
  const Icon = PhosphorIcons[name] as unknown as ComponentType<{
    size?: number;
    [key: string]: unknown;
  }> | null;

  if (!Icon) return null;

  return <Icon size={size} {...props} />;
}

