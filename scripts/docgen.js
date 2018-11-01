// Importando bibliotecas node
const path = require('path');
const fs = require('fs');
const glob = require("glob");
const mkdirp = require('mkdirp');
const reactDocs = require('react-docgen');

// Diretório de Source
const srcDir = "./src/";

// Diretório base de Destino
const docsDir = "./stories/_docs/";

// Lista os arquivos .js em qualquer subdiretório da pasta source
glob(srcDir + "**/*.js", {}, function (er, files) {
    
    // Itera pelos arquivos encontrados
    files.map(file => { console.log('Building docs for ' + file);

        // Nome do arquivo sem a extensão
        var fileName = path.basename(file, '.js');

        // Caminho entre o srcDir e o arquivo de fato
        var relativeDir = path.dirname(file).substring(srcDir.length);
        if (relativeDir) {
            relativeDir = relativeDir + '/';
        }
        
        // Cria o diretório de destino caso seja necessário
        mkdirp(docsDir + relativeDir, (err) => {});

        // Lê o conteudo do arquivo usando o encoding UTF-8 em texto
        fs.readFile(file, 'utf8', (err, data) => {
            try {
                // Aplica o react-docgen para tentar extrair as informações da componente
                var componentInfo = reactDocs.parse(data);

                // Caso consiga extrair, salva um arquivo .json com as informações para consumo futuro
                fs.writeFileSync(docsDir + relativeDir + fileName + '.json', JSON.stringify(componentInfo), 'utf8');
            } catch (ex) {
                // Em algumas situações não será possível extrair, e o erro será ignorado.
            }
        })
    })
})