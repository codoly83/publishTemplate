// App composes providers and routes (app layer responsibility).
import { Router } from "../routes/Router";
import { ThemeProvider } from "@/providers/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router />
    </ThemeProvider>
  );
}
