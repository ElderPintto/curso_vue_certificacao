# Módulo 5: Roteamento com Vue Router

## Aula 5.1: Configuração básica do Vue Router

### O que é o Vue Router?

O Vue Router é a biblioteca oficial de roteamento para Vue.js. Ele permite criar aplicações de página única (SPA - Single Page Applications) com navegação entre diferentes "páginas" sem recarregar o navegador. O Vue Router integra-se profundamente com o Vue.js, tornando a construção de SPAs uma experiência simples e intuitiva.

### Instalação e Configuração Básica

#### Instalação

Para instalar o Vue Router em um projeto Vue existente:

```bash
# npm
npm install vue-router@4

# yarn
yarn add vue-router@4

# pnpm
pnpm add vue-router@4
```

**Nota**: Vue Router 4 é compatível com Vue 3, enquanto Vue Router 3 é para Vue 2.

#### Configuração Básica

Vamos criar uma configuração básica do Vue Router:

1. Primeiro, crie alguns componentes para as páginas:

```vue
<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Página Inicial</h1>
    <p>Bem-vindo à nossa aplicação Vue!</p>
  </div>
</template>
```

```vue
<!-- src/views/About.vue -->
<template>
  <div class="about">
    <h1>Sobre Nós</h1>
    <p>Esta é uma aplicação de exemplo usando Vue Router.</p>
  </div>
</template>
```

2. Configure o router:

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

3. Integre o router na aplicação Vue:

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

4. Atualize o componente App para incluir o router-view:

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

### Modos de História

O Vue Router suporta diferentes modos de história:

#### 1. createWebHistory

Usa a API History do HTML5, resultando em URLs limpas sem hash (#):

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [...]
})
```

**Vantagens**:

- URLs limpas e amigáveis
- Melhor para SEO

**Desvantagens**:

- Requer configuração do servidor para redirecionar todas as rotas para o index.html

#### 2. createWebHashHistory

Usa o hash (#) na URL para simular uma navegação completa:

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...]
})
```

**Vantagens**:

- Funciona sem configuração especial do servidor
- Compatível com navegadores mais antigos

**Desvantagens**:

- URLs menos amigáveis (contêm #)
- Limitações com SEO

#### 3. createMemoryHistory

Mantém o estado do router na memória (útil para SSR e ambientes não-navegador):

```javascript
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [...]
})
```

### Componentes do Router

O Vue Router fornece vários componentes para facilitar a navegação:

#### 1. `<router-link>`

Componente para navegação entre rotas:

```html
<router-link to="/">Home</router-link>
<router-link to="/about">About</router-link>

<!-- Com parâmetros -->
<router-link :to="{ name: 'User', params: { id: 123 }}"
  >Ver Usuário</router-link
>

<!-- Com query params -->
<router-link :to="{ path: '/search', query: { q: 'vue' }}"
  >Pesquisar</router-link
>
```

**Props importantes**:

- `to`: Destino da rota (string ou objeto)
- `replace`: Substitui a entrada atual no histórico em vez de adicionar uma nova
- `active-class`: Classe CSS aplicada quando a rota está ativa
- `exact-active-class`: Classe CSS aplicada quando a rota está exatamente ativa

#### 2. `<router-view>`

Componente que exibe o componente correspondente à rota atual:

```html
<router-view></router-view>

<!-- Com nome (para views nomeadas) -->
<router-view name="sidebar"></router-view>
```

### Navegação Programática

Além de usar `<router-link>`, você pode navegar programaticamente:

```javascript
// Navegação para uma URL
router.push("/about");

// Navegação com objeto
router.push({ path: "/about" });

// Navegação com nome e parâmetros
router.push({ name: "User", params: { id: 123 } });

// Com query params
router.push({ path: "/search", query: { q: "vue" } });

// Substituir histórico em vez de adicionar
router.replace("/about");

// Voltar na história
router.go(-1);

// Avançar na história
router.go(1);
```

### Rotas Nomeadas

Você pode nomear suas rotas para facilitar a navegação:

```javascript
const routes = [
  {
    path: "/user/:id",
    name: "User",
    component: User,
  },
];
```

E então navegar usando o nome:

```javascript
router.push({ name: "User", params: { id: 123 } });
```

### Base URL

Se sua aplicação não está sendo servida a partir da raiz do domínio, você pode especificar um caminho base:

```javascript
const router = createRouter({
  history: createWebHistory('/app/'),
  routes: [...]
})
```

### Melhores Práticas para Configuração Básica

1. **Organize as rotas em módulos**: Para aplicações grandes, divida as rotas em arquivos separados
2. **Use rotas nomeadas**: Facilita a manutenção e evita problemas com mudanças de URL
3. **Prefira createWebHistory**: Melhor para SEO e experiência do usuário, quando possível
4. **Configure corretamente o servidor**: Para modo history, configure o servidor para redirecionar para index.html
5. **Mantenha a estrutura de arquivos organizada**: Separe componentes de página em uma pasta `views`

## Aula 5.2: Rotas dinâmicas e parâmetros

### Rotas Dinâmicas

Rotas dinâmicas permitem que você mapeie padrões de URL para o mesmo componente. Isso é útil quando você tem várias rotas que seguem um padrão similar, como páginas de detalhes de usuários, produtos, etc.

#### Definindo Rotas Dinâmicas

```javascript
const routes = [
  // Rota dinâmica com parâmetro id
  {
    path: "/user/:id",
    component: User,
  },

  // Múltiplos parâmetros
  {
    path: "/posts/:category/:id",
    component: Post,
  },

  // Parâmetro opcional (com ?)
  {
    path: "/products/:id?",
    component: Product,
  },
];
```

### Acessando Parâmetros de Rota

#### Via Props do Componente

Você pode configurar o componente para receber os parâmetros como props:

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User,
    props: true, // passa params como props
  },
];
```

No componente:

```vue
<template>
  <div>
    <h1>Usuário {{ id }}</h1>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>
