# Módulo 8: Testes e Depuração em Vue.js

## Aula 8.1: Introdução aos testes em Vue.js

### Importância dos Testes em Aplicações Vue

Os testes são uma parte fundamental do desenvolvimento de software moderno, e as aplicações Vue não são exceção. Testar adequadamente suas aplicações Vue traz diversos benefícios:

1. **Confiabilidade**: Testes bem escritos garantem que sua aplicação funcione conforme o esperado.
2. **Prevenção de Regressões**: Evita que novas alterações quebrem funcionalidades existentes.
3. **Documentação Viva**: Testes servem como documentação executável de como seu código deve funcionar.
4. **Refatoração Segura**: Permite refatorar o código com confiança, sabendo que os testes detectarão problemas.
5. **Desenvolvimento Orientado a Testes (TDD)**: Possibilita escrever testes antes da implementação, melhorando o design do código.

### Tipos de Testes para Aplicações Vue

#### 1. Testes Unitários

Testam unidades individuais de código (geralmente funções ou componentes) isoladamente.

**Características**:

- Rápidos de executar
- Focados em uma única unidade
- Geralmente usam mocks para dependências externas
- Úteis para testar lógica de negócios, computed properties, métodos, etc.

**Ferramentas populares**:

- Jest
- Vitest
- Mocha + Chai

#### 2. Testes de Componentes

Testam componentes Vue individualmente, verificando sua renderização, comportamento e interações.

**Características**:

- Testam a integração entre template, script e estilo
- Verificam se eventos são emitidos corretamente
- Testam interações do usuário (cliques, inputs, etc.)
- Verificam se props são usadas corretamente

**Ferramentas populares**:

- Vue Test Utils
- Testing Library

#### 3. Testes de Integração

Testam como múltiplos componentes ou módulos funcionam juntos.

**Características**:

- Verificam a comunicação entre componentes
- Testam fluxos de dados através de múltiplos componentes
- Mais lentos que testes unitários, mas mais realistas

**Ferramentas populares**:

- Vue Test Utils (para testes mais complexos)
- Cypress Component Testing

#### 4. Testes End-to-End (E2E)

Testam a aplicação completa, simulando interações reais do usuário em um navegador.

**Características**:

- Testam a aplicação como um usuário real
- Verificam fluxos completos (login, navegação, ações, etc.)
- Mais lentos e mais complexos de configurar
- Detectam problemas de integração com backend, APIs, etc.

**Ferramentas populares**:

- Cypress
- Playwright
- Selenium

### Pirâmide de Testes

A pirâmide de testes é um conceito que sugere uma distribuição ideal dos diferentes tipos de testes:

```
    /\
   /  \
  /E2E \
 /------\
/        \
/Integração\
/------------\
/   Unitários  \
/----------------\
```

- **Base**: Muitos testes unitários (rápidos e baratos)
- **Meio**: Alguns testes de integração
- **Topo**: Poucos testes E2E (lentos e caros)

Esta distribuição oferece um bom equilíbrio entre velocidade de execução, cobertura e custo de manutenção.

### Configuração do Ambiente de Testes

#### Configuração para Vue CLI

Se você estiver usando Vue CLI, pode adicionar testes ao seu projeto durante a criação:

```bash
vue create my-project
# Selecione a opção "Manually select features"
# Marque "Unit Testing" e/ou "E2E Testing"
```

Ou adicionar posteriormente:

```bash
vue add unit-jest
# ou
vue add e2e-cypress
```

#### Configuração para Vite

Para projetos Vite, você pode instalar Vitest:

```bash
# npm
npm install -D vitest happy-dom @testing-library/vue

# yarn
yarn add -D vitest happy-dom @testing-library/vue

# pnpm
pnpm add -D vitest happy-dom @testing-library/vue
```

Configuração no `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    globals: true,
  },
});
```

Adicione o script no `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Estrutura de Arquivos de Teste

É importante organizar seus testes de forma consistente. Aqui estão algumas abordagens comuns:

#### 1. Testes Próximos aos Arquivos de Implementação

```
src/
  components/
    Button.vue
    Button.spec.js  # Teste para Button.vue
  utils/
    formatter.js
    formatter.spec.js  # Teste para formatter.js
```

#### 2. Diretório de Testes Separado

```
src/
  components/
    Button.vue
  utils/
    formatter.js
tests/
  unit/
    components/
      Button.spec.js
    utils/
      formatter.spec.js
```

#### Convenções de Nomenclatura

- `.spec.js` ou `.test.js` para arquivos de teste
- Nomes descritivos que indicam o que está sendo testado
- Prefixo com `unit/`, `integration/`, ou `e2e/` para distinguir tipos de testes

### Melhores Práticas para Testes em Vue

1. **Teste comportamentos, não implementações**: Foque no que o componente deve fazer, não em como ele faz.
2. **Mantenha testes independentes**: Cada teste deve ser executável isoladamente.
3. **Use dados de teste realistas**: Evite dados muito simplificados que não representam casos reais.
4. **Evite testar a biblioteca Vue**: Não teste funcionalidades que são responsabilidade do Vue.
5. **Teste falhas e casos de borda**: Não teste apenas o caminho feliz.
6. **Mantenha testes rápidos**: Testes lentos desencorajam execuções frequentes.
7. **Use CI/CD**: Execute testes automaticamente em cada commit/push.
8. **Refatore testes**: Mantenha seus testes limpos e legíveis.

## Aula 8.2: Testes unitários com Jest/Vitest

### Introdução ao Jest e Vitest

Jest e Vitest são frameworks de teste populares para JavaScript, com excelente suporte para Vue.js.

**Jest** é mantido pelo Facebook e oferece:

- Execução de testes em paralelo
- Mocking poderoso
- Snapshots
- Cobertura de código integrada
- Configuração zero para muitos projetos

**Vitest** é uma alternativa mais recente, otimizada para Vite:

- API compatível com Jest
- Execução mais rápida
- Integração nativa com Vite
- Hot Module Replacement (HMR) para testes
- Suporte nativo a ESM

### Configuração Básica

#### Jest com Vue CLI

```bash
vue add unit-jest
```

Isso cria:

- Um diretório `tests/unit`
- Configuração no `jest.config.js`
- Script `test:unit` no `package.json`

#### Vitest com Vite

```bash
npm install -D vitest happy-dom @testing-library/vue
```

Configuração no `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
```

### Escrevendo Testes Unitários Básicos

#### Estrutura de um Teste

```javascript
// sum.spec.js
import { sum } from "./sum";

