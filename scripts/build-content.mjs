import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const root = resolve(import.meta.dirname, '..');
const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const isApi = env.VITE_CONTENT_SOURCE === 'api';
const fixture = isApi ? { posts: [] } : JSON.parse(await readFile(resolve(root, 'src/data/posts.json'), 'utf8'));
let template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const origin = (env.VITE_SITE_URL || 'https://sai-nagendra-portfolio.ysainagendra.chatgpt.site').replace(/\/$/, '');
template = template.replaceAll('https://sai-nagendra-portfolio.ysainagendra.chatgpt.site/images/og-portfolio.png', origin + '/images/og-portfolio.png');
if (!/^https:\/\/[^\s]+$/.test(origin)) throw new Error('VITE_SITE_URL must be an HTTPS URL');
const xml = value => String(value).replace(/[<>&"']/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&apos;' }[c]));
const posts = fixture.posts.filter(p => Date.parse(p.publishedAt) <= Date.now());
const seen = new Set();
for (const p of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || seen.has(p.slug)) throw new Error('Invalid or duplicate post slug');
  seen.add(p.slug);
}
async function shell(path, title, description, noIndex = true) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${xml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${xml(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow'}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${xml(origin + path)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${xml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${xml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${xml(origin + path)}" />`);
  const directory = resolve(root, 'dist', path.replace(/^\//, ''));
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
await shell('/', 'Sai Nagendra — Software Engineer', 'Sai Nagendra Yakkaladevara — Software Engineer. Full-stack products, shared UI, and AI-assisted engineering with Angular, .NET, and TypeScript.', false);
await shell('/posts', 'Writing — Sai Nagendra', 'Notes on interfaces, software, and the things I’m learning.', isApi || posts.some(p=>p.isDemo));
// These are metadata-bearing SPA entry points, not server-rendered article bodies.
if (!isApi) for (const p of posts) await shell(`/posts/${p.slug}`, `${p.title} — Sai Nagendra`, p.excerpt, p.isDemo);
await writeFile(resolve(root,'dist/404.html'), template.replace(/<title>.*?<\/title>/, '<title>Page not found — Sai Nagendra</title>'));
const published = isApi ? [] : posts.filter(p => !p.isDemo);
const items = published.map(p => `<item><title>${xml(p.title)}</title><link>${xml(origin + '/posts/' + p.slug)}</link><guid isPermaLink="true">${xml(origin + '/posts/' + p.slug)}</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${xml(p.excerpt)}</description></item>`).join('');
await writeFile(resolve(root,'dist/feed.xml'), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Sai Nagendra — Writing</title><link>${xml(origin)}/posts</link><description>Notes on interfaces and software. Sample articles are excluded.</description><language>en</language>${items}</channel></rss>`);
await writeFile(resolve(root,'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xml(origin)}/</loc></url>${published.map(p=>`<url><loc>${xml(origin)}/posts/${xml(p.slug)}</loc><lastmod>${xml(p.updatedAt)}</lastmod></url>`).join('')}</urlset>`);
await writeFile(resolve(root,'dist/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated archive, ${isApi ? 0 : posts.length} article entry points, 404, RSS (${published.length} real articles), sitemap.`);
