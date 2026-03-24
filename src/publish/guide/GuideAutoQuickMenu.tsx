import {
  scrollElementIntoViewInContainer,
  useScrollSpy,
} from "@/hooks/useScrollSpy";
import { GuideQuickMenu } from "@/publish/guide/components";
import { publishGuideNavItems } from "@/publish/guide/sampleMeta";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useLocation } from "react-router-dom";

type GuideAutoQuickMenuProps = {
  hostRef: RefObject<HTMLElement | null>;
};

type QuickSection = {
  id: string;
  label: string;
};

export function GuideAutoQuickMenu({ hostRef }: GuideAutoQuickMenuProps) {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [sections, setSections] = useState<QuickSection[]>([]);

  const currentNavItem = useMemo(
    () => publishGuideNavItems.find((item) => item.path === pathname),
    [pathname],
  );
  const isComponentsPage = currentNavItem?.section === "components";
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeSectionId = useScrollSpy(scrollRef, sectionIds, {
    activeLineRatio: 0.22,
  });

  useEffect(() => {
    if (!isComponentsPage) {
      setSections([]);
      scrollRef.current = null;
      return;
    }

    const host = hostRef.current;
    if (!host) {
      setSections([]);
      scrollRef.current = null;
      return;
    }

    const container = host.querySelector<HTMLDivElement>(".guide-content");
    if (!container || container.dataset.guideQuickMenu === "off") {
      setSections([]);
      scrollRef.current = null;
      return;
    }

    scrollRef.current = container;

    const collectSections = () => {
      const sectionNodes = Array.from(
        container.querySelectorAll<HTMLElement>("section"),
      ).filter((node) => node.querySelector("h2"));

      const nextSections = sectionNodes.map((node, index) => {
        if (!node.id) {
          node.id = `guide-auto-section-${index + 1}`;
        }

        const headingText = node.querySelector("h2")?.textContent?.trim();
        return {
          id: node.id,
          label: headingText || `섹션 ${index + 1}`,
        };
      });

      setSections(nextSections);
    };

    collectSections();

    const observer = new MutationObserver(() => {
      collectSections();
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [hostRef, isComponentsPage, pathname]);

  const handleSelectSection = (id: string) => {
    const root = scrollRef.current;
    if (!root) return;
    scrollElementIntoViewInContainer(root, id, {
      behavior: "smooth",
      offsetTop: 8,
    });
  };

  const handleScrollTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isComponentsPage || sections.length < 2) return null;

  return (
    <GuideQuickMenu
      sections={sections}
      activeSectionId={activeSectionId}
      onSelectSection={handleSelectSection}
      onScrollTop={handleScrollTop}
      className="absolute top-4 right-4 z-20"
    />
  );
}