describe("sum function", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds negative numbers correctly", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
```

Elementos principais:

- `describe`: Agrupa testes relacionados
- `test` ou `it`: Define um caso de teste individual
- `expect`: Cria uma asserção
- Matchers (`.toBe`, `.toEqual`, etc.): Verificam valores

#### Testando Funções Utilitárias

```javascript
// src/utils/formatter.js
export function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// src/utils/formatter.spec.js
import { formatCurrency, formatDate } from "./formatter";

describe("Formatter utilities", () => {
  describe("formatCurrency", () => {
    test("formats number as currency with $ symbol", () => {
      expect(formatCurrency(10)).toBe("$10.00");
    });

    test("handles decimal values correctly", () => {
      expect(formatCurrency(10.5)).toBe("$10.50");
    });
  });

  describe("formatDate", () => {
    test("formats date correctly", () => {
      // Cuidado: este teste pode falhar em diferentes locales
      const date = new Date("2023-01-15");
      // Use um regex ou mock para tornar o teste mais robusto
      expect(formatDate(date)).toMatch(/\d{1,2}\/\d{1,2}\/\d{2,4}/);
    });
  });
});
```

### Matchers Comuns

Jest e Vitest fornecem muitos matchers para diferentes tipos de asserções:

#### Igualdade

```javascript
expect(value).toBe(otherValue); // Igualdade estrita (===)
expect(value).toEqual(otherValue); // Igualdade profunda para objetos
expect(value).toStrictEqual(otherValue); // Mais estrito que toEqual
```

#### Números

```javascript
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(4.5);
expect(value).toBeCloseTo(0.3); // Para comparações de ponto flutuante
```

#### Strings

```javascript
expect(value).toMatch(/regex/);
expect(value).toContain("substring");
```

#### Arrays e Iteráveis

```javascript
expect(array).toContain(item);
expect(array).toHaveLength(3);
```

#### Objetos

```javascript
expect(object).toHaveProperty("property");
expect(object).toHaveProperty("nested.property");
expect(object).toMatchObject({ partial: "match" });
```

#### Booleanos, Nulos e Indefinidos

```javascript
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();
```

#### Exceções

```javascript
expect(() => throwingFunction()).toThrow();
expect(() => throwingFunction()).toThrow("specific error message");
expect(() => throwingFunction()).toThrow(/error regex/);
```

### Mocks e Spies

Mocks e spies são essenciais para isolar o código que está sendo testado.

#### Funções Mock

```javascript
test("mocks a function", () => {
  const mockFn = jest.fn();

  mockFn();
  mockFn(1, 2);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn).toHaveBeenCalledWith(1, 2);
});
```

Configurando retornos:

```javascript
const mockFn = jest
  .fn()
  .mockReturnValue("default")
  .mockReturnValueOnce("first call")
  .mockReturnValueOnce("second call");

console.log(mockFn()); // 'first call'
console.log(mockFn()); // 'second call'
console.log(mockFn()); // 'default'
```

Implementações personalizadas:

```javascript
const mockFn = jest.fn((x) => x * 2);
console.log(mockFn(5)); // 10
```

#### Spies

Spies permitem observar chamadas a funções existentes:

```javascript
// Em Jest
jest.spyOn(object, "method");

// Em Vitest
vi.spyOn(object, "method");
```

Exemplo:

```javascript
import { vi } from "vitest"; // ou import jest from 'jest'

const user = {
  getName: () => "John",
  getFullName: function () {
    return `${this.getName()} Doe`;
  },
};

test("spy on getName method", () => {
  const spy = vi.spyOn(user, "getName");

  user.getFullName();

  expect(spy).toHaveBeenCalled();

  // Restaura a implementação original
  spy.mockRestore();
});
```

#### Mocking de Módulos

Você pode substituir módulos inteiros por implementações mock:

```javascript
// Em Jest
jest.mock("./api");

// Em Vitest
vi.mock("./api");

// api.js
export async function fetchUser(id) {
  // Implementação real que faz chamadas HTTP
}

// test.js
import { fetchUser } from "./api";

// Automático com jest.mock/vi.mock
fetchUser.mockResolvedValue({ id: 1, name: "John" });

test("fetches user data", async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe("John");
  expect(fetchUser).toHaveBeenCalledWith(1);
});
```

Implementações manuais:

```javascript
// Em Jest
jest.mock("./api", () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "John" }),
}));

// Em Vitest
vi.mock("./api", () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: "John" }),
}));
```

### Testando Código Assíncrono

#### Promises

```javascript
test("async with promises", () => {
  return fetchData().then((data) => {
    expect(data).toBe("data");
  });
});
```

#### Async/Await

```javascript
test("async with async/await", async () => {
  const data = await fetchData();
  expect(data).toBe("data");
});
```

#### Rejeições

```javascript
test("async with rejection", async () => {
  await expect(fetchDataWithError()).rejects.toThrow("error");
});
```

### Hooks de Teste

Hooks permitem configurar e limpar o ambiente de teste:

```javascript
describe("test suite", () => {
  beforeAll(() => {
    // Executado uma vez antes de todos os testes
  });

  afterAll(() => {
    // Executado uma vez depois de todos os testes
  });

  beforeEach(() => {
    // Executado antes de cada teste
  });

  afterEach(() => {
    // Executado depois de cada teste
  });

  test("test case", () => {
    // ...
  });
});
```

### Testando Composables

Os composables são funções que encapsulam lógica reutilizável na Composition API. Testá-los é semelhante a testar funções normais:

```javascript
// useCounter.js
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return {
    count,
    increment,
    decrement,
  };
}

