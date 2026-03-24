import { Button } from "@/components/ui";

type GuideQuickMenuSection = {
  id: string;
  label: string;
};

type GuideQuickMenuProps = {
  sections: readonly GuideQuickMenuSection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  onScrollTop: () => void;
  title?: string;
  className?: string;
};

export function GuideQuickMenu({
  sections,
  activeSectionId,
  onSelectSection,
  onScrollTop,
  title = "바로가기",
  className = "absolute top-30 right-0 z-20",
}: GuideQuickMenuProps) {
  return (
    <div className={className}>
      <div className="w-44 rounded-lg border border-line bg-base shadow-sm">
        <div className="border-b border-line px-3 py-2 text-xs font-bold text-font-b">
          {title}
        </div>
        <div className="flex flex-col gap-1 p-2">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection(section.id)}
                className={[
                  "rounded px-2 py-1 text-left text-xs transition-colors",
                  isActive
                    ? "bg-primary text-font-w"
                    : "text-font-b hover:bg-container",
                ].join(" ")}
              >
                {section.label}
              </button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onScrollTop}
            className="mt-1 w-full"
          >
            맨 위로
          </Button>
        </div>
      </div>
    </div>
  );
}
