// Draws a 1080×1920 Instagram story with the Canvas API (no dependencies).
// Canvas can't read Tailwind classes, so theme colours mirror the paper / ink /
// muted / line-soft tokens, and activity colours come from palettes.ts.
import { YEAR, daysInMonth } from "@/lib/dates";
import type { Shape } from "./habits";

export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

export type StoryItem = {
  value: string;
  label: string;
  colour?: string;
  shape?: Shape;
};

export type StoryContent = {
  dark: boolean;
  steps: readonly string[];
  shape: Shape;
  eyebrow: string;
  title: string;
  bigNumber: string;
  caption: string;
  levels: number[];
  items: StoryItem[];
  itemsLayout: "list" | "stats";
  footerLeft: string;
  footerRight: string;
};

const THEMES = {
  light: { bg: "#ffffff", fg: "#000000", muted: "#757575", empty: "#d5d5d5" },
  dark: { bg: "#0f0f0f", fg: "#ffffff", muted: "#a0a0a0", empty: "#3a3a3a" },
};

const PAD = 96;
const INNER = STORY_WIDTH - PAD * 2;

function fontStacks(): { serif: string; sans: string } {
  const style = getComputedStyle(document.body);
  const serif = style.getPropertyValue("--font-source-serif").trim();
  const sans = style.getPropertyValue("--font-inter").trim();
  return {
    serif: serif ? `${serif}, Georgia, serif` : "Georgia, serif",
    sans: sans ? `${sans}, system-ui, sans-serif` : "system-ui, sans-serif",
  };
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  shape: Shape,
  fill: string | null,
  emptyColour: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  let side = size;
  if (shape === "diamond") {
    ctx.rotate(Math.PI / 4);
    side = size * 0.75;
  }
  const r = side / 2;
  const ring = shape === "ring" && fill !== null;
  const lineWidth = !fill ? 2 : ring ? size * 0.22 : 0;
  ctx.beginPath();
  if (shape === "square" || shape === "diamond") {
    ctx.roundRect(-r + lineWidth / 2, -r + lineWidth / 2, side - lineWidth, side - lineWidth, side * 0.15);
  } else {
    ctx.arc(0, 0, r - lineWidth / 2, 0, Math.PI * 2);
  }
  if (!fill) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = emptyColour;
    ctx.stroke();
  } else if (ring) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = fill;
    ctx.stroke();
  } else {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.restore();
}

export async function renderStory(content: StoryContent): Promise<Blob | null> {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const theme = content.dark ? THEMES.dark : THEMES.light;
  const fonts = fontStacks();
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  let y = 170;
  ctx.fillStyle = theme.muted;
  ctx.font = `500 28px ${fonts.sans}`;
  ctx.fillText(content.eyebrow.toUpperCase(), PAD, y);

  y += 20;
  ctx.fillStyle = theme.fg;
  ctx.font = `400 104px ${fonts.serif}`;
  for (const line of wrap(ctx, content.title, INNER).slice(0, 2)) {
    y += 112;
    ctx.fillText(line, PAD, y);
  }

  y += 250;
  ctx.font = `400 230px ${fonts.serif}`;
  ctx.fillStyle = content.dark ? content.steps[3] : theme.fg;
  ctx.fillText(content.bigNumber, PAD, y);
  const numberWidth = ctx.measureText(content.bigNumber).width;
  ctx.font = `400 40px ${fonts.sans}`;
  ctx.fillStyle = theme.fg;
  const captionLines = wrap(ctx, content.caption, INNER - numberWidth - 32).slice(0, 2);
  captionLines.forEach((line, i) => {
    ctx.fillText(line, PAD + numberWidth + 32, y - (captionLines.length - 1 - i) * 50);
  });

  y += 70;
  const column = INNER / 31;
  const dot = 21;
  const rowHeight = 37;
  let index = 0;
  for (let month = 0; month < 12; month++) {
    for (let day = 0; day < daysInMonth(YEAR, month); day++) {
      const level = content.levels[index++] ?? -1;
      const fill = level > 0 ? content.steps[level - 1] : null;
      drawDot(ctx, PAD + column * (day + 0.5), y + rowHeight * month + dot / 2, dot, content.shape, fill, theme.empty);
    }
  }
  y += rowHeight * 12 + 60;

  if (content.itemsLayout === "list") {
    content.items.slice(0, 6).forEach((item, i) => {
      const x = PAD + (i % 2) * (INNER / 2);
      const rowY = y + Math.floor(i / 2) * 104;
      if (item.colour) drawDot(ctx, x + 15, rowY + 4, 30, item.shape ?? "circle", item.colour, theme.empty);
      ctx.fillStyle = theme.fg;
      ctx.font = `600 34px ${fonts.sans}`;
      ctx.fillText(item.value, x + 52, rowY + 16);
      ctx.fillStyle = theme.muted;
      ctx.font = `400 28px ${fonts.sans}`;
      ctx.fillText(item.label, x + 52, rowY + 56);
    });
  } else {
    const width = INNER / content.items.length;
    content.items.forEach((item, i) => {
      const x = PAD + i * width;
      ctx.fillStyle = theme.fg;
      ctx.font = `400 84px ${fonts.serif}`;
      ctx.fillText(item.value, x, y + 70);
      ctx.fillStyle = theme.muted;
      ctx.font = `400 26px ${fonts.sans}`;
      wrap(ctx, item.label, width - 24)
        .slice(0, 2)
        .forEach((line, j) => ctx.fillText(line, x, y + 120 + j * 34));
    });
  }

  const footerY = STORY_HEIGHT - PAD - 30;
  ctx.fillStyle = theme.fg;
  ctx.fillRect(PAD, footerY - 66, INNER, 2);
  ctx.font = `400 30px ${fonts.sans}`;
  ctx.fillText(content.footerLeft, PAD, footerY);
  ctx.font = `500 30px ${fonts.sans}`;
  const rightWidth = ctx.measureText(content.footerRight).width;
  const rightX = STORY_WIDTH - PAD - rightWidth;
  ctx.fillText(content.footerRight, rightX, footerY);
  ctx.beginPath();
  ctx.arc(rightX - 26, footerY - 10, 11, 0, Math.PI * 2);
  ctx.fill();

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}
