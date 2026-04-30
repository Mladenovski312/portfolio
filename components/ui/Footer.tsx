import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/80">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              AI-powered web apps and automation systems. Based in {site.location}. Available for remote work, async-friendly.
            </p>
          </div>

          <FooterCol heading="Work">
            <FooterLink href="#work">Featured</FooterLink>
            <FooterLink href="/lab">Lab</FooterLink>
            <FooterLink href={site.links.upwork} external>
              Upwork profile
            </FooterLink>
          </FooterCol>

          <FooterCol heading="Elsewhere">
            <FooterLink href={site.links.github} external>
              GitHub
            </FooterLink>
            <FooterLink href={site.links.linkedin} external>
              LinkedIn
            </FooterLink>
          </FooterCol>

          <FooterCol heading="Contact">
            <FooterLink href={`mailto:${site.email}`} external>
              Email
            </FooterLink>
            <FooterLink href="/contact">Book a call</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border-subtle/60 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Filip Mladenovski</p>
          <p>Kumanovo · {site.timezone}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
        {heading}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-text-muted transition-colors hover:text-text"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-text-muted transition-colors hover:text-text"
      >
        {children}
      </Link>
    </li>
  );
}
