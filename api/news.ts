// api/news.ts
import Parser from "rss-parser";

type Item = {
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt?: string;
};

const FEEDS = [
  { source: "Governo do Brasil", url: "https://www.gov.br/pt-br/noticias/RSS" },
  { source: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml" },
  { source: "Senado Notícias", url: "https://www12.senado.leg.br/noticias/feed" },
  { source: "Câmara Notícias", url: "https://www.camara.leg.br/noticias/rss/ultimas-noticias" },
];

const BLOCK_WORDS = ["bunda", "sexo", "porn", "pornô", "nude", "nudes"];

const GENERIC_TITLES = new Set([
  "artigos",
  "notícias",
  "ultimas noticias",
  "últimas notícias",
  "últimas",
  "destaques",
]);

const MAX_DAYS = 2; // apenas notícias dos últimos 2 dias

function stripHtml(s = "") {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function cut(s = "", max = 180) {
  s = stripHtml(s);
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function isBlocked(text: string) {
  const t = text.toLowerCase();
  return BLOCK_WORDS.some((w) => t.includes(w));
}

function looksGenericTitle(title: string) {
  const t = title.toLowerCase().trim();
  return !t || t.length < 8 || GENERIC_TITLES.has(t);
}

function isRecent(date?: string) {
  if (!date) return false;
  const d = new Date(date).getTime();
  const limit = Date.now() - MAX_DAYS * 24 * 60 * 60 * 1000;
  return d >= limit;
}

async function fetchMetaDescription(url: string): Promise<string> {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 4500);

  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    if (!res.ok) return "";

    const html = await res.text();

    const og =
      html.match(/property=["']og:description["'][^>]*content=["']([^"']+)["']/i)?.[1] ||
      html.match(/content=["']([^"']+)["'][^>]*property=["']og:description["']/i)?.[1];

    const desc =
      html.match(/name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1] ||
      html.match(/content=["']([^"']+)["'][^>]*name=["']description["']/i)?.[1];

    return cut(og || desc || "", 200);
  } catch {
    return "";
  } finally {
    clearTimeout(to);
  }
}

export default async function handler(_req: any, res: any) {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  const parser = new Parser({
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    customFields: {
      item: [
        "description",
        "summary",
        "content",
        "content:encoded",
        "dc:type",
        "dc:date",
      ],
    } as any,
  });

  const settled = await Promise.allSettled(
    FEEDS.map(async (f) => {
      const feed = await parser.parseURL(f.url);

      return (feed.items || [])
        .filter((it: any) => it["dc:type"] !== "Folder") // remove pastas do gov.br
        .map((it: any) => ({
          source: f.source,
          title: cut(it.title ?? "", 140),
          url: it.link || "",
          publishedAt: it.isoDate || it.pubDate || it["dc:date"],
          rawSummary:
            it.contentSnippet ||
            it.summary ||
            it.description ||
            it.content ||
            it["content:encoded"] ||
            "",
        }));
    })
  );

  const raw = settled
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .filter(
      (x) =>
        x.url &&
        x.title &&
        !looksGenericTitle(x.title) &&
        isRecent(x.publishedAt)
    );

  const items: Item[] = [];

  for (const x of raw) {
    let summary = cut(x.rawSummary ?? "", 190);

    if (summary.length < 30 && x.url) {
      const meta = await fetchMetaDescription(x.url);
      if (meta.length >= 30) summary = meta;
    }

    if (!summary || summary.length < 30) continue;
    if (isBlocked(`${x.title} ${summary}`)) continue;

    items.push({
      title: x.title,
      summary,
      source: x.source,
      url: x.url,
      publishedAt: x.publishedAt,
    });
  }

  const seen = new Set<string>();

  const deduped = items.filter((x) =>
    seen.has(x.url) ? false : (seen.add(x.url), true)
  );

  deduped.sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );

  res.status(200).json({
    items: deduped.slice(0, 25),
  });
}