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
          --bg-color-1: #ffffff;
          --bg-color-2: #51327577;
        }
        body {
          margin: 0;
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: 'Courier New', Courier, monospace;
          font-size: 2em;
          background: linear-gradient(135deg, var(--bg-color-1) 50%, var(--bg-color-2) 120%);

        }
        a {
          all: unset;
          cursor: pointer;
          font-size: 2em;
          font-weight: 600;
          color: #666;
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
        @keyframes rotateBackground {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .content::after {
          content: '';
          position: absolute;
          transform: translate(-50%, -50%);
          width: 90vmin;
          height: 90vmin;
          background: linear-gradient(
            135deg,
            var(--bg-color-1) 60%,
            var(--bg-color-2) 100%
          );
          border-radius: 50%;
          z-index: -1;
          transform-origin: center;
          animation: rotateBackground 20s linear infinite;
        }
        .content {
          position: relative;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
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
      <div class="content">
        ${children}
      </div>
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
