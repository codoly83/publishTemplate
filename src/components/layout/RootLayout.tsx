// Layout widget provides header, sidebar, and main content outlet.
import { Outlet } from "react-router-dom";
// import { Sidebar } from "./Sidebar";

export function RootLayout() {
  return (
    <div className="app-layout">
      <div className="app-body">
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
