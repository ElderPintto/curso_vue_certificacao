# Módulo 7: Composição API e Hooks

## Aula 7.1: Introdução à Composition API

### O que é a Composition API?

A Composition API é uma forma alternativa de organizar a lógica dos componentes Vue, introduzida no Vue 3. Ela oferece uma abordagem mais flexível e poderosa para reutilizar código e organizar componentes complexos, em comparação com a Options API tradicional.

Enquanto a Options API organiza o código por tipo de opção (data, methods, computed, etc.), a Composition API permite organizar o código por funcionalidade lógica, facilitando a extração e reutilização de código entre componentes.

### Por que a Composition API foi criada?

A Composition API foi desenvolvida para resolver algumas limitações da Options API:

1. **Reutilização de lógica**: Na Options API, a reutilização de lógica entre componentes era feita principalmente através de mixins, que têm problemas como colisões de nomes e falta de clareza sobre a origem das propriedades.

2. **Organização em componentes grandes**: Em componentes complexos, a lógica relacionada a uma mesma funcionalidade ficava espalhada entre diferentes opções (data, methods, computed), dificultando a manutenção.

3. **Suporte a TypeScript**: A Options API tem limitações com TypeScript, enquanto a Composition API oferece melhor inferência de tipos.

4. **Otimização de tamanho**: A Composition API permite tree-shaking mais eficiente, resultando em bundles menores.

### Composition API vs Options API

Vamos comparar as duas abordagens com um exemplo simples:

#### Options API

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    double() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
```

#### Composition API

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const count = ref(0);
const double = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>
```

### Principais Conceitos da Composition API

#### 1. Reatividade com `ref` e `reactive`

A Composition API introduz duas funções principais para criar estado reativo:

##### `ref`

Usado para criar uma referência reativa a um valor primitivo ou objeto:

```javascript
import { ref } from "vue";

const count = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

Características importantes:

- Acesse o valor usando `.value` (exceto em templates, onde o `.value` é automático)
- Pode conter qualquer tipo de valor (primitivos ou objetos)
- Quando contém objetos, eles são convertidos internamente para `reactive`

##### `reactive`

Usado para criar um objeto reativo:

```javascript
import { reactive } from "vue";

const state = reactive({
  count: 0,
  name: "Vue",
});

console.log(state.count); // 0
state.count++;
```

Características importantes:

- Acesse as propriedades diretamente (sem `.value`)
- Funciona apenas com objetos (incluindo arrays e coleções como Map e Set)
- Reatividade profunda (deep reactivity)
- Não pode ser desestruturado sem perder a reatividade

#### 2. Propriedades Computadas com `computed`

Cria uma referência reativa baseada em outras fontes reativas:

```javascript
import { ref, computed } from "vue";

const count = ref(0);
const double = computed(() => count.value * 2);

console.log(double.value); // 0
count.value++;
console.log(double.value); // 2
```

Também pode ser usado com getter e setter:

```javascript
const count = ref(0);
const double = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.value = val / 2;
  },
});

double.value = 10;
console.log(count.value); // 5
```

#### 3. Observadores com `watch` e `watchEffect`

##### `watch`

Observa uma ou mais fontes reativas e executa uma função quando elas mudam:

```javascript
import { ref, watch } from "vue";

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

count.value++;
// Saída: "Count changed from 0 to 1"
```

Observando múltiplas fontes:

```javascript
const firstName = ref("John");
const lastName = ref("Doe");

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log(
    `Name changed from ${oldFirst} ${oldLast} to ${newFirst} ${newLast}`
  );
});
```

Opções adicionais:

```javascript
watch(source, callback, {
  immediate: true, // Executa imediatamente ao criar o observador
  deep: true, // Observa mudanças profundas em objetos
  flush: "post", // Controla quando o callback é executado ('pre', 'post', 'sync')
});
```

##### `watchEffect`

Executa uma função imediatamente e rastreia automaticamente suas dependências reativas:

```javascript
import { ref, watchEffect } from "vue";

const count = ref(0);
const name = ref("Vue");

watchEffect(() => {
  console.log(`Count: ${count.value}, Name: ${name.value}`);
});
// Saída inicial: "Count: 0, Name: Vue"

count.value++;
// Saída: "Count: 1, Name: Vue"

name.value = "Vue 3";
// Saída: "Count: 1, Name: Vue 3"
```

Diferenças entre `watch` e `watchEffect`:

- `watchEffect` executa imediatamente e rastreia dependências automaticamente
- `watch` requer fontes explícitas e não executa imediatamente por padrão
- `watch` fornece valores antigos e novos
- `watchEffect` é mais conciso para casos simples

#### 4. Ciclo de Vida com `onMounted`, `onUpdated`, etc.

A Composition API fornece hooks de ciclo de vida equivalentes aos da Options API:

```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
} from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("Component is mounted");
    });

    onUpdated(() => {
      console.log("Component is updated");
    });

    onUnmounted(() => {
      console.log("Component is unmounted");
    });

    // Outros hooks...
  },
};
```

Com `<script setup>`, os hooks podem ser usados diretamente:

```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Component is mounted");
});
</script>
```

Mapeamento entre Options API e Composition API:

- `beforeCreate` → Código no início de `setup()`
- `created` → Código no início de `setup()`
- `beforeMount` → `onBeforeMount`
- `mounted` → `onMounted`
- `beforeUpdate` → `onBeforeUpdate`
- `updated` → `onUpdated`
- `beforeUnmount` → `onBeforeUnmount`
- `unmounted` → `onUnmounted`
- `errorCaptured` → `onErrorCaptured`
- `renderTracked` → `onRenderTracked`
- `renderTriggered` → `onRenderTriggered`
- `activated` → `onActivated`
- `deactivated` → `onDeactivated`

#### 5. Injeção de Dependência com `provide` e `inject`

Permite passar dados de um componente pai para qualquer componente filho na árvore, sem prop drilling:

```javascript
// Componente pai
import { provide, ref } from "vue";

const count = ref(0);
provide("count", count); // Fornece uma referência reativa

// Componente filho (em qualquer nível)
import { inject } from "vue";

const count = inject("count"); // Recebe a referência reativa
```

Com valores padrão:

```javascript
// Componente filho
const count = inject("count", 0); // Valor padrão se não fornecido
```

Com símbolos para evitar colisões de nomes:

```javascript
// Em um arquivo compartilhado
export const CountKey = Symbol("count");

// Componente pai
provide(CountKey, count);

// Componente filho
const count = inject(CountKey);
```

### Usando `setup()` vs `<script setup>`

#### Função `setup()`

A função `setup()` é a entrada para a Composition API em componentes que não usam `<script setup>`:

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    initialCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const count = ref(props.initialCount);

    function increment() {
      count.value++;
    }

    // Exponha para o template
    return {
      count,
      increment,
    };
  },
};
</script>
```

O segundo parâmetro `context` contém:

- `attrs`: Atributos não declarados como props
- `slots`: Slots do componente
- `emit`: Método para emitir eventos
- `expose`: Função para expor propriedades publicamente

#### `<script setup>`

A sintaxe `<script setup>` é uma forma mais concisa de usar a Composition API:

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  initialCount: {
    type: Number,
    default: 0,
  },
});

const count = ref(props.initialCount);

