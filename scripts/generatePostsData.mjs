import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src", "posts");
const outFile = path.join(process.cwd(), "src", "lib", "posts-data.ts");

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

const posts = files.map((file) => {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(postsDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    content,
  };
});

const header = `// AUTO-GENERATED from src/posts by scripts/generatePostsData.mjs\n// Do not edit by hand unless you know what you're doing.\n\nexport type Post = {\n  slug: string;\n  title: string;\n  date: string;\n  description: string;\n  content: string;\n};\n\nexport const posts: Post[] = [\n`;

const body = posts
  .map((p) => {
    const esc = (s) => s.replace(/`/g, "\\`");
    return `  {\n    slug: "${p.slug}",\n    title: "${esc(p.title)}",\n    date: "${p.date}",\n    description: "${esc(p.description)}",\n    content: ` + "`" + esc(p.content) + "`" + "\n  },";
  })
  .join("\n");

const footer = "\n];\n";

fs.writeFileSync(outFile, header + body + footer);

console.log(`Wrote ${posts.length} posts to ${outFile}`);
