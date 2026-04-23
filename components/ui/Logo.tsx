import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-text"
      aria-label="Filip Mladenovski, home"
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={28}
        height={28}
        priority
        className="h-7 w-7 transition-transform duration-150 group-hover:scale-105"
      />
      <span className="hidden sm:inline">Filip Mladenovski</span>
    </Link>
  );
}