function increment() {
  count.value++;
}
</script>
```

Vantagens do `<script setup>`:

- Menos código boilerplate
- Variáveis e funções são automaticamente expostas ao template
- Melhor desempenho em tempo de compilação
- Melhor inferência de tipos com TypeScript

Macros especiais em `<script setup>`:

- `defineProps`: Declara props
- `defineEmits`: Declara eventos emitidos
- `defineExpose`: Expõe propriedades para componentes pai
- `withDefaults`: Fornece valores padrão para props com TypeScript

### Melhores Práticas para a Composition API

1. **Prefira `ref` para valores primitivos e `reactive` para objetos complexos**:

   ```javascript
   // Bom
   const count = ref(0);
   const user = reactive({
     name: "John",
     age: 30,
   });

   // Evite
   const count = reactive({ value: 0 });
   const name = ref("John");
   const age = ref(30);
   ```

2. **Use `toRefs` ou `toRef` para preservar a reatividade ao desestruturar**:

   ```javascript
   import { reactive, toRefs, toRef } from "vue";

   const user = reactive({
     name: "John",
     age: 30,
   });

   // Desestruturação com toRefs
   const { name, age } = toRefs(user);

   // Ou referência individual com toRef
   const name = toRef(user, "name");
   ```

3. **Organize o código por funcionalidade, não por tipo de API**:

   ```javascript
   // Bom - Agrupado por funcionalidade
   // Funcionalidade de contador
   const count = ref(0);
   const double = computed(() => count.value * 2);
   function increment() {
     count.value++;
   }

   // Funcionalidade de usuário
   const user = reactive({ name: "John" });
   function updateUser(newName) {
     user.name = newName;
   }

   // Evite - Agrupado por tipo de API
   // Refs
   const count = ref(0);
   const user = reactive({ name: "John" });

   // Computados
   const double = computed(() => count.value * 2);

   // Métodos
   function increment() {
     count.value++;
   }
   function updateUser(newName) {
     user.name = newName;
   }
   ```

4. **Extraia lógica reutilizável em composables**:

   ```javascript
   // useCounter.js
   import { ref, computed } from "vue";

   export function useCounter(initialValue = 0) {
     const count = ref(initialValue);
     const double = computed(() => count.value * 2);

     function increment() {
       count.value++;
     }

     return {
       count,
       double,
       increment,
     };
   }

   // Componente
   import { useCounter } from "./useCounter";

   const { count, double, increment } = useCounter(10);
   ```

5. **Use `readonly` para prevenir mutações indesejadas**:

   ```javascript
   import { reactive, readonly } from "vue";

   const state = reactive({ count: 0 });
   const readonlyState = readonly(state);

   provide("state", readonlyState); // Componentes filhos não podem modificar
   ```

6. **Prefira `computed` sobre funções para valores derivados**:

   ```javascript
   // Bom
   const fullName = computed(() => `${firstName.value} ${lastName.value}`);

   // Evite
   function getFullName() {
     return `${firstName.value} ${lastName.value}`;
   }
   ```

7. **Use `watchEffect` para efeitos simples e `watch` para controle mais preciso**:

   ```javascript
   // Efeito simples
   watchEffect(() => {
     console.log(`Count is ${count.value}`);
   });

   // Controle mais preciso
   watch(
     count,
     (newValue, oldValue) => {
       console.log(`Count changed from ${oldValue} to ${newValue}`);
     },
     { deep: true, immediate: true }
   );
   ```

## Aula 7.2: Composables e reutilização de lógica

### O que são Composables?

Composables são funções que encapsulam e reutilizam lógica com estado em componentes Vue. Eles são a forma recomendada de reutilizar lógica com a Composition API, substituindo mixins, renderless components e outras abordagens da Options API.

Um composable bem projetado:

- Segue uma convenção de nomenclatura (`use[Feature]`)
- Retorna um objeto com estado reativo e funções
- Pode ser composto com outros composables
- É independente do ciclo de vida do componente

### Criando Composables Básicos

#### Exemplo 1: Contador Reutilizável

```javascript
// composables/useCounter.js
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = initialValue;
  }

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
```

Usando o composable em um componente:

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { useCounter } from "@/composables/useCounter";

const { count, increment, decrement, reset } = useCounter(10);
</script>
```

#### Exemplo 2: Gerenciamento de Formulário

```javascript
// composables/useForm.js
import { reactive, computed } from "vue";

export function useForm(initialValues = {}) {
  const values = reactive({ ...initialValues });
  const errors = reactive({});
  const touched = reactive({});

  const isValid = computed(() => Object.keys(errors).length === 0);

  function setValue(field, value) {
    values[field] = value;
    validate(field);
  }

  function setTouched(field) {
    touched[field] = true;
    validate(field);
  }

  function validate(field) {
    // Implementação simplificada
    if (touched[field] && !values[field]) {
      errors[field] = "Este campo é obrigatório";
    } else {
      delete errors[field];
    }
  }

  function validateAll() {
    Object.keys(values).forEach((field) => {
      touched[field] = true;
      validate(field);
    });
    return isValid.value;
  }

  function resetForm() {
    Object.keys(values).forEach((key) => {
      values[key] = initialValues[key] || "";
    });
    Object.keys(errors).forEach((key) => {
      delete errors[key];
    });
    Object.keys(touched).forEach((key) => {
      delete touched[key];
    });
  }

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setTouched,
    validate,
    validateAll,
    resetForm,
  };
}
```

Usando o composable de formulário:

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Nome</label>
      <input id="name" v-model="values.name" @blur="setTouched('name')" />
      <div v-if="touched.name && errors.name" class="error">
        {{ errors.name }}
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="values.email"
        @blur="setTouched('email')"
      />
      <div v-if="touched.email && errors.email" class="error">
        {{ errors.email }}
      </div>
    </div>

    <button type="submit" :disabled="!isValid">Enviar</button>
    <button type="button" @click="resetForm">Limpar</button>
  </form>
</template>

<script setup>
import { useForm } from "@/composables/useForm";

const {
  values,
  errors,
  touched,
  isValid,
  setValue,
  setTouched,
  validateAll,
  resetForm,
} = useForm({
  name: "",
  email: "",
});

function handleSubmit() {
  if (validateAll()) {
    console.log("Form submitted:", values);
    // Enviar dados para o servidor
  }
}
</script>
```

### Composables com Ciclo de Vida

Os composables podem usar hooks de ciclo de vida para limpar recursos ou executar ações em momentos específicos:

```javascript
// composables/useWindowSize.js
import { ref, onMounted, onUnmounted } from "vue";

export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  function update() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    window.addEventListener("resize", update);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return {
    width,
    height,
  };
}
```

Usando o composable:

```vue
<template>
  <div>
    <p>Window width: {{ width }}px</p>
    <p>Window height: {{ height }}px</p>
  </div>
</template>

<script setup>
import { useWindowSize } from "@/composables/useWindowSize";

const { width, height } = useWindowSize();
</script>
```

### Composables com Parâmetros Reativos

Os composables podem aceitar e reagir a parâmetros reativos:

```javascript
// composables/useSearch.js
import { ref, watch, toValue } from "vue";

