import * as React from "react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type GuideBoxProps = {
  title: string;
  description?: string;
  code?: string;
  lang?: string;
  children: React.ReactNode;
  darkMode?: boolean;
};

function GuideBox({
  title,
  description,
  code,
  lang = "tsx",
  children,
  darkMode = false,
}: GuideBoxProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    async function highlight() {
      if (!code) return;
      const theme = darkMode ? "light-plus" : "dark-plus";
      const result = await codeToHtml(code.trim(), {
        lang,
        theme,
      });
      if (mounted) setHtml(result);
    }

    highlight();

    return () => {
      mounted = false;
    };
  }, [code, lang, darkMode]);

  return (
    <section className="flex flex-col gap-2">
      <div>
        <h2 className="text-lg font-semibold text-font-b">{title}</h2>
        {description ? (
          <p className="text-sm text-font-g">{description}</p>
        ) : null}
      </div>

      <div className="rounded-xl border flex flex-col gap-4 bg-base p-4">
        {children}
      </div>
      {code && (
        <div className="rounded-lg border overflow-x-auto">
          <div
            className="[&>pre]:p-4 [&>pre]:text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </section>
  );
}

export { GuideBox };
export default GuideBox;
