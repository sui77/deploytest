const express = require('express')
const _ = require('lodash');
const fs = require('fs');

const app = express();
const port = _.get(process.env, 'HTTP_PORT', 3000);


let envTxt = '';
for (let n in process.env) {
    envTxt += `<b>${n}:</b> ${process.env[n]}<br>`;
}

(async () => {
    let dir = fs.realpathSync('.') + '/config';
    if (   !fs.existsSync(dir)) {
        envTxt =  `${dir} does not exist<br><br>` + envTxt;
        return;
    };

    let filesTxt = `Contents of ${dir}<ul>`;
    const files = await fs.promises.readdir(dir);
    for (let file of files) {
        filesTxt += `<li>${file}</li>`;
    }
    filesTxt += '</ul>';

    if (fs.existsSync(dir + '/config.ini')) {
        let configIni = fs.readFileSync(dir + '/config.ini');
        filesTxt += `config.ini: <br><br> ${configIni.toString()}`;
    } else {
        filesTxt += `${dir}/config.ini not found`;
    }

    envTxt = filesTxt + '<hr>' +  envTxt;
})();


app.get('/', (req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    res.send(envTxt);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})