// useCounter.spec.js
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  test("initializes with default value", () => {
    const { count } = useCounter();
    expect(count.value).toBe(0);
  });

  test("initializes with provided value", () => {
    const { count } = useCounter(10);
    expect(count.value).toBe(10);
  });

  test("increments the counter", () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });

  test("decrements the counter", () => {
    const { count, decrement } = useCounter(5);
    decrement();
    expect(count.value).toBe(4);
  });
});
```

### Melhores Práticas para Testes Unitários

1. **Mantenha os testes pequenos e focados**: Cada teste deve verificar uma única funcionalidade.
2. **Use nomes descritivos**: O nome do teste deve descrever claramente o que está sendo testado.
3. **Siga o padrão AAA (Arrange-Act-Assert)**:
   - Arrange: Configure o ambiente de teste
   - Act: Execute a ação a ser testada
   - Assert: Verifique os resultados
4. **Evite dependências entre testes**: Cada teste deve ser independente.
5. **Teste casos de borda**: Não teste apenas o caminho feliz.
6. **Mantenha os mocks simples**: Simule apenas o necessário.
7. **Evite testes frágeis**: Testes não devem quebrar com mudanças não relacionadas.
8. **Execute testes frequentemente**: Idealmente a cada mudança de código.

## Aula 8.3: Testes de componentes com Vue Test Utils

### Introdução ao Vue Test Utils

Vue Test Utils (VTU) é a biblioteca oficial de testes para componentes Vue. Ela fornece utilitários para montar, interagir e verificar componentes Vue em um ambiente de teste.

#### Instalação

```bash
# npm
npm install --save-dev @vue/test-utils

# yarn
yarn add --dev @vue/test-utils

# pnpm
pnpm add --save-dev @vue/test-utils
```

### Montando Componentes

O primeiro passo para testar um componente é montá-lo. Vue Test Utils oferece duas funções principais:

#### `mount`

Monta o componente com todos os seus filhos:

```javascript
import { mount } from "@vue/test-utils";
import Counter from "./Counter.vue";

test("mounts a component", () => {
  const wrapper = mount(Counter);
  // wrapper contém o componente montado
});
```

#### `shallowMount`

Monta o componente, mas substitui seus componentes filhos por stubs:

```javascript
import { shallowMount } from "@vue/test-utils";
import Parent from "./Parent.vue";

test("shallow mounts a component", () => {
  const wrapper = shallowMount(Parent);
  // Componentes filhos são substituídos por stubs
});
```

Use `mount` quando precisar testar a integração com componentes filhos, e `shallowMount` quando quiser isolar o componente de seus filhos.

### Opções de Montagem

Você pode passar várias opções ao montar um componente:

#### Props

```javascript
const wrapper = mount(Component, {
  props: {
    message: "Hello",
    count: 42,
  },
});
```

#### Slots

```javascript
const wrapper = mount(Component, {
  slots: {
    default: "Default slot content",
    named: "<p>Named slot content</p>",
    // Também pode usar componentes
    header: h("h1", "Header"),
  },
});
```

#### Slots Escopados

```javascript
const wrapper = mount(Component, {
  slots: {
    // Usando string template
    item: `<template #item="{ item }">Item: {{ item.name }}</template>`,

    // Usando render function
    row: ({ row }) => h("div", `Row: ${row.id}`),
  },
});
```

#### Atributos Globais

```javascript
const wrapper = mount(Component, {
  attrs: {
    id: "my-component",
    "data-test": "test",
  },
});
```

#### Plugins e Provide/Inject

```javascript
const wrapper = mount(Component, {
  global: {
    plugins: [vuex, router],
    provide: {
      theme: "dark",
      user: { name: "John" },
    },
  },
});
```

#### Stubs e Mocks

```javascript
const wrapper = mount(Component, {
  global: {
    stubs: {
      // Stub específico
      RouterLink: true, // stub básico
      "my-component": { template: "<div>Stubbed</div>" }, // stub personalizado

      // Stub todos os componentes
      shallow: true,
    },
    mocks: {
      // Mocks para propriedades globais
      $route: { path: "/home" },
      $store: { state: { user: null } },
    },
  },
});
```

### Interagindo com o Componente

Vue Test Utils fornece métodos para interagir com o componente montado:

#### Encontrando Elementos

```javascript
// Por seletor CSS
const button = wrapper.find("button");
const input = wrapper.find('input[type="text"]');

// Por ID
const element = wrapper.find("#my-id");

// Por classe
const items = wrapper.findAll(".item");

// Por atributo de teste (recomendado)
const submit = wrapper.find('[data-test="submit"]');

// Por componente
const childComponent = wrapper.findComponent(ChildComponent);
```

#### Verificando Existência

```javascript
expect(wrapper.find(".exists").exists()).toBe(true);
expect(wrapper.find(".not-exists").exists()).toBe(false);
```

#### Verificando Visibilidade

```javascript
expect(wrapper.find(".visible").isVisible()).toBe(true);
expect(wrapper.find(".hidden").isVisible()).toBe(false);
```

#### Verificando Texto e HTML

```javascript
expect(wrapper.text()).toContain("Hello World");
expect(wrapper.html()).toContain("<span>Hello</span>");

const element = wrapper.find(".element");
expect(element.text()).toBe("Text content");
```

#### Verificando Atributos e Classes

```javascript
const element = wrapper.find(".element");

// Atributos
expect(element.attributes("id")).toBe("my-id");
expect(element.attributes("disabled")).toBeDefined();

// Classes
expect(element.classes()).toContain("active");
expect(element.classes("disabled")).toBe(true);
```

#### Verificando Props

```javascript
const childComponent = wrapper.findComponent(ChildComponent);
expect(childComponent.props("message")).toBe("Hello");
```

#### Simulando Eventos

```javascript
// Clique
await wrapper.find("button").trigger("click");

// Input
await wrapper.find("input").setValue("New value");

// Outros eventos
await wrapper.find(".element").trigger("mouseenter");
await wrapper.find("form").trigger("submit");
```

Note o uso de `await` - as interações são assíncronas no Vue Test Utils 2.x.

#### Verificando Eventos Emitidos

```javascript
// Emitir evento
wrapper.vm.$emit("custom-event", "payload");

// Verificar evento
expect(wrapper.emitted()).toHaveProperty("custom-event");
expect(wrapper.emitted("custom-event")).toHaveLength(1);
expect(wrapper.emitted("custom-event")[0]).toEqual(["payload"]);
```

### Testando Componentes com Composition API

Testar componentes que usam Composition API é semelhante a testar componentes com Options API:

```vue
<!-- Counter.vue -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}
</script>
```

```javascript
// Counter.spec.js
import { mount } from "@vue/test-utils";
import Counter from "./Counter.vue";

describe("Counter.vue", () => {
  test("renders the correct count", () => {
    const wrapper = mount(Counter);
    expect(wrapper.text()).toContain("Count: 0");
  });

  test("increments the count when button is clicked", async () => {
    const wrapper = mount(Counter);
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Count: 1");
  });

  test("decrements the count when button is clicked", async () => {
    const wrapper = mount(Counter);
    await wrapper.findAll("button")[1].trigger("click");
    expect(wrapper.text()).toContain("Count: -1");
  });
});
```

### Testando Componentes com Props e Eventos

```vue
<!-- TodoItem.vue -->
<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
    />
    <span>{{ todo.text }}</span>
    <button @click="$emit('delete', todo.id)">Delete</button>
  </div>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

defineEmits(["toggle", "delete"]);
</script>
```

```javascript
// TodoItem.spec.js
import { mount } from "@vue/test-utils";
import TodoItem from "./TodoItem.vue";

describe("TodoItem.vue", () => {
  const todo = {
    id: 1,
    text: "Learn Vue Testing",
    completed: false,
  };

  test("renders todo text", () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    expect(wrapper.text()).toContain("Learn Vue Testing");
  });

  test("applies completed class when todo is completed", () => {
    const completedTodo = { ...todo, completed: true };
    const wrapper = mount(TodoItem, {
      props: { todo: completedTodo },
    });

    expect(wrapper.classes()).toContain("completed");
  });

  test("emits toggle event when checkbox is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    await wrapper.find('input[type="checkbox"]').trigger("change");

    expect(wrapper.emitted()).toHaveProperty("toggle");
    expect(wrapper.emitted("toggle")[0]).toEqual([1]);
  });

  test("emits delete event when delete button is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("delete");
    expect(wrapper.emitted("delete")[0]).toEqual([1]);
  });
});
```

### Testando Componentes com Vuex/Pinia

#### Testando Componentes com Vuex

Você pode testar componentes que usam Vuex de duas maneiras:

1. **Mockando o store**:

```javascript
import { mount } from "@vue/test-utils";
import Component from "./Component.vue";

test("component with mocked store", () => {
  const wrapper = mount(Component, {
    global: {
      mocks: {
        $store: {
          state: { count: 0 },
          getters: { doubleCount: 0 },
          dispatch: jest.fn(),
          commit: jest.fn(),
        },
      },
    },
  });

  // Teste o componente
});
```

2. **Criando um store real**:

```javascript
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Component from "./Component.vue";

test("component with real store", () => {
  const store = createStore({
    state() {
      return { count: 0 };
    },
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    mutations: {
      increment(state) {
        state.count++;
      },
    },
    actions: {
      incrementAsync({ commit }) {
        commit("increment");
      },
    },
  });

  const wrapper = mount(Component, {
    global: {
      plugins: [store],
    },
  });

  // Teste o componente
});
```

#### Testando Componentes com Pinia

Para Pinia, você pode usar a função `createTestingPinia`:

```javascript
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useCounterStore } from "./stores/counter";
import Component from "./Component.vue";

test("component with pinia", () => {
  const wrapper = mount(Component, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            counter: { count: 20 },
          },
          stubActions: false, // Por padrão, as actions são stubbed
        }),
      ],
    },
  });

  const store = useCounterStore();

  // Agora você pode interagir com o store
  expect(store.count).toBe(20);

  // E espionar as actions
  store.increment();
  expect(store.increment).toHaveBeenCalledTimes(1);
});
```

### Testando Componentes com Vue Router

Você pode testar componentes que usam Vue Router mockando o router ou criando um router real:

#### Mockando o Router

```javascript
import { mount } from "@vue/test-utils";
import Component from "./Component.vue";

test("component with mocked router", () => {
  const mockRoute = {
    params: { id: "1" },
    query: { q: "search" },
    path: "/user/1",
    name: "User",
  };

  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  };

  const wrapper = mount(Component, {
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    },
  });

  // Teste o componente

  // Verifique se o router foi usado
  expect(mockRouter.push).toHaveBeenCalledWith("/home");
});
```

#### Criando um Router Real

```javascript
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Component from "./Component.vue";
import Home from "./Home.vue";

test("component with real router", async () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: Home },
      { path: "/user/:id", name: "User", component: Component },
    ],
  });

  // Navegue para a rota desejada
  router.push("/user/1");
  await router.isReady();

  const wrapper = mount(Component, {
    global: {
      plugins: [router],
    },
  });

  // Teste o componente
});
```

### Testando Componentes Assíncronos

Muitos componentes Vue têm comportamento assíncrono, como carregar dados de uma API. Para testar esses componentes:

```vue
<!-- AsyncComponent.vue -->
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUser } from "./api";

const user = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    user.value = await fetchUser(1);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>
```

```javascript
// AsyncComponent.spec.js
import { mount, flushPromises } from "@vue/test-utils";
import AsyncComponent from "./AsyncComponent.vue";
import { fetchUser } from "./api";

// Mock da API
jest.mock("./api", () => ({
  fetchUser: jest.fn(),
}));

describe("AsyncComponent.vue", () => {
  test("shows loading state initially", () => {
    const wrapper = mount(AsyncComponent);
    expect(wrapper.text()).toContain("Loading...");
  });

  test("shows user data when loaded successfully", async () => {
    // Configure o mock para retornar dados
    fetchUser.mockResolvedValue({
      name: "John Doe",
      email: "john@example.com",
    });

    const wrapper = mount(AsyncComponent);

    // Espere que todas as promises sejam resolvidas
    await flushPromises();

    expect(wrapper.text()).toContain("John Doe");
    expect(wrapper.text()).toContain("john@example.com");
  });

  test("shows error when loading fails", async () => {
    // Configure o mock para lançar um erro
    fetchUser.mockRejectedValue(new Error("Failed to load user"));

    const wrapper = mount(AsyncComponent);

    // Espere que todas as promises sejam resolvidas
    await flushPromises();

    expect(wrapper.text()).toContain("Error: Failed to load user");
  });
});
```

### Snapshots Testing

Snapshots são úteis para detectar mudanças inesperadas na saída do componente:

```javascript
import { mount } from "@vue/test-utils";
import Component from "./Component.vue";

test("component renders correctly", () => {
  const wrapper = mount(Component, {
    props: {
      message: "Hello World",
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
```

Na primeira execução, o teste cria um arquivo de snapshot. Nas execuções subsequentes, o teste compara a saída atual com o snapshot salvo.

### Melhores Práticas para Testes de Componentes

1. **Use atributos de teste**: Adicione `data-test` aos elementos para seleção estável.

   ```html
   <button data-test="submit">Submit</button>
   ```

   ```javascript
   wrapper.find('[data-test="submit"]');
   ```

2. **Teste comportamento, não implementação**: Foque no que o usuário vê e faz.

3. **Mantenha os testes independentes**: Cada teste deve funcionar isoladamente.

4. **Minimize o uso de snapshots**: Use-os apenas para componentes estáveis.

5. **Teste interações do usuário**: Cliques, inputs, etc.

6. **Teste estados diferentes**: Loading, erro, sucesso, vazio, etc.

7. **Teste acessibilidade**: Verifique se o componente é acessível.

8. **Prefira `mount` sobre `shallowMount`**: Teste a integração real quando possível.

## Aula 8.4: Depuração e ferramentas de desenvolvimento

### Vue DevTools

Vue DevTools é uma extensão de navegador essencial para depurar aplicações Vue.

#### Instalação

- [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)

#### Recursos Principais

1. **Inspeção de Componentes**:

   - Árvore de componentes
   - Props, data, computed, etc.
   - Edição em tempo real de estado

2. **Timeline de Eventos**:

   - Rastreamento de eventos emitidos
   - Informações sobre tempo e payload

3. **Vuex/Pinia**:

   - Inspeção de estado
   - Histórico de mutações/ações
   - Viagem no tempo (time travel)

4. **Roteamento**:

   - Visualização de rotas
   - Histórico de navegação

5. **Performance**:
   - Perfil de renderização
   - Detecção de re-renderizações desnecessárias

#### Dicas para Usar o Vue DevTools

1. **Nomeie seus componentes**: Use a opção `name` para facilitar a identificação.
2. **Use o modo de desenvolvimento**: DevTools tem recursos limitados em produção.
3. **Explore a timeline**: Útil para depurar eventos e atualizações de estado.
4. **Use a viagem no tempo**: Para depurar problemas de estado.
5. **Inspecione props e estado**: Para entender o fluxo de dados.

### Depuração com Breakpoints

#### No Navegador

1. **Breakpoints no DevTools**:

   - Abra as ferramentas de desenvolvedor do navegador (F12)
   - Navegue até a guia "Sources"
   - Encontre seu arquivo Vue (geralmente em webpack:// ou src/)
   - Clique na linha onde deseja adicionar um breakpoint

2. **Palavra-chave `debugger`**:
   ```javascript
   function myFunction() {
     const x = 1;
     debugger; // O navegador pausará aqui quando executar em modo de desenvolvimento
     return x + 1;
   }
   ```

#### No Editor

Muitos editores como VS Code suportam depuração direta:

1. Instale a extensão "Debugger for Chrome" ou equivalente
2. Configure o arquivo `launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Chrome against localhost",
         "url": "http://localhost:8080",
         "webRoot": "${workspaceFolder}"
       }
     ]
   }
   ```
3. Adicione breakpoints no editor
4. Inicie a depuração

### Console e Logging

#### `console.log` e Variantes

```javascript
console.log("Valor básico:", value);
console.info("Informação:", info);
console.warn("Aviso:", warning);
console.error("Erro:", error);
```

#### Logging Avançado

```javascript
// Agrupamento
console.group("Grupo de logs");
console.log("Log dentro do grupo");
console.log("Outro log");
console.groupEnd();

// Tabelas
console.table([
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
]);

// Tempo de execução
console.time("operação");
// ... código a ser medido
console.timeEnd("operação");

// Contagem
for (let i = 0; i < 5; i++) {
  console.count("loop executado");
}
```

#### Logging Condicional

```javascript
// Só loga se a condição for verdadeira
console.assert(condition, "Mensagem se falso");

// Loga apenas em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  console.log("Apenas em desenvolvimento");
}
```

### Depuração de Reatividade

#### Rastreando Mudanças de Estado

```javascript
import { watch } from "vue";

watch(
  () => myState.value,
  (newValue, oldValue) => {
    console.log("Estado mudou:", { oldValue, newValue });
  },
  { deep: true }
);
```

#### Usando `nextTick`

```javascript
import { nextTick } from "vue";

// Após uma mudança de estado
state.value = newValue;

// Espere a atualização do DOM
await nextTick();
// Agora o DOM foi atualizado
```

#### Depurando Computed Properties

```javascript
const computed = computed(() => {
  console.log("Computed sendo recalculado");
  return expensiveCalculation();
});
```

### Ferramentas de Análise de Performance

#### Vue DevTools Performance Tab

O Vue DevTools inclui uma guia de performance que permite:

- Gravar operações de renderização
- Identificar componentes lentos
- Ver o tempo gasto em cada componente

#### Lighthouse

Lighthouse é uma ferramenta do Google Chrome para analisar a performance de sites:

1. Abra as ferramentas de desenvolvedor (F12)
2. Navegue até a guia "Lighthouse"
3. Selecione as categorias (Performance, Acessibilidade, etc.)
4. Clique em "Generate report"

#### Chrome Performance Tab

Para análise mais detalhada:

1. Abra as ferramentas de desenvolvedor (F12)
2. Navegue até a guia "Performance"
3. Clique em "Record"
4. Execute as ações que deseja analisar
5. Clique em "Stop"
6. Analise o gráfico de flamechart

### Depuração de Aplicações em Produção

#### Source Maps

Source maps permitem mapear o código minificado de produção de volta ao código fonte original:

```javascript
// vue.config.js (Vue CLI)
module.exports = {
  productionSourceMap: true,
};

// vite.config.js (Vite)
export default defineConfig({
  build: {
    sourcemap: true,
  },
});
```

#### Logging em Produção

Considere usar um serviço de logging para produção:

```javascript
// logger.js
const isProd = process.env.NODE_ENV === "production";

export default {
  log(...args) {
    if (!isProd) {
      console.log(...args);
    } else {
      // Em produção, envie para um serviço de logging
      // logService.send('log', args)
    }
  },
  error(...args) {
    console.error(...args);
    if (isProd) {
      // Envie erros para um serviço de monitoramento
      // errorTrackingService.captureException(args[0])
    }
  },
};
```

#### Monitoramento de Erros

Serviços como Sentry, LogRocket ou Rollbar podem ser integrados para capturar erros em produção:

```javascript
// main.js
import { createApp } from "vue";
import * as Sentry from "@sentry/vue";
import App from "./App.vue";

const app = createApp(App);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    app,
    dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

app.mount("#app");
```

### Melhores Práticas para Depuração

1. **Use nomes descritivos**: Para componentes, props, métodos, etc.
2. **Mantenha componentes pequenos**: Facilita a depuração.
3. **Use props validação**: Detecta problemas mais cedo.
4. **Evite mutações diretas de estado**: Use métodos apropriados.
5. **Organize seu código**: Código bem organizado é mais fácil de depurar.
6. **Adicione comentários**: Explique código complexo.
7. **Use TypeScript**: Fornece verificação de tipos em tempo de compilação.
8. **Implemente tratamento de erros**: Capture e registre erros.
9. **Teste regularmente**: Testes detectam problemas antes que cheguem à produção.
10. **Mantenha as dependências atualizadas**: Evite bugs conhecidos.

## Exercício Prático: Desenvolvimento de testes para uma aplicação Vue

### Objetivo

Criar uma aplicação simples de lista de tarefas (Todo List) e implementar testes unitários e de componentes para garantir seu funcionamento correto.

### Requisitos

1. Implementar uma aplicação de lista de tarefas com Vue 3 e Composition API
2. Escrever testes unitários para funções e composables
3. Escrever testes de componentes para verificar a renderização e interações
4. Configurar um pipeline de CI para executar os testes automaticamente

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest vue-testing-demo -- --template vue
cd vue-testing-demo
npm install

# Instalar dependências de teste
npm install -D vitest happy-dom @testing-library/vue @vue/test-utils
```

### Passo 2: Configurar Vitest

Atualizar o arquivo `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
```

Adicionar scripts no `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Passo 3: Criar Composable para Gerenciamento de Tarefas

```javascript
// src/composables/useTodos.js
import { ref, computed } from "vue";

export function useTodos() {
  const todos = ref([]);
  const newTodo = ref("");

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed);
  });

  const incompleteTodos = computed(() => {
    return todos.value.filter((todo) => !todo.completed);
  });

  function addTodo() {
    const text = newTodo.value.trim();
    if (text) {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false,
      });
      newTodo.value = "";
    }
  }

  function removeTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  function toggleTodo(id) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  return {
    todos,
    newTodo,
    completedTodos,
    incompleteTodos,
    addTodo,
    removeTodo,
    toggleTodo,
  };
}
```

### Passo 4: Criar Componentes

```vue
<!-- src/components/TodoItem.vue -->
<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
      data-test="todo-checkbox"
    />
    <span class="todo-text">{{ todo.text }}</span>
    <button
      @click="$emit('remove', todo.id)"
      class="delete-btn"
      data-test="delete-button"
    >
      ×
    </button>
  </div>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

defineEmits(["toggle", "remove"]);
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.completed {
  opacity: 0.6;
}

.completed .todo-text {
  text-decoration: line-through;
}

.todo-text {
  margin: 0 12px;
  flex-grow: 1;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 18px;
  cursor: pointer;
}
</style>
```

```vue
<!-- src/components/TodoForm.vue -->
<template>
  <form @submit.prevent="addTodo" class="todo-form">
    <input
      v-model="newTodo"
      placeholder="Add a new todo..."
      data-test="new-todo-input"
    />
    <button type="submit" :disabled="!newTodo.trim()" data-test="add-button">
      Add
    </button>
  </form>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  newTodo: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:newTodo", "add"]);

const { newTodo } = toRefs(props);

function addTodo() {
  if (newTodo.value.trim()) {
    emit("add");
  }
}
</script>

<style scoped>
.todo-form {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
```

```vue
<!-- src/components/TodoList.vue -->
<template>
  <div class="todo-list">
    <h2>Todo List</h2>

    <TodoForm v-model:newTodo="newTodo" @add="addTodo" />

    <div v-if="todos.length === 0" class="empty-state" data-test="empty-state">
      No todos yet. Add one above!
    </div>

    <div v-else>
      <h3>Tasks ({{ incompleteTodos.length }})</h3>
      <TodoItem
        v-for="todo in incompleteTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
        data-test="todo-item"
      />

      <h3 v-if="completedTodos.length">
        Completed ({{ completedTodos.length }})
      </h3>
      <TodoItem
        v-for="todo in completedTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
        data-test="completed-item"
      />
    </div>
  </div>
</template>

<script setup>
import { useTodos } from "../composables/useTodos";
import TodoForm from "./TodoForm.vue";
import TodoItem from "./TodoItem.vue";

const {
  todos,
  newTodo,
  completedTodos,
  incompleteTodos,
  addTodo,
  removeTodo,
  toggleTodo,
} = useTodos();
</script>

<style scoped>
.todo-list {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  margin: 16px 0 8px;
  color: #495057;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  padding: 20px;
}
</style>
```

```vue
<!-- src/App.vue -->
<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<script setup>
import TodoList from "./components/TodoList.vue";
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
  background-color: #f8f9fa;
  line-height: 1.6;
}