export function useSearch(query, options = {}) {
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function search() {
    loading.value = true;
    error.value = null;

    try {
      // Converte para valor não reativo se for ref ou computed
      const q = toValue(query);
      const response = await fetch(`/api/search?q=${q}`);

      if (!response.ok) {
        throw new Error("Search failed");
      }

      results.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // Observa mudanças no parâmetro query
  if (options.immediate !== false) {
    watch(query, search, { immediate: true });
  }

  return {
    results,
    loading,
    error,
    search,
  };
}
```

Usando o composable com parâmetro reativo:

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />

    <div v-if="loading">Searching...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="result in results" :key="result.id">
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSearch } from "@/composables/useSearch";

const searchQuery = ref("");
const { results, loading, error } = useSearch(searchQuery, {
  // Adiciona um debounce para não pesquisar a cada tecla
  debounce: 300,
});
</script>
```

### Composição de Composables

Um dos principais benefícios dos composables é que eles podem ser compostos para criar funcionalidades mais complexas:

```javascript
// composables/usePagination.js
import { ref, computed } from "vue";

export function usePagination(items, itemsPerPage = 10) {
  const currentPage = ref(1);

  const totalPages = computed(() =>
    Math.ceil(items.value.length / itemsPerPage)
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.value.slice(start, end);
  });

  function goToPage(page) {
    currentPage.value = Math.min(Math.max(1, page), totalPages.value);
  }

  function nextPage() {
    goToPage(currentPage.value + 1);
  }

  function prevPage() {
    goToPage(currentPage.value - 1);
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
  };
}

// composables/useSearchWithPagination.js
import { useSearch } from "./useSearch";
import { usePagination } from "./usePagination";

export function useSearchWithPagination(query, itemsPerPage = 10) {
  const { results, loading, error, search } = useSearch(query);
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination(results, itemsPerPage);

  return {
    // Do useSearch
    results,
    loading,
    error,
    search,

    // Do usePagination
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
  };
}
```

Usando o composable composto:

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />

    <div v-if="loading">Searching...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="item in paginatedItems" :key="item.id">
          {{ item.title }}
        </li>
      </ul>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>

        <span>{{ currentPage }} / {{ totalPages }}</span>

        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSearchWithPagination } from "@/composables/useSearchWithPagination";

const searchQuery = ref("");
const {
  loading,
  error,
  paginatedItems,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
} = useSearchWithPagination(searchQuery, 5);
</script>
```

### Padrões Avançados de Composables

#### 1. Composables com Estado Compartilhado

Às vezes, você precisa compartilhar estado entre componentes. Os composables podem implementar um padrão singleton:

```javascript
// composables/useSharedCounter.js
import { ref } from "vue";

// Estado compartilhado (criado apenas uma vez)
const count = ref(0);

export function useSharedCounter() {
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
```

#### 2. Composables com Factory

Para casos onde você precisa de múltiplas instâncias independentes:

```javascript
// composables/createCounter.js
import { ref } from "vue";

export function createCounter(initialValue = 0) {
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

// Uso
const counter1 = createCounter(0);
const counter2 = createCounter(10);
```

#### 3. Composables com Contexto

Para composables que precisam de acesso ao contexto do componente:

```javascript
// composables/useTranslation.js
import { inject, computed } from "vue";

export function useTranslation() {
  // Injeta o contexto de i18n fornecido por um componente pai
  const i18n = inject("i18n");

  if (!i18n) {
    throw new Error(
      "useTranslation must be used within a component with i18n provided"
    );
  }

  function t(key, params = {}) {
    return i18n.translate(key, params);
  }

  const locale = computed(() => i18n.locale);

  function setLocale(newLocale) {
    i18n.setLocale(newLocale);
  }

  return {
    t,
    locale,
    setLocale,
  };
}
```

#### 4. Composables Assíncronos

Para carregar dados assíncronos:

```javascript
// composables/useAsyncData.js
import { ref, onMounted } from "vue";

export function useAsyncData(fetchFunction) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  async function load() {
    loading.value = true;
    error.value = null;

    try {
      data.value = await fetchFunction();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    load();
  });

  return {
    data,
    loading,
    error,
    load,
  };
}

// Uso
function fetchUsers() {
  return fetch("/api/users").then((r) => r.json());
}

const { data: users, loading, error } = useAsyncData(fetchUsers);
```

### Melhores Práticas para Composables

1. **Nomeie composables com o prefixo `use`**:

   ```javascript
   // Bom
   export function useCounter() {
     /* ... */
   }

   // Evite
   export function counter() {
     /* ... */
   }
   ```

2. **Retorne um objeto simples, não um reactive ou ref**:

   ```javascript
   // Bom
   return {
     count,
     increment,
   };

   // Evite
   return reactive({
     count,
     increment,
   });
   ```

3. **Documente parâmetros e valores retornados**:

   ```javascript
   /**
    * Gerencia um contador com incremento e decremento
    * @param {number} initialValue - Valor inicial do contador
    * @returns {{
    *   count: Ref<number>,
    *   increment: () => void,
    *   decrement: () => void,
    *   reset: () => void
    * }}
    */
   export function useCounter(initialValue = 0) {
     // ...
   }
   ```

4. **Limpe recursos em `onUnmounted`**:

   ```javascript
   export function useEventListener(target, event, callback) {
     onMounted(() => {
       target.addEventListener(event, callback);
     });

     onUnmounted(() => {
       target.removeEventListener(event, callback);
     });
   }
   ```

5. **Mantenha composables focados em uma única responsabilidade**:

   ```javascript
   // Bom: Composables focados
   const { user } = useUser();
   const { posts } = usePosts(user);

   // Evite: Composable que faz muitas coisas
   const { user, posts, comments, likes } = useUserData();
   ```

6. **Trate erros e casos de borda**:

   ```javascript
   export function useLocalStorage(key, defaultValue) {
     const data = ref(defaultValue);

     try {
       const stored = localStorage.getItem(key);
       if (stored) {
         data.value = JSON.parse(stored);
       }
     } catch (e) {
       console.error(`Error reading ${key} from localStorage:`, e);
     }

     watch(data, (newValue) => {
       try {
         localStorage.setItem(key, JSON.stringify(newValue));
       } catch (e) {
         console.error(`Error writing ${key} to localStorage:`, e);
       }
     });

     return data;
   }
   ```

7. **Teste seus composables independentemente dos componentes**:

   ```javascript
   // tests/useCounter.spec.js
   import { useCounter } from "@/composables/useCounter";

   describe("useCounter", () => {
     test("should increment counter", () => {
       const { count, increment } = useCounter(0);
       expect(count.value).toBe(0);

       increment();
       expect(count.value).toBe(1);
     });
   });
   ```

## Aula 7.3: Trabalhando com refs, reactive e computed

### Entendendo a Reatividade no Vue 3

A reatividade é o sistema que permite ao Vue rastrear mudanças no estado da aplicação e atualizar automaticamente o DOM quando necessário. No Vue 3, o sistema de reatividade foi reescrito para ser mais eficiente e flexível.

#### Como a Reatividade Funciona

1. **Proxies**: O Vue 3 usa JavaScript Proxies para interceptar operações de acesso e modificação de propriedades.
2. **Rastreamento de Dependências**: Durante a renderização, o Vue rastreia quais propriedades reativas são acessadas.
3. **Notificação de Mudanças**: Quando uma propriedade reativa é modificada, o Vue notifica todos os lugares que dependem dela.
4. **Re-renderização Eficiente**: Apenas os componentes afetados são re-renderizados.

### Aprofundando em `ref`

#### O que é `ref`?

`ref` é uma função que cria um objeto reativo em torno de um valor. O valor é acessado através da propriedade `.value`.

```javascript
import { ref } from "vue";

const count = ref(0);
console.log(count.value); // 0
count.value++;
console.log(count.value); // 1
```

#### Características Importantes de `ref`

1. **Wrapper Reativo**: `ref` cria um objeto wrapper com uma propriedade `.value` reativa.
2. **Desempacotamento Automático em Templates**: Em templates, o `.value` é automaticamente desempacotado.
3. **Funciona com Qualquer Tipo**: Pode conter primitivos ou objetos.
4. **Objetos são Convertidos para `reactive`**: Quando um objeto é passado para `ref`, ele é internamente convertido para `reactive`.

#### Casos de Uso para `ref`

- Valores primitivos (números, strings, booleanos)
- Quando você precisa passar uma referência reativa como prop
- Quando você precisa trocar o valor inteiro (não apenas propriedades)

#### Métodos Auxiliares para `ref`

##### `isRef`

Verifica se um valor é um ref:

```javascript
import { ref, isRef } from "vue";

const foo = ref(1);
const bar = 1;

console.log(isRef(foo)); // true
console.log(isRef(bar)); // false
```

##### `unref`

Retorna o valor interno se for um ref, ou o próprio valor caso contrário:

```javascript
import { ref, unref } from "vue";

const foo = ref(1);
console.log(unref(foo)); // 1

const bar = 1;
console.log(unref(bar)); // 1
```

##### `toRef`

Cria um ref que referencia uma propriedade de um objeto reativo:

```javascript
import { reactive, toRef } from "vue";

const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, "foo");

// Mudar o ref atualiza o original
fooRef.value++;
console.log(state.foo); // 2

// Mudar o original atualiza o ref
state.foo++;
console.log(fooRef.value); // 3
```

##### `toRefs`

Converte um objeto reativo em um objeto normal com todas as propriedades convertidas para refs:

```javascript
import { reactive, toRefs } from "vue";

const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);

