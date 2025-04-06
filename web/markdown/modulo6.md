# Módulo 6: Gerenciamento de Estado com Vuex/Pinia

## Aula 6.1: Introdução ao gerenciamento de estado

### O que é Gerenciamento de Estado?

O gerenciamento de estado refere-se à forma como armazenamos, acessamos e modificamos os dados em nossa aplicação. Em aplicações Vue simples, o estado é geralmente mantido nos componentes usando `data()` ou `ref()`/`reactive()`. No entanto, à medida que as aplicações crescem, gerenciar o estado apenas com essas ferramentas pode se tornar complexo e difícil de manter.

### Problemas do Gerenciamento de Estado em Aplicações Complexas

#### 1. Prop Drilling

Quando temos uma hierarquia profunda de componentes, precisamos passar props através de vários níveis, mesmo que os componentes intermediários não precisem desses dados:

```
App
└─ ParentComponent (precisa de userData)
   └─ ChildComponent (não precisa de userData)
      └─ GrandchildComponent (precisa de userData)
```

Isso leva a:

- Código verboso
- Dificuldade de manutenção
- Componentes acoplados

#### 2. Comunicação entre Componentes Não Relacionados

Quando componentes em diferentes ramos da árvore precisam compartilhar estado:

```
App
├─ ComponentA
│  └─ ComponentB (precisa compartilhar dados com ComponentD)
└─ ComponentC
   └─ ComponentD (precisa compartilhar dados com ComponentB)
```

Soluções improvisadas podem incluir:

- Eventos globais
- Serviços de barramento de eventos
- Armazenamento no componente raiz

#### 3. Falta de Previsibilidade

Quando o estado pode ser modificado de muitos lugares diferentes, torna-se difícil:

- Rastrear quando, onde e por que o estado mudou
- Depurar problemas
- Implementar recursos como viagem no tempo (time travel) para depuração

### Soluções para Gerenciamento de Estado

#### 1. Padrão de Fluxo Unidirecional

O Vue adota um fluxo de dados unidirecional:

- Estado flui de cima para baixo (props)
- Ações fluem de baixo para cima (eventos)

Este padrão torna o fluxo de dados mais previsível, mas não resolve todos os problemas.

#### 2. Provide/Inject

O Vue oferece `provide` e `inject` para passar dados através da árvore de componentes sem prop drilling:

```javascript
// Componente pai
export default {
  provide() {
    return {
      userData: this.userData
    }
  },
  data() {
    return {
      userData: { name: 'João' }
    }
  }
}

// Componente neto (pode estar vários níveis abaixo)
export default {
  inject: ['userData']
}
```

Limitações:

- Não é reativo por padrão (requer configuração adicional)
- Difícil de rastrear a origem dos dados
- Não centraliza a lógica de mutação

#### 3. Gerenciadores de Estado Centralizados

Bibliotecas como Vuex e Pinia oferecem:

- Estado centralizado
- Mutações previsíveis
- Ferramentas de depuração
- Middleware para efeitos colaterais
- Modularidade

### Vuex vs Pinia

#### Vuex

Vuex é o gerenciador de estado oficial para Vue 2, com suporte para Vue 3:

```javascript
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
});
```

#### Pinia

Pinia é o novo gerenciador de estado recomendado para Vue 3:

```javascript
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    async incrementAsync() {
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
```

#### Principais Diferenças

| Característica | Vuex                | Pinia                                              |
| -------------- | ------------------- | -------------------------------------------------- |
| Sintaxe        | Mais verbosa        | Mais simples e direta                              |
| Mutações       | Obrigatórias        | Não existem (ações modificam o estado diretamente) |
| TypeScript     | Suporte limitado    | Suporte completo                                   |
| Modularidade   | Módulos aninhados   | Stores independentes                               |
| Devtools       | Integração completa | Integração completa                                |
| Tamanho        | Maior               | Menor (~1KB)                                       |
| Composição     | Limitada            | Completa (Composition API)                         |

### Quando Usar Gerenciamento de Estado Centralizado

Considere usar Vuex ou Pinia quando:

1. **Múltiplos componentes dependem do mesmo estado**
2. **Ações em diferentes partes da aplicação precisam mutar o mesmo estado**
3. **A aplicação tem lógica de negócios complexa que afeta múltiplos componentes**
4. **Você precisa de recursos como persistência de estado, sincronização com servidor, etc.**
5. **A equipe de desenvolvimento é grande e precisa de padrões claros**

Para aplicações pequenas, soluções mais simples podem ser suficientes:

- `ref()` e `reactive()` com Composition API
- `provide`/`inject` para compartilhamento limitado
- Pequenas stores personalizadas

### Princípios do Gerenciamento de Estado

Independentemente da solução escolhida, alguns princípios são importantes:

1. **Estado único de verdade**: Cada dado deve ter uma única fonte oficial
2. **Estado somente leitura**: O estado não deve ser modificado diretamente
3. **Mutações síncronas**: Mudanças de estado devem ser síncronas e previsíveis
4. **Efeitos colaterais isolados**: Operações assíncronas devem ser separadas das mutações
5. **Modularidade**: Divida o estado em módulos gerenciáveis

### Melhores Práticas para Gerenciamento de Estado

1. **Mantenha o estado mínimo necessário**: Não armazene dados deriváveis
2. **Normalize dados complexos**: Evite estruturas aninhadas profundas
3. **Considere a granularidade**: Nem tudo precisa estar no estado global
4. **Documente a estrutura do estado**: Facilita a compreensão por toda a equipe
5. **Use ferramentas de depuração**: Vue Devtools é essencial

## Aula 6.2: Configuração e uso básico do Vuex

### Instalação e Configuração do Vuex

#### Instalação

```bash
# npm
npm install vuex@next --save

# yarn
yarn add vuex@next

# pnpm
pnpm add vuex@next
```

#### Configuração Básica

