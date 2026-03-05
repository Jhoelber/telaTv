// api/news.ts
import Parser from "rss-parser";

type Item = {
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt?: string;
};

const MAX_DAYS = 2;
const MAX_ITEMS = 25;

const FEEDS = [
  { source: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml" },
  { source: "Senado Notícias", url: "https://www12.senado.leg.br/noticias/feed" },
  { source: "Câmara Notícias", url: "https://www.camara.leg.br/noticias/rss/ultimas-noticias" },
  { source: "Governo do Brasil", url: "https://www.gov.br/pt-br/noticias/RSS" },
  { source: "BBC Brasil", url: "https://feeds.bbci.co.uk/portuguese/rss.xml" },
  { source: "Nexo Jornal", url: "https://www.nexojornal.com.br/rss.xml" },
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
  const limit = Date.now() - MAX_DAYS * 86400000;
  return d >= limit;
}

export default async function handler(_req: any, res: any) {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  const parser = new Parser({
    timeout: 5000,
    customFields: {
      item: ["dc:date", "dc:type", "description", "summary"],
    } as any,
  });

  const feeds = await Promise.allSettled(
    FEEDS.map(async (f) => {
      const feed = await parser.parseURL(f.url);

      const items: Item[] = (feed.items || [])
        .filter((it: any) => it["dc:type"] !== "Folder")
        .map((it: any) => ({
          source: f.source,
          title: cut(it.title ?? "", 140),
          url: it.link || "",
          publishedAt: it.isoDate || it.pubDate || it["dc:date"],
          summary: cut(
            it.contentSnippet ||
              it.summary ||
              it.description ||
              "",
            180
          ),
        }));

      return items;
    })
  );

  const all: Item[] = feeds
    .filter((r): r is PromiseFulfilledResult<Item[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const filtered: Item[] = all.filter(
    (x) =>
      x.url &&
      x.title &&
      !looksGenericTitle(x.title) &&
      isRecent(x.publishedAt) &&
      x.summary &&
      x.summary.length > 40 &&
      !isBlocked(x.title + " " + x.summary)
  );

  const seen = new Set<string>();

  const dedup: Item[] = filtered.filter((x) => {
    const key = x.url + x.title;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });

  dedup.sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );

  res.status(200).json({
    items: dedup.slice(0, MAX_ITEMS),
  });
}