// Desestruturação preservando reatividade
const { foo, bar } = stateAsRefs;

foo.value++;
console.log(state.foo); // 2
```

##### `customRef`

Cria um ref personalizado com controle explícito sobre o rastreamento e acionamento de reatividade:

```javascript
import { customRef } from "vue";

// Ref com debounce
function useDebouncedRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track(); // Rastreia quando o valor é acessado
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger(); // Notifica sobre a mudança após o delay
        }, delay);
      },
    };
  });
}

// Uso
const searchQuery = useDebouncedRef("", 500);
```

### Aprofundando em `reactive`

#### O que é `reactive`?

`reactive` é uma função que torna um objeto JavaScript completamente reativo, permitindo acesso direto às suas propriedades (sem `.value`).

```javascript
import { reactive } from "vue";

const state = reactive({
  count: 0,
  name: "Vue",
});

console.log(state.count); // 0
state.count++;
console.log(state.count); // 1
```

#### Características Importantes de `reactive`

1. **Reatividade Profunda**: Todas as propriedades aninhadas também são reativas.
2. **Apenas para Objetos**: Funciona apenas com objetos, arrays e coleções (Map, Set).
3. **Acesso Direto**: Não precisa de `.value` para acessar propriedades.
4. **Limitações com Desestruturação**: Perde a reatividade quando desestruturado.

#### Casos de Uso para `reactive`

- Estado complexo com múltiplas propriedades relacionadas
- Quando você precisa de reatividade profunda
- Quando você quer uma sintaxe mais limpa sem `.value`

#### Métodos Auxiliares para `reactive`

##### `isReactive`

Verifica se um objeto foi criado com `reactive`:

```javascript
import { reactive, isReactive } from "vue";

const state = reactive({});
console.log(isReactive(state)); // true

const plain = {};
console.log(isReactive(plain)); // false
```

##### `markRaw`

Marca um objeto para nunca ser convertido em proxy reativo:

```javascript
import { reactive, markRaw } from "vue";

const foo = markRaw({ count: 1 });
const state = reactive({
  foo,
});

// state.foo é não-reativo
state.foo.count++;
```

##### `shallowReactive`

Cria um objeto reativo que rastreia apenas as propriedades de nível superior:

```javascript
import { shallowReactive } from "vue";

const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2,
  },
});

// Isso é reativo
state.foo++;

// Isso NÃO é reativo
state.nested.bar++;
```

##### `readonly`

Cria uma versão somente leitura de um objeto:

```javascript
import { reactive, readonly } from "vue";

const original = reactive({ count: 0 });
const copy = readonly(original);

// Funciona
original.count++;

// Aviso: "Set operation on key 'count' failed: target is readonly"
copy.count++;
```

##### `shallowReadonly`

Cria uma versão somente leitura de um objeto, mas apenas no nível superior:

```javascript
import { shallowReadonly } from "vue";

const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2,
  },
});

// Aviso: operação somente leitura
state.foo++;

// Isso funciona, pois nested não é readonly
state.nested.bar++;
```

### Aprofundando em `computed`

#### O que é `computed`?

`computed` cria uma propriedade derivada que rastreia automaticamente suas dependências reativas e só é recalculada quando necessário.

```javascript
import { ref, computed } from "vue";

const count = ref(0);
const double = computed(() => count.value * 2);

console.log(double.value); // 0
count.value++;
console.log(double.value); // 2
```

#### Características Importantes de `computed`

1. **Caching**: O valor é calculado apenas quando uma dependência muda.
2. **Somente Leitura por Padrão**: Retorna um ref somente leitura.
3. **Lazy Evaluation**: Só é avaliado quando acessado.
4. **Rastreamento de Dependências**: Rastreia automaticamente dependências reativas.

#### Computed com Getter e Setter

Você pode criar uma propriedade computada com getter e setter:

```javascript
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newValue) => {
    const names = newValue.split(" ");
    firstName.value = names[0];
    lastName.value = names[1] || "";
  },
});

console.log(fullName.value); // "John Doe"
fullName.value = "Jane Smith";
console.log(firstName.value); // "Jane"
console.log(lastName.value); // "Smith"
```

#### Casos de Uso para `computed`

- Valores derivados de outras propriedades reativas
- Filtragem ou transformação de dados
- Propriedades que precisam de getter e setter personalizados
- Cálculos complexos que não devem ser refeitos a cada renderização

### Comparação entre `ref`, `reactive` e `computed`

| Característica        | `ref`                           | `reactive`        | `computed`                 |
| --------------------- | ------------------------------- | ----------------- | -------------------------- |
| Tipos suportados      | Qualquer tipo                   | Apenas objetos    | -                          |
| Sintaxe de acesso     | `.value`                        | Acesso direto     | `.value`                   |
| Desestruturação       | Mantém reatividade com `toRefs` | Perde reatividade | -                          |
| Reatribuição completa | Suporta                         | Não suporta       | -                          |
| Caching               | Não                             | Não               | Sim                        |
| Dependências          | -                               | -                 | Rastreadas automaticamente |
| Caso de uso principal | Valores primitivos              | Objetos complexos | Valores derivados          |

### Armadilhas Comuns e Como Evitá-las

#### 1. Perda de Reatividade com Desestruturação

```javascript
// ❌ Problema: Perda de reatividade
const state = reactive({ count: 0 });
const { count } = state; // count não é reativo

// ✅ Solução 1: Use toRefs
const state = reactive({ count: 0 });
const { count } = toRefs(state); // count é um ref

