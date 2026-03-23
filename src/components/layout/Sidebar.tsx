// Main sidebar component with collapse/expand functionality
import { SidebarMenu } from './SidebarMenu';
import { useSidebarState } from '../../hooks/useSidebarState';

export function Sidebar() {
  const {
    isCollapsed,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    isMenuExpanded,
    toggleMenu,
  } = useSidebarState();

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-icon">☰</span>
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar${isCollapsed ? ' collapsed' : ''}${isMobileMenuOpen ? ' mobile-open' : ''}`}
      >
        <div className="sidebar-header">
          {!isCollapsed && <span className="sidebar-title">Menu</span>}
          <button
            type="button"
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '»' : '«'}
          </button>
        </div>

        <SidebarMenu
          isCollapsed={isCollapsed}
          isMenuExpanded={isMenuExpanded}
          onToggleMenu={toggleMenu}
        />
      </aside>
    </>
  );
}