```javascript
// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      count: 0,
      todos: [],
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
    async fetchTodos({ commit }) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = await response.json();
      commit("setTodos", todos);
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  },
});
```

#### Integração com a Aplicação Vue

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
app.use(store);
app.mount("#app");
```

### Conceitos Fundamentais do Vuex

#### 1. State

O state é o objeto que contém os dados da aplicação:

```javascript
const store = createStore({
  state() {
    return {
      count: 0,
      user: null,
      products: [],
    };
  },
});
```

Acessando o state:

```javascript
// Options API
this.$store.state.count;

// Composition API
import { useStore } from "vuex";
const store = useStore();
const count = computed(() => store.state.count);
```

#### 2. Getters

Getters são como propriedades computadas para o store:

```javascript
const store = createStore({
  state() {
    return {
      todos: [
        { id: 1, text: "Estudar Vue", done: true },
        { id: 2, text: "Estudar Vuex", done: false },
      ],
    };
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done);
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    },
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id);
    },
  },
});
```

Acessando getters:

```javascript
// Options API
this.$store.getters.doneTodos;
this.$store.getters.getTodoById(2);

// Composition API
import { useStore } from "vuex";
const store = useStore();
const doneTodos = computed(() => store.getters.doneTodos);
const todo2 = computed(() => store.getters.getTodoById(2));
```

#### 3. Mutations

Mutations são funções que modificam o state:

```javascript
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    incrementBy(state, payload) {
      state.count += payload.amount;
    },
  },
});
```

Chamando mutations:

```javascript
// Options API
this.$store.commit("increment");
this.$store.commit("incrementBy", { amount: 10 });
// Ou com objeto
this.$store.commit({
  type: "incrementBy",
  amount: 10,
});

// Composition API
import { useStore } from "vuex";
const store = useStore();
function increment() {
  store.commit("increment");
}
function incrementBy(amount) {
  store.commit("incrementBy", { amount });
}
```

**Regras para Mutations:**

- Devem ser síncronas
- São a única forma de modificar o state
- Devem ser funções puras (sem efeitos colaterais)
- Nomeie usando constantes para evitar erros de digitação

#### 4. Actions

Actions são funções que podem conter lógica assíncrona e que chamam mutations:

```javascript
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
    async fetchData({ commit }) {
      try {
        const data = await api.getData();
        commit("setData", data);
      } catch (error) {
        commit("setError", error);
      }
    },
  },
});
```

Chamando actions:

```javascript
// Options API
this.$store.dispatch("increment");
this.$store.dispatch("incrementAsync");
// Com payload
this.$store.dispatch("fetchUser", { id: 1 });
// Ou com objeto
this.$store.dispatch({
  type: "fetchUser",
  id: 1,
});

// Composition API
import { useStore } from "vuex";
const store = useStore();
function fetchData() {
  store.dispatch("fetchData");
}
```

**Vantagens das Actions:**

- Podem ser assíncronas
- Podem chamar múltiplas mutations
- Podem chamar outras actions
- Podem conter lógica de negócios complexa

#### 5. Modules

Modules permitem dividir o store em partes menores:

```javascript
// src/store/modules/counter.js
export default {
  namespaced: true,
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
}

// src/store/modules/todos.js
export default {
  namespaced: true,
  state() {
    return {
      list: []
    }
  },
  mutations: {
    add(state, todo) {
      state.list.push(todo)
    }
  },
  actions: {
    async fetch({ commit }) {
      const todos = await api.getTodos()
      commit('setAll', todos)
    }
  },
  getters: {
    completed(state) {
      return state.list.filter(todo => todo.completed)
    }
  }
}

// src/store/index.js
import { createStore } from 'vuex'
import counter from './modules/counter'
import todos from './modules/todos'

export default createStore({
  modules: {
    counter,
    todos
  }
})
```

Acessando módulos:

```javascript
// Options API
this.$store.state.counter.count;
this.$store.getters["counter/doubleCount"];
this.$store.commit("counter/increment");
this.$store.dispatch("counter/incrementAsync");

// Composition API
import { useStore } from "vuex";
const store = useStore();
const count = computed(() => store.state.counter.count);
const doubleCount = computed(() => store.getters["counter/doubleCount"]);
function increment() {
  store.commit("counter/increment");
}
function incrementAsync() {
  store.dispatch("counter/incrementAsync");
}
```

### Helpers do Vuex

O Vuex fornece helpers para mapear state, getters, mutations e actions para componentes:

#### Options API

```javascript
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    // Mapear state
    ...mapState(["count", "todos"]),
    // Mapear com nomes diferentes
    ...mapState({
      counter: "count",
      todoList: "todos",
    }),
    // Mapear de módulos
    ...mapState("counter", ["count"]),

    // Mapear getters
    ...mapGetters(["doneTodos", "doneTodosCount"]),
    // Mapear de módulos
    ...mapGetters("todos", ["completed"]),
  },
  methods: {
    // Mapear mutations
    ...mapMutations(["increment", "addTodo"]),
    // Mapear com nomes diferentes
    ...mapMutations({
      add: "increment",
    }),
    // Mapear de módulos
    ...mapMutations("counter", ["increment"]),

    // Mapear actions
    ...mapActions(["incrementAsync", "fetchTodos"]),
    // Mapear de módulos
    ...mapActions("todos", ["fetch"]),
  },
};
```

#### Composition API

Para a Composition API, o Vuex 4 fornece o hook `useStore`:

```javascript
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    // State
    const count = computed(() => store.state.count);
    const todos = computed(() => store.state.todos);

    // Getters
    const doneTodos = computed(() => store.getters.doneTodos);

    // Mutations
    function increment() {
      store.commit("increment");
    }

    // Actions
    function fetchTodos() {
      store.dispatch("fetchTodos");
    }

    // Com módulos
    const moduleCount = computed(() => store.state.counter.count);
    const doubleCount = computed(() => store.getters["counter/doubleCount"]);

    function moduleIncrement() {
      store.commit("counter/increment");
    }

    return {
      count,
      todos,
      doneTodos,
      increment,
      fetchTodos,
      moduleCount,
      doubleCount,
      moduleIncrement,
    };
  },
};
```

### Plugins do Vuex

O Vuex suporta plugins para estender sua funcionalidade:

```javascript
const myPlugin = (store) => {
  // Chamado quando o store é inicializado
  store.subscribe((mutation, state) => {
    // Chamado após cada mutation
    console.log(mutation.type);
    console.log(mutation.payload);
  });
};

