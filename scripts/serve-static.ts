import path from 'node:path';

const root = path.resolve(process.env.STATIC_DIR ?? 'apps/docs/out');
const port = Number(process.env.PORT ?? '3500');
const server = Bun.serve({
  hostname: '127.0.0.1',
  port,
  async fetch(request) {
    let pathname: string;
    try {
      pathname = decodeURIComponent(new URL(request.url).pathname);
    } catch {
      return new Response('Bad request', { status: 400 });
    }
    const target = path.resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) return new Response('Forbidden', { status: 403 });
    const candidates = pathname.endsWith('/')
      ? [path.join(target, 'index.html')]
      : [target, `${target}.html`, path.join(target, 'index.html')];
    for (const candidate of candidates) {
      const file = Bun.file(candidate);
      if ((await file.exists()) && file.size) return new Response(file);
    }
    return new Response('Not found', { status: 404 });
  }
});
console.log(`Static validation server: ${server.url}`);
