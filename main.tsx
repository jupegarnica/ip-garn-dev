import { Hono } from 'hono'
import { PropsWithChildren } from 'hono/jsx'

const app = new Hono();

app.get('/', async (c) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('remote-addr') || '';
  return c.render(<Ip ip={ip} />);
});


const Main = ({ children }: PropsWithChildren) => (
  <body>
    <style>
      {`
        :root {
          --glow-shadow-color: #fc06;
        }
        body {
          margin:0
        }
        a {
          all: unset;
          cursor: pointer;
          font-size: 2em;
          font-weight: 600;
          color: #fffb;
          transition: all 0.4s ease;
        }
        a:hover {
          /* glow effect growing all the screen */
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
            0 0 300px var(--glow-shadow-color)
            ;

          text-decoration: underline;
          text-decoration-color: #15d; ;
          text-decoration-thickness: 0.05em;
          text-underline-offset: 0.1em;
          color: #444;
        }
        body {
          background:linear-gradient(
              135deg,
              rgb(77, 47, 126) 30%,
              #51327577 100%
          );
          font-size: clamp(20px, 5vmin, 150px);
          background-color: tomato;
          color:white;
          height:100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
      }`}
    </style>
    {children}
  </body>
);

function Ip({ ip }: { ip: string }) {
  if (!ip) {
    return (
      <Main>
        <h1>Could not get your IP</h1>
      </Main>
    );
  }
  return (
    <Main>
      <a href={`http://${ip}`}>{ip}</a>
    </Main>
  );
}


Deno.serve(app.fetch)
