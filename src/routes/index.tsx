import App from "@/admin/App"

export default function (props: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>pilotair</title>
      </head>
      <body>
        <App></App>
      </body>
    </html>
  );
}
