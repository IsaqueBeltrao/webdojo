# Webdojo - Testes Automatizados com Cypress

Este projeto contém uma suíte completa de testes automatizados para a aplicação Webdojo, desenvolvida utilizando Cypress como framework de automação de testes.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Executando os Testes](#executando-os-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Comandos Customizados](#comandos-customizados)
- [Fixtures](#fixtures)
- [Configurações](#configurações)
- [Cenários de Teste](#cenários-de-teste)
- [Contribuição](#contribuição)

## 🎯 Visão Geral

O Webdojo é uma aplicação web educacional focada no ensino de automação de testes. Este projeto de testes automatizados cobre diversos cenários e funcionalidades da aplicação, incluindo:

- ✅ Autenticação e login
- ✅ Formulários complexos
- ✅ Interações com elementos da interface
- ✅ Validações de dados
- ✅ Testes responsivos (desktop e mobile)
- ✅ Upload de arquivos
- ✅ Integração com APIs externas

## 🔧 Pré-requisitos

Antes de executar os testes, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Cypress** (será instalado automaticamente)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd webdojo/web
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## 🚀 Executando a Aplicação

Para executar a aplicação Webdojo localmente:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## 🧪 Executando os Testes

### Executar Todos os Testes
```bash
npm run test
```

### Executar Testes de Login (Desktop)
```bash
npm run test:login
```

### Executar Testes de Login (Mobile)
```bash
npm run test:login:mobile
```

### Executar Testes Específicos
```bash
# Executar um arquivo específico
npx cypress run --spec cypress/e2e/login.cy.js

# Executar com configurações customizadas
npx cypress run --config viewportWidth=1920,viewportHeight=1080
```

### Modo Interativo (Cypress Test Runner)
```bash
npx cypress open
```

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/                    # Arquivos de teste
│   ├── alerts.cy.js       # Testes de alertas
│   ├── cep.cy.js          # Testes de busca de CEP
│   ├── consultacy.cy.js   # Testes de formulário de consultoria
│   ├── gitHub.cy.js       # Testes de integração GitHub
│   ├── hover.cy.js        # Testes de hover/interações
│   ├── iframe.cy.js       # Testes com iframes
│   ├── kanban.cy.js       # Testes de funcionalidade Kanban
│   ├── links.cy.js        # Testes de links
│   ├── login.cy.js        # Testes de autenticação
│   └── studio.cy.js       # Testes do Cypress Studio
├── fixtures/              # Dados de teste
│   ├── cep.json          # Dados de CEP para testes
│   ├── consultacy.json   # Dados para formulário de consultoria
│   └── document.pdf      # Arquivo PDF para testes de upload
└── support/              # Arquivos de suporte
    ├── actions/          # Comandos customizados específicos
    │   └── consultacy.actions.js
    ├── commands.js       # Comandos customizados globais
    ├── e2e.js           # Configurações globais
    └── utils.js         # Funções utilitárias
```

## 🛠️ Comandos Customizados

### Comandos Globais (`commands.js`)

#### `cy.start()`
Navega para a página inicial da aplicação.
```javascript
cy.start()
```

#### `cy.submitLoginForm(email, senha)`
Preenche e submete o formulário de login.
```javascript
cy.submitLoginForm('papito@webdojo.com', 'katana123')
```

#### `cy.goTo(buttonName, pageTitle)`
Navega para uma página específica através de um botão.
```javascript
cy.goTo('Consultoria', 'Consultoria')
```

#### `cy.login(ui = false)`
Realiza login programático ou via interface.
```javascript
// Login via interface
cy.login(true)

// Login programático (padrão)
cy.login()
```

### Comandos de Consultoria (`consultacy.actions.js`)

#### `cy.fillConsultacyForm(form)`
Preenche o formulário de consultoria com os dados fornecidos.
```javascript
cy.fillConsultacyForm(formData)
```

#### `cy.submitConsultacyForm()`
Submete o formulário de consultoria.
```javascript
cy.submitConsultacyForm()
```

#### `cy.validadeConsultacyModal()`
Valida a exibição do modal de confirmação.
```javascript
cy.validadeConsultacyModal()
```

## 📊 Fixtures

### `consultacy.json`
Contém dados estruturados para testes de consultoria:

```json
{
  "Personal": {
    "name": "Isaque Beltrão",
    "email": "papito@webdojo.com.br",
    "phone": "11 99999-1000",
    "personType": "cpf",
    "consultacyType": "Individual",
    "document": "11289395098",
    "discoveryChannel": ["Instagram", "YouTube", "LinkedIn"],
    "file": "./cypress/fixtures/document.pdf",
    "describe": "Lorem ipsum dolor sit amet,",
    "techs": ["Playwright", "Cypress", "Selenium"],
    "terms": true
  },
  "Company": {
    // Dados para pessoa jurídica...
  }
}
```

### `cep.json`
Dados para testes de busca de CEP:

```json
{
  "cep": "04821000",
  "street": "Avenida Presidente João Goulart",
  "neighborhood": "Jardim Mália II",
  "city": "São Paulo",
  "state": "SP"
}
```

## ⚙️ Configurações

### `cypress.config.js`
```javascript
module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    video: true,
    baseUrl: 'http://localhost:3000',
    // viewportWidth: 1440,
    // viewportHeight: 900
  },
});
```

### Configurações de Viewport
- **Desktop**: 1440x900 (padrão)
- **Mobile**: 375x667

## 🧪 Cenários de Teste

### Login (`login.cy.js`)
- ✅ Login com credenciais válidas
- ❌ Login com senha inválida
- ❌ Login com email não cadastrado
- ✅ Validação de cookies e localStorage
- ✅ Verificação de elementos da interface

### Consultoria (`consultacy.cy.js`)
- ✅ Preenchimento de formulário pessoa física
- ✅ Preenchimento de formulário pessoa jurídica
- ✅ Upload de arquivos
- ✅ Seleção múltipla de tecnologias
- ✅ Validação de modal de confirmação

### Outros Cenários
- **CEP**: Busca e validação de endereços
- **Alerts**: Interação com alertas do navegador
- **Hover**: Testes de interações com hover
- **iFrame**: Testes com elementos em iframes
- **Links**: Validação de links externos
- **GitHub**: Integração com API do GitHub
- **Kanban**: Funcionalidades de quadro Kanban

## 🔍 Utilitários

### `utils.js`
Função para obter data atual no formato brasileiro:

```javascript
export function getTodayDateBR() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
```

## 📱 Testes Responsivos

O projeto suporta testes em diferentes resoluções:

- **Desktop**: 1440x900
- **Mobile**: 375x667

Para executar testes mobile:
```bash
npm run test:login:mobile
```

## 🎥 Gravação de Vídeos

Os testes são configurados para gravar vídeos automaticamente. Os vídeos são salvos na pasta `cypress/videos/` após a execução.

## 🐛 Tratamento de Erros

O projeto inclui tratamento para erros não capturados da aplicação:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros não tratados da aplicação
  return false;
});
```

## 📈 Relatórios

Após a execução dos testes, você pode encontrar:

- **Vídeos**: `cypress/videos/`
- **Screenshots**: `cypress/screenshots/`
- **Relatórios**: Console output com detalhes dos testes

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Convenções

- Use `data-cy` attributes para seletores estáveis
- Mantenha os testes independentes e isolados
- Use fixtures para dados de teste
- Documente comandos customizados
- Siga o padrão de nomenclatura: `describe('Funcionalidade', () => {})`

## 🔗 Links Úteis

- [Documentação Oficial do Cypress](https://docs.cypress.io/)
- [Cypress Real Events](https://github.com/dmtrKovalenko/cypress-real-events)
- [Best Practices Cypress](https://docs.cypress.io/guides/references/best-practices)

---

**Desenvolvido com ❤️ para o aprendizado de automação de testes**