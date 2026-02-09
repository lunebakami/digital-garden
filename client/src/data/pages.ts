export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
}

interface Frontmatter {
  slug: string;
  title: string;
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    return { 
      frontmatter: { slug: '', title: '' }, 
      body: content 
    };
  }

  const frontmatterText = match[1];
  const body = match[2].trim();

  const frontmatter: Partial<Frontmatter> = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim() as keyof Frontmatter;
      const value = line.substring(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  });

  return { 
    frontmatter: frontmatter as Frontmatter, 
    body 
  };
}

// Dynamically import all markdown files
const markdownFiles = import.meta.glob('../../../content/*.md', { 
  query: '?raw', 
  import: 'default',
  eager: true 
}) as Record<string, string>;

// Build pages array from imported files
let pageId = 1;
const pages: Page[] = Object.entries(markdownFiles).map(([path, content]) => {
  const { frontmatter, body } = parseFrontmatter(content);
  const filename = path.split('/').pop()?.replace('.md', '') || '';
  
  return {
    id: pageId++,
    slug: frontmatter.slug || filename,
    title: frontmatter.title || filename,
    content: body,
  };
});

export function getAllPages(): Page[] {
  return pages;
}

export function getPageBySlug(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug);
}
