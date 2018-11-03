# Apresentação

[Voltar](../README.md)

## 1. Setup do projeto

Iniciar um projeto novo em React ainda é desafio constante para muitos desenvolvedores, iniciantes ou não. São necessárias muitas etapas de configuração para ter um ambiente completo, adequado para o desenvolvimento de uma biblioteca de componentes.

Para isso existem bootstrapers, ou seja ferramentas de inicialização, como o create-react-app, que criam todo o ambiente inicial para você, porém com o tempo você acaba precisando realizar alterações nesses processos e tudo fica complicado de novo.

Aqui vamos mostrar passo a passo como criar um projeto, explicando para que serve cada configuração. Vamos começar com o básico, escolha um diretório para ser seu workspace e entre nele.

Requisitos:
* Node e NPM instalados e no PATH
* Yarn instalado
* Os comandos apresentados devem ser executados em um terminal BASH (Linux)

Rode os comandos para iniciar o projeto git:

    mkdir react-components
    cd react-components
    git init
    
Crie o arquivo .gitignore com:

    node_modules
    target
    .cache
    stories/_docs

Pronto projeto básico está iniciado agora vamos configurar o build, primeiro iniciamos o projeto com o comando:

    yarn init

Respondendo as perguntas de forma específica:
    
    question private: true

Isso inicia o package.json, arquivo que configura todo o build do projeto (como pom.xml). Agora usamos os comandos do yarn para adicionar as dependências.

    yarn add -P react react-dom
    yarn add -D react react-dom
    yarn add prop-types
    yarn add -D @babel/polyfill @babel/core @babel/cli @babel/preset-env @babel/preset-react
    yarn add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties

Aqui cabe um detalhe importante, algumas dependências não podem ser duplicadas por quem irá usar sua biblioteca, pois isso causa problemas, é o caso das libs básicas do `react` e `react-dom`, nesses casos devemos configurar essas libs como `peerDependencies` para que o usuário da lib seja avisado das dependências que precisa trazer de forma obrigatória, mas também precisaremos dessas libs no processo de desenvolivmento interno, como no caso do uso pelo storybook, então temos que incluir a dependência também como `devDependencies`. Bibliotecas que podem ser puxadas por transitividade sem problemas causados por risco de duplicação, podem ficar nas `dependencies` normais, o que irá facilitar o trabalho de quem usará sua biblioteca.

As bibliotecas `@babel/*` trazem a capacidade de realizar o transpiling do seu código ES6+ para ES5, sendo capaz de rodar em browsers mais antigos, e o `@babel/polifll` faz as adaptações necessárias em termos de metodos e funções disponíveis nos browsers.

Os plugins de features novas: decoratores e class-properties permite construções novas que constumamos usar ao criar componentes e o uso de "anotações" em javascript.

Após esses comandos o seu `package.json` deve ficar mais ou nemos assim:
~~~json
{
    "name": "react-components",
    "version": "1.0.0",
    "main": "index.js",
    "author": "kasten <kasten@touchtec.com.br>",
    "license": "MIT",
    "private": true,
    "peerDependencies": {
        "react": "^16.6.0",
        "react-dom": "^16.6.0"
    },
    "devDependencies": {
        "@babel/cli": "^7.1.2",
        "@babel/core": "^7.1.2",
        "@babel/plugin-proposal-class-properties": "^7.1.0",
        "@babel/plugin-proposal-decorators": "^7.1.2",
        "@babel/polyfill": "^7.0.0",
        "@babel/preset-env": "^7.1.0",
        "@babel/preset-react": "^7.0.0",
        "react": "^16.6.0",
        "react-dom": "^16.6.0"
    },
    "dependencies": {
        "prop-types": "^15.6.2"
    }
}
~~~

Agora precisamos configurar a compilação do babel, para isso escrevemos o arquivo `.babelrc`. É importante preservar a ordem dos plugins, pois ela faz diferença no processamento.

~~~json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
    ]
}
~~~

Crie os diretorios de fonte e destino e de scripts de build

    mkdir src
    mkdir scripts
    mkdir target

Agora adicionamos ao `package.json` alguns scripts para facilitar a compilação

~~~json
{
    ...,
    "scripts": {
        "build": "babel src -d target -s --copy-files",
        "dev": "babel src -d target -s -w --copy-files"
    }
}
~~~

Com eles agora podemos rodá-los como comandos assim:

    yarn run build
    yarn run dev

Por fim vamos instalar o storybook, um framework para construção de um "Showcase" que nos ajudará a testar e documentar nossas componentes.

    npx -p @storybook/cli sb init

Esse comando irá instalar novas dependencias no seu package.json além de criar dois novos scripts para executar o storybook.

~~~json
{
    ...,
    "scripts": {
        ...,
        "storybook": "start-storybook -p 6006",
        "build-storybook": "build-storybook"
    }
}
~~~

Também irá criar um diretório de configurações `.storybook` e um diretório para as estórias o `stories`.

Pronto chegamos ao fim da etapa inicial de preparação, e agora temos a estrutura básica do projeto que tem o seguinte layout:

    Estrutura do projeto:
    react-components
    |_ src/             (Fonte dos componentes)
    |_ stories/         (Fonte do showcase)
    |_ target/          (Biblioteca “compilada”)
    |_ scripts/         (Scripts para construção do projeto)
    |_ .storybook/      (Pasta de configurações do storybook)
    |_ package.json     (Arquivo de configurações de dependencias e build)
    |_ .babelrc         (Arquivo de configuração do babel)

[Próximo](ETAPA2.md)