"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:border-accent-border"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
          className="fixed inset-x-0 top-16 z-40 border-b border-border-subtle bg-bg/95 backdrop-blur-md"
        >
          <nav className="mx-auto w-full max-w-6xl px-6 py-6">
            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base text-text-muted transition-colors hover:bg-surface hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-border-subtle pt-3">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base text-text-muted transition-colors hover:bg-surface hover:text-text"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {open && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-16 z-30 cursor-default bg-bg/60 backdrop-blur-sm"
        />
      )}
    </div>
  );
}
