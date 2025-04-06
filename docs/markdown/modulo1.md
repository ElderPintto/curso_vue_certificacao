# Módulo 1: Introdução ao Vue.js e à Certificação

## Aula 1.1: O que é Vue.js e por que escolhê-lo

### O que é Vue.js?

Vue.js (pronunciado /vjuː/, como "view") é um framework JavaScript progressivo para a construção de interfaces de usuário. Diferentemente de outros frameworks monolíticos, Vue foi projetado desde o início para ser adotado incrementalmente. A biblioteca principal é focada apenas na camada de visualização, sendo fácil de integrar com outras bibliotecas ou projetos existentes.

### Características principais do Vue.js:

1. **Progressivo**: Você pode adotar Vue incrementalmente, desde usar apenas para pequenas partes de uma página até desenvolver aplicações completas.

2. **Reativo**: O sistema de reatividade do Vue rastreia automaticamente as dependências durante a renderização do componente e aplica as atualizações de forma otimizada quando o estado muda.

3. **Declarativo**: Vue utiliza templates declarativos que são HTML válido, permitindo descrever o HTML de saída com base no estado JavaScript.

4. **Baseado em componentes**: Permite construir interfaces de usuário encapsulando a lógica, o template e o estilo em componentes reutilizáveis.

5. **Leve**: A biblioteca principal tem apenas ~24KB min+gzip, o que a torna uma escolha eficiente para projetos de qualquer tamanho.

6. **Flexível**: Vue pode ser usado de várias maneiras, desde um simples script incluído via CDN até aplicações complexas com Single-Page Application (SPA), Server-Side Rendering (SSR) ou Static Site Generation (SSG).

### Por que escolher Vue.js?

1. **Curva de aprendizado suave**: Vue é acessível para iniciantes e poderoso para usuários avançados. A sintaxe é intuitiva e a documentação é excelente.

2. **Ecossistema rico**: Vue possui um ecossistema de bibliotecas oficiais que resolvem problemas comuns em aplicações web:

   - Vue Router para roteamento
   - Pinia/Vuex para gerenciamento de estado
   - Vue Test Utils para testes
   - Vite/Vue CLI para ferramentas de desenvolvimento

3. **Comunidade ativa**: Vue tem uma comunidade global ativa e crescente, com muitos recursos, tutoriais e plugins disponíveis.

4. **Performance**: Vue 3 utiliza um compilador otimizado e um sistema de reatividade baseado em Proxy, resultando em melhor performance.

5. **Compatibilidade**: Vue funciona bem com outras tecnologias e pode ser integrado facilmente em projetos existentes.

6. **Suporte empresarial**: Muitas empresas de renome utilizam Vue.js, como Alibaba, Nintendo, Adobe, GitLab e muitas outras.

### Vue.js vs Outros Frameworks

| Característica       | Vue.js          | React             | Angular              |
| -------------------- | --------------- | ----------------- | -------------------- |
| Curva de aprendizado | Suave           | Moderada          | Íngreme              |
| Tamanho              | Leve (~24KB)    | Leve (~42KB)      | Pesado (~143KB)      |
| Flexibilidade        | Alta            | Alta              | Moderada             |
| Ecossistema          | Crescente       | Vasto             | Completo             |
| Sintaxe              | HTML/JavaScript | JSX               | TypeScript/Templates |
| Reatividade          | Automática      | Manual (useState) | Automática           |

## Aula 1.2: Visão geral da certificação Mid-Level

### Sobre a Certificação Vue.js Mid-Level

A certificação Mid-Level Vue.js Developer é a certificação oficial de competência para o framework Vue.js, desenvolvida em parceria com a Vue School e a organização Vue.js. Esta certificação valida que você possui o conhecimento e as habilidades necessárias para construir aplicações complexas usando Vue.js.

### Detalhes da Certificação:

- **Duração do exame**: 135 minutos
- **Formato do exame**:
  - 30 questões de múltipla escolha
  - 105 minutos de desafios de codificação
- **Validade**: A certificação não tem data de expiração

### Benefícios da Certificação:

1. **Validação de competências**: Demonstra que você possui as habilidades necessárias para trabalhar efetivamente com Vue.js.

2. **Diferencial no mercado**: Destaca seu currículo entre outros candidatos em processos seletivos.

3. **Oportunidades de carreira**: Pode levar a melhores oportunidades de emprego e salários mais altos.

4. **Reconhecimento oficial**: A certificação é revisada pelo criador do Vue.js, Evan You, garantindo que as competências testadas são realmente relevantes.

5. **Desenvolvimento profissional**: O processo de preparação para a certificação aprofunda seu conhecimento do framework.

### Público-alvo:

A certificação Mid-Level é ideal para desenvolvedores que:

- Já trabalham com Vue.js há pelo menos 6 meses
- Desejam validar suas habilidades com o framework
- Buscam avançar na carreira como desenvolvedor front-end
- Querem demonstrar competência técnica para empregadores ou clientes

## Aula 1.3: Formato do exame e estratégias de preparação

### Formato Detalhado do Exame

#### Parte 1: Questões de Múltipla Escolha (30 questões)

- Duração aproximada: 30 minutos
- Formato: Questões com uma ou múltiplas respostas corretas
- Tópicos: Conceitos fundamentais, API, padrões de design, boas práticas

#### Parte 2: Desafios de Codificação (105 minutos)

- Duração aproximada: 105 minutos
- Formato: Problemas práticos que exigem implementação de código
- Ambiente: Editor de código online com suporte a Vue.js
- Tópicos: Implementação de componentes, correção de bugs, otimização de código

### Tópicos Abordados no Exame

1. **Fundamentos do Vue.js**

   - Criação de aplicações
   - Sistema de reatividade
   - Ciclo de vida dos componentes

2. **Componentes**

   - Registro e comunicação
   - Props e eventos
   - Slots e conteúdo distribuído

3. **Diretivas e Renderização**

   - Diretivas integradas (v-if, v-for, v-model, etc.)
   - Renderização condicional e de listas
   - Diretivas personalizadas

4. **Composition API**

   - Setup()
   - Refs e Reactive
   - Lifecycle Hooks
   - Composables

5. **Gerenciamento de Estado**

   - Comunicação entre componentes
   - Vuex/Pinia
   - Estado local vs. global

6. **Roteamento**

   - Vue Router
   - Navegação programática
   - Guardas de rota

7. **Otimização e Boas Práticas**
   - Performance
   - Padrões de design
   - Estrutura de projetos

### Estratégias de Preparação

1. **Estudo Sistemático**

   - Siga um plano de estudos estruturado (como este curso)
   - Revise a documentação oficial do Vue.js
   - Pratique regularmente com exercícios

2. **Projetos Práticos**

   - Desenvolva projetos que utilizem os conceitos abordados no exame
   - Implemente diferentes padrões e técnicas
   - Refatore código existente para melhorar a qualidade

3. **Simulados**

   - Faça simulados de questões de múltipla escolha
   - Pratique desafios de codificação com tempo limitado
   - Analise seus erros e aprenda com eles

4. **Revisão de Código**

   - Analise código de projetos open source em Vue.js
   - Participe de code reviews
   - Identifique padrões e anti-padrões

5. **Grupos de Estudo**

   - Participe de comunidades Vue.js
   - Discuta conceitos com outros desenvolvedores
   - Ensine o que aprendeu (ensinar é uma ótima forma de aprender)

6. **Preparação Final**
   - Faça uma revisão completa na semana anterior ao exame
   - Descanse adequadamente antes do exame
   - Familiarize-se com o ambiente de teste

## Aula 1.4: Configuração do ambiente de desenvolvimento

### Requisitos do Sistema

Para desenvolver aplicações Vue.js, você precisará de:

1. **Node.js** (versão 16.0 ou superior recomendada)
2. **npm** (normalmente instalado com Node.js) ou **yarn**
3. **Editor de código** (recomendamos Visual Studio Code com extensões para Vue)
4. **Navegador moderno** (Chrome, Firefox, Edge, etc.)

### Instalação do Node.js e npm

#### Windows

1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (Long Term Support)
3. Execute o instalador e siga as instruções

#### macOS

