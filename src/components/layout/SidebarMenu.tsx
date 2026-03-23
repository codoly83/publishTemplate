// Menu list component that renders top-level menu items
import { NavLink } from 'react-router-dom';
import { menuConfig, type MenuItem } from '../../config/menuConfig';

interface SidebarMenuProps {
  isCollapsed: boolean;
  isMenuExpanded: (id: string) => boolean;
  onToggleMenu: (id: string) => void;
}

export function SidebarMenu({
  isCollapsed,
  isMenuExpanded,
  onToggleMenu,
}: SidebarMenuProps) {
  return (
    <nav className="sidebar-nav">
      <ul className="sidebar-menu">
        {menuConfig.map(item => (
          <SidebarMenuItemRecursive
            key={item.id}
            item={item}
            depth={0}
            isCollapsed={isCollapsed}
            isMenuExpanded={isMenuExpanded}
            onToggleMenu={onToggleMenu}
          />
        ))}
      </ul>
    </nav>
  );
}

interface SidebarMenuItemRecursiveProps {
  item: MenuItem;
  depth: number;
  isCollapsed: boolean;
  isMenuExpanded: (id: string) => boolean;
  onToggleMenu: (id: string) => void;
}

function SidebarMenuItemRecursive({
  item,
  depth,
  isCollapsed,
  isMenuExpanded,
  onToggleMenu,
}: SidebarMenuItemRecursiveProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = isMenuExpanded(item.id);
  const paddingClassName = isCollapsed
    ? 'pl-4'
    : depth === 0
      ? 'pl-4'
      : depth === 1
        ? 'pl-8'
        : 'pl-12';

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      if (!item.path) {
        e.preventDefault();
      }
      onToggleMenu(item.id);
    }
  };

  const content = (
    <>
      {depth === 0 && item.icon && (
        <span className="sidebar-menu-icon">{item.icon}</span>
      )}
      {!isCollapsed && (
        <>
          <span className="sidebar-menu-label">{item.label}</span>
          {item.badge !== undefined && (
            <span className="sidebar-menu-badge">{item.badge}</span>
          )}
          {hasChildren && (
            <span className="sidebar-menu-arrow">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </>
      )}
    </>
  );

  return (
    <li className="sidebar-menu-item">
      {item.path ? (
        <NavLink
          to={item.path}
          end={item.path === '/' || item.path === '/underwriting' || item.path === '/posts'}
          className={({ isActive }) =>
            `sidebar-menu-link depth-${depth} ${paddingClassName}${isActive ? ' active' : ''}`
          }
          onClick={handleToggle}
        >
          {content}
        </NavLink>
      ) : (
        <button
          type="button"
          className={`sidebar-menu-link depth-${depth} ${paddingClassName}`}
          onClick={handleToggle}
        >
          {content}
        </button>
      )}

      {hasChildren && isExpanded && !isCollapsed && (
        <ul className="sidebar-submenu">
          {item.children!.map(child => (
            <SidebarMenuItemRecursive
              key={child.id}
              item={child}
              depth={depth + 1}
              isCollapsed={isCollapsed}
              isMenuExpanded={isMenuExpanded}
              onToggleMenu={onToggleMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
