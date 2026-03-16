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
  {
    source: "Agência Brasil",
    url: "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml",
  },
  {
    source: "Senado Notícias",
    url: "https://www12.senado.leg.br/noticias/feed",
  },
  {
    source: "Câmara Notícias",
    url: "https://www.camara.leg.br/noticias/rss/ultimas-noticias",
  },
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
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Smart Cut: Corta o texto respeitando o final das palavras
 * e limpa pontuações órfãs antes das reticências.
 */
function cut(s = "", max = 180) {
  s = stripHtml(s);
  if (s.length <= max) return s;

  // Tenta cortar no último espaço antes do limite
  const sub = s.substring(0, max);
  const lastSpace = sub.lastIndexOf(" ");

  let clean = lastSpace > 0 ? sub.substring(0, lastSpace) : sub;

  // Remove pontuação que ficaria "colada" nas reticências (ex: "notícia,...")
  clean = clean.replace(/[,.;:!]$/, "");

  return clean + "...";
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
  if (!Number.isFinite(d)) return false;
  const limit = Date.now() - MAX_DAYS * 86400000;
  return d >= limit;
}

export default async function handler(_req: any, res: any) {
  // Cache de 1 hora para máxima performance na Vercel
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const parser = new Parser({
      timeout: 5000,
      customFields: {
        item: ["dc:date", "dc:type", "description", "summary"],
      } as any,
    });

    const feedsResults = await Promise.allSettled(
      FEEDS.map(async (f): Promise<Item[]> => {
        const feed = await parser.parseURL(f.url);

        return (feed.items || [])
          .filter((it: any) => it["dc:type"] !== "Folder")
          .map((it: any) => {
            const rawDate = it.isoDate || it.pubDate || it["dc:date"];
            const validDate =
              rawDate && !isNaN(Date.parse(rawDate))
                ? new Date(rawDate).toISOString()
                : undefined;

            return {
              source: f.source,
              title: it.title ?? "",
              url: it.link || "",
              publishedAt: validDate,
              // Mandamos o texto limpo e longo. Sem a função cut() que põe reticências.
              summary: stripHtml(
                it.contentSnippet || it.summary || it.description || "",
              ).substring(0, 500),
            };
          });
      }),
    );

    const all: Item[] = feedsResults
      .filter(
        (r): r is PromiseFulfilledResult<Item[]> => r.status === "fulfilled",
      )
      .flatMap((r) => r.value);

    const filtered: Item[] = all.filter(
      (x) =>
        x.url &&
        x.title &&
        !looksGenericTitle(x.title) &&
        isRecent(x.publishedAt) &&
        x.summary &&
        x.summary.length > 40 &&
        !isBlocked(x.title + " " + x.summary),
    );

    const seen = new Set<string>();
    const dedup = filtered.filter((x) => {
      const key = (x.url + x.title).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    dedup.sort(
      (a, b) =>
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime(),
    );

    return res.status(200).json({ items: dedup.slice(0, MAX_ITEMS) });
  } catch (error) {
    console.error("Erro na API de notícias:", error);
    return res.status(200).json({ items: [] });
  }
}