// ✅ Solução 2: Use refs diretamente
const count = ref(0);
const name = ref("Vue");
```

#### 2. Mutação de Objetos em `ref`

```javascript
// ❌ Problema: Mutação não detectada
const obj = { count: 0 };
const objRef = ref(obj);
obj.count++; // Não é reativo!

// ✅ Solução: Mute através do .value
objRef.value.count++;
```

#### 3. Reatribuição de Objetos `reactive`

```javascript
// ❌ Problema: Perda de referência reativa
const state = reactive({ count: 0 });
// Isso cria um novo objeto, perdendo a reatividade
state = { count: 1 }; // Erro!

// ✅ Solução 1: Mute propriedades individuais
state.count = 1;

// ✅ Solução 2: Use ref para o objeto inteiro
const state = ref({ count: 0 });
state.value = { count: 1 }; // OK
```

#### 4. Propriedades Não Declaradas em `reactive`

```javascript
// ❌ Problema: Propriedade não detectada
const state = reactive({});
state.count = 0; // Adicionada, mas pode não ser reativa em alguns casos

// ✅ Solução: Declare todas as propriedades inicialmente
const state = reactive({ count: 0 });
```

#### 5. Arrays em `reactive`

```javascript
// ❌ Problema: Métodos que substituem o array
const list = reactive([1, 2, 3]);
// Esses métodos retornam um novo array, não modificam o original
const filtered = list.filter((n) => n > 1); // filtered não é reativo

// ✅ Solução 1: Armazene o resultado em uma propriedade reativa
list.filtered = list.filter((n) => n > 1);

// ✅ Solução 2: Use computed
const filtered = computed(() => list.filter((n) => n > 1));
```

#### 6. Valores Primitivos em `reactive`

```javascript
// ❌ Problema: Primitivos não podem ser reativos diretamente
const state = reactive({
  count: 0,
});
let double = state.count * 2; // double não é reativo

// ✅ Solução: Use computed
const double = computed(() => state.count * 2);
```

### Melhores Práticas para Reatividade

1. **Escolha a API Certa para o Caso de Uso**:

   - Use `ref` para valores primitivos
   - Use `reactive` para objetos complexos
   - Use `computed` para valores derivados

2. **Declare Todo o Estado no Início**:

   ```javascript
   // Bom
   const state = reactive({
     user: null,
     loading: false,
     error: null,
   });

   // Evite adicionar propriedades depois
   state.newProp = "value";
   ```

3. **Use `toRefs` para Desestruturação**:

   ```javascript
   const state = reactive({ count: 0, name: "Vue" });
   const { count, name } = toRefs(state);
   ```

4. **Prefira Refs para Valores que Precisam ser Reatribuídos**:

   ```javascript
   // Bom
   const user = ref(null);
   user.value = fetchUser();

   // Problemático
   const state = reactive({ user: null });
   state.user = fetchUser(); // OK
   state = { user: fetchUser() }; // Erro!
   ```

5. **Use `computed` para Lógica Derivada Complexa**:

   ```javascript
   // Bom
   const filteredItems = computed(() => {
     return items.value
       .filter((item) => item.active)
       .sort((a, b) => a.name.localeCompare(b.name));
   });

   // Evite recalcular em cada renderização
   function getFilteredItems() {
     return items.value
       .filter((item) => item.active)
       .sort((a, b) => a.name.localeCompare(b.name));
   }
   ```

6. **Evite Mutações Fora do Componente**:

   ```javascript
   // Problemático
   const sharedState = reactive({ count: 0 });
   export function incrementCount() {
     sharedState.count++; // Mutação externa difícil de rastrear
   }

   // Melhor
   export const useSharedState = () => {
     const state = reactive({ count: 0 });

     function incrementCount() {
       state.count++;
     }

     return {
       state: readonly(state), // Expõe como somente leitura
       incrementCount,
     };
   };
   ```

7. **Use `shallowRef` e `shallowReactive` para Grandes Objetos**:
   ```javascript
   // Para objetos grandes onde apenas o nível superior precisa ser reativo
   const bigObject = shallowRef({
     // Muitos dados aninhados que não precisam ser reativos
   });
   ```

## Aula 7.4: Ciclo de vida e hooks

### Ciclo de Vida dos Componentes Vue

O ciclo de vida de um componente Vue refere-se às diferentes fases pelas quais um componente passa, desde sua criação até sua destruição. Entender esse ciclo é essencial para executar código em momentos específicos.

#### Visão Geral do Ciclo de Vida

1. **Criação**: O componente é inicializado, mas ainda não está no DOM
2. **Montagem**: O componente é inserido no DOM
3. **Atualização**: O componente é re-renderizado devido a mudanças reativas
4. **Desmontagem**: O componente é removido do DOM
5. **Tratamento de Erros**: Captura erros durante a renderização

### Hooks de Ciclo de Vida na Composition API

Na Composition API, os hooks de ciclo de vida são funções que podem ser chamadas dentro de `setup()` ou `<script setup>`:

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from "vue";

export default {
  setup() {
    // Criação
    console.log("setup() está sendo executado");

    // Montagem
    onBeforeMount(() => {
      console.log("Antes da montagem");
    });

    onMounted(() => {
      console.log("Componente montado");
    });

    // Atualização
    onBeforeUpdate(() => {
      console.log("Antes da atualização");
    });

    onUpdated(() => {
      console.log("Componente atualizado");
    });

    // Desmontagem
    onBeforeUnmount(() => {
      console.log("Antes da desmontagem");
    });

    onUnmounted(() => {
      console.log("Componente desmontado");
    });

    // Outros hooks
    onActivated(() => {
      console.log("Componente ativado (keep-alive)");
    });

    onDeactivated(() => {
      console.log("Componente desativado (keep-alive)");
    });

    onErrorCaptured((err, instance, info) => {
      console.log("Erro capturado:", err);
      return false; // Impede a propagação do erro
    });

    // Hooks de depuração
    onRenderTracked((event) => {
      console.log("Renderização rastreada:", event);
    });

    onRenderTriggered((event) => {
      console.log("Renderização acionada:", event);
    });

    return {};
  },
};
```

Com `<script setup>`, fica ainda mais simples:

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("Componente montado");
});

onUnmounted(() => {
  console.log("Componente desmontado");
});
</script>
```

### Detalhes de Cada Hook de Ciclo de Vida

#### 1. Fase de Criação

Na Composition API, não existem hooks específicos para `beforeCreate` e `created`. O código que seria colocado nesses hooks na Options API é simplesmente colocado no corpo da função `setup()` ou no nível superior de `<script setup>`.

```vue
<script setup>
import { ref } from "vue";

// Isso é executado durante a "criação" do componente
console.log("Componente está sendo criado");
const count = ref(0);
</script>
```

#### 2. Fase de Montagem

##### `onBeforeMount`

Chamado antes que o componente seja montado no DOM:

```javascript
onBeforeMount(() => {
  console.log("Antes da montagem");
  // O DOM ainda não está disponível
});
```

Casos de uso:

- Configurações finais antes da renderização
- Inicialização de variáveis que dependem do ciclo de vida

##### `onMounted`

Chamado depois que o componente foi montado no DOM:

```javascript
onMounted(() => {
  console.log("Componente montado");
  // O DOM está disponível
  const element = document.getElementById("my-element");
});
```

Casos de uso:

- Acessar ou manipular o DOM
- Iniciar requisições de dados
- Adicionar event listeners
- Inicializar bibliotecas de terceiros

#### 3. Fase de Atualização

##### `onBeforeUpdate`

Chamado antes que o componente seja re-renderizado devido a uma mudança reativa:

```javascript
onBeforeUpdate(() => {
  console.log("Antes da atualização");
  // Acesso ao DOM antes da atualização
});
```

Casos de uso:

- Capturar o estado do DOM antes da atualização
- Realizar cálculos antes da atualização

##### `onUpdated`

Chamado depois que o componente foi re-renderizado devido a uma mudança reativa:

```javascript
onUpdated(() => {
  console.log("Componente atualizado");
  // DOM atualizado
});
```

Casos de uso:

- Acessar o DOM após uma atualização
- Realizar ações após uma atualização de dados
- **Cuidado**: Evite modificar o estado aqui, pode causar loops infinitos

#### 4. Fase de Desmontagem

##### `onBeforeUnmount`

Chamado antes que o componente seja removido do DOM:

```javascript
onBeforeUnmount(() => {
  console.log("Antes da desmontagem");
  // Componente ainda está totalmente funcional
});
```

Casos de uso:

- Preparar o componente para remoção
- Salvar estado temporário

##### `onUnmounted`

Chamado depois que o componente foi removido do DOM:

```javascript
onUnmounted(() => {
  console.log("Componente desmontado");
  // Limpeza
});
```

Casos de uso:

- Limpar event listeners
- Cancelar requisições pendentes
- Limpar timers (clearInterval, clearTimeout)
- Desconectar de serviços externos

#### 5. Hooks para Keep-Alive

##### `onActivated`

Chamado quando um componente dentro de `<keep-alive>` é ativado:

```javascript
onActivated(() => {
  console.log("Componente ativado");
  // Componente foi reativado
});
```

Casos de uso:

- Atualizar dados quando o componente é mostrado novamente
- Reiniciar animações ou timers

##### `onDeactivated`

Chamado quando um componente dentro de `<keep-alive>` é desativado:

```javascript
onDeactivated(() => {
  console.log("Componente desativado");
  // Componente foi escondido, mas não destruído
});
```

Casos de uso:

- Pausar animações ou timers
- Salvar o estado atual para reativação posterior

#### 6. Hooks de Tratamento de Erros

##### `onErrorCaptured`

Chamado quando um erro de um componente descendente é capturado:

```javascript
onErrorCaptured((error, instance, info) => {
  console.log("Erro capturado:", error);
  console.log("Componente que causou o erro:", instance);
  console.log("Informações do erro:", info);

  // Retornar false impede que o erro se propague
  return false;
});
```

Casos de uso:

- Logging de erros
- Exibir mensagens de erro amigáveis
- Recuperação de erros
- Telemetria de erros

#### 7. Hooks de Depuração

##### `onRenderTracked`

Chamado quando uma dependência reativa é rastreada pela primeira vez:

```javascript
onRenderTracked((event) => {
  console.log("Dependência rastreada:", event);
  // event: { target: objeto, type: operação, key: propriedade }
});
```

Casos de uso:

- Depuração de reatividade
- Entender quais dependências estão sendo rastreadas

##### `onRenderTriggered`

Chamado quando uma dependência reativa aciona uma re-renderização:

```javascript
onRenderTriggered((event) => {
  console.log("Renderização acionada por:", event);
  // event: { target: objeto, type: operação, key: propriedade }
});
```

Casos de uso:

- Depuração de re-renderizações
- Identificar a causa de atualizações inesperadas

### Comparação com a Options API

| Composition API               | Options API                                   |
| ----------------------------- | --------------------------------------------- |
| Código no início de `setup()` | `beforeCreate`, `created`                     |
| `onBeforeMount`               | `beforeMount`                                 |
| `onMounted`                   | `mounted`                                     |
| `onBeforeUpdate`              | `beforeUpdate`                                |
| `onUpdated`                   | `updated`                                     |
| `onBeforeUnmount`             | `beforeUnmount` (ou `beforeDestroy` no Vue 2) |
| `onUnmounted`                 | `unmounted` (ou `destroyed` no Vue 2)         |
| `onActivated`                 | `activated`                                   |
| `onDeactivated`               | `deactivated`                                 |
| `onErrorCaptured`             | `errorCaptured`                               |
| `onRenderTracked`             | -                                             |
| `onRenderTriggered`           | -                                             |

### Padrões Comuns com Hooks de Ciclo de Vida

#### 1. Carregamento de Dados

```vue
<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">Erro: {{ error }}</div>
    <div v-else>
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const user = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`/api/users/1`);
    if (!response.ok) throw new Error("Falha ao carregar usuário");
    user.value = await response.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>
```

#### 2. Gerenciamento de Event Listeners

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";

function handleResize() {
  console.log("Janela redimensionada");
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
```

#### 3. Integração com Bibliotecas de Terceiros

```vue
<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from "vue";
import Chart from "chart.js/auto";

const chartContainer = ref(null);
const chart = ref(null);
const props = defineProps({
  data: Array,
});

function createChart() {
  if (chart.value) {
    chart.value.destroy();
  }

  const ctx = chartContainer.value.getContext("2d");
  chart.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels: props.data.map((d) => d.label),
      datasets: [
        {
          label: "Dados",
          data: props.data.map((d) => d.value),
        },
      ],
    },
  });
}

onMounted(() => {
  createChart();
});

onUpdated(() => {
  createChart();
});

onUnmounted(() => {
  if (chart.value) {
    chart.value.destroy();
  }
});
</script>
```

#### 4. Animações de Entrada/Saída

```vue
<template>
  <div ref="element" class="animated-element"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const element = ref(null);
let animation = null;

onMounted(() => {
  // Animação de entrada
  animation = gsap.from(element.value, {
    opacity: 0,
    y: 50,
    duration: 0.5,
  });
});

onBeforeUnmount(() => {
  // Animação de saída
  gsap.to(element.value, {
    opacity: 0,
    y: -50,
    duration: 0.3,
  });

  // Limpar animação anterior
  if (animation) animation.kill();
});
</script>
```

#### 5. Salvamento Automático

```vue
<template>
  <textarea v-model="content"></textarea>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const content = ref("");
const savedContent = ref("");
let saveInterval = null;

// Carregar conteúdo salvo
onMounted(() => {
  const saved = localStorage.getItem("draft");
  if (saved) {
    content.value = saved;
    savedContent.value = saved;
  }

  // Configurar salvamento automático a cada 5 segundos
  saveInterval = setInterval(saveContent, 5000);
});

// Limpar intervalo ao desmontar
onUnmounted(() => {
  clearInterval(saveInterval);
  saveContent(); // Salvar uma última vez
});

// Salvar quando o conteúdo mudar
watch(content, (newContent) => {
  if (newContent !== savedContent.value) {
    // Conteúdo mudou desde o último salvamento
    document.title = "* Rascunho não salvo";
  }
});

function saveContent() {
  if (content.value !== savedContent.value) {
    localStorage.setItem("draft", content.value);
    savedContent.value = content.value;
    document.title = "Rascunho salvo";
    console.log("Rascunho salvo:", new Date());
  }
}
</script>
```

### Melhores Práticas para Hooks de Ciclo de Vida