```

#### Via $route

Você também pode acessar os parâmetros através do objeto `$route`:

```vue
<template>
  <div>
    <h1>Usuário {{ $route.params.id }}</h1>
  </div>
</template>
```

Na Composition API:

```vue
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params.id);
</script>
```

### Função Props Personalizada

Você pode usar uma função para transformar os parâmetros antes de passá-los como props:

```javascript
const routes = [
  {
    path: "/search/:keyword",
    component: SearchResults,
    props: (route) => ({
      keyword: route.params.keyword,
      page: Number(route.query.page) || 1,
    }),
  },
];
```

### Parâmetros de Query

Além dos parâmetros de rota, você também pode acessar parâmetros de query:

```javascript
// URL: /search?q=vue&page=2

// Options API
this.$route.query.q; // 'vue'
this.$route.query.page; // '2'

// Composition API
const route = useRoute();
route.query.q; // 'vue'
route.query.page; // '2'
```

### Reagindo a Mudanças de Parâmetros

Quando você navega de `/user/1` para `/user/2`, o mesmo componente é reutilizado. Isso significa que os hooks de ciclo de vida como `created` e `mounted` não são chamados novamente.

Para reagir a mudanças de parâmetros:

#### Options API

```javascript
export default {
  watch: {
    "$route.params.id": function (newId) {
      // Reagir à mudança
      this.fetchUserData(newId);
    },
  },
  created() {
    this.fetchUserData(this.$route.params.id);
  },
  methods: {
    fetchUserData(id) {
      // Buscar dados do usuário
    },
  },
};
```

#### Composition API

```javascript
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const fetchUserData = (id) => {
      // Buscar dados do usuário
    };

    onMounted(() => {
      fetchUserData(route.params.id);
    });

    watch(
      () => route.params.id,
      (newId) => {
        fetchUserData(newId);
      }
    );

    return {
      // ...
    };
  },
};
```

### Correspondência de Padrões Avançados

O Vue Router suporta padrões de correspondência avançados:

#### 1. Parâmetros Opcionais

```javascript
{
  path: "/user/:id?";
} // Corresponde a /user e /user/123
```

#### 2. Zero ou Mais

```javascript
{
  path: "/files/:pathMatch*";
} // Corresponde a /files, /files/a, /files/a/b, etc.
```

#### 3. Um ou Mais

```javascript
{
  path: "/files/:pathMatch+";
} // Corresponde a /files/a, /files/a/b, mas não a /files
```

#### 4. Parâmetros Personalizados

Você pode personalizar como os parâmetros são correspondidos usando expressões regulares:

```javascript
{
  path: '/user/:id(\\d+)',  // Corresponde apenas a números
  component: User
}
```

### Rotas com Múltiplos Parâmetros

Você pode definir rotas com múltiplos parâmetros:

```javascript
{
  path: '/posts/:category/:id',
  component: Post
}
```

E acessá-los:

```javascript
// URL: /posts/tecnologia/123
this.$route.params.category; // 'tecnologia'
this.$route.params.id; // '123'
```

### Capturando Todas as Rotas (Catch-All)

Você pode definir uma rota que captura todas as rotas não correspondidas:

```javascript
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound
}
```

### Prioridade de Rotas

As rotas são correspondidas na ordem em que são definidas. Rotas mais específicas devem vir antes de rotas mais genéricas:

```javascript
const routes = [
  { path: "/user/:id", component: User },
  { path: "/user/profile", component: UserProfile }, // Nunca será correspondida!
  { path: "/:pathMatch(.*)*", component: NotFound },
];
```

Ordem correta:

```javascript
const routes = [
  { path: "/user/profile", component: UserProfile }, // Rota específica primeiro
  { path: "/user/:id", component: User },
  { path: "/:pathMatch(.*)*", component: NotFound },
];
```

### Melhores Práticas para Rotas Dinâmicas

1. **Use props para desacoplar componentes**: Prefira passar parâmetros como props em vez de acessar `$route` diretamente
2. **Valide parâmetros**: Use expressões regulares ou validação no componente
3. **Considere a ordem das rotas**: Coloque rotas mais específicas antes de rotas mais genéricas
4. **Use nomes significativos para parâmetros**: Escolha nomes que descrevam o que o parâmetro representa
5. **Lide com mudanças de parâmetros**: Observe mudanças nos parâmetros quando o mesmo componente é reutilizado

## Aula 5.3: Navegação aninhada e views nomeadas

### Rotas Aninhadas

Rotas aninhadas permitem que você crie layouts mais complexos, onde componentes podem ter seus próprios sub-componentes baseados na rota. Isso é útil para criar interfaces com múltiplos níveis de navegação.

#### Definindo Rotas Aninhadas

```javascript
const routes = [
  {
    path: "/user",
    component: User,
    children: [
      // Rota filha que será renderizada dentro do <router-view> do User
      { path: "", component: UserHome },

      // /user/profile -> UserProfile será renderizado dentro do <router-view> do User
      { path: "profile", component: UserProfile },

      // /user/posts -> UserPosts será renderizado dentro do <router-view> do User
      { path: "posts", component: UserPosts },
    ],
  },
];
```

#### Componente Pai com `<router-view>`

```vue
<!-- User.vue -->
<template>
  <div class="user-container">
    <h2>Área do Usuário</h2>
    <nav>
      <router-link to="/user">Dashboard</router-link> |
      <router-link to="/user/profile">Perfil</router-link> |
      <router-link to="/user/posts">Posts</router-link>
    </nav>

    <!-- Este router-view renderizará o componente correspondente à rota filha -->
    <router-view></router-view>
  </div>