const store = createStore({
  // ...
  plugins: [myPlugin],
});
```

Plugins comuns:

- **vuex-persistedstate**: Persiste o estado no localStorage
- **vuex-router-sync**: Sincroniza o router com o Vuex
- **vuex-undo-redo**: Adiciona funcionalidade de desfazer/refazer

### Melhores Práticas para Vuex

1. **Estrutura de Arquivos**:

   ```
   store/
   ├── index.js          # Exporta a instância do store
   ├── actions.js        # Ações raiz
   ├── mutations.js      # Mutações raiz
   ├── getters.js        # Getters raiz
   └── modules/
       ├── cart.js       # Módulo de carrinho
       └── products.js   # Módulo de produtos
   ```

2. **Use Constantes para Tipos de Mutation**:

   ```javascript
   // mutation-types.js
   export const INCREMENT = "INCREMENT";
   export const ADD_TODO = "ADD_TODO";

   // store.js
   import * as types from "./mutation-types";

   const store = createStore({
     mutations: {
       [types.INCREMENT](state) {
         state.count++;
       },
     },
   });
   ```

3. **Mantenha Mutations Simples**:

   - Cada mutation deve fazer uma única coisa
   - Evite lógica complexa em mutations

4. **Use Actions para Lógica de Negócios**:

   - Coloque lógica assíncrona e complexa em actions
   - Actions podem compor outras actions

5. **Normalize o Estado**:

   - Evite estruturas aninhadas profundas
   - Use um formato semelhante a um banco de dados

6. **Evite Mutação Direta do Estado**:
   - Sempre use mutations para modificar o estado
   - Em modo de desenvolvimento, use `strict: true` para detectar mutações diretas

## Aula 6.3: Configuração e uso básico do Pinia

### Instalação e Configuração do Pinia

#### Instalação

```bash
# npm
npm install pinia

# yarn
yarn add pinia

# pnpm
pnpm add pinia
```

#### Configuração Básica

```javascript
// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
```

### Criando Stores com Pinia

Pinia usa um conceito de stores independentes, em vez de um único store com módulos:

```javascript
// src/stores/counter.js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  // State
  state: () => ({
    count: 0,
    name: "Counter",
  }),

  // Getters
  getters: {
    doubleCount: (state) => state.count * 2,
    // Com acesso a outros getters
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },

  // Actions
  actions: {
    increment() {
      this.count++;
    },
    async fetchAndIncrement() {
      // Ações podem ser assíncronas
      await someApi();
      this.count++;
    },
  },
});
```

#### Usando a Composition API

Pinia também suporta uma sintaxe de Composition API:

```javascript
// src/stores/counter.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // State
  const count = ref(0);
  const name = ref("Counter");

  // Getters
  const doubleCount = computed(() => count.value * 2);

  // Actions
  function increment() {
    count.value++;
  }

  async function fetchAndIncrement() {
    await someApi();
    count.value++;
  }

  return {
    count,
    name,
    doubleCount,
    increment,
    fetchAndIncrement,
  };
});
```

### Usando Stores em Componentes

#### Composition API

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">Increment</button>
    <button @click="increment">Increment (método local)</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();

// Método local que usa a store
function increment() {
  counter.increment();
}
</script>
```

#### Options API

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">Increment</button>
    <button @click="increment">Increment (método local)</button>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from "pinia";
import { useCounterStore } from "@/stores/counter";

export default {
  computed: {
    // Opção 1: Acessar a store inteira
    ...mapStores(useCounterStore),

    // Opção 2: Mapear state e getters específicos
    ...mapState(useCounterStore, ["count", "doubleCount"]),
    ...mapState(useCounterStore, {
      myCount: "count",
      myDouble: "doubleCount",
    }),
  },
  methods: {
    // Mapear actions
    ...mapActions(useCounterStore, ["increment"]),

    // Ou definir métodos locais
    incrementLocal() {
      const counter = useCounterStore();
      counter.increment();
    },
  },
};
</script>
```

### Desestruturação com Pinia

Ao contrário do Vuex, o Pinia permite desestruturar a store, mas você precisa usar `storeToRefs` para manter a reatividade:

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();

// ❌ count e doubleCount perderão a reatividade
// const { count, doubleCount } = counter

// ✅ Isso preserva a reatividade
const { count, doubleCount } = storeToRefs(counter);

// As actions podem ser desestruturadas diretamente
const { increment } = counter;
</script>
```

### Modificando o Estado

No Pinia, você pode modificar o estado de três maneiras:

#### 1. Chamando uma Action

```javascript
const counter = useCounterStore();
counter.increment();
```

#### 2. Mutando Diretamente (Diferente do Vuex)

```javascript
const counter = useCounterStore();
counter.count++;
```

#### 3. Usando $patch

```javascript
// Método 1: Objeto de mudanças
counter.$patch({
  count: counter.count + 1,
  name: "Novo nome",
});

// Método 2: Função (melhor para mudanças complexas)
counter.$patch((state) => {
  state.count++;
  state.name = "Novo nome";
});
```

### Redefinindo o Estado

Pinia fornece um método `$reset` para redefinir o estado para seus valores iniciais:

```javascript
const counter = useCounterStore();
counter.$reset();
```

### Comunicação entre Stores

As stores do Pinia podem importar e usar outras stores:

```javascript
// src/stores/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "John",
    isAdmin: true,
  }),
});

// src/stores/cart.js
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    canCheckout() {
      const userStore = useUserStore();
      return this.items.length > 0 && userStore.name !== "";
    },
  },
  actions: {
    checkout() {
      const userStore = useUserStore();
      if (userStore.isAdmin) {
        // Lógica especial para administradores
      }
      // Lógica de checkout
    },
  },
});
```

### Plugins do Pinia

O Pinia suporta plugins para estender sua funcionalidade:

```javascript
import { createPinia } from "pinia";

const pinia = createPinia();

// Plugin para adicionar uma propriedade a todas as stores
pinia.use(({ store }) => {
  store.hello = "world";

  // Adicionar um método
  store.reset = function () {
    store.$reset();
  };

  // Reagir a mudanças
  store.$subscribe((mutation, state) => {
    console.log(mutation.type, mutation.storeId, mutation.payload);
  });
});

// Plugin para persistência
pinia.use(({ store }) => {
  const savedState = localStorage.getItem(`${store.$id}`);
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
});
```

### Comparação entre Pinia e Vuex

#### Vantagens do Pinia

1. **API mais simples**: Sem mutations separadas, apenas state, getters e actions
2. **Melhor suporte a TypeScript**: Tipagem completa sem configuração adicional
3. **Melhor suporte à Composition API**: Sintaxe mais limpa e integração natural
4. **Melhor desempenho**: Mais leve e otimizado
5. **Devtools**: Suporte completo às Vue Devtools
6. **Modularidade**: Stores independentes em vez de módulos aninhados
7. **Testabilidade**: Mais fácil de testar

#### Quando Migrar de Vuex para Pinia

Considere migrar para Pinia se:

- Você está começando um novo projeto Vue 3
- Você precisa de melhor suporte a TypeScript
- Você quer uma API mais simples
- Você quer usar a Composition API

Para projetos existentes com Vuex, a migração pode ser gradual:

1. Instale Pinia junto com Vuex
2. Crie novas funcionalidades com Pinia
3. Migre gradualmente as funcionalidades existentes

### Melhores Práticas para Pinia

1. **Nomeie suas stores de forma consistente**:

   - Use o prefixo `use` (ex: `useUserStore`)
   - Use nomes que descrevam o domínio (ex: `useCartStore`, `useProductStore`)

2. **Organize suas stores por domínio**:

   ```
   stores/
   ├── user.js
   ├── cart.js
   ├── product.js
   └── index.js  # Re-exporta todas as stores
   ```

3. **Mantenha as stores focadas**:

   - Cada store deve gerenciar um domínio específico
   - Evite stores muito grandes

4. **Use getters para dados derivados**:

   - Não armazene dados que podem ser calculados
   - Use getters para filtrar, ordenar e transformar dados

5. **Use actions para lógica de negócios**:

   - Coloque lógica assíncrona e complexa em actions
   - Use actions para coordenar mudanças em múltiplas stores

6. **Considere a persistência**:
   - Use plugins para persistir dados importantes
   - Considere bibliotecas como `pinia-plugin-persistedstate`

## Aula 6.4: Gerenciamento de estado avançado

### Padrões Avançados de Gerenciamento de Estado

#### 1. Normalização de Estado

A normalização é uma técnica para estruturar dados complexos de forma mais eficiente:

```javascript
// ❌ Estado aninhado (difícil de atualizar)
const state = {
  posts: [
    {
      id: 1,
      title: "Post 1",
      author: { id: 1, name: "Alice" },
      comments: [
        { id: 1, text: "Great post!", author: { id: 2, name: "Bob" } },
      ],
    },
  ],
};

// ✅ Estado normalizado (mais fácil de atualizar)
const state = {
  posts: {
    byId: {
      1: { id: 1, title: "Post 1", authorId: 1, commentIds: [1] },
    },
    allIds: [1],
  },
  users: {
    byId: {
      1: { id: 1, name: "Alice" },
      2: { id: 2, name: "Bob" },
    },
    allIds: [1, 2],
  },
  comments: {
    byId: {
      1: { id: 1, text: "Great post!", authorId: 2, postId: 1 },
    },
    allIds: [1],
  },
};
```

Vantagens da normalização:

- Evita duplicação de dados
- Facilita atualizações
- Melhora o desempenho para grandes conjuntos de dados
- Simplifica a sincronização com APIs

#### 2. Composição de Stores

Em aplicações complexas, você pode compor stores para reutilizar lógica:

```javascript
// useAuth.js - Lógica de autenticação reutilizável
import { defineStore } from "pinia";

export function useAuth(storeName) {
  return defineStore(storeName, {
    state: () => ({
      user: null,
      token: null,
    }),
    getters: {
      isAuthenticated: (state) => !!state.token,
    },
    actions: {
      login(credentials) {
        // Lógica de login
      },
      logout() {
        // Lógica de logout
      },
    },
  });
}

// useUserStore.js - Store específica que usa a lógica de autenticação
import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

const authStore = useAuth("userAuth");

export const useUserStore = defineStore("user", {
  state: () => ({
    preferences: {},
    ...authStore().state,
  }),
  getters: {
    ...authStore().getters,
    // Getters específicos
  },
  actions: {
    ...authStore().actions,
    // Actions específicas
  },
});
```

#### 3. Gerenciamento de Estado Local vs Global

Nem todo estado precisa ser global. Considere estas opções:

1. **Estado de componente**: Use `ref`/`reactive` para estado que pertence apenas a um componente
2. **Estado compartilhado limitado**: Use `provide`/`inject` para compartilhar estado entre um componente pai e seus descendentes
3. **Estado global**: Use Pinia/Vuex para estado que precisa ser acessado em toda a aplicação

```javascript
// Composable para estado local compartilhado
import { ref, provide, inject } from "vue";

const CounterSymbol = Symbol();

export function useCounterProvider() {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  provide(CounterSymbol, {
    count,
    increment,
  });
}

export function useCounter() {
  const counter = inject(CounterSymbol);
  if (!counter) {
    throw new Error("useCounter() must be used within a provider");
  }
  return counter;
}
```