1. Usando Homebrew: `brew install node`
2. Ou baixe o instalador em [nodejs.org](https://nodejs.org/)

#### Linux

1. Usando apt (Ubuntu/Debian): `sudo apt update && sudo apt install nodejs npm`
2. Usando dnf (Fedora): `sudo dnf install nodejs`

### Verificação da Instalação

Abra o terminal e execute:

```bash
node -v
npm -v
```

Você deve ver as versões instaladas do Node.js e npm.

### Configuração do Editor (Visual Studio Code)

1. Baixe e instale o [Visual Studio Code](https://code.visualstudio.com/)
2. Instale as extensões recomendadas para Vue.js:
   - Volar (Vue Language Features)
   - ESLint
   - Prettier
   - Vue VSCode Snippets

### Criando um Projeto Vue.js

#### Usando Vite (Recomendado para Vue 3)

Vite é uma ferramenta de build moderna que oferece um servidor de desenvolvimento extremamente rápido e otimizações de build.

```bash
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev
```

#### Usando Vue CLI (Alternativa)

Vue CLI é uma ferramenta completa para desenvolvimento Vue.js.

```bash
npm install -g @vue/cli
vue create my-vue-app
cd my-vue-app
npm run serve
```

### Estrutura de um Projeto Vue.js

Um projeto Vue.js típico criado com Vite tem a seguinte estrutura:

```
my-vue-app/
├── node_modules/       # Dependências instaladas
├── public/             # Arquivos estáticos não processados
├── src/                # Código fonte da aplicação
│   ├── assets/         # Recursos como imagens, fontes, etc.
│   ├── components/     # Componentes Vue reutilizáveis
│   ├── App.vue         # Componente raiz
│   └── main.js         # Ponto de entrada da aplicação
├── index.html          # Página HTML principal
├── package.json        # Configurações e dependências do projeto
├── vite.config.js      # Configuração do Vite
└── README.md           # Documentação do projeto
```

### Ferramentas de Desenvolvimento

#### Vue DevTools

Vue DevTools é uma extensão de navegador essencial para depurar aplicações Vue.js:

1. [Vue DevTools para Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
2. [Vue DevTools para Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

#### Configuração do ESLint e Prettier

Para manter a qualidade do código, configure ESLint e Prettier:

1. Instale as dependências:

```bash
npm install --save-dev eslint eslint-plugin-vue prettier eslint-config-prettier
```

2. Crie um arquivo `.eslintrc.js` na raiz do projeto:

```javascript
module.exports = {
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // Regras personalizadas
  },
};
```

3. Crie um arquivo `.prettierrc` na raiz do projeto:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none"
}
```

### Recursos Adicionais

- [Documentação oficial do Vue.js](https://vuejs.org/)
- [Documentação do Vite](https://vitejs.dev/)
- [Awesome Vue](https://github.com/vuejs/awesome-vue) - Lista curada de recursos Vue.js

## Exercício Prático: Criação do primeiro projeto Vue.js

### Objetivo

Criar um projeto Vue.js básico e implementar um componente simples que demonstre os conceitos fundamentais do framework.

### Passo 1: Configuração do Projeto

1. Crie um novo projeto Vue.js usando Vite:

```bash
npm create vite@latest meu-primeiro-projeto -- --template vue
cd meu-primeiro-projeto
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra o navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal)

### Passo 2: Explorar a Estrutura do Projeto

1. Abra o projeto no seu editor de código
2. Examine os arquivos principais:
   - `src/main.js` - Ponto de entrada da aplicação
   - `src/App.vue` - Componente raiz
   - `src/components/` - Diretório de componentes

### Passo 3: Modificar o Componente Existente

1. Abra o arquivo `src/components/HelloWorld.vue`
2. Modifique o template para exibir uma mensagem personalizada
3. Adicione um contador simples usando a reatividade do Vue

```vue
<template>
  <div class="hello-world">
    <h1>{{ message }}</h1>
    <p>Contador: {{ count }}</p>
    <button @click="increment">Incrementar</button>
    <button @click="decrement">Decrementar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props
defineProps({
  message: {
    type: String,
    default: "Bem-vindo ao Vue.js!",
  },
});

// Estado reativo
const count = ref(0);

// Métodos
const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<style scoped>
.hello-world {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #33a06f;
}
</style>
```

### Passo 4: Modificar o Componente App

1. Abra o arquivo `src/App.vue`
2. Modifique-o para usar o componente HelloWorld com props personalizadas

```vue
<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.svg" width="125" height="125" />
    <HelloWorld message="Meu Primeiro Projeto Vue.js" />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### Passo 5: Criar um Novo Componente

1. Crie um novo arquivo `src/components/UserProfile.vue`
2. Implemente um componente que exiba informações de usuário

```vue
<template>
  <div class="user-profile">
    <h2>Perfil de Usuário</h2>
    <div class="profile-info">
      <div class="avatar" :style="{ backgroundColor: avatarColor }">
        {{ initials }}
      </div>
      <div class="details">
        <p><strong>Nome:</strong> {{ firstName }} {{ lastName }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Função:</strong> {{ role }}</p>
      </div>
    </div>
    <div class="actions">
      <button @click="toggleEditMode">
        {{ isEditing ? "Salvar" : "Editar" }}
      </button>
      <button v-if="isEditing" @click="cancelEdit" class="cancel">
        Cancelar
      </button>
    </div>

    <div v-if="isEditing" class="edit-form">
      <div class="form-group">
        <label for="firstName">Nome:</label>
        <input id="firstName" v-model="editedFirstName" type="text" />
      </div>
      <div class="form-group">
        <label for="lastName">Sobrenome:</label>
        <input id="lastName" v-model="editedLastName" type="text" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="editedEmail" type="email" />
      </div>
      <div class="form-group">
        <label for="role">Função:</label>
        <select id="role" v-model="editedRole">
          <option value="Desenvolvedor">Desenvolvedor</option>
          <option value="Designer">Designer</option>
          <option value="Gerente de Produto">Gerente de Produto</option>
          <option value="QA">QA</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Estado reativo
const firstName = ref("João");
const lastName = ref("Silva");
const email = ref("joao.silva@exemplo.com");
const role = ref("Desenvolvedor");
const isEditing = ref(false);

// Estado para edição
const editedFirstName = ref(firstName.value);
const editedLastName = ref(lastName.value);
const editedEmail = ref(email.value);
const editedRole = ref(role.value);

// Propriedades computadas
const initials = computed(() => {
  return `${firstName.value.charAt(0)}${lastName.value.charAt(0)}`;
});

const avatarColor = computed(() => {
  // Gera uma cor baseada no nome
  const hash = firstName.value.length + lastName.value.length;
  const hue = (hash * 137.508) % 360;
  return `hsl(${hue}, 70%, 60%)`;
});

// Métodos
const toggleEditMode = () => {
  if (isEditing.value) {
    // Salvar alterações
    firstName.value = editedFirstName.value;
    lastName.value = editedLastName.value;
    email.value = editedEmail.value;
    role.value = editedRole.value;
    isEditing.value = false;
  } else {
    // Entrar no modo de edição
    editedFirstName.value = firstName.value;
    editedLastName.value = lastName.value;
    editedEmail.value = email.value;
    editedRole.value = role.value;
    isEditing.value = true;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  // Restaurar valores originais no formulário
  editedFirstName.value = firstName.value;
  editedLastName.value = lastName.value;
  editedEmail.value = email.value;
  editedRole.value = role.value;
};
</script>

<style scoped>
.user-profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-info {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
}

.details {
  text-align: left;
}

.actions {
  margin: 20px 0;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #33a06f;
}

button.cancel {
  background-color: #e74c3c;
}

button.cancel:hover {
  background-color: #c0392b;
}

.edit-form {
  margin-top: 20px;
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

### Passo 6: Atualizar o App.vue para Incluir o Novo Componente

1. Modifique o arquivo `src/App.vue` para incluir o componente UserProfile

```vue
<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.svg" width="125" height="125" />
    <HelloWorld message="Meu Primeiro Projeto Vue.js" />
    <UserProfile />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import UserProfile from "./components/UserProfile.vue";
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}
</style>
```

### Passo 7: Testar a Aplicação

1. Verifique se o servidor de desenvolvimento ainda está rodando
2. Acesse `http://localhost:5173` no navegador
3. Interaja com os componentes para testar a funcionalidade

# Exercícios Práticos - Módulo 1: Introdução ao Vue.js

## Exercício 1: Primeiro Componente Vue

- Crie um componente simples chamado `HelloWorld`
- Adicione uma propriedade `message` com valor inicial
- Renderize a mensagem na tela
- Aplique estilização básica

## Exercício 2: Configuração de Projeto

- Instale Vue.js usando Vue CLI
- Configure um novo projeto
- Explore a estrutura de diretórios
- Crie um componente de boas-vindas

## Desafio Final

- Desenvolva uma página de apresentação pessoal usando Vue.js
- Utilize diretivas básicas
- Aplique estilo e responsividade

### Perguntas para Fixação

1. **Qual é a função do arquivo `main.js` em um projeto Vue.js?**

   - a) Definir estilos globais
   - b) Servir como ponto de entrada da aplicação
   - c) Configurar rotas da aplicação
   - d) Definir componentes globais

2. **O que é a propriedade `setup` em um componente Vue 3 com Composition API?**

   - a) Uma função que configura o servidor de desenvolvimento
   - b) Uma função que define o estado e comportamento do componente
   - c) Uma propriedade que configura o webpack
   - d) Uma função que inicializa o Vue Router

3. **Como você cria uma variável reativa no Vue 3 usando Composition API?**

   - a) `const count = reactive(0)`
   - b) `const count = ref(0)`
   - c) `const count = useState(0)`
   - d) `const count = computed(() => 0)`

4. **Qual é a sintaxe correta para vincular um evento de clique a um método em um template Vue?**

   - a) `<button click="increment">Incrementar</button>`
   - b) `<button v-on:click="increment">Incrementar</button>`
   - c) `<button @click="increment">Incrementar</button>`
   - d) As opções b e c estão corretas

5. **O que é uma propriedade computada no Vue.js?**
   - a) Uma função que é executada apenas uma vez durante a inicialização do componente
   - b) Uma propriedade que é calculada automaticamente com base em outras propriedades reativas
   - c) Um método que é chamado quando o componente é montado
   - d) Uma propriedade que é passada de um componente pai para um filho

**Respostas:**

1. b) Definir o ponto de entrada da aplicação
2. b) Uma função que define o estado e comportamento do componente
3. b) `const count = ref(0)`
4. d) As opções b e c estão corretas
5. b) Uma propriedade que é calculada automaticamente com base em outras propriedades reativas
