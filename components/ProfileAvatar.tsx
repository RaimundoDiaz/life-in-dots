"use client";

type Props = {
  name?: string | null;
  size?: number;
  onClick?: () => void;
};

function initialsOf(name?: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function ProfileAvatar({ name, size = 40, onClick }: Props) {
  const initials = initialsOf(name);
  const fontSize = Math.round(size * 0.4);
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full bg-blue-600 text-white font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
      style={{ width: size, height: size, fontSize }}
      aria-label="Perfil"
    >
      {initials}
    </button>
  );
}