#### 4. Gerenciamento de Estado Assíncrono

Para lidar com dados assíncronos, considere estes padrões:

```javascript
// Store com gerenciamento de estado de carregamento e erro
import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        this.posts = await response.json();
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching posts:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
```

#### 5. Otimização de Desempenho

Para melhorar o desempenho em aplicações com estado complexo:

1. **Lazy Loading de Stores**:

   ```javascript
   // Carregue stores apenas quando necessário
   const ProductPage = {
     setup() {
       // A store só é carregada quando o componente é montado
       const productStore = useProductStore();
       // ...
     },
   };
   ```

2. **Shallowing de Estado**:

   ```javascript
   import { defineStore } from "pinia";
   import { shallowRef } from "vue";

   export const useHeavyDataStore = defineStore("heavyData", {
     state: () => ({
       // Use shallowRef para grandes objetos que não precisam de reatividade profunda
       heavyData: shallowRef([]),
     }),
   });
   ```

3. **Memoização de Getters Caros**:

   ```javascript
   import { defineStore } from "pinia";
   import { computed } from "vue";
   import memoize from "lodash/memoize";

   export const useProductsStore = defineStore("products", {
     state: () => ({
       products: [],
     }),
     getters: {
       // Memoize getters caros
       getProductsByCategory: (state) => {
         return memoize((category) => {
           return state.products.filter((p) => p.category === category);
         });
       },
     },
   });
   ```

### Integração com APIs e Serviços Externos

#### 1. Padrão de Repositório

Separe a lógica de acesso a dados da lógica de estado:

```javascript
// api/posts.js - Repositório
export const postsApi = {
  async getAll() {
    const response = await fetch("/api/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch post ${id}`);
    return response.json();
  },

  async create(post) {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error("Failed to create post");
    return response.json();
  },
};

// stores/posts.js - Store
import { defineStore } from "pinia";
import { postsApi } from "@/api/posts";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        this.posts = await postsApi.getAll();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createPost(post) {
      this.loading = true;
      this.error = null;

      try {
        const newPost = await postsApi.create(post);
        this.posts.push(newPost);
        return newPost;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
```

#### 2. Sincronização em Tempo Real

Integre seu estado com WebSockets ou outras fontes de dados em tempo real:

```javascript
// stores/chat.js
import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [],
    connected: false,
    socket: null,
  }),
  actions: {
    connect() {
      this.socket = io("https://chat-server.example.com");

      this.socket.on("connect", () => {
        this.connected = true;
      });

      this.socket.on("disconnect", () => {
        this.connected = false;
      });

      this.socket.on("message", (message) => {
        this.messages.push(message);
      });
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    },

    sendMessage(text) {
      if (!this.connected) return;

      const message = {
        id: Date.now(),
        text,
        sent: true,
        pending: true,
      };

      this.messages.push(message);

      this.socket.emit("message", { text }, (ack) => {
        // Atualiza o status da mensagem quando receber confirmação
        const index = this.messages.findIndex((m) => m.id === message.id);
        if (index >= 0) {
          this.messages[index].pending = false;
          this.messages[index].id = ack.id;
        }
      });
    },
  },
});
```

#### 3. Persistência de Estado

Salve o estado entre sessões do navegador:

```javascript
// plugins/persistedState.js
import { createPinia } from "pinia";

export function createPersistedPinia(options = {}) {
  const pinia = createPinia();

  pinia.use(({ store }) => {
    const { persist = false, storageKey = store.$id } =
      typeof options === "function" ? options(store.$id) : options;

    if (!persist) return;

    // Restaura o estado do localStorage
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      store.$patch(JSON.parse(savedState));
    }

    // Salva o estado no localStorage quando mudar
    store.$subscribe((_, state) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
    });
  });

  return pinia;
}

// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPersistedPinia } from "./plugins/persistedState";

const pinia = createPersistedPinia({
  // Configuração global
  persist: true,
});

// Ou com configuração por store
const pinia = createPersistedPinia((storeId) => {
  return {
    persist: ["user", "cart"].includes(storeId),
    storageKey: `app-${storeId}`,
  };
});

const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

Ou use uma biblioteca existente como `pinia-plugin-persistedstate`:

```javascript
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Na definição da store
export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    token: null,
  }),
  persist: {
    key: "user-storage",
    storage: localStorage,
    paths: ["token"], // Persiste apenas o token
  },
});
```

### Testando Stores

#### 1. Testando Stores do Pinia

```javascript
// stores/counter.js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    async incrementAsync() {
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.increment();
    },
  },
});

// tests/counter.spec.js
import { setActivePinia, createPinia } from "pinia";
import { useCounterStore } from "@/stores/counter";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Counter Store", () => {
  beforeEach(() => {
    // Cria uma nova instância do Pinia para cada teste
    setActivePinia(createPinia());
  });

  it("increments the count", () => {
    const counter = useCounterStore();
    expect(counter.count).toBe(0);

    counter.increment();
    expect(counter.count).toBe(1);
  });

  it("doubles the count", () => {
    const counter = useCounterStore();
    counter.count = 2;
    expect(counter.doubleCount).toBe(4);
  });

  it("increments asynchronously", async () => {
    const counter = useCounterStore();
    expect(counter.count).toBe(0);

    await counter.incrementAsync();
    expect(counter.count).toBe(1);
  });
});
```

#### 2. Mockando Dependências Externas

```javascript
// stores/user.js
import { defineStore } from "pinia";
import { authApi } from "@/api/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const user = await authApi.login(credentials);
        this.user = user;
        return user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});

// tests/user.spec.js
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "@/stores/user";
import { authApi } from "@/api/auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock da API de autenticação
vi.mock("@/api/auth", () => ({
  authApi: {
    login: vi.fn(),
  },
}));

describe("User Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  it("authenticates a user", async () => {
    const store = useUserStore();
    const mockUser = { id: 1, name: "Test User" };

    // Configura o mock para retornar um usuário
    authApi.login.mockResolvedValue(mockUser);

    await store.login({ email: "test@example.com", password: "password" });

    expect(authApi.login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it("handles login failure", async () => {
    const store = useUserStore();
    const error = new Error("Invalid credentials");

    // Configura o mock para lançar um erro
    authApi.login.mockRejectedValue(error);

    await expect(
      store.login({
        email: "test@example.com",
        password: "wrong",
      })
    ).rejects.toThrow("Invalid credentials");

    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(store.loading).toBe(false);
    expect(store.error).toBe("Invalid credentials");
  });
});
```

### Padrões Avançados de Organização

#### 1. Módulos de Domínio

Organize seu código por domínios de negócios:

```
src/
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── api/
│   │   └── index.js
│   ├── products/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── api/
│   │   └── index.js
│   └── cart/
│       ├── components/
│       ├── stores/
│       ├── api/
│       └── index.js
└── core/
    ├── components/
    ├── stores/
    └── api/
```

#### 2. Composables para Lógica de Negócios

Extraia lógica complexa para composables reutilizáveis:

```javascript
// composables/useCart.js
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";

export function useCart() {
  const cartStore = useCartStore();
  const productStore = useProductStore();
  const userStore = useUserStore();

  const cartItems = computed(() => {
    return cartStore.items.map((item) => {
      const product = productStore.getProductById(item.productId);
      return {
        ...item,
        product,
        total: item.quantity * product.price,
      };
    });
  });

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.total, 0);
  });

  const canCheckout = computed(() => {
    return cartItems.value.length > 0 && userStore.isAuthenticated;
  });

  async function checkout() {
    if (!canCheckout.value) {
      throw new Error("Cannot checkout");
    }

    return await cartStore.checkout();
  }

  return {
    cartItems,
    cartTotal,
    canCheckout,
    addToCart: cartStore.addItem,
    removeFromCart: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    checkout,
  };
}
```

#### 3. Gerenciamento de Estado para SSR

Para aplicações com Server-Side Rendering (SSR), considere:

```javascript
// store/index.js
import { createPinia } from "pinia";

// Cria uma função de fábrica para criar uma nova instância do Pinia para cada requisição
export function createAppPinia() {
  const pinia = createPinia();

  // Adicione plugins específicos para SSR se necessário

  return pinia;
}

// entry-server.js
import { createSSRApp } from "vue";
import { createAppPinia } from "./store";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createAppPinia();
  app.use(pinia);

  return { app, pinia };
}

// No servidor
import { renderToString } from "vue/server-renderer";
import { createApp } from "./entry-server";

app.get("*", async (req, res) => {
  const { app, pinia } = createApp();

  // Pré-carregue dados necessários
  // ...

  const html = await renderToString(app);

  // Serialize o estado do Pinia
  const state = JSON.stringify(pinia.state.value);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <!-- ... -->
        <script>window.__INITIAL_STATE__ = ${state}</script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/assets/entry-client.js"></script>
      </body>
    </html>
  `);
});

// entry-client.js
import { createApp } from "vue";
import { createAppPinia } from "./store";
import App from "./App.vue";

const app = createApp(App);
const pinia = createAppPinia();

// Hidrata o estado do Pinia com o estado inicial do servidor
if (window.__INITIAL_STATE__) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
}

app.use(pinia);
app.mount("#app");
```

### Melhores Práticas para Gerenciamento de Estado Avançado

1. **Mantenha a coesão**: Agrupe estado relacionado na mesma store
2. **Evite acoplamento**: Minimize dependências entre stores
3. **Normalize dados complexos**: Use estruturas planas para facilitar atualizações
4. **Considere o desempenho**: Use técnicas como lazy loading e shallowing
5. **Teste suas stores**: Escreva testes unitários para lógica de estado
6. **Documente a estrutura do estado**: Facilita a compreensão por toda a equipe
7. **Use ferramentas de depuração**: Vue Devtools é essencial
8. **Considere a persistência**: Decida o que deve ser persistido e onde
9. **Separe preocupações**: Use o padrão de repositório para acesso a dados
10. **Evite mutações diretas**: Use actions para modificar o estado

## Exercício Prático: Desenvolvimento de uma aplicação de e-commerce com gerenciamento de estado

### Objetivo

Criar uma aplicação de e-commerce simples que demonstre o uso de gerenciamento de estado com Pinia, incluindo múltiplas stores, comunicação entre stores e integração com APIs.

### Requisitos

1. Implementar stores para produtos, carrinho e usuário
2. Carregar produtos de uma API
3. Adicionar/remover produtos do carrinho
4. Calcular totais e aplicar descontos
5. Implementar persistência do carrinho

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest ecommerce-pinia -- --template vue
cd ecommerce-pinia
npm install
npm install pinia
npm install pinia-plugin-persistedstate
```

### Passo 2: Configurar o Pinia

```javascript
// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "./style.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

### Passo 3: Criar as Stores

```javascript
// src/stores/product.js
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        // Usando a API JSONPlaceholder como exemplo
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        this.products = await response.json();
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});

// src/stores/cart.js
import { defineStore } from "pinia";
import { useProductStore } from "./product";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    cartItems: (state) => {
      const productStore = useProductStore();

      return state.items.map((item) => {
        const product = productStore.getProductById(item.productId);
        return {
          ...item,
          product,
          totalPrice: product ? product.price * item.quantity : 0,
        };
      });
    },
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice: (state) => {
      const productStore = useProductStore();

      return state.items.reduce((total, item) => {
        const product = productStore.getProductById(item.productId);
        return total + (product ? product.price * item.quantity : 0);
      }, 0);
    },
  },
  actions: {
    addItem(productId, quantity = 1) {
      const productStore = useProductStore();
      const product = productStore.getProductById(productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return;
      }

      const existingItem = this.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId,
          quantity,
        });
      }
    },
    removeItem(productId) {
      const index = this.items.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    updateItemQuantity(productId, quantity) {
      const item = this.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  persist: {
    key: "ecommerce-cart",
    storage: localStorage,
  },
});

// src/stores/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => state.user?.name || "Guest",
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        // Simulação de login (em um app real, isso seria uma chamada de API)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (
          credentials.email === "user@example.com" &&
          credentials.password === "password"
        ) {
          this.user = {
            id: 1,
            name: "John Doe",
            email: credentials.email,
            isAdmin: false,
          };
          return true;
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
    },
  },
  persist: {
    key: "ecommerce-user",
    storage: localStorage,
  },
});
```

### Passo 4: Criar Componentes

```vue
<!-- src/components/ProductList.vue -->
<template>
  <div class="product-list">
    <h2>Produtos</h2>

    <div v-if="productStore.loading" class="loading">
      Carregando produtos...
    </div>

    <div v-else-if="productStore.error" class="error">
      {{ productStore.error }}
    </div>

    <div v-else-if="productStore.products.length === 0" class="empty">
      Nenhum produto encontrado.
    </div>

    <div v-else class="products-grid">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" :alt="product.title" class="product-image" />
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-price">{{ formatPrice(product.price) }}</p>
        <p class="product-category">{{ product.category }}</p>
        <button @click="addToCart(product.id)" class="add-to-cart-btn">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/product";
import { useCartStore } from "../stores/cart";

const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});

function addToCart(productId) {
  cartStore.addItem(productId);
}

function formatPrice(price) {
  return `R$ ${price.toFixed(2)}`;
}
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
}

.product-title {
  font-size: 1rem;
  margin-bottom: 10px;
  flex-grow: 1;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.product-category {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-transform: capitalize;
}

.add-to-cart-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #3aa876;
}
</style>
```

```vue
<!-- src/components/ShoppingCart.vue -->
<template>
  <div class="shopping-cart">
    <h2>Carrinho de Compras</h2>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      Seu carrinho está vazio.
    </div>

    <div v-else>
      <div class="cart-items">
        <div
          v-for="item in cartStore.cartItems"
          :key="item.productId"
          class="cart-item"
        >
          <div class="item-image">
            <img :src="item.product.image" :alt="item.product.title" />
          </div>

          <div class="item-details">
            <h3>{{ item.product.title }}</h3>
            <p class="item-price">{{ formatPrice(item.product.price) }}</p>
          </div>

          <div class="item-quantity">
            <button
              @click="decrementQuantity(item.productId, item.quantity)"
              class="quantity-btn"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              @click="incrementQuantity(item.productId)"
              class="quantity-btn"
            >
              +
            </button>
          </div>

          <div class="item-total">
            {{ formatPrice(item.totalPrice) }}
          </div>

          <button @click="removeFromCart(item.productId)" class="remove-btn">
            ×
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{ formatPrice(cartStore.totalPrice) }}</span>
        </div>

        <div class="summary-row">
          <span>Frete:</span>
          <span>{{ formatPrice(shipping) }}</span>
        </div>

        <div class="summary-row total">
          <span>Total:</span>
          <span>{{ formatPrice(cartStore.totalPrice + shipping) }}</span>
        </div>

        <button
          @click="checkout"
          class="checkout-btn"
          :disabled="!userStore.isAuthenticated"
        >
          {{
            userStore.isAuthenticated
              ? "Finalizar Compra"
              : "Faça login para finalizar"
          }}
        </button>

        <button @click="cartStore.clearCart()" class="clear-btn">
          Limpar Carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useUserStore } from "../stores/user";

const cartStore = useCartStore();
const userStore = useUserStore();

const shipping = computed(() => {
  return cartStore.totalPrice > 100 ? 0 : 10;
});

function incrementQuantity(productId) {
  const item = cartStore.items.find((item) => item.productId === productId);
  if (item) {
    cartStore.updateItemQuantity(productId, item.quantity + 1);
  }
}

function decrementQuantity(productId, currentQuantity) {
  if (currentQuantity > 1) {
    cartStore.updateItemQuantity(productId, currentQuantity - 1);
  } else {
    removeFromCart(productId);
  }
}

function removeFromCart(productId) {
  cartStore.removeItem(productId);
}

function checkout() {
  if (!userStore.isAuthenticated) {
    alert("Por favor, faça login para finalizar a compra.");
    return;
  }

  alert(
    `Compra finalizada! Total: ${formatPrice(
      cartStore.totalPrice + shipping.value
    )}`
  );
  cartStore.clearCart();
}

function formatPrice(price) {
  return `R$ ${price.toFixed(2)}`;
}
</script>

<style scoped>
.shopping-cart {
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 30px;
  font-size: 1.2rem;
  color: #7f8c8d;
}

.cart-items {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.item-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1rem;
  margin: 0 0 5px 0;
}

.item-price {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin: 0 20px;
}

.quantity-btn {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.item-quantity span {
  margin: 0 10px;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
}

.cart-summary {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #3aa876;
}

.checkout-btn:disabled {
  background-color: #a0d5be;
  cursor: not-allowed;
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 10px;
}

.clear-btn:hover {
  background-color: #ffebee;
}
</style>
```

```vue
<!-- src/components/UserLogin.vue -->
<template>
  <div class="login-container">
    <h2>{{ userStore.isAuthenticated ? "Minha Conta" : "Login" }}</h2>

    <div v-if="userStore.isAuthenticated" class="user-profile">
      <p>Bem-vindo, {{ userStore.username }}!</p>
      <button @click="logout" class="logout-btn">Sair</button>
    </div>

    <form v-else @submit.prevent="login" class="login-form">
      <div v-if="userStore.error" class="error-message">
        {{ userStore.error }}
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="user@example.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="password"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="login-btn" :disabled="userStore.loading">
          {{ userStore.loading ? "Entrando..." : "Entrar" }}
        </button>
      </div>

      <div class="login-help">
        <p>Use as seguintes credenciais para teste:</p>
        <p><strong>Email:</strong> user@example.com</p>
        <p><strong>Senha:</strong> password</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const email = ref("");
const password = ref("");

async function login() {
  await userStore.login({
    email: email.value,
    password: password.value,
  });

  if (userStore.isAuthenticated) {
    email.value = "";
    password.value = "";
  }
}

function logout() {
  userStore.logout();
}
</script>

<style scoped>
.login-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.user-profile {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.login-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  margin-top: 20px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-btn:disabled {
  background-color: #a0d5be;
  cursor: not-allowed;
}

.login-help {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
```

### Passo 5: Criar o Componente App

```vue
<!-- src/App.vue -->
<template>
  <div class="app">
    <header class="header">
      <div class="logo">
        <h1>Vue Shop</h1>
      </div>

      <div class="user-section">
        <div class="cart-icon" @click="toggleCart">
          <span class="material-icons">shopping_cart</span>
          <span v-if="cartStore.totalItems > 0" class="cart-badge">
            {{ cartStore.totalItems }}
          </span>
        </div>

        <div class="user-icon" @click="toggleLogin">
          <span class="material-icons">
            {{ userStore.isAuthenticated ? "account_circle" : "login" }}
          </span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="sidebar" :class="{ active: showLogin }">
        <button class="close-btn" @click="showLogin = false">×</button>
        <UserLogin />
      </div>

      <div class="content">
        <ProductList />
      </div>

      <div class="sidebar cart-sidebar" :class="{ active: showCart }">
        <button class="close-btn" @click="showCart = false">×</button>
        <ShoppingCart />
      </div>
    </main>

    <footer class="footer">
      <p>
        &copy; {{ new Date().getFullYear() }} Vue Shop. Todos os direitos
        reservados.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "./stores/cart";
import { useUserStore } from "./stores/user";
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import UserLogin from "./components/UserLogin.vue";

const cartStore = useCartStore();
const userStore = useUserStore();

const showCart = ref(false);
const showLogin = ref(false);

function toggleCart() {
  showCart.value = !showCart.value;
  if (showCart.value) {
    showLogin.value = false;
  }
}

function toggleLogin() {
  showLogin.value = !showLogin.value;
  if (showLogin.value) {
    showCart.value = false;
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

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
  background-color: #f8f9fa;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #42b983;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.user-section {
  display: flex;
  align-items: center;
}

.cart-icon,
.user-icon {
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}

.material-icons {
  font-size: 24px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.main-content {
  flex: 1;
  position: relative;
  overflow-x: hidden;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -400px;
  width: 350px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  transition: left 0.3s ease;
  padding-top: 50px;
}

.sidebar.active {
  left: 0;
}

.cart-sidebar {
  left: auto;
  right: -400px;
  transition: right 0.3s ease;
}

.cart-sidebar.active {
  right: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #2c3e50;
}

.content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    left: -100%;
  }

  .cart-sidebar {
    right: -100%;
  }
}
</style>
```

### Passo 6: Adicionar Estilos Globais

```css
/* src/style.css */
:root {
  --primary-color: #42b983;
  --secondary-color: #2c3e50;
  --danger-color: #e74c3c;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --border-color: #ddd;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--secondary-color);
  background-color: var(--light-color);
  line-height: 1.6;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
```

### Passo 7: Executar e Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para testar a aplicação de e-commerce.

# Exercícios Práticos - Módulo 6: Gerenciamento de Estado

## Exercício 1: Vuex Básico

- Crie uma store Vuex
- Implemente estado de autenticação
- Adicione mutations para login/logout
- Desenvolva actions assíncronas

## Exercício 2: Módulos Vuex

- Desenvolva um sistema de gerenciamento de produtos
- Crie módulos separados para:
  - Catálogo de produtos
  - Carrinho de compras
  - Autenticação
- Implemente comunicação entre módulos

## Desafio Final

- Criar aplicação de gerenciamento de tarefas
- Use Vuex para estado global
- Implemente CRUD completo
- Adicione persistência com localStorage

### Perguntas para Fixação

1. **Qual é a principal diferença entre Vuex e Pinia?**

   - a) Vuex é mais recente que Pinia
   - b) Pinia não tem suporte para TypeScript
   - c) Pinia não usa mutations separadas, apenas state, getters e actions
   - d) Vuex é mais leve e tem melhor desempenho

2. **Como você pode acessar uma store do Pinia em um componente Vue?**

   - a) Usando o método `this.$store.getStore('nome')`
   - b) Importando e chamando a função `useNomeStore()`
   - c) Usando o hook `usePinia('nome')`
   - d) Através da propriedade global `Vue.store`

3. **Qual é a maneira correta de modificar o estado em uma store do Pinia?**

   - a) Apenas através de mutations
   - b) Diretamente, através de actions ou usando $patch
   - c) Apenas através de getters
   - d) Usando o método setState()

4. **Como você pode preservar a reatividade ao desestruturar uma store do Pinia?**

   - a) Usando o método `reactive()`
   - b) Usando o método `storeToRefs()`
   - c) Usando o método `toRefs()`
   - d) Não é possível desestruturar mantendo a reatividade

5. **Qual é o propósito do plugin `pinia-plugin-persistedstate`?**
   - a) Melhorar o desempenho das stores
   - b) Adicionar suporte a TypeScript
   - c) Persistir o estado entre recarregamentos de página
   - d) Sincronizar o estado com o servidor

**Respostas:**

1. c) Pinia não usa mutations separadas, apenas state, getters e actions
2. b) Importando e chamando a função `useNomeStore()`
3. b) Diretamente, através de actions ou usando $patch
4. b) Usando o método `storeToRefs()`
5. c) Persistir o estado entre recarregamentos de página