</template>
```

### Rotas Aninhadas com Parâmetros

Você pode combinar rotas aninhadas com parâmetros:

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User,
    children: [
      { path: "", component: UserHome },
      { path: "profile", component: UserProfile },
      { path: "posts", component: UserPosts },
      { path: "post/:postId", component: UserPost },
    ],
  },
];
```

Acessando os parâmetros:

```javascript
// URL: /user/123/post/456
this.$route.params.id; // '123'
this.$route.params.postId; // '456'
```

### Views Nomeadas

Views nomeadas permitem que você renderize múltiplos componentes ao mesmo tempo para a mesma rota, cada um em um `<router-view>` diferente.

#### Definindo Views Nomeadas

```javascript
const routes = [
  {
    path: "/",
    components: {
      default: Home,
      header: Header,
      sidebar: Sidebar,
      footer: Footer,
    },
  },
  {
    path: "/about",
    components: {
      default: About,
      header: Header,
      sidebar: AboutSidebar,
      footer: Footer,
    },
  },
];
```

#### Template com Múltiplos `<router-view>`

```vue
<!-- App.vue -->
<template>
  <div class="app-container">
    <router-view name="header"></router-view>

    <div class="main-content">
      <router-view name="sidebar"></router-view>
      <router-view></router-view>
      <!-- default view -->
    </div>

    <router-view name="footer"></router-view>
  </div>
</template>
```

### Combinando Views Nomeadas e Rotas Aninhadas

Você pode combinar views nomeadas com rotas aninhadas para criar layouts complexos:

```javascript
const routes = [
  {
    path: "/settings",
    component: SettingsLayout,
    children: [
      {
        path: "profile",
        components: {
          default: SettingsProfile,
          helper: ProfileHelper,
        },
      },
      {
        path: "security",
        components: {
          default: SettingsSecurity,
          helper: SecurityHelper,
        },
      },
    ],
  },
];
```

Template do componente pai:

```vue
<!-- SettingsLayout.vue -->
<template>
  <div class="settings-container">
    <h2>Configurações</h2>
    <nav>
      <router-link to="/settings/profile">Perfil</router-link> |
      <router-link to="/settings/security">Segurança</router-link>
    </nav>

    <div class="settings-content">
      <router-view></router-view>
      <div class="helper-panel">
        <router-view name="helper"></router-view>
      </div>
    </div>
  </div>
</template>
```

### Passando Props para Views Nomeadas

Você pode passar props para views nomeadas:

```javascript
const routes = [
  {
    path: "/user/:id",
    components: {
      default: User,
      sidebar: UserSidebar,
    },
    props: {
      default: true,
      sidebar: (route) => ({ userId: route.params.id }),
    },
  },
];
```

### Redirecionamentos com Rotas Aninhadas

Você pode definir redirecionamentos dentro de rotas aninhadas:

```javascript
const routes = [
  {
    path: "/user/:id",
    component: User,
    children: [
      // Redireciona /user/:id para /user/:id/profile
      { path: "", redirect: (to) => ({ path: `${to.path}/profile` }) },
      { path: "profile", component: UserProfile },
      { path: "posts", component: UserPosts },
    ],
  },
];
```

### Lazy Loading com Rotas Aninhadas

Você pode aplicar lazy loading em rotas aninhadas para melhorar o desempenho:

```javascript
const routes = [
  {
    path: "/admin",
    component: () => import("./views/Admin.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("./views/admin/Dashboard.vue"),
      },
      {
        path: "users",
        component: () => import("./views/admin/Users.vue"),
      },
    ],
  },
];
```

### Navegação Programática com Rotas Aninhadas

Ao navegar programaticamente com rotas aninhadas, você pode especificar a rota completa ou relativa:

```javascript
// Navegação para rota completa
router.push("/user/123/posts");

// Navegação relativa (a partir da rota atual)
// Se estiver em /user/123
router.push("posts"); // Navega para /user/123/posts
```

### Melhores Práticas para Rotas Aninhadas e Views Nomeadas

1. **Mantenha a hierarquia clara**: Estruture suas rotas de forma que reflita a hierarquia da UI
2. **Use redirecionamentos para rotas padrão**: Redirecione rotas pai vazias para uma sub-rota padrão
3. **Nomeie suas views de forma consistente**: Use nomes significativos e consistentes para views nomeadas
4. **Considere o lazy loading**: Carregue componentes sob demanda para melhorar o desempenho inicial
5. **Evite aninhamento excessivo**: Mais de 2-3 níveis de aninhamento podem tornar a navegação confusa
6. **Documente a estrutura de rotas**: Para projetos grandes, mantenha documentação sobre a estrutura de rotas

