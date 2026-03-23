import { Icon } from "@/components/ui/Icon/Icon";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button, ScrollArea } from "../ui";
import styles from "./DefaultLayout.module.css";
// 처리 상태 목록 데이터 (샘플)
const caseItems = [
  {
    id: 1,
    case: "progress",
    title: "현대·성명/현대바이오/현대바이오현대바이오현대바이오현대바이오",
    code: "U2028...",
    isActive: true,
  },
  {
    id: 2,
    case: "ai",
    title: "삼성동원/현대자동차/현대자동차현대자동차현대자동차현대자동차",
    code: "U2028...",
  },
  {
    id: 3,
    case: "complete",
    title: "신한금융/한국한약/한국한약한국한약한국한약한국한약한국한약한국한약",
    code: "U2028...",
  },
];

// 하단 유틸리티 메뉴
const utilMenus = [
  {
    id: "screen",
    label: "화면설정",
    icon: <Icon name="desktop-icon" />,
  },
  {
    id: "send",
    label: "타인수신설정정",
    icon: <Icon name="send" />,
  },
  {
    id: "admin",
    label: "관리자 화면",
    icon: <Icon name="admin" />,
  },
];

export function DefaultLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeUtil, setActiveUtil] = useState<string | null>(null);
  const handleDelete = (id: number) => {
    console.log(id);
  };
  return (
    <div className={styles.layout}>
      {/* ── 사이드바 ── */}
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      >
        {/* 사이드바 헤더 */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Icon name="logo" className={styles.logoIcon} />
          </div>
          <Button
            variant="ghost"
            className={styles.toggleBtn}
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
          >
            {isCollapsed ? (
              <Icon name="menu-unfold" />
            ) : (
              <Icon name="menu-fold" />
            )}
          </Button>
        </div>

        {/* 사이드바 콘텐츠 (스크롤 가능) */}
        <div className={styles.sidebarContent}>
          <ScrollArea className={styles.scrollArea}>
            {!isCollapsed && (
              <nav className={styles.nav}>
                {/* 처리현황목록 섹션 */}
                <div className={styles.navSection}>
                  <p className={styles.navSectionTitle}>처리현황목록</p>
                  <ul className={styles.caseList}>
                    {caseItems.map((item) => (
                      <li
                        key={item.id}
                        className={`${styles.caseItem} ${
                          item.isActive ? styles.caseItemActive : ""
                        }`}
                      >
                        <NavLink
                          to={`/cases/${item.id}`}
                          className={styles.caseLink}
                        >
                          {item.case === "progress" && (
                            <Icon
                              name="loader"
                              className={`${styles.caseIndicator} animate-[spin_3s_linear_infinite]`}
                            />
                          )}
                          {item.case === "ai" && (
                            <Icon
                              name="ai-agent-line"
                              className={styles.caseIndicator}
                            />
                          )}
                          {item.case === "complete" && (
                            <Icon
                              name="checkbox-circle"
                              className={styles.caseIndicator}
                            />
                          )}
                          <span className={styles.caseTitle}>{item.title}</span>
                        </NavLink>
                        <Button
                          variant="ghost"
                          className={styles.caseDelete}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Icon name="close-circle" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            )}
          </ScrollArea>
        </div>

        <div className={styles.sidebarFooter}>
          {/* 사이드바 하단 유틸리티 */}
          {isCollapsed && (
            <Button
              variant="ghost"
              className={`${styles.optionsBtn}, rounded-full hover:bg-box size-12`}
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              <Icon name="options" />
            </Button>
          )}
          <div className={styles.utilMenu}>
            {utilMenus.map((util) => (
              <button
                key={util.id}
                type="button"
                className={`${styles.utilBtn} ${
                  activeUtil === util.id ? styles.utilBtnActive : ""
                }`}
                onClick={() =>
                  setActiveUtil((prev) => (prev === util.id ? null : util.id))
                }
                title={util.label}
              >
                {util.icon}
                {!isCollapsed && (
                  <span className={styles.utilLabel}>{util.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* 사용자 정보 */}
          <div className={styles.userArea}>
            <div className={styles.userAvatar}>
              <span>지</span>
            </div>
            {!isCollapsed && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>김동호님</span>
                <span className={styles.userRole}>(매니저)</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 영역 ── */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
