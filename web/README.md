# WebDojo — Suite de Testes (Cypress)

> Documentação rápida do projeto de testes automatizados da aplicação WebDojo usando Cypress.

## Visão geral

Este repositório contém os testes end-to-end para a aplicação WebDojo, implementados com Cypress.
Os testes ficam na pasta `cypress/` e usam fixtures, comandos customizados e helpers em `cypress/support`.

Estrutura importante (resumida)

- `cypress/e2e/` — specs de teste (ex.: `login.cy.js`, `alerts.cy.js`, `cep.cy.js`)
- `cypress/fixtures/` — dados de teste (ex.: `cep.json`)
- `cypress/support/` — comandos customizados e utilitários (`commands.js`, `utils.js`, `actions/`)
- `cypress.config.js` — configuração principal do Cypress
- `package.json` — scripts úteis para execução

## Pré-requisitos

- Node.js (recomendado >= 16)
- npm (ou yarn)
- Browsers suportados pelo Playwright (Cypress abrirá o browser instalado no sistema)

## Executando a aplicação (pré-requisito)

A aplicação WebDojo está no mesmo repositório e precisa estar servida para que os testes rodem.
Use o script abaixo para subir a aplicação localmente (porta 3000):

```powershell
npm run dev
```

Isso executa `serve -s dist -p 3000` — certifique-se de que a build (`dist`) está disponível quando necessário.

## Scripts úteis

Os scripts definidos no `package.json` deste projeto de testes:

```json
"scripts": {
  "dev": "serve -s dist -p 3000",
  "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",
  "test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900",
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=375,viewportHeight=667"
}
```

- `npm run dev` — inicia a aplicação (necessário antes de rodar os testes se a app não estiver em outro ambiente)
- `npm test` — executa toda a suíte em cabeça-less com viewport de desktop 1440x900
- `npm run test:login` — executa somente o spec de login (desktop)
- `npm run test:login:mobile` — executa o spec de login em viewport móvel (simulação)

## Rodando os testes localmente

- Abrir o Test Runner (modo interativo):

```powershell
npx cypress open
```

- Executar a suíte em headless (útil para CI):

```powershell
npm test
```

- Executar um spec específico (ex.: login) em modo headless:

```powershell
npm run test:login
```

Observação: os scripts já configuram `viewportWidth` e `viewportHeight` para reproduzir as resoluções esperadas.

## Estrutura dos testes e convenções

- Use `data-cy` (ou `data-test`) como seletor principal nos testes para maior robustez.
- Evite deixar `it.only` ou `describe.only` antes de commitar — eles isolam o teste e fazem a suíte ignorar os demais specs.
- Coloque dados reutilizáveis em `cypress/fixtures/` e carregue com `cy.fixture()`.
- Centralize comandos repetidos em `cypress/support/commands.js` (ex.: `cy.start()`, `cy.submitLoginForm()`, `cy.login()`).

Exemplo de uso de fixture (no test):

```javascript
cy.fixture('cep').then(({ cep, street, neighborhood, city, state }) => {
  cy.get('#cep').type(cep)
  cy.contains('button', 'Buscar').click()
  cy.get('#street').should('have.value', street)
  // ...
})
```

## Dicas para tornar os testes determinísticos

- Stub/Mock de chamadas de rede: use `cy.intercept()` para controlar respostas externas (API de CEP, chamadas de login etc.).
- Setar estado inicial via `cy.setCookie()` e `cy.visit(..., { onBeforeLoad(win) { win.localStorage.setItem(...) } })` para evitar depender de fluxos manuais.
- Use asserts robustas: `should('contain.text', ...)` ou expressões regulares quando o texto pode variar levemente.

## Validação de formatos (exemplo: MD5)

Se você precisa validar formatos (por exemplo, token MD5), use uma regex no teste:

```javascript
cy.window().then((win) => {
  const token = win.localStorage.getItem('token')
  expect(token).to.match(/^[a-f0-9]{32}$/i)
})
```

## Integração com CI (exemplo simples GitHub Actions)

Workflow mínimo (`.github/workflows/cypress.yml`):

```yaml
name: Cypress tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install
        run: npm ci
      - name: Build and serve app
        run: |
          npm run build # se você tiver script de build
          npm run dev & # roda em background
      - name: Run tests
        run: npm test
```

Adapte `build`/`serve` conforme a sua pipeline.

## Troubleshooting rápido

- Cypress falha com timeout em elementos: aumente o timeout ou prefira usar `cy.intercept()` para aguardar respostas.
- Erro `beforeEach is not defined`: verifique typos nos hooks (`beforeEach`, `afterEach`, `before`, `after`).
- `localStorage` undefined: use `onBeforeLoad` corretamente no `cy.visit` e garanta que a URL esteja correta.

## Boas práticas finais

- Escreva testes pequenos e determinísticos — um comportamento por `it`.
- Use fixtures e comandos customizados para reduzir duplicação.
- Mantenha a suíte rápida: stub de rede sempre que possível.

