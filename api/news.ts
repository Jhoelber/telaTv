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
const GENERIC_TITLES = new Set(["artigos", "notícias", "ultimas noticias", "últimas notícias", "últimas", "destaques"]);

function stripHtml(s = "") {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Filtra o texto para retornar apenas até o primeiro (ou segundo) ponto final,
 * evitando que o resumo fique poluído ou cortado abruptamente.
 */
function smartSentence(s = "") {
  const text = stripHtml(s);
  if (text.length < 50) return text;

  // Busca o primeiro ponto final que tenha um espaço depois (fim de frase real)
  const firstDot = text.indexOf(". ");
  
  if (firstDot !== -1 && firstDot > 30) {
    return text.substring(0, firstDot + 1);
  }

  // Se a primeira frase for muito curta, tenta a segunda
  const secondDot = text.indexOf(". ", firstDot + 2);
  if (secondDot !== -1 && secondDot < 250) {
    return text.substring(0, secondDot + 1);
  }

  // Fallback: corta em 180 caso não encontre pontos adequados
  return text.length > 180 ? text.substring(0, 180).trim() + "..." : text;
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
  return d >= Date.now() - MAX_DAYS * 86400000;
}

export default async function handler(_req: any, res: any) {
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const parser = new Parser({
      timeout: 5000,
      customFields: { item: ["dc:date", "dc:type", "description", "summary"] } as any,
    });

    const feedsResults = await Promise.allSettled(
      FEEDS.map(async (f): Promise<Item[]> => {
        const feed = await parser.parseURL(f.url);
        return (feed.items || [])
          .filter((it: any) => it["dc:type"] !== "Folder")
          .map((it: any) => {
            const rawDate = it.isoDate || it.pubDate || it["dc:date"];
            const validDate = rawDate && !isNaN(Date.parse(rawDate)) ? new Date(rawDate).toISOString() : undefined;

            return {
              source: f.source,
              title: it.title ?? "",
              url: it.link || "",
              publishedAt: validDate,
              summary: smartSentence(it.contentSnippet || it.summary || it.description || ""),
            };
          });
      }),
    );

    const all: Item[] = feedsResults
      .filter((r): r is PromiseFulfilledResult<Item[]> => r.status === "fulfilled")
      .flatMap((r) => r.value);

    const filtered = all.filter(
      (x) => x.url && x.title && !looksGenericTitle(x.title) && isRecent(x.publishedAt) && x.summary && x.summary.length > 30 && !isBlocked(x.title + " " + x.summary)
    );

    const seen = new Set<string>();
    const dedup = filtered.filter((x) => {
      const key = (x.url + x.title).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    dedup.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

    return res.status(200).json({ items: dedup.slice(0, MAX_ITEMS) });
  } catch (error) {
    return res.status(200).json({ items: [] });
  }
}