.app {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
```

### Passo 5: Escrever Testes Unitários para o Composable

```javascript
// src/composables/__tests__/useTodos.spec.js
import { describe, it, expect } from "vitest";
import { useTodos } from "../useTodos";

describe("useTodos", () => {
  it("should initialize with empty todos", () => {
    const { todos } = useTodos();
    expect(todos.value).toEqual([]);
  });

  it("should add a new todo", () => {
    const { todos, newTodo, addTodo } = useTodos();

    newTodo.value = "Test todo";
    addTodo();

    expect(todos.value.length).toBe(1);
    expect(todos.value[0].text).toBe("Test todo");
    expect(todos.value[0].completed).toBe(false);
    expect(newTodo.value).toBe("");
  });

  it("should not add empty todos", () => {
    const { todos, newTodo, addTodo } = useTodos();

    newTodo.value = "   ";
    addTodo();

    expect(todos.value.length).toBe(0);
  });

  it("should remove a todo", () => {
    const { todos, newTodo, addTodo, removeTodo } = useTodos();

    newTodo.value = "Test todo";
    addTodo();

    const id = todos.value[0].id;
    removeTodo(id);

    expect(todos.value.length).toBe(0);
  });

  it("should toggle a todo", () => {
    const { todos, newTodo, addTodo, toggleTodo } = useTodos();

    newTodo.value = "Test todo";
    addTodo();

    const id = todos.value[0].id;
    expect(todos.value[0].completed).toBe(false);

    toggleTodo(id);
    expect(todos.value[0].completed).toBe(true);

    toggleTodo(id);
    expect(todos.value[0].completed).toBe(false);
  });

  it("should filter completed todos", () => {
    const { todos, completedTodos, toggleTodo } = useTodos();

    // Add test todos directly to the array
    todos.value = [
      { id: 1, text: "Todo 1", completed: false },
      { id: 2, text: "Todo 2", completed: true },
      { id: 3, text: "Todo 3", completed: false },
    ];

    expect(completedTodos.value.length).toBe(1);
    expect(completedTodos.value[0].id).toBe(2);

    toggleTodo(1);
    expect(completedTodos.value.length).toBe(2);
    expect(completedTodos.value.map((t) => t.id)).toContain(1);
  });

  it("should filter incomplete todos", () => {
    const { todos, incompleteTodos, toggleTodo } = useTodos();

    todos.value = [
      { id: 1, text: "Todo 1", completed: false },
      { id: 2, text: "Todo 2", completed: true },
      { id: 3, text: "Todo 3", completed: false },
    ];

    expect(incompleteTodos.value.length).toBe(2);
    expect(incompleteTodos.value.map((t) => t.id)).toContain(1);
    expect(incompleteTodos.value.map((t) => t.id)).toContain(3);

    toggleTodo(1);
    expect(incompleteTodos.value.length).toBe(1);
    expect(incompleteTodos.value[0].id).toBe(3);
  });
});
```

### Passo 6: Escrever Testes de Componentes

```javascript
// src/components/__tests__/TodoItem.spec.js
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "../TodoItem.vue";

describe("TodoItem.vue", () => {
  it("renders todo text", () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: 1, text: "Test Todo", completed: false },
      },
    });

    expect(wrapper.text()).toContain("Test Todo");
  });

  it("applies completed class when todo is completed", () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: 1, text: "Test Todo", completed: true },
      },
    });

    expect(wrapper.classes()).toContain("completed");
  });

  it("emits toggle event when checkbox is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: 1, text: "Test Todo", completed: false },
      },
    });

    await wrapper.find('[data-test="todo-checkbox"]').trigger("change");

    expect(wrapper.emitted()).toHaveProperty("toggle");
    expect(wrapper.emitted("toggle")[0]).toEqual([1]);
  });

  it("emits remove event when delete button is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: 1, text: "Test Todo", completed: false },
      },
    });

    await wrapper.find('[data-test="delete-button"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("remove");
    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });
});
```

```javascript
// src/components/__tests__/TodoForm.spec.js
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoForm from "../TodoForm.vue";

describe("TodoForm.vue", () => {
  it("renders input field", () => {
    const wrapper = mount(TodoForm, {
      props: {
        newTodo: "",
      },
    });

    expect(wrapper.find('[data-test="new-todo-input"]').exists()).toBe(true);
  });

  it("disables button when input is empty", () => {
    const wrapper = mount(TodoForm, {
      props: {
        newTodo: "",
      },
    });

    expect(
      wrapper.find('[data-test="add-button"]').attributes("disabled")
    ).toBeDefined();
  });

  it("enables button when input has text", () => {
    const wrapper = mount(TodoForm, {
      props: {
        newTodo: "New Todo",
      },
    });

    expect(
      wrapper.find('[data-test="add-button"]').attributes("disabled")
    ).toBeUndefined();
  });

  it("emits update:newTodo event when input changes", async () => {
    const wrapper = mount(TodoForm, {
      props: {
        newTodo: "",
      },
    });

    await wrapper.find('[data-test="new-todo-input"]').setValue("New Todo");

    expect(wrapper.emitted()).toHaveProperty("update:newTodo");
    expect(wrapper.emitted("update:newTodo")[0]).toEqual(["New Todo"]);
  });

  it("emits add event when form is submitted", async () => {
    const wrapper = mount(TodoForm, {
      props: {
        newTodo: "New Todo",
      },
    });

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted()).toHaveProperty("add");
  });

  it("does not emit add event when input is empty", async () => {
    const wrapper = mount(TodoForm, {
      props: {
        newTodo: "",
      },
    });

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted()).not.toHaveProperty("add");
  });
});
```

```javascript
// src/components/__tests__/TodoList.spec.js
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TodoList from "../TodoList.vue";
import TodoItem from "../TodoItem.vue";
import TodoForm from "../TodoForm.vue";
import { useTodos } from "../../composables/useTodos";

// Mock do composable useTodos
vi.mock("../../composables/useTodos", () => ({
  useTodos: vi.fn(),
}));

