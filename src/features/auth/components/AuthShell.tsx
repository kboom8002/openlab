import React from "react";

export interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

/**
 * AuthShell
 * Card shell wrapper component for authentication & onboarding screens.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  maxWidth = "30rem",
}: AuthShellProps) {
  return (
    <main
      id="main"
      className="card-pane"
      style={{
        maxWidth,
        margin: "2.5rem auto",
        padding: "2rem",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      }}
    >
      <header style={{ marginBottom: "1.75rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "var(--wellb-forest-900)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--ink-muted)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        )}
      </header>

      <div>{children}</div>

      {footer && (
        <footer
          style={{
            marginTop: "1.75rem",
            textAlign: "center",
            borderTop: "1px solid var(--surface-border)",
            paddingTop: "1.25rem",
          }}
        >
          {footer}
        </footer>
      )}
    </main>
  );
}