## Aula 5.4: Guardas de navegação e controle de acesso

### O que são Guardas de Navegação?

Guardas de navegação são hooks fornecidos pelo Vue Router que permitem controlar o processo de navegação. Eles são úteis para:

- Redirecionar usuários não autenticados
- Verificar permissões antes de acessar rotas
- Carregar dados antes de exibir uma página
- Confirmar navegação antes de sair de uma página

### Tipos de Guardas de Navegação

O Vue Router oferece vários tipos de guardas, cada uma executada em um momento específico do ciclo de navegação:

#### 1. Guardas Globais

Afetam todas as navegações na aplicação.

##### beforeEach

Executado antes de cada navegação:

```javascript
router.beforeEach((to, from, next) => {
  // ...
  // next() para continuar
  // next(false) para abortar
  // next('/login') para redirecionar
  // next(new Error()) para erro
});
```

##### beforeResolve

Executado após a resolução de todos os componentes da rota, mas antes da confirmação da navegação:

```javascript
router.beforeResolve((to, from, next) => {
  // ...
  next();
});
```

##### afterEach

Executado após a conclusão da navegação (não afeta a navegação):

```javascript
router.afterEach((to, from) => {
  // ...
  // Não recebe next()
});
```

#### 2. Guardas por Rota

Definidas na configuração de uma rota específica.

##### beforeEnter

Executado antes de entrar em uma rota específica:

```javascript
const routes = [
  {
    path: "/admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      // ...
      next();
    },
  },
];
```

Você também pode usar um array de funções:

```javascript
const routes = [
  {
    path: "/admin",
    component: Admin,
    beforeEnter: [guardaAdmin, verificarPermissoes],
  },
];
```

#### 3. Guardas em Componentes

Definidas dentro dos componentes de rota.

##### beforeRouteEnter

Chamado antes que o componente seja criado:

```javascript
export default {
  beforeRouteEnter(to, from, next) {
    // Não tem acesso a `this` aqui!
    next((vm) => {
      // Acesso à instância do componente via callback
    });
  },
};
```

##### beforeRouteUpdate

Chamado quando a rota muda, mas o componente é reutilizado:

```javascript
export default {
  beforeRouteUpdate(to, from, next) {
    // Tem acesso a `this`
    this.name = to.params.name;
    next();
  },
};
```

##### beforeRouteLeave

Chamado antes de sair da rota:

```javascript
export default {
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Tem certeza que deseja sair? Alterações não salvas serão perdidas."
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
```

### Fluxo de Resolução de Navegação

Quando uma navegação é acionada, o Vue Router segue este fluxo:

1. Navegação acionada
2. Chama `beforeRouteLeave` nos componentes que serão desativados
3. Chama `beforeEach` global
4. Chama `beforeRouteUpdate` em componentes reutilizados
5. Chama `beforeEnter` na rota de destino
6. Resolve componentes assíncronos da rota de destino
7. Chama `beforeRouteEnter` nos componentes que serão ativados
8. Chama `beforeResolve` global
9. Navegação confirmada
10. Chama `afterEach` global
11. Atualização do DOM
12. Chama callbacks passados para `next` em `beforeRouteEnter`

### Exemplos Práticos de Guardas

#### Autenticação de Usuário

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  // Verifica se a rota requer autenticação
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Redireciona para login se não estiver autenticado
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next(); // Usuário autenticado, continua
    }
  } else {
    next(); // Rota não requer autenticação
  }
});

// Definição das rotas
const routes = [
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
  },
];
```

#### Verificação de Permissões

```javascript
router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem("userRole");

  if (to.matched.some((record) => record.meta.requiresRole)) {
    // Verifica se o usuário tem a role necessária
    if (!userRole || !to.meta.allowedRoles.includes(userRole)) {
      next({ path: "/unauthorized" });
    } else {
      next();
    }
  } else {
    next();
  }
});