describe("TodoList.vue", () => {
  it("renders empty state when no todos", () => {
    // Configure o mock para retornar um estado vazio
    useTodos.mockReturnValue({
      todos: { value: [] },
      newTodo: { value: "" },
      completedTodos: { value: [] },
      incompleteTodos: { value: [] },
      addTodo: vi.fn(),
      removeTodo: vi.fn(),
      toggleTodo: vi.fn(),
    });

    const wrapper = mount(TodoList);

    expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("No todos yet");
  });

  it("renders todos when they exist", () => {
    // Configure o mock para retornar alguns todos
    useTodos.mockReturnValue({
      todos: {
        value: [
          { id: 1, text: "Todo 1", completed: false },
          { id: 2, text: "Todo 2", completed: true },
        ],
      },
      newTodo: { value: "" },
      completedTodos: {
        value: [{ id: 2, text: "Todo 2", completed: true }],
      },
      incompleteTodos: {
        value: [{ id: 1, text: "Todo 1", completed: false }],
      },
      addTodo: vi.fn(),
      removeTodo: vi.fn(),
      toggleTodo: vi.fn(),
    });

    const wrapper = mount(TodoList);

    expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(false);
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2);
    expect(wrapper.text()).toContain("Tasks (1)");
    expect(wrapper.text()).toContain("Completed (1)");
  });

  it("calls addTodo when form emits add event", async () => {
    const addTodo = vi.fn();

    useTodos.mockReturnValue({
      todos: { value: [] },
      newTodo: { value: "New Todo" },
      completedTodos: { value: [] },
      incompleteTodos: { value: [] },
      addTodo,
      removeTodo: vi.fn(),
      toggleTodo: vi.fn(),
    });

    const wrapper = mount(TodoList);

    await wrapper.findComponent(TodoForm).vm.$emit("add");

    expect(addTodo).toHaveBeenCalled();
  });

  it("calls toggleTodo when TodoItem emits toggle event", async () => {
    const toggleTodo = vi.fn();

    useTodos.mockReturnValue({
      todos: { value: [{ id: 1, text: "Todo 1", completed: false }] },
      newTodo: { value: "" },
      completedTodos: { value: [] },
      incompleteTodos: { value: [{ id: 1, text: "Todo 1", completed: false }] },
      addTodo: vi.fn(),
      removeTodo: vi.fn(),
      toggleTodo,
    });

    const wrapper = mount(TodoList);

    await wrapper.findComponent(TodoItem).vm.$emit("toggle", 1);

    expect(toggleTodo).toHaveBeenCalledWith(1);
  });

  it("calls removeTodo when TodoItem emits remove event", async () => {
    const removeTodo = vi.fn();

    useTodos.mockReturnValue({
      todos: { value: [{ id: 1, text: "Todo 1", completed: false }] },
      newTodo: { value: "" },
      completedTodos: { value: [] },
      incompleteTodos: { value: [{ id: 1, text: "Todo 1", completed: false }] },
      addTodo: vi.fn(),
      removeTodo,
      toggleTodo: vi.fn(),
    });

    const wrapper = mount(TodoList);

    await wrapper.findComponent(TodoItem).vm.$emit("remove", 1);

    expect(removeTodo).toHaveBeenCalledWith(1);
  });
});
```

### Passo 7: Configurar CI com GitHub Actions

Crie um arquivo `.github/workflows/test.yml`:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Build
        run: npm run build
```

### Passo 8: Executar e Verificar os Testes

```bash
# Executar testes em modo de observação
npm test

# Executar testes uma vez
npm run test:run

# Executar testes com cobertura
npm run test:coverage
```

# Exercícios Práticos - Módulo 8: Testes e Depuração

## Exercício 1: Testes Unitários

- Escreva testes para funções de utilidade
- Use Jest para cobertura de testes
- Implemente testes de computação
- Verifique casos de borda

## Exercício 2: Testes de Componentes

- Use Vue Test Utils
- Teste renderização de componentes
- Simule eventos de usuário
- Verifique estados e props

## Desafio Final

- Criar aplicação de lista de tarefas
- Cobertura de testes completa
- Implemente testes de integração
- Adicione debugging com Vue DevTools

### Perguntas para Fixação

1. **Qual é a principal diferença entre testes unitários e testes de componentes?**

   - a) Testes unitários são mais rápidos, enquanto testes de componentes são mais completos
   - b) Testes unitários verificam funções isoladas, enquanto testes de componentes verificam a integração do template, script e estilo
   - c) Testes unitários são escritos em JavaScript, enquanto testes de componentes são escritos em TypeScript
   - d) Testes unitários são executados no navegador, enquanto testes de componentes são executados no Node.js

2. **Qual método do Vue Test Utils é usado para simular um clique em um elemento?**

   - a) `wrapper.click()`
   - b) `wrapper.simulate('click')`
   - c) `wrapper.find('button').click()`
   - d) `wrapper.find('button').trigger('click')`

3. **Como você pode verificar se um componente emitiu um evento específico?**

   - a) `expect(wrapper.events()).toContain('event-name')`
   - b) `expect(wrapper.emitted()).toHaveProperty('event-name')`
   - c) `expect(wrapper.hasEmitted('event-name')).toBe(true)`
   - d) `expect(wrapper.events('event-name')).toBeTruthy()`

4. **Qual é a melhor prática para selecionar elementos em testes de componentes?**

   - a) Usar seletores de classe CSS
   - b) Usar seletores de ID
   - c) Usar atributos `data-test`
   - d) Usar seletores de tag HTML

5. **Qual ferramenta é essencial para depurar aplicações Vue em tempo real?**
   - a) Chrome DevTools
   - b) Vue DevTools
   - c) Vitest
   - d) Jest

**Respostas:**

1. b) Testes unitários verificam funções isoladas, enquanto testes de componentes verificam a integração do template, script e estilo
2. d) `wrapper.find('button').trigger('click')`
3. b) `expect(wrapper.emitted()).toHaveProperty('event-name')`
4. c) Usar atributos `data-test`
5. b) Vue DevTools
