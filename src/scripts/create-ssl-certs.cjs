const devcert = require('devcert');
const fs = require('fs');

if (!fs.existsSync('./certs')) {
    fs.mkdirSync('./certs');
}

const domains = ['localhost'];

devcert
    .certificateFor(domains, { getCaPath: true })
    .then(({ key, cert, caPath }) => {
    fs.writeFileSync('./certs/devcert.key', key);
    fs.writeFileSync('./certs/devcert.cert', cert);
    fs.writeFileSync('./certs/.capath', caPath);
    })
    .catch(console.error);


    // Add this script to package.json
    // "ssl:setup": "node src/scripts/create-ssl-certs.js"

    // Add the certs folder devcert creates to Git Ignore file.
    // Don't want it uploaded to repo
    /*
    # Self-Signed SSL Certs
    /scripts/certs
    */