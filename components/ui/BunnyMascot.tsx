"use client";

import { Mascot } from "page-mascot";

const DIRECTIONS = "/mascots/bunny-directions.webp";
const REACTIONS = "/mascots/bunny-reactions.webp";

type Props = {
  size?: number;
  className?: string;
  label?: string;
};

export function BunnyMascot({ size = 96, className = "", label = "Linh vật thỏ" }: Props) {
  return (
    <Mascot
      directions={DIRECTIONS}
      reactions={REACTIONS}
      size={size}
      className={className}
      label={label}
    />
  );
}
