const http = require('http');
const fs = require('fs');

const parametros = [];
const valores = [];

http.createServer(function(req, res){
    fs.readFile('./form.html', function(err, html){
        if (err) {
            throw err;
        }

        let html_string = html.toString();

        if (req.url.indexOf('?') > 0){
            const url_data = req.url.split('?');
            const arreglo_parametros = url_data[1].split('&');

            for (let i=0; i<arreglo_parametros.length; i++){
                const parametro = arreglo_parametros[i];
                const param_data = parametro.split('=');
                parametros[i] = param_data[0];
                valores[i] = param_data[1];
            }
        }
        
        for(let i=0; i<parametros.length; i++){
            html_string = html_string.replace('{'+parametros[i]+'}', valores[i]);
        }

        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html_string);
        res.end();
    });
}).listen(8080);
