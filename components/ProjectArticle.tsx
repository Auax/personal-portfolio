import Image from "next/image";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type ProjectArticleProps = {
  markdown: string;
  repositoryUrl?: string;
};

function resolveMarkdownUrl(
  url: string,
  attribute: string,
  repositoryUrl?: string,
) {
  const isRelative = !/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(url);

  if (!isRelative || !repositoryUrl) return defaultUrlTransform(url);

  const repositoryPath = repositoryUrl
    .replace(/^https:\/\/github\.com\//i, "")
    .replace(/\/$/, "");
  const baseUrl =
    attribute === "src"
      ? `https://raw.githubusercontent.com/${repositoryPath}/refs/heads/main/`
      : `${repositoryUrl.replace(/\/$/, "")}/blob/main/`;

  return defaultUrlTransform(new URL(url, baseUrl).toString());
}

export default function ProjectArticle({
  markdown,
  repositoryUrl,
}: ProjectArticleProps) {
  return (
    <article className="project-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        urlTransform={(url, attribute) =>
          resolveMarkdownUrl(url, attribute, repositoryUrl)
        }
        components={{
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ src, alt, width, height }) => {
            if (typeof src !== "string") return null;

            const parsedWidth = Number(width) || 1200;
            const parsedHeight = Number(height) || 750;

            return (
              <Image
                src={src}
                alt={alt ?? ""}
                width={parsedWidth}
                height={parsedHeight}
                sizes="(max-width: 768px) calc(100vw - 4rem), 768px"
                className="h-auto w-full"
                unoptimized={src.toLowerCase().endsWith(".gif")}
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