1. **Mantenha os Hooks Organizados**:

   ```javascript
   // Bom: Agrupados por funcionalidade
   function setupChartLibrary() {
     onMounted(() => {
       initChart();
     });

     onUnmounted(() => {
       destroyChart();
     });
   }

   function setupEventListeners() {
     onMounted(() => {
       window.addEventListener("resize", handleResize);
     });

     onUnmounted(() => {
       window.removeEventListener("resize", handleResize);
     });
   }

   setupChartLibrary();
   setupEventListeners();
   ```

2. **Sempre Limpe Recursos em `onUnmounted`**:

   ```javascript
   onMounted(() => {
     const timer = setInterval(() => {
       // ...
     }, 1000);

     // Armazene o timer para limpeza
     onUnmounted(() => {
       clearInterval(timer);
     });
   });
   ```

3. **Use `onErrorCaptured` para Tratamento Robusto de Erros**:

   ```javascript
   onErrorCaptured((error, instance, info) => {
     // Log do erro
     console.error(`Error: ${error}`);
     console.error(`Component: ${instance}`);
     console.error(`Info: ${info}`);

     // Notificar serviço de monitoramento
     errorTrackingService.report(error, { component: instance, info });

     // Mostrar mensagem amigável ao usuário
     errorMessage.value = "Ocorreu um erro. Por favor, tente novamente.";

     // Impedir propagação do erro
     return false;
   });
   ```

4. **Evite Modificar Estado em `onUpdated`**:

   ```javascript
   // Ruim: Pode causar loop infinito
   onUpdated(() => {
     count.value++; // Isso causará outra atualização!
   });

   // Bom: Use watch ou computed para reações a mudanças
   watch(source, () => {
     // Reaja a mudanças aqui
   });
   ```

5. **Use `onActivated` e `onDeactivated` com `<keep-alive>`**:

   ```vue
   <template>
     <keep-alive>
       <component :is="currentTab"></component>
     </keep-alive>
   </template>

   <script setup>
   import { onActivated, onDeactivated } from "vue";

   onActivated(() => {
     // Atualizar dados quando o componente é mostrado
     refreshData();
   });

   onDeactivated(() => {
     // Pausar operações quando o componente é escondido
     pauseOperations();
   });
   </script>
   ```

6. **Extraia Lógica de Ciclo de Vida para Composables**:

   ```javascript
   // useWindowSize.js
   import { ref, onMounted, onUnmounted } from "vue";

   export function useWindowSize() {
     const width = ref(window.innerWidth);
     const height = ref(window.innerHeight);

     function update() {
       width.value = window.innerWidth;
       height.value = window.innerHeight;
     }

     onMounted(() => {
       window.addEventListener("resize", update);
     });

     onUnmounted(() => {
       window.removeEventListener("resize", update);
     });

     return { width, height };
   }

   // Uso no componente
   const { width, height } = useWindowSize();
   ```

7. **Use `nextTick` para Operações após Renderização**:

   ```javascript
   import { nextTick } from "vue";

   async function updateAndScroll() {
     // Atualizar estado
     items.value.push(newItem);

     // Esperar pela próxima atualização do DOM
     await nextTick();

     // Agora o DOM está atualizado
     container.value.scrollTop = container.value.scrollHeight;
   }
   ```

## Exercício Prático: Desenvolvimento de uma aplicação de tarefas com Composition API

### Objetivo

Criar uma aplicação de gerenciamento de tarefas (Todo List) utilizando a Composition API do Vue 3, demonstrando o uso de refs, reactive, computed, composables e hooks de ciclo de vida.

### Requisitos

1. Criar, editar, excluir e marcar tarefas como concluídas
2. Filtrar tarefas por status (todas, ativas, concluídas)
3. Persistir tarefas no localStorage
4. Implementar funcionalidade de arrastar e soltar para reordenar tarefas
5. Adicionar estatísticas e gráfico de progresso

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest todo-composition-api -- --template vue
cd todo-composition-api
npm install
```

### Passo 2: Criar Composables para Gerenciamento de Tarefas

```javascript
// src/composables/useTodos.js
import { ref, computed, watch } from "vue";

export function useTodos() {
  const todos = ref([]);
  const filter = ref("all"); // 'all', 'active', 'completed'

  // Carregar do localStorage
  const loadTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }
  };

  // Salvar no localStorage quando todos mudar
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  // Tarefas filtradas
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "active":
        return todos.value.filter((todo) => !todo.completed);
      case "completed":
        return todos.value.filter((todo) => todo.completed);
      default:
        return todos.value;
    }
  });

  // Estatísticas
  const stats = computed(() => {
    const total = todos.value.length;
    const completed = todos.value.filter((todo) => todo.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      active,
      progress,
    };
  });

  // Adicionar tarefa
  const addTodo = (text) => {
    if (text.trim()) {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date(),
      });
    }
  };

  // Remover tarefa
  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  // Alternar status de conclusão
  const toggleTodo = (id) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  // Editar texto da tarefa
  const editTodo = (id, text) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo && text.trim()) {
      todo.text = text;
    }
  };

  // Reordenar tarefas
  const reorderTodos = (fromIndex, toIndex) => {
    const todoToMove = todos.value.splice(fromIndex, 1)[0];
    todos.value.splice(toIndex, 0, todoToMove);
  };

  // Limpar tarefas concluídas
  const clearCompleted = () => {
    todos.value = todos.value.filter((todo) => !todo.completed);
  };

  return {
    todos,
    filter,
    filteredTodos,
    stats,
    loadTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    reorderTodos,
    clearCompleted,
  };
}
```

### Passo 3: Criar Composable para Drag and Drop

```javascript
// src/composables/useDragAndDrop.js
import { ref } from "vue";

export function useDragAndDrop(onReorder) {
  const draggedItem = ref(null);

  const onDragStart = (event, index) => {
    draggedItem.value = index;
    event.dataTransfer.effectAllowed = "move";
    // Adicionar uma classe para estilização
    event.target.classList.add("dragging");
  };

  const onDragEnd = (event) => {
    // Remover a classe de estilização
    event.target.classList.remove("dragging");
    draggedItem.value = null;
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDragEnter = (event) => {
    event.target.classList.add("drag-over");
  };

  const onDragLeave = (event) => {
    event.target.classList.remove("drag-over");
  };

  const onDrop = (event, index) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");

    if (draggedItem.value !== null && draggedItem.value !== index) {
      onReorder(draggedItem.value, index);
    }
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
  };
}
```

### Passo 4: Criar Componente TodoItem

```vue
<!-- src/components/TodoItem.vue -->
<template>
  <div
    class="todo-item"
    :class="{ completed: todo.completed, editing: isEditing }"
    draggable="true"
    @dragstart="onDragStart($event, index)"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop($event, index)"
  >
    <div v-if="!isEditing" class="todo-item-view">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
      />
      <span class="todo-text" @dblclick="startEditing">
        {{ todo.text }}
      </span>
      <button class="delete-btn" @click="$emit('remove', todo.id)">×</button>
    </div>
    <div v-else class="todo-item-edit">
      <input
        ref="editInput"
        type="text"
        v-model="editText"
        @blur="finishEditing"
        @keyup.enter="finishEditing"
        @keyup.escape="cancelEditing"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["toggle", "remove", "edit"]);

// Drag and drop props
const { onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop } =
  defineProps([
    "onDragStart",
    "onDragEnd",
    "onDragOver",
    "onDragEnter",
    "onDragLeave",
    "onDrop",
  ]);

// Edição
const isEditing = ref(false);
const editText = ref("");
const editInput = ref(null);

