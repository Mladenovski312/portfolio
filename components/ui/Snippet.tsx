"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type SnippetProps = {
  code: string;
  language?: string;
  filename?: string;
};

export function Snippet({ code, language, filename }: SnippetProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-2/60 px-4 py-2">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-subtle">
          {language && <span className="text-accent">{language}</span>}
          {filename && (
            <>
              {language && <span aria-hidden>·</span>}
              <span>{filename}</span>
            </>
          )}
          {!language && !filename && <span>Snippet</span>}
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted transition-colors hover:border-accent-border hover:text-text"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed text-text">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
