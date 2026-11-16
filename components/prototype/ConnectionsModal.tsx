"use client";

import { ReactNode, useState } from "react";
import { Activity, Copy, GitBranch, HeartPulse, Lock, Terminal, Watch, X } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

// Illustrative only: the /api/checkin route is part of the proposal and doesn't exist yet.
const HOOK_SNIPPET = `"hooks": {
  "SessionStart": [{ "hooks": [{
    "type": "command",
    "command": "curl -s -X POST https://yourlifeindots.com/api/checkin/claude-code -H \\"Authorization: Bearer $LIFE_IN_DOTS_KEY\\""
  }] }]
}`;

export function ConnectionsModal({ open, onClose }: Props) {
  const t = useT();
  const [connected, setConnected] = useState({ github: true, strava: false });
  const [copied, setCopied] = useState(false);

  function copySnippet() {
    navigator.clipboard
      .writeText(HOOK_SNIPPET)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  }

  return (
    <Modal open={open} onClose={onClose} width={760}>
      <div className="max-h-[85vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-2xl md:text-[28px] text-black leading-tight">{t("proto.conn.title")}</h2>
            <p className="text-sm text-muted">{t("proto.conn.subtitle")}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t("common.close")} className="p-2 -m-2 text-muted hover:text-black">
            <X size={20} />
          </button>
        </header>

        <ul className="flex flex-col gap-3">
          <Card
            icon={<GitBranch size={22} aria-hidden />}
            name={t("proto.source.github")}
            description={t("proto.conn.github")}
            status={connected.github ? t("proto.conn.connected") : undefined}
            meta={connected.github ? t("proto.conn.githubMeta") : undefined}
            action={
              <ToggleButton
                on={connected.github}
                onClick={() => setConnected((c) => ({ ...c, github: !c.github }))}
              />
            }
          />

          <Card
            highlighted
            icon={<Terminal size={22} aria-hidden />}
            name={t("proto.source.claude")}
            description={t("proto.conn.claude")}
            status={t("proto.conn.pending")}
          >
            <ol className="list-decimal pl-5 flex flex-col gap-3 text-sm text-black">
              <li className="flex flex-col gap-1.5">
                {t("proto.conn.claudeStep1")}
                <code className="flex items-center min-h-10 px-3 rounded-lg bg-surface border border-line font-mono text-xs">
                  ld_••••••••••••3f9a
                </code>
              </li>
              <li className="flex flex-col gap-1.5">
                {t("proto.conn.claudeStep2", { file: "~/.claude/settings.json" })}
                <pre className="p-3 rounded-lg bg-ink text-line font-mono text-[11px] leading-relaxed whitespace-pre-wrap break-all">
                  {HOOK_SNIPPET}
                </pre>
                <button
                  type="button"
                  onClick={copySnippet}
                  className="self-start flex items-center gap-1.5 min-h-10 px-3 rounded-lg border border-line text-xs font-medium hover:bg-surface"
                >
                  <Copy size={14} aria-hidden />
                  {copied ? t("proto.conn.copied") : t("proto.conn.copy")}
                </button>
              </li>
            </ol>
            <span className="text-xs text-muted">{t("proto.conn.claudeNote")}</span>
          </Card>

          <Card
            icon={<Activity size={22} aria-hidden />}
            name={t("proto.source.strava")}
            description={t("proto.conn.strava")}
            status={connected.strava ? t("proto.conn.connected") : undefined}
            action={
              <ToggleButton
                on={connected.strava}
                onClick={() => setConnected((c) => ({ ...c, strava: !c.strava }))}
              />
            }
          />

          <Card
            icon={<Watch size={22} aria-hidden />}
            name={t("proto.conn.garminName")}
            description={t("proto.conn.garmin")}
            action={<SoonBadge />}
          />

          <Card
            icon={<HeartPulse size={22} aria-hidden />}
            name={t("proto.conn.healthName")}
            description={t("proto.conn.health")}
            action={<SoonBadge />}
          />
        </ul>

        <footer className="flex items-center gap-2.5 pt-4 border-t border-line text-xs text-muted">
          <Lock size={16} aria-hidden className="shrink-0" />
          {t("proto.conn.footer")}
        </footer>
      </div>
    </Modal>
  );
}

function Card({
  icon,
  name,
  description,
  status,
  meta,
  action,
  highlighted = false,
  children,
}: {
  icon: ReactNode;
  name: string;
  description: string;
  status?: string;
  meta?: string;
  action?: ReactNode;
  highlighted?: boolean;
  children?: ReactNode;
}) {
  return (
    <li className={`flex items-start gap-4 p-4 rounded-2xl border ${highlighted ? "border-ink" : "border-line"}`}>
      <span className="shrink-0 w-11 h-11 rounded-xl bg-surface flex items-center justify-center text-black">{icon}</span>
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-base font-semibold text-black">{name}</span>
          {status && <span className="text-xs font-medium text-muted">{status}</span>}
        </div>
        <p className="text-sm text-intensity-3">{description}</p>
        {meta && <span className="text-xs text-muted">{meta}</span>}
        {children}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </li>
  );
}

function ToggleButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 px-4 rounded-lg text-sm font-medium transition-colors ${
        on ? "border border-line text-black hover:bg-surface" : "bg-ink text-paper hover:bg-intensity-3"
      }`}
    >
      {on ? t("proto.conn.disconnect") : t("proto.conn.connect")}
    </button>
  );
}

function SoonBadge() {
  const t = useT();
  return (
    <span className="px-3 py-1.5 rounded-full border border-line bg-surface text-xs font-medium text-intensity-3">
      {t("proto.conn.soon")}
    </span>
  );
}
