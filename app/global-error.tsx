"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          background: "oklch(0.97 0.005 75)",
          color: "oklch(0.20 0.02 50)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <main
          style={{
            maxWidth: "28rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Etwas ist schiefgelaufen
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              color: "oklch(0.50 0.03 50)",
              lineHeight: 1.5,
            }}
          >
            Ein kritischer Fehler ist aufgetreten. Bitte laden Sie die Seite neu.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              padding: "0.5rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "0.375rem",
              border: "none",
              background: "oklch(0.55 0.12 55)",
              color: "oklch(0.99 0.003 75)",
              cursor: "pointer",
            }}
          >
            Erneut versuchen
          </button>
        </main>
      </body>
    </html>
  )
}
