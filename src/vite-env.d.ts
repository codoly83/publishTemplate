/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  /** Enable MSW mock API ('true') or use real backend ('false') */
  readonly VITE_USE_MOCK_API: string;
  /** Backend API base path (relative path) */
  readonly VITE_API_BASE_URL: string;
  /** API request timeout in milliseconds */
  readonly VITE_API_TIMEOUT: string;
  /** Backend server URL for Vite proxy (e.g., http://localhost:8080) */
  readonly VITE_BACKEND_URL: string;
  /** Legacy MSW toggle (deprecated - use VITE_USE_MOCK_API) */
  readonly VITE_MSW?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
