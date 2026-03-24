import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GUIDE_SEARCH_SCROLL_STATE_KEY,
  GUIDE_SEARCH_SCROLL_STORAGE_KEY,
  scrollGuideContentToMatch,
} from "./guideScrollToSearch";

/**
 * Guide 검색으로 이동했을 때, 해당 샘플 페이지의 `.guide-content` 안에서
 * 검색 문구와 일치하는 첫 요소로 스크롤합니다.
 */
function GuideScrollToSearchMatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const stateScrollText = (location.state as Record<string, unknown> | null)?.[
    GUIDE_SEARCH_SCROLL_STATE_KEY
  ];

  React.useLayoutEffect(() => {
    let needle: string | undefined;
    let clearState = false;

    if (typeof stateScrollText === "string" && stateScrollText.trim()) {
      needle = stateScrollText.trim();
      clearState = true;
    } else {
      try {
        const raw = sessionStorage.getItem(GUIDE_SEARCH_SCROLL_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { path?: string; text?: string };
          if (
            parsed.path === location.pathname &&
            typeof parsed.text === "string" &&
            parsed.text.trim()
          ) {
            needle = parsed.text.trim();
            sessionStorage.removeItem(GUIDE_SEARCH_SCROLL_STORAGE_KEY);
          }
        }
      } catch {
        sessionStorage.removeItem(GUIDE_SEARCH_SCROLL_STORAGE_KEY);
      }
    }

    if (!needle) return;

    const tryScroll = () => {
      const root = document.querySelector(".guide-content");
      if (!(root instanceof HTMLElement)) return false;
      return scrollGuideContentToMatch(root, needle!);
    };

    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        tryScroll();
        window.setTimeout(() => {
          if (cancelled) return;
          tryScroll();
          if (clearState) {
            navigate(
              {
                pathname: location.pathname,
                search: location.search,
                hash: location.hash,
              },
              { replace: true, state: {} },
            );
          }
        }, 100);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [
    stateScrollText,
    location.pathname,
    location.key,
    location.search,
    location.hash,
    navigate,
  ]);

  return null;
}

export { GuideScrollToSearchMatch };
