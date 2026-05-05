import { UsersProvider } from "./context/UsersContext";
import "./globals.css";

export const metadata = {
  title: "Klyne | User Directory",
  description: "Minimalist user directory and management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UsersProvider>
          <nav className="navbar">
            <div className="navbar-brand">Klyne</div>
          </nav>
          <main className="container">
            {children}
          </main>
        </UsersProvider>
      </body>
    </html>
  );
}
