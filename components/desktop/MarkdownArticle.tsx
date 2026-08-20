"use client";

import ReactMarkdown from "react-markdown";

const ACCENT = "#ef80ae";

export function MarkdownArticle({ source }: { source: string }) {
  return (
    <div style={{ fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,.7)" }}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 style={{ margin: "20px 0 10px", fontSize: 19, fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.3 }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ margin: "20px 0 10px", fontSize: 16, fontWeight: 700, letterSpacing: ".01em", lineHeight: 1.3 }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ margin: "16px 0 8px", fontSize: 13.5, fontWeight: 700 }}>{children}</h3>
          ),
          p: ({ children }) => <p style={{ margin: "0 0 12px" }}>{children}</p>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }}>
              {children}
            </a>
          ),
          strong: ({ children }) => <strong style={{ color: "rgba(255,255,255,.9)", fontWeight: 700 }}>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          ul: ({ children }) => <ul style={{ margin: "0 0 14px", padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>{children}</ul>,
          ol: ({ children }) => (
            <ol style={{ margin: "0 0 14px", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ display: "flex", gap: 9, fontSize: 11.5, lineHeight: 1.65, color: "rgba(255,255,255,.65)", listStyle: "none" }}>
              <span style={{ color: ACCENT, flex: "0 0 auto" }}>◆</span>
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                margin: "10px 0 16px", padding: "2px 0 2px 16px", borderLeft: `2px solid ${ACCENT}`,
                fontSize: 12.5, fontStyle: "italic", lineHeight: 1.7, color: "rgba(255,255,255,.82)",
              }}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            if (!isBlock) {
              return (
                <code style={{ padding: "1px 5px", borderRadius: 4, background: "rgba(255,255,255,.08)", fontSize: 11, color: ACCENT }}>
                  {children}
                </code>
              );
            }
            return <code style={{ fontSize: 11, lineHeight: 1.65, color: "rgba(255,255,255,.78)" }}>{children}</code>;
          },
          pre: ({ children }) => (
            <pre
              style={{
                margin: "8px 0 16px", padding: 14, borderRadius: 9, border: "1px solid rgba(255,255,255,.1)",
                background: "#050506", overflowX: "auto",
              }}
            >
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ display: "block", width: "100%", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", margin: "10px 0 16px" }} />
          ),
          hr: () => <div style={{ height: 1, background: "rgba(255,255,255,.1)", margin: "18px 0" }} />,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
