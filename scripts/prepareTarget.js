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
