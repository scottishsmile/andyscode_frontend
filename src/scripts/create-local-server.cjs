// https://nextjs.org/docs/advanced-features/custom-server
// https://blog.wbgneto.com/how-to-set-up-local-ssl-with-nextjs

const { createServer: createHttpsServer } = require('https');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const HOSTNAME = 'localhost';
const PORT = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname: HOSTNAME, port: PORT });
const handle = app.getRequestHandler();



if (!fs.existsSync('./certs/.capath')) {
  const macOsCommand = 'sudo yarn ssl:setup';
  const linuxCommand = 'yarn ssl:setup';
  const winCommand = 'yarn ssl:setup';

  console.error('\nError: Missing SSL certificates\n');

  console.error(`To fix this error, run the command below:`);
  console.error(`→ MacOS: ${macOsCommand}`);
  console.error(`→ Linux: ${linuxCommand}`);
  console.error(`→ Windows: ${winCommand}\n`);

  process.exit();
}

app
  .prepare()
  .then(() => {
    const server = createHttpsServer(
      {
        key: fs.readFileSync('./certs/devcert.key'),
        cert: fs.readFileSync('./certs/devcert.cert'),
      },
      (req, res) => handle(req, res)
    );

    return server.listen(PORT, (err) => {
      if (err) throw err;

      console.log('> Ready on https://localhost:3000')
    });
  })
  .catch((err) => {
    console.log('Error in create-local-server.cjs - Nextjs Local HTTPS setup - Error: ', err);
    console.error('Error in create-local-server.cjs - Nextjs Local HTTPS setup - Error: ', err);
    console.error(err);
  });