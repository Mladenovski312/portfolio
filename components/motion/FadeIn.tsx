import type { CSSProperties } from "react";

type Tag = "div" | "p" | "span" | "ul" | "li" | "h1" | "h2" | "h3";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
};

export function FadeIn({
  children,
  delay = 0,
  y = 8,
  className,
  as: Tag = "div",
}: Props) {
  const style = {
    "--fade-y": `${y}px`,
    animationDelay: `${delay * 1000}ms`,
  } as CSSProperties;

  return (
    <Tag className={`fade-up-anim ${className ?? ""}`} style={style}>
      {children}
    </Tag>
  );
}
