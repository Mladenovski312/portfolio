import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { MobileNav } from "./MobileNav";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-text-muted transition-colors duration-150 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden text-sm text-text-muted transition-colors hover:text-text md:inline-block"
          >
            GitHub
          </a>
          <Button
            href="#contact"
            variant="primary"
            className="hidden h-9 px-4 text-xs md:inline-flex"
          >
            Book a call
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