function startEditing() {
  isEditing.value = true;
  editText.value = props.todo.text;

  // Focar o input após a próxima atualização do DOM
  nextTick(() => {
    editInput.value.focus();
  });
}

function finishEditing() {
  if (isEditing.value) {
    isEditing.value = false;
    emit("edit", props.todo.id, editText.value);
  }
}

function cancelEditing() {
  isEditing.value = false;
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #e6e6e6;
  background-color: white;
  transition: background-color 0.2s;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.todo-item-view {
  display: flex;
  align-items: center;
  width: 100%;
}

.todo-text {
  flex: 1;
  margin-left: 10px;
  word-break: break-word;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #d9d9d9;
}

.delete-btn {
  opacity: 0;
  color: #cc9a9a;
  font-size: 22px;
  cursor: pointer;
  transition: opacity 0.2s;
  background: none;
  border: none;
}

.delete-btn:hover {
  color: #af5b5e;
}

.todo-item-edit {
  width: 100%;
}

.todo-item-edit input {
  width: 100%;
  padding: 8px;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
}

.dragging {
  opacity: 0.5;
}

.drag-over {
  border-top: 2px solid #42b983;
}
</style>
```

### Passo 5: Criar Componente TodoStats

```vue
<!-- src/components/TodoStats.vue -->
<template>
  <div class="todo-stats">
    <div class="stats-summary">
      <div class="stat-item">
        <span class="stat-label">Total:</span>
        <span class="stat-value">{{ stats.total }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Ativas:</span>
        <span class="stat-value">{{ stats.active }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Concluídas:</span>
        <span class="stat-value">{{ stats.completed }}</span>
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${stats.progress}%` }"></div>
      <span class="progress-text">{{ stats.progress }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.todo-stats {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.stats-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-right: 5px;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.progress-bar-container {
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #42b983;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 20px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
```

### Passo 6: Criar Componente TodoFilters

```vue
<!-- src/components/TodoFilters.vue -->
<template>
  <div class="todo-filters">
    <button
      v-for="option in filterOptions"
      :key="option.value"
      :class="{ active: modelValue === option.value }"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>

    <button
      v-if="hasCompleted"
      class="clear-completed"
      @click="$emit('clear-completed')"
    >
      Limpar concluídas
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "all",
  },
  hasCompleted: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue", "clear-completed"]);

const filterOptions = [
  { value: "all", label: "Todas" },
  { value: "active", label: "Ativas" },
  { value: "completed", label: "Concluídas" },
];
</script>

<style scoped>
.todo-filters {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
}

button {
  padding: 5px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #777;
}

button:hover {
  border-color: #ccc;
}

button.active {
  border-color: #42b983;
  color: #42b983;
}

.clear-completed {
  color: #cc9a9a;
}

.clear-completed:hover {
  color: #af5b5e;
}
</style>
```

### Passo 7: Criar Componente Principal App

```vue
<!-- src/App.vue -->
<template>
  <div class="todo-app">
    <h1>Lista de Tarefas</h1>

    <TodoStats :stats="stats" />

    <div class="todo-input">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="O que precisa ser feito?"
      />
      <button @click="addTodo">Adicionar</button>
    </div>

    <TodoFilters
      v-model="filter"
      :has-completed="stats.completed > 0"
      @clear-completed="clearCompleted"
    />

    <div class="todo-list">
      <p v-if="filteredTodos.length === 0" class="empty-state">
        Nenhuma tarefa encontrada.
      </p>

      <TodoItem
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :on-drag-start="onDragStart"
        :on-drag-end="onDragEnd"
        :on-drag-over="onDragOver"
        :on-drag-enter="onDragEnter"
        :on-drag-leave="onDragLeave"
        :on-drop="onDrop"
        @toggle="toggleTodo"
        @remove="removeTodo"
        @edit="editTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TodoItem from "./components/TodoItem.vue";
import TodoStats from "./components/TodoStats.vue";
import TodoFilters from "./components/TodoFilters.vue";
import { useTodos } from "./composables/useTodos";
import { useDragAndDrop } from "./composables/useDragAndDrop";

// Composable de tarefas
const {
  todos,
  filter,
  filteredTodos,
  stats,
  loadTodos,
  addTodo: addTodoToList,
  removeTodo,
  toggleTodo,
  editTodo,
  reorderTodos,
  clearCompleted,
} = useTodos();

// Composable de drag and drop
const { onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop } =
  useDragAndDrop(reorderTodos);

// Input para nova tarefa
const newTodo = ref("");

// Adicionar nova tarefa
function addTodo() {
  if (newTodo.value.trim()) {
    addTodoToList(newTodo.value);
    newTodo.value = "";
  }
}

// Carregar tarefas ao montar o componente
onMounted(() => {
  loadTodos();
});
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
  background-color: #f5f5f5;
  line-height: 1.4;
}

.todo-app {
  max-width: 550px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #42b983;
  margin-bottom: 20px;
}

.todo-input {
  display: flex;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.todo-input button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.todo-input button:hover {
  background-color: #3aa876;
}

.todo-list {
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
```

### Passo 8: Executar e Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para testar a aplicação de tarefas.

# Exercícios Práticos - Módulo 7: Composition API

## Exercício 1: Refatoração com Composition API

- Pegue um componente Options API
- Refatore para Composition API
- Utilize `setup()`, `ref()`, `reactive()`
- Compare implementações

## Exercício 2: Hooks Personalizados

- Crie um hook para busca de dados
- Implemente lógica de carregamento
- Adicione tratamento de erros
- Use em múltiplos componentes

## Desafio Final

- Desenvolver dashboard com múltiplos componentes
- Use Composition API para compartilhar lógica
- Implemente hooks reutilizáveis
- Demonstre comunicação entre componentes

### Perguntas para Fixação

1. **Qual é a principal diferença entre a Options API e a Composition API?**

   - a) A Composition API não suporta componentes reutilizáveis
   - b) A Options API organiza o código por tipo de opção, enquanto a Composition API permite organizar por funcionalidade lógica
   - c) A Composition API só funciona com TypeScript
   - d) A Options API é mais rápida que a Composition API

2. **Como você acessa o valor de uma referência reativa criada com `ref`?**

   - a) Diretamente, como uma propriedade normal
   - b) Usando a propriedade `.value`
   - c) Usando o método `getValue()`
   - d) Usando a função `unref()`

3. **Qual é a principal vantagem de usar composables?**

   - a) Eles são mais rápidos que mixins
   - b) Eles permitem reutilizar lógica com estado entre componentes
   - c) Eles são a única forma de usar a Composition API
   - d) Eles substituem completamente os componentes

4. **Qual hook de ciclo de vida você usaria para executar código após o componente ser montado no DOM?**

   - a) `onCreated`
   - b) `onMounted`
   - c) `onUpdated`
   - d) `onBeforeMount`

5. **Como você pode preservar a reatividade ao desestruturar um objeto reativo?**
   - a) Usando `reactive()` novamente após a desestruturação
   - b) Usando `toRefs()` antes da desestruturação
   - c) Usando `ref()` para cada propriedade
   - d) A reatividade é sempre preservada na desestruturação

**Respostas:**

1. b) A Options API organiza o código por tipo de opção, enquanto a Composition API permite organizar por funcionalidade lógica
2. b) Usando a propriedade `.value`
3. b) Eles permitem reutilizar lógica com estado entre componentes
4. b) `onMounted`
5. b) Usando `toRefs()` antes da desestruturação
