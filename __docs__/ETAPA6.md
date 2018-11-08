# Apresentação

[Voltar](ETAPA5.md)

## 6. Publicando sua biblioteca

Agora que temos uma biblioteca, para que seja usada por outros projetos precisaremos publicá-la. É uma boa prática, para evitar conflitos de nomes, o uso de namespaces, como por exemplo `@touchheath/react-components-sample`. Como marcamos o nosso projeto como inicialmente private, isso garantirá que não consiguiremos fazer o publish a partir da pasta errada.

### Publicando no nexus

primeiro criaremos um novo script para preparar alguns arquivos para a plublicação, e sua execução deve anexada ao processo de build:

`scripts/prepareTarget.js`
~~~javascript
const path = require('path');
const fse = require('fs-extra');

// Arquivos extra que devem ser copiados para o diretório target
const files = [
  'README.md'
];

Promise.all(
  files.map((file) => copyFile(file))
)
.then(() => createPackageFile());

function copyFile(file) {
  const buildPath = resolveBuildPath(file);
  return new Promise((resolve) => {
    fse.copy(
      file,
      buildPath,
      (err) => {
        if (err) throw err;
        resolve();
      }
    );
  })
  .then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function resolveBuildPath(file) {
  return path.resolve(__dirname, '../target/', path.basename(file));
}

// Cria o arquivo package.json sem das dependencias de dev que não são mais necessárias
function createPackageFile() {
  return new Promise((resolve) => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data);
    });
  })
  .then((data) => JSON.parse(data))
  .then((packageData) => {
    const {
      name,
      version,
      description,
      peerDependencies,
      dependencies,
      publishConfig
    } = packageData;

    const minimalPackage = {
      name,
      version,
      description,
      main: './index.js',
      peerDependencies,
      dependencies,
      publishConfig
    };

    return new Promise((resolve) => {
      const buildPath = path.resolve(__dirname, '../target/package.json');
      const data = JSON.stringify(minimalPackage, null, 2);
      fse.writeFile(buildPath, data, (err) => {
        if (err) throw (err);
        console.log(`Created package.json in ${buildPath}`);
        resolve();
      });
    });
  });
}
~~~

Agora adicionamos / alteramos algumas configurações no `package.json`

~~~json
{
  "name": "@touchhealth/react-components-sample",
  //...
  "devDependencies": {
    //...
    "rimraf": "^2.6.2"
  },
  //...
  "scripts": {
    "prepare": "yarn build",
    "clean": "rimraf target",
    "cleanall": "rimraf target && rimraf node_modules",
    "build": "yarn build:babel && yarn build:prepareTarget",
    "build:babel": "babel src -d target -s --copy-files",
    "build:prepareTarget": "node ./scripts/prepareTarget.js",
    //...
  },
  //...
  "publishConfig": {
    "registry": "http://nexus.touchtec.com.br/content/repositories/npm-internal/"
  }
}
~~~

Com isso feito, o processo de release completo é:

~~~bash
yarn cleanall #Opcional
~~~

1. Editar o package.json para ajustar o novo valor da versão, se necessário
2. Fazer o commit no git e passar uma tag exemplo: react-components-sample-1.0.0
3. Rodar o push
4. Rodar os comandos
    ~~~bash  
    yarn build
    cd target
    yarn publish #Dar enter para manter a versão
    ~~~
5. Editar o package.json para ajustar o valor da proxima versão
6. Fazer o commit inicial da nova versão
    ~~~bash  
    git add package.json
    git commit -m 'Preparando a proxima versao'
    ~~~

### Publicando "SNAPSHOT" para desenvolvimento local

A melhor forma de trabalhar localmente, podendo mexer na biblioteca e na aplicação que a utiliza é usando links.

1. Na biblioteca faça:
    ~~~bash  
    cd target
    yarn link
    ~~~
1. Na aplicação final, que já tem a biblioteca como dependencia instalada faça:
    ~~~bash
    # yarn link NOME-DA-BIBLIOTECA
    yarn link @touchhealth/react-components-sample

    # Esse processo gera um link no diretório node_modules para essa biblioteca.
    ~~~
