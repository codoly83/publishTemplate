import { Switch } from "@/components/ui";
import { useTheme } from "@/providers/theme-provider";

import { NavLink, Outlet } from "react-router-dom";

import { ExternalLink, ListIcon } from "lucide-react";
import { GUIDE_NAV_SECTIONS, publishGuideNavItems } from "./sampleMeta";
import { GuideScrollToSearchMatch } from "./GuideScrollToSearchMatch";
import { GuideAutoQuickMenu } from "./GuideAutoQuickMenu";
import { GuideSearch } from "./GuideSearch";
import "./guide.css";
import { useRef } from "react";

function Guide() {
  const { setTheme } = useTheme();
  const guideOutletRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-gr01 bg-base px-4 py-3">
        <NavLink to="/guide/ialist" className="text-primary font-bold shrink-0">
          Publish Guide
        </NavLink>

        <div className="min-w-0 flex-1 flex justify-center px-2">
          <GuideSearch items={publishGuideNavItems} />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-font-b text-sm">다크모드 설정</span>
          <Switch
            aria-label="다크모드 설정"
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </header>
      <main className="flex-1 flex gap-4 p-4 bg-line01 overflow-hidden">
        <aside className="flex flex-col bg-base rounded-2xl w-60">
          <div className="guide-title">
            <NavLink
              to="/guide/ialist"
              className={({ isActive }) =>
                [
                  "rounded px-2 py-1 text-sm flex items-center font-bold justify-between",
                  ,
                  isActive ? "bg-primary text-font-w" : "hover:bg-container",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              <span>Publish ialist</span>
              <ListIcon size={16} aria-hidden />
            </NavLink>
          </div>
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto my-3 px-3">
            {GUIDE_NAV_SECTIONS.map((section, sectionIndex) => {
              const items = publishGuideNavItems.filter(
                (item) => item.section === section.id,
              );
              return (
                <div key={section.id} className="contents">
                  <div
                    className={`flex items-center border-b py-3 text-sm font-bold ${
                      sectionIndex > 0 ? "mt-3" : ""
                    }`}
                  >
                    {section.label}
                    <span className="ml-1 text-font-b">({items.length})</span>
                  </div>
                  {items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      end={item.end}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={
                        item.openInNewTab ? "noopener noreferrer" : undefined
                      }
                      className={({ isActive }) =>
                        [
                          "rounded px-2 py-1 text-sm text-font-b",
                          item.showExternalIcon
                            ? "flex items-center justify-between"
                            : "",
                          isActive
                            ? "bg-primary text-font-w"
                            : "hover:bg-container",
                        ]
                          .filter(Boolean)
                          .join(" ")
                      }
                    >
                      {item.title}
                      {item.showExternalIcon ? (
                        <ExternalLink size={16} aria-hidden />
                      ) : null}
                    </NavLink>
                  ))}
                </div>
              );
            })}
          </div>
        </aside>

        <div
          ref={guideOutletRef}
          className="relative flex-1 rounded-2xl border border-line02 bg-base overflow-hidden"
        >
          <GuideScrollToSearchMatch />
          <Outlet />
          <GuideAutoQuickMenu hostRef={guideOutletRef} />
        </div>
      </main>
    </div>
  );
}

export { Guide };
export default Guide;