const routes = [
  {
    path: "/admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresRole: true,
      allowedRoles: ["admin", "superadmin"],
    },
  },
];
```

#### Confirmação de Saída com Dados Não Salvos

```javascript
export default {
  data() {
    return {
      formChanged: false,
    };
  },
  methods: {
    updateForm() {
      this.formChanged = true;
    },
    saveForm() {
      // Salvar dados
      this.formChanged = false;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.formChanged) {
      const confirm = window.confirm(
        "Você tem alterações não salvas. Deseja realmente sair?"
      );
      if (confirm) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
```

#### Carregamento de Dados Antes da Navegação

```javascript
export default {
  data() {
    return {
      post: null,
      loading: false,
    };
  },
  methods: {
    async fetchPost(id) {
      this.loading = true;
      try {
        const response = await fetch(`/api/posts/${id}`);
        this.post = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    // Componente ainda não foi criado
    const response = await fetch(`/api/posts/${to.params.id}`);
    const post = await response.json();

    // Passa os dados para o componente quando for criado
    next((vm) => {
      vm.post = post;
      vm.loading = false;
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // Componente já existe, então podemos usar this
    this.loading = true;
    this.post = null;

    try {
      const response = await fetch(`/api/posts/${to.params.id}`);
      this.post = await response.json();
      next();
    } catch (error) {
      console.error(error);
      next(false);
    } finally {
      this.loading = false;
    }
  },
};
```

### Guardas com Composition API

No Vue 3 com Composition API, você pode usar os hooks do router:

```javascript
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const formChanged = ref(false);

    onBeforeRouteLeave((to, from, next) => {
      if (formChanged.value) {
        const confirm = window.confirm(
          "Você tem alterações não salvas. Deseja realmente sair?"
        );
        if (confirm) {
          next();
        } else {
          next(false);
        }
      } else {
        next();
      }
    });

    onBeforeRouteUpdate(async (to, from, next) => {
      // Lógica antes de atualizar a rota
      next();
    });

    return {
      formChanged,
    };
  },
};
```

### Redirecionamentos e Aliases

#### Redirecionamentos

Você pode definir redirecionamentos na configuração de rotas:

```javascript
const routes = [
  { path: "/home", redirect: "/" },
  { path: "/old-path", redirect: "/new-path" },
  {
    path: "/user/:id",
    redirect: (to) => {
      // Redirecionamento dinâmico baseado na rota
      return { path: "/profile", query: { id: to.params.id } };
    },
  },
];
```

#### Aliases

Aliases permitem acessar a mesma rota por diferentes caminhos:

```javascript
const routes = [
  {
    path: "/posts",
    component: PostList,
    alias: ["/articles", "/blog"],
  },
];
```

### Tratamento de Erros na Navegação

Você pode lidar com erros de navegação:

```javascript
router.onError((error) => {
  console.error("Erro na navegação:", error);
  // Lógica de tratamento de erro
});
```

Ou lançar erros em guardas:

```javascript
router.beforeEach((to, from, next) => {
  if (somethingWrong) {
    next(new Error("Algo deu errado"));
  } else {
    next();
  }
});
```

### Melhores Práticas para Guardas de Navegação

1. **Mantenha guardas simples e focadas**: Cada guarda deve ter uma responsabilidade clara
2. **Evite lógica complexa em guardas globais**: Pode afetar o desempenho de toda a aplicação
3. **Use meta fields para marcar rotas**: Facilita a aplicação de regras consistentes
4. **Considere o UX ao redirecionar**: Forneça feedback ao usuário sobre redirecionamentos
5. **Lide com estados de carregamento**: Mostre indicadores de carregamento durante operações assíncronas
6. **Organize a lógica de autenticação**: Mantenha a lógica de autenticação em um serviço separado
7. **Teste suas guardas**: Escreva testes para garantir que as guardas funcionem corretamente

## Exercício Prático: Desenvolvimento de uma aplicação com múltiplas rotas e autenticação

### Objetivo

Criar uma aplicação Vue com múltiplas rotas, incluindo áreas protegidas que requerem autenticação, demonstrando o uso do Vue Router para controle de navegação.

### Requisitos

1. Implementar rotas públicas e protegidas
2. Criar um sistema de autenticação simulado
3. Implementar guardas de navegação para controle de acesso
4. Utilizar rotas aninhadas para áreas administrativas
5. Implementar redirecionamentos e tratamento de rotas não encontradas

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest router-auth-demo -- --template vue
cd router-auth-demo
npm install
npm install vue-router@4
```

### Passo 2: Criar os Componentes de Página

Crie a estrutura de diretórios:

```bash
mkdir -p src/views/admin
mkdir -p src/components/auth
mkdir -p src/services
```

#### Páginas Públicas

```vue
<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Página Inicial</h1>
    <p>Bem-vindo à nossa aplicação de demonstração do Vue Router!</p>
    <p>Esta é uma página pública acessível a todos os usuários.</p>
  </div>
</template>
```

```vue
<!-- src/views/About.vue -->
<template>
  <div class="about">
    <h1>Sobre</h1>
    <p>
      Esta é uma aplicação de demonstração criada para mostrar como implementar
      autenticação e controle de acesso com Vue Router.
    </p>
    <p>Recursos demonstrados:</p>
    <ul>
      <li>Configuração de rotas</li>
      <li>Rotas aninhadas</li>
      <li>Guardas de navegação</li>
      <li>Autenticação de usuários</li>
      <li>Controle de acesso baseado em funções</li>
    </ul>
  </div>
</template>
```

#### Páginas de Autenticação

```vue
<!-- src/views/Login.vue -->
<template>
  <div class="login">
    <h1>Login</h1>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="exemplo@email.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Sua senha"
        />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="rememberMe" />
          Lembrar-me
        </label>
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? "Entrando..." : "Entrar" }}
        </button>
      </div>

      <div class="form-info">
        <p>Use as seguintes credenciais para teste:</p>
        <ul>
          <li>
            <strong>Usuário:</strong> admin@exemplo.com /
            <strong>Senha:</strong> admin123
          </li>
          <li>
            <strong>Usuário:</strong> user@exemplo.com /
            <strong>Senha:</strong> user123
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import authService from "../services/auth";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const loading = ref(false);
    const error = ref("");

    const login = async () => {
      loading.value = true;
      error.value = "";

      try {
        const success = await authService.login(email.value, password.value);

        if (success) {
          // Redirecionar para a página original ou dashboard
          const redirectPath = route.query.redirect || "/dashboard";
          router.push(redirectPath);
        } else {
          error.value = "Credenciais inválidas. Por favor, tente novamente.";
        }
      } catch (err) {
        error.value =
          "Ocorreu um erro durante o login. Por favor, tente novamente.";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      rememberMe,
      loading,
      error,
      login,
    };
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #a0d5be;
  cursor: not-allowed;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.form-info {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  font-size: 14px;
}

.form-info ul {
  padding-left: 20px;
  margin: 5px 0 0;
}
</style>
```

#### Páginas Protegidas

```vue
<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Bem-vindo, {{ user.name }}!</p>
    <p>
      Esta é uma página protegida que só pode ser acessada por usuários
      autenticados.
    </p>

    <div class="user-info">
      <h2>Suas Informações</h2>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Função:</strong> {{ user.role }}</p>
      <p><strong>Último Login:</strong> {{ new Date().toLocaleString() }}</p>
    </div>

    <div class="actions">
      <button @click="logout" class="logout-btn">Sair</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import authService from "../services/auth";

export default {
  setup() {
    const router = useRouter();

    const user = computed(() => authService.getCurrentUser());

    const logout = () => {
      authService.logout();
      router.push("/login");
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
}

.user-info {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.actions {
  margin-top: 20px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

#### Páginas de Administração

```vue
<!-- src/views/admin/AdminLayout.vue -->
<template>
  <div class="admin-layout">
    <div class="admin-header">
      <h1>Área Administrativa</h1>
      <p>Bem-vindo, {{ user.name }} ({{ user.role }})</p>
    </div>

    <div class="admin-container">
      <div class="admin-sidebar">
        <nav>
          <router-link to="/admin/dashboard">Dashboard</router-link>
          <router-link to="/admin/users">Usuários</router-link>
          <router-link to="/admin/settings">Configurações</router-link>
        </nav>

        <div class="admin-sidebar-footer">
          <button @click="logout" class="logout-btn">Sair</button>
        </div>
      </div>

      <div class="admin-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import authService from "../../services/auth";

export default {
  setup() {
    const router = useRouter();

    const user = computed(() => authService.getCurrentUser());

    const logout = () => {
      authService.logout();
      router.push("/login");
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped>
.admin-layout {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.admin-container {
  display: flex;
  min-height: 600px;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.admin-sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admin-sidebar nav {
  display: flex;
  flex-direction: column;
}

.admin-sidebar a {
  padding: 10px;
  margin-bottom: 5px;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 4px;
}

.admin-sidebar a:hover {
  background-color: #e0e0e0;
}

.admin-sidebar a.router-link-active {
  background-color: #42b983;
  color: white;
}

.admin-content {
  flex: 1;
  padding: 20px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
</style>
```

```vue
<!-- src/views/admin/AdminDashboard.vue -->
<template>
  <div class="admin-dashboard">
    <h2>Dashboard Administrativo</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Usuários</h3>
        <div class="stat-value">1,234</div>
      </div>
      <div class="stat-card">
        <h3>Produtos</h3>
        <div class="stat-value">567</div>
      </div>
      <div class="stat-card">
        <h3>Pedidos</h3>
        <div class="stat-value">89</div>
      </div>
      <div class="stat-card">
        <h3>Receita</h3>
        <div class="stat-value">R$ 12.345</div>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Atividade Recente</h3>
      <ul>
        <li>
          <span class="activity-time">Há 5 minutos</span>
          <span class="activity-desc">Novo usuário registrado</span>
        </li>
        <li>
          <span class="activity-time">Há 15 minutos</span>
          <span class="activity-desc">Pedido #1234 foi concluído</span>
        </li>
        <li>
          <span class="activity-time">Há 1 hora</span>
          <span class="activity-desc">Novo produto adicionado</span>
        </li>
        <li>
          <span class="activity-time">Há 2 horas</span>
          <span class="activity-desc"
            >Configurações do sistema atualizadas</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #666;
  font-size: 1rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.recent-activity {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.recent-activity h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.recent-activity ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-activity li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
}

.recent-activity li:last-child {
  border-bottom: none;
}

.activity-time {
  width: 120px;
  color: #666;
  font-size: 0.9rem;
}

.activity-desc {
  flex: 1;
}
</style>
```

```vue
<!-- src/views/admin/AdminUsers.vue -->
<template>
  <div class="admin-users">
    <h2>Gerenciamento de Usuários</h2>

    <div class="users-actions">
      <button class="add-user-btn">Adicionar Usuário</button>
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar usuários..."
        />
      </div>
    </div>

    <table class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Função</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span :class="['status', user.active ? 'active' : 'inactive']">
              {{ user.active ? "Ativo" : "Inativo" }}
            </span>
          </td>
          <td class="actions">
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const searchQuery = ref("");

    const users = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@exemplo.com",
        role: "admin",
        active: true,
      },
      {
        id: 2,
        name: "John Doe",
        email: "john@exemplo.com",
        role: "user",
        active: true,
      },
      {
        id: 3,
        name: "Jane Smith",
        email: "jane@exemplo.com",
        role: "user",
        active: true,
      },
      {
        id: 4,
        name: "Bob Johnson",
        email: "bob@exemplo.com",
        role: "editor",
        active: false,
      },
      {
        id: 5,
        name: "Alice Brown",
        email: "alice@exemplo.com",
        role: "user",
        active: true,
      },
    ];

    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users;

      const query = searchQuery.value.toLowerCase();
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      );
    });

    return {
      searchQuery,
      filteredUsers,
    };
  },
};
</script>

<style scoped>
.users-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-user-btn {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-box input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.inactive {
  background-color: #ffebee;
  color: #c62828;
}

.actions {
  display: flex;
  gap: 8px;
}

.edit-btn {
  padding: 4px 8px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

```vue
<!-- src/views/admin/AdminSettings.vue -->
<template>
  <div class="admin-settings">
    <h2>Configurações do Sistema</h2>

    <div class="settings-section">
      <h3>Configurações Gerais</h3>

      <div class="form-group">
        <label for="site-name">Nome do Site</label>
        <input type="text" id="site-name" v-model="settings.siteName" />
      </div>

      <div class="form-group">
        <label for="site-description">Descrição do Site</label>
        <textarea
          id="site-description"
          v-model="settings.siteDescription"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="maintenance-mode">
          <input
            type="checkbox"
            id="maintenance-mode"
            v-model="settings.maintenanceMode"
          />
          Modo de Manutenção
        </label>
      </div>
    </div>

    <div class="settings-section">
      <h3>Configurações de Email</h3>

      <div class="form-group">
        <label for="email-from">Email de Envio</label>
        <input type="email" id="email-from" v-model="settings.emailFrom" />
      </div>

      <div class="form-group">
        <label for="smtp-host">Servidor SMTP</label>
        <input type="text" id="smtp-host" v-model="settings.smtpHost" />
      </div>

      <div class="form-group">
        <label for="smtp-port">Porta SMTP</label>
        <input type="number" id="smtp-port" v-model="settings.smtpPort" />
      </div>
    </div>

    <div class="settings-section">
      <h3>Configurações de Segurança</h3>

      <div class="form-group">
        <label for="session-timeout">Tempo de Sessão (minutos)</label>
        <input
          type="number"
          id="session-timeout"
          v-model="settings.sessionTimeout"
        />
      </div>

      <div class="form-group">
        <label for="max-login-attempts">Máximo de Tentativas de Login</label>
        <input
          type="number"
          id="max-login-attempts"
          v-model="settings.maxLoginAttempts"
        />
      </div>
    </div>

    <div class="form-actions">
      <button @click="saveSettings" class="save-btn">
        Salvar Configurações
      </button>
      <button @click="resetSettings" class="reset-btn">
        Restaurar Padrões
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const settings = reactive({
      siteName: "Meu Site Vue",
      siteDescription:
        "Uma aplicação de demonstração com Vue Router e autenticação",
      maintenanceMode: false,
      emailFrom: "noreply@exemplo.com",
      smtpHost: "smtp.exemplo.com",
      smtpPort: 587,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
    });

    const saveSettings = () => {
      // Simulação de salvamento
      alert("Configurações salvas com sucesso!");
    };

    const resetSettings = () => {
      // Simulação de reset
      Object.assign(settings, {
        siteName: "Meu Site Vue",
        siteDescription:
          "Uma aplicação de demonstração com Vue Router e autenticação",
        maintenanceMode: false,
        emailFrom: "noreply@exemplo.com",
        smtpHost: "smtp.exemplo.com",
        smtpPort: 587,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
      });
      alert("Configurações restauradas para os valores padrão!");
    };

    return {
      settings,
      saveSettings,
      resetSettings,
    };
  },
};
</script>

<style scoped>
.settings-section {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.settings-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.form-group label input[type="checkbox"] {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn {
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

#### Página de Erro 404

```vue
<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Página Não Encontrada</h2>
    <p>A página que você está procurando não existe ou foi movida.</p>
    <router-link to="/" class="home-link"
      >Voltar para a Página Inicial</router-link
    >
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 20px;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #e0e0e0;
}

h2 {
  margin-top: 0;
  color: #333;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
```

### Passo 3: Criar o Serviço de Autenticação

```javascript
// src/services/auth.js
// Serviço de autenticação simulado

// Usuários de teste
const users = [
  {
    id: 1,
    email: "admin@exemplo.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    id: 2,
    email: "user@exemplo.com",
    password: "user123",
    name: "Usuário Comum",
    role: "user",
  },
];

// Chave para armazenamento no localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/**
 * Simula um atraso de rede
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Serviço de autenticação
 */
const authService = {
  /**
   * Tenta fazer login com as credenciais fornecidas
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async login(email, password) {
    // Simula um atraso de rede
    await delay(800);

    // Encontra o usuário
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Cria um token simulado
      const token = `token_${Math.random()
        .toString(36)
        .substr(2)}_${Date.now()}`;

      // Armazena o token e informações do usuário
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        })
      );

      return true;
    }

    return false;
  },

  /**
   * Faz logout do usuário atual
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Obtém o usuário atual
   * @returns {Object|null}
   */
  getCurrentUser() {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Verifica se o usuário tem uma função específica
   * @param {string|string[]} roles
   * @returns {boolean}
   */
  hasRole(roles) {
    const user = this.getCurrentUser();
    if (!user) return false;

    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }

    return user.role === roles;
  },
};

export default authService;
```

### Passo 4: Configurar o Vue Router

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import authService from "../services/auth";

// Importar componentes
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";

// Componentes de Admin
import AdminLayout from "../views/admin/AdminLayout.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminUsers from "../views/admin/AdminUsers.vue";
import AdminSettings from "../views/admin/AdminSettings.vue";

// Definir rotas
const routes = [
  // Rotas públicas
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      hideForAuth: true, // Esconder para usuários autenticados
    },
  },

  // Rotas protegidas
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true, // Requer autenticação
    },
  },

  // Rotas de administração (aninhadas)
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresRole: "admin",
    },
    children: [
      {
        path: "",
        redirect: { name: "AdminDashboard" },
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "users",
        name: "AdminUsers",
        component: AdminUsers,
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: AdminSettings,
      },
    ],
  },

  // Rota 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// Criar o router
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

// Guarda de navegação global
router.beforeEach((to, from, next) => {
  // Verificar se a rota requer autenticação
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresRole = to.matched.some((record) => record.meta.requiresRole);
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth);

  const isAuthenticated = authService.isAuthenticated();

  // Redirecionar usuários autenticados tentando acessar páginas como login
  if (hideForAuth && isAuthenticated) {
    return next({ path: "/dashboard" });
  }

  // Verificar autenticação para rotas protegidas
  if (requiresAuth && !isAuthenticated) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  // Verificar permissões de função
  if (requiresRole && isAuthenticated) {
    const requiredRole =
      to.meta.requiresRole ||
      to.matched.find((record) => record.meta.requiresRole)?.meta.requiresRole;

    if (requiredRole && !authService.hasRole(requiredRole)) {
      return next({ path: "/dashboard" });
    }
  }

  next();
});

export default router;
```

### Passo 5: Criar o Componente de Layout Principal

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <header v-if="showHeader">
      <nav class="main-nav">
        <div class="nav-brand">
          <router-link to="/">Vue Router Demo</router-link>
        </div>

        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">Sobre</router-link>

          <template v-if="isAuthenticated">
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/admin" v-if="isAdmin">Admin</router-link>
            <a href="#" @click.prevent="logout">Sair</a>
          </template>

          <router-link to="/login" v-else>Login</router-link>
        </div>
      </nav>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer v-if="showHeader">
      <p>&copy; {{ new Date().getFullYear() }} Vue Router Auth Demo</p>
    </footer>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import authService from "./services/auth";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const isAuthenticated = computed(() => authService.isAuthenticated());
    const isAdmin = computed(() => authService.hasRole("admin"));

    // Determina se deve mostrar o cabeçalho e rodapé
    // Oculta em páginas de admin que têm seu próprio layout
    const showHeader = computed(() => {
      return !route.path.startsWith("/admin");
    });

    const logout = () => {
      authService.logout();
      router.push("/login");
    };

    return {
      isAuthenticated,
      isAdmin,
      showHeader,
      logout,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

.main-nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  color: #666;
}

h1,
h2,
h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

p {
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

### Passo 6: Atualizar o Arquivo Principal

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

createApp(App).use(router).mount("#app");
```

### Passo 7: Executar e Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para testar a aplicação.

# Exercícios Práticos - Módulo 5: Roteamento

## Exercício 1: Navegação Básica

- Configure Vue Router
- Crie rotas para diferentes páginas
- Implemente navegação entre rotas
- Adicione menu de navegação

## Exercício 2: Rotas Dinâmicas

- Desenvolva um blog com rotas dinâmicas
- Crie página de detalhes de artigo
- Implemente guardas de navegação
- Adicione redirecionamentos

## Desafio Final

- Criar aplicação de gerenciamento de usuários
- Rotas aninhadas
- Lazy loading
- Autenticação de rotas

### Perguntas para Fixação

1. **Qual é a principal diferença entre `createWebHistory` e `createWebHashHistory`?**

   - a) `createWebHistory` usa a API History do HTML5, enquanto `createWebHashHistory` usa o hash (#) na URL
   - b) `createWebHistory` é mais rápido que `createWebHashHistory`
   - c) `createWebHashHistory` oferece melhor suporte a SEO
   - d) `createWebHistory` funciona apenas em navegadores modernos

2. **Como você pode acessar parâmetros de rota em um componente Vue?**

   - a) Apenas através do objeto `$route`
   - b) Apenas através de props
   - c) Através do objeto `$route` ou configurando a rota para passar parâmetros como props
   - d) Através de variáveis globais

3. **Qual guarda de navegação é executada antes de deixar uma rota?**

   - a) `beforeEnter`
   - b) `beforeEach`
   - c) `beforeRouteLeave`
   - d) `afterEach`

4. **Como você pode implementar rotas aninhadas no Vue Router?**

   - a) Usando a propriedade `children` na configuração da rota
   - b) Usando múltiplos `<router-view>` no mesmo componente
   - c) Usando a propriedade `nested` na configuração da rota
   - d) Usando o método `router.nest()`

5. **Qual é o propósito das views nomeadas no Vue Router?**
   - a) Permitir que múltiplos componentes sejam renderizados em diferentes `<router-view>` para a mesma rota
   - b) Permitir que rotas tenham nomes para facilitar a navegação
   - c) Permitir que componentes tenham múltiplas instâncias
   - d) Permitir que rotas sejam acessadas por diferentes URLs

**Respostas:**

1. a) `createWebHistory` usa a API History do HTML5, enquanto `createWebHashHistory` usa o hash (#) na URL
2. c) Através do objeto `$route` ou configurando a rota para passar parâmetros como props
3. c) `beforeRouteLeave`
4. a) Usando a propriedade `children` na configuração da rota
5. a) Permitir que múltiplos componentes sejam renderizados em diferentes `<router-view>` para a mesma rota
