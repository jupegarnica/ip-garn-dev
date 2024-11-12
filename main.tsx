import { Context, Hono } from 'hono'
import { getConnInfo } from 'hono/deno'
import { html } from 'hono/html'
const app = new Hono();

app.get('/', async (c: Context) => {
  const connInfo = getConnInfo(c);

  const ip = connInfo?.remote?.address || '';
  console.log(connInfo);
  return c.html(Ip(ip));
});

const Main = (children: string) => `<html>
    <head>
      <style>
        :root {
          --glow-shadow-color: #fc06;
        }
        body {
          margin: 0;
        }
        a {
          all: unset;
          cursor: pointer;
          font-size: 2em;
          font-weight: 600;
          color: #fffb;
          transition: all 0.4s ease;
          cursor: copy;
        }
        a:hover {
          text-shadow:
            0 0 10px var(--glow-shadow-color),
            0 0 20px var(--glow-shadow-color),
            0 0 30px var(--glow-shadow-color),
            0 0 40px var(--glow-shadow-color),
            0 0 50px var(--glow-shadow-color),
            0 0 60px var(--glow-shadow-color),
            0 0 70px var(--glow-shadow-color),
            0 0 80px var(--glow-shadow-color),
            0 0 90px var(--glow-shadow-color),
            0 0 100px var(--glow-shadow-color),
            0 0 110px var(--glow-shadow-color),
            0 0 120px var(--glow-shadow-color),
            0 0 130px var(--glow-shadow-color),
            0 0 140px var(--glow-shadow-color),
            0 0 150px var(--glow-shadow-color),
            0 0 160px var(--glow-shadow-color),
            0 0 170px var(--glow-shadow-color),
            0 0 250px var(--glow-shadow-color),
            0 0 300px var(--glow-shadow-color);
          text-decoration: underline;
          // text-decoration-color: #15d;
          text-decoration-thickness: 0.05em;
          text-underline-offset: 0.1em;
          color: #444;
        }
        body {
          background: linear-gradient(
            135deg,
            rgb(77, 47, 126) 30%,
            #51327577 100%
          );
          font-size: clamp(20px, 5vmin, 150px);
          background-color: tomato;
          color: white;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Courier New', Courier, monospace;
        }
      </style>
      <script>
        function copyToClipboard(text) {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            alert('IP address copied to clipboard');
          } catch (err) {
            console.error('Could not copy text: ', err);
          }
          document.body.removeChild(textarea);
        }
      </script>
    </head>
    <body>
      ${children}
    </body>
  </html>
`;

function Ip(ip: string) {
  if (!ip) {
    return Main('<h1>Could not get your IP</h1>');
  }
  return Main(`<a href="#" onclick="copyToClipboard('${ip}')">${ip}</a>`);
}

Deno.serve(app.fetch);
