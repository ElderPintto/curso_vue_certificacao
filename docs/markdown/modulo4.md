# Módulo 4: Componentes e Comunicação

## Aula 4.1: Criação e registro de componentes

### O que são Componentes?

Componentes são uma das características mais poderosas do Vue.js. Eles são blocos de construção reutilizáveis que encapsulam lógica, template e estilo em unidades independentes. Isso permite construir interfaces de usuário complexas a partir de pequenas peças isoladas.

Os componentes Vue seguem o padrão de arquitetura de componentes, que promove:

1. **Reutilização**: Use o mesmo componente em diferentes partes da aplicação
2. **Manutenção**: Altere um componente sem afetar outros
3. **Organização**: Divida a interface em partes gerenciáveis
4. **Testabilidade**: Teste componentes individualmente

### Tipos de Componentes

#### 1. Componentes de Arquivo Único (Single-File Components - SFC)

Os SFCs são arquivos `.vue` que contêm template, script e estilo em um único arquivo:

```vue
<template>
  <div class="botao-contador">
    <button @click="incrementar">Cliques: {{ contador }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contador: 0,
    };
  },
  methods: {
    incrementar() {
      this.contador++;
    },
  },
};
</script>

<style scoped>
.botao-contador {
  margin: 10px;
}
button {
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

#### 2. Componentes Definidos via JavaScript

Você também pode definir componentes diretamente em JavaScript:

```javascript
// Componente global
app.component("botao-contador", {
  template: `
    <div class="botao-contador">
      <button @click="incrementar">Cliques: {{ contador }}</button>
    </div>
  `,
  data() {
    return {
      contador: 0,
    };
  },
  methods: {
    incrementar() {
      this.contador++;
    },
  },
});

// Componente local
const BotaoContador = {
  template: `
    <div class="botao-contador">
      <button @click="incrementar">Cliques: {{ contador }}</button>
    </div>
  `,
  data() {
    return {
      contador: 0,
    };
  },
  methods: {
    incrementar() {
      this.contador++;
    },
  },
};
```

### Anatomia de um Componente Vue

Um componente Vue típico consiste em três partes principais:

#### 1. Template

O template define a estrutura HTML do componente:

```html
<template>
  <div>
    <h1>{{ titulo }}</h1>
    <slot></slot>
  </div>
</template>
```

#### 2. Script

O script define a lógica do componente:

```javascript
<script>
// Options API
export default {
  name: 'MeuComponente',
  props: {
    titulo: String
  },
  data() {
    return {
      // estado local
    }
  },
  methods: {
    // métodos
  },
  computed: {
    // propriedades computadas
  }
}
</script>

// OU

<script setup>
// Composition API
import { ref, computed } from 'vue'

// props
const props = defineProps({
  titulo: String
})

// estado local
const contador = ref(0)

// métodos
function incrementar() {
  contador.value++
}

// propriedades computadas
const contadorDobro = computed(() => contador.value * 2)
</script>
```

#### 3. Estilo

A seção de estilo define a aparência do componente:

```html
<style scoped>
  /* Estilos aplicados apenas a este componente */
  h1 {
    color: #42b983;
  }
</style>
```

### Registro de Componentes

Existem duas maneiras de registrar componentes no Vue:

#### 1. Registro Global

Componentes registrados globalmente podem ser usados em qualquer lugar da aplicação:

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import BotaoContador from "./components/BotaoContador.vue";

const app = createApp(App);

// Registro global
app.component("botao-contador", BotaoContador);

app.mount("#app");
```

**Vantagens**:

- Disponível em toda a aplicação sem importação adicional
- Conveniente para componentes usados frequentemente

**Desvantagens**:

- Aumenta o tamanho do bundle mesmo se o componente não for usado
- Dificulta o rastreamento de dependências
- Não é amigável para tree-shaking

#### 2. Registro Local

Componentes registrados localmente precisam ser importados onde são usados:

```javascript
// ComponentePai.vue (Options API)
import BotaoContador from "./BotaoContador.vue";

export default {
  components: {
    BotaoContador,
  },
};

// ComponentePai.vue (Composition API com <script setup>)
import BotaoContador from "./BotaoContador.vue";
// Não é necessário registro explícito com <script setup>
```

**Vantagens**:

- Melhor tree-shaking (apenas componentes usados são incluídos no bundle)
- Dependências claras e explícitas
- Melhor para aplicações de grande escala

**Desvantagens**:

- Requer importação em cada componente que o utiliza

### Convenções de Nomenclatura

Vue.js segue algumas convenções para nomes de componentes:

#### 1. Nomes de Arquivos

- Use PascalCase: `BotaoContador.vue`
- Ou kebab-case: `botao-contador.vue`

#### 2. Nomes de Componentes no JavaScript

- Use PascalCase ao importar e registrar: `import BotaoContador from './BotaoContador.vue'`

#### 3. Nomes de Tags no Template

- Use kebab-case nos templates: `<botao-contador></botao-contador>`
- Ou PascalCase (apenas no Vue 3): `<BotaoContador></BotaoContador>`

### Componentes Dinâmicos

Vue permite alternar dinamicamente entre componentes usando o elemento `<component>` com o atributo `is`:

```html
<template>
  <div>
    <button v-for="tab in tabs" :key="tab" @click="currentTab = tab">
      {{ tab }}
    </button>

    <component :is="currentTab"></component>
  </div>
</template>

<script>
  import TabHome from "./TabHome.vue";
  import TabPosts from "./TabPosts.vue";
  import TabArchive from "./TabArchive.vue";

  export default {
    components: {
      TabHome,
      TabPosts,
      TabArchive,
    },
    data() {
      return {
        currentTab: "TabHome",
        tabs: ["TabHome", "TabPosts", "TabArchive"],
      };
    },
  };
</script>
```

Para manter o estado do componente quando ele é alternado, use `<keep-alive>`:

```html
<keep-alive>
  <component :is="currentTab"></component>
</keep-alive>
```

### Componentes Assíncronos

Para melhorar o desempenho, você pode carregar componentes de forma assíncrona:

```javascript
// Definição assíncrona (Vue 3)
import { defineAsyncComponent } from "vue";

const AsyncComponent = defineAsyncComponent(() =>
  import("./components/HeavyComponent.vue")
);

// Com opções adicionais
const AsyncComponentWithOptions = defineAsyncComponent({
  loader: () => import("./components/HeavyComponent.vue"),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000,
});
```

### Componentes Recursivos

Componentes podem referenciar a si mesmos em seus próprios templates:

```vue
<template>
  <div class="item">
    <div>{{ item.name }}</div>
    <template v-if="item.children && item.children.length">
      <tree-item
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      ></tree-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "TreeItem", // Nome necessário para referência recursiva
  props: {
    item: Object,
  },
};
</script>
```

### Componentes Funcionais

Componentes funcionais são mais leves porque não têm instância:

```javascript
// Vue 3 Functional Component
import { h } from "vue";

const FunctionalButton = (props, { slots, emit }) => {
  return h(
    "button",
    {
      class: ["btn", props.type],
      onClick: () => emit("click"),
    },
    slots.default()
  );
};

FunctionalButton.props = ["type"];
```

### Melhores Práticas para Componentes

1. **Mantenha componentes pequenos e focados**: Cada componente deve ter uma única responsabilidade
2. **Use props para entrada e eventos para saída**: Siga o fluxo de dados unidirecional
3. **Documente props e eventos**: Facilita o uso por outros desenvolvedores
4. **Prefira registro local**: Melhor para tree-shaking e manutenção
5. **Nomeie componentes claramente**: O nome deve indicar sua função
6. **Use SFCs para componentes complexos**: Melhor organização e manutenção
7. **Considere componentes assíncronos para código raramente usado**: Melhora o tempo de carregamento inicial

## Aula 4.2: Props e validação

### O que são Props?

Props (abreviação de "propriedades") são o mecanismo pelo qual os componentes Vue recebem dados de seus componentes pais. Elas formam uma parte essencial do fluxo de dados unidirecional do Vue, onde os dados fluem de cima para baixo na hierarquia de componentes.

### Passando Props para um Componente

No componente pai, você passa props usando atributos HTML ou vinculações v-bind:

```html
<!-- Passando uma string literal -->
<usuario-perfil nome="João Silva"></usuario-perfil>

<!-- Passando um valor dinâmico -->
<usuario-perfil :nome="usuario.nome"></usuario-perfil>

<!-- Passando um número (sem v-bind seria tratado como string) -->
<contador-progresso :valor="42" :maximo="100"></contador-progresso>

<!-- Passando um booleano -->
<botao-confirmar :desabilitado="!formularioValido"></botao-confirmar>

<!-- Passando um array -->
<lista-itens :itens="['Maçã', 'Banana', 'Laranja']"></lista-itens>

<!-- Passando um objeto -->
<usuario-card
  :usuario="{ nome: 'João', email: 'joao@exemplo.com' }"
></usuario-card>
```

### Recebendo Props em um Componente

#### Options API

```javascript
export default {
  props: ["nome", "idade", "ativo"],

  // OU com validação
  props: {
    nome: String,
    idade: Number,
    ativo: Boolean,
  },

  // OU com validação detalhada
  props: {
    nome: {
      type: String,
      required: true,
    },
    idade: {
      type: Number,
      default: 18,
      validator: (value) => value >= 0,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
};
```

#### Composition API

```javascript
// <script setup>
const props = defineProps(["nome", "idade", "ativo"]);

// OU com validação
const props = defineProps({
  nome: String,
  idade: Number,
  ativo: Boolean,
});

// OU com validação detalhada
const props = defineProps({
  nome: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    default: 18,
    validator: (value) => value >= 0,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
});

// Uso
console.log(props.nome);
```

### Tipos de Props

Vue suporta validação para os seguintes tipos:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- Construtores personalizados (classes)
- Múltiplos tipos: `[String, Number]`

### Validação de Props

A validação de props ajuda a garantir que os componentes sejam usados corretamente:

#### Opções de Validação

1. **type**: Especifica o tipo esperado
2. **required**: Indica se a prop é obrigatória
3. **default**: Valor padrão se não fornecido
4. **validator**: Função que valida o valor

```javascript
props: {
  // Validação de tipo básica
  altura: Number,

  // Múltiplos tipos permitidos
  identificador: [String, Number],

  // String obrigatória
  titulo: {
    type: String,
    required: true
  },

  // Número com valor padrão
  tamanho: {
    type: Number,
    default: 10
  },

  // Objeto com valor padrão (deve ser uma função)
  usuario: {
    type: Object,
    default: () => ({ nome: 'Anônimo' })
  },

  // Array com valor padrão (deve ser uma função)
  categorias: {
    type: Array,
    default: () => []
  },

  // Função de validação personalizada
  pontuacao: {
    type: Number,
    validator: (value) => {
      return value >= 0 && value <= 100
    }
  },

  // Validação com classe personalizada
  autor: Person // Onde Person é uma classe/construtor
}
```

### Props Booleanas

Props booleanas têm um comportamento especial:

```html
<!-- Equivalente a :ativo="true" -->
<usuario-card ativo></usuario-card>

<!-- Explicitamente false -->
<usuario-card :ativo="false"></usuario-card>
```

### Passando Todas as Props com v-bind

Você pode passar todas as propriedades de um objeto como props usando `v-bind` sem argumentos:

```html
<usuario-card v-bind="usuario"></usuario-card>
```

Equivalente a:

```html
<usuario-card
  :nome="usuario.nome"
  :email="usuario.email"
  :idade="usuario.idade"
></usuario-card>
```

### Fluxo de Dados Unidirecional

As props seguem um fluxo de dados unidirecional: do pai para o filho. Quando a prop do pai muda, ela atualiza no filho, mas não vice-versa.

```javascript
// ❌ Não modifique props diretamente
props: ['titulo'],
mounted() {
  this.titulo = 'Novo título' // Erro no modo de desenvolvimento
}

// ✅ Use dados locais baseados em props
props: ['titulo'],
data() {
  return {
    tituloLocal: this.titulo
  }
}

// ✅ Ou use computed para transformar props
props: ['titulo'],
computed: {
  tituloFormatado() {
    return this.titulo.toUpperCase()
  }
}
```

### Props vs Data

- **Props**: Dados passados de um componente pai para um filho
- **Data**: Estado local gerenciado pelo próprio componente

```javascript
export default {
  props: {
    valorInicial: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      valorInterno: this.valorInicial,
    };
  },
};
```

### Props Não-Reativas vs Reativas

Quando você passa um objeto ou array como prop, a referência ao objeto é passada, então modificações internas são refletidas no componente pai:

```javascript
// Componente pai
data() {
  return {
    usuario: { nome: 'João' }
  }
}

// Componente filho
props: ['usuario'],
methods: {
  atualizarNome() {
    // Isso afetará o objeto no componente pai
    this.usuario.nome = 'Maria'

    // Mas isso não funcionaria (tentativa de reatribuir a prop)
    this.usuario = { nome: 'Pedro' }
  }
}
```

### Transformando Props em Refs Reativas

Na Composition API, você pode transformar props em refs para uso local:

```javascript
import { toRef, toRefs } from "vue";

// <script setup>
const props = defineProps({
  titulo: String,
  usuario: Object,
});

// Uma única prop
const titulo = toRef(props, "titulo");

// Todas as props
const { titulo, usuario } = toRefs(props);

// Agora você pode usar titulo.value e usuario.value
```

### Convenções de Nomenclatura para Props

- **camelCase** no JavaScript: `backgroundColor`
- **kebab-case** nos templates: `background-color`

```javascript
// No componente filho
props: {
  backgroundColor: String
}

// No componente pai
<meu-componente :background-color="'blue'"></meu-componente>
```

### Props Estáticas vs Dinâmicas

- **Props estáticas**: Passadas como strings literais
- **Props dinâmicas**: Vinculadas a dados reativos com `v-bind` ou `:`

```html
<!-- Estática (sempre a string "42") -->
<contador valor="42"></contador>

<!-- Dinâmica (o valor da variável contador) -->
<contador :valor="contador"></contador>
```

### Melhores Práticas para Props

1. **Documente suas props**: Use comentários ou ferramentas como JSDoc
2. **Valide sempre que possível**: Defina tipos e regras de validação
3. **Use valores padrão sensatos**: Facilita o uso do componente
4. **Nomeie props claramente**: O nome deve indicar o propósito
5. **Prefira props primitivas**: Mais fáceis de rastrear e testar
6. **Evite muitas props**: Se um componente tem muitas props, considere dividi-lo
7. **Considere objetos para grupos relacionados**: `usuario` em vez de `usuarioNome`, `usuarioEmail`, etc.

## Aula 4.3: Eventos personalizados

### Comunicação Filho para Pai com Eventos

Enquanto as props permitem a comunicação de cima para baixo (pai para filho), os eventos personalizados permitem a comunicação de baixo para cima (filho para pai). Isso completa o ciclo de comunicação entre componentes, mantendo o fluxo de dados unidirecional.

### Emitindo Eventos de um Componente Filho

#### Options API

```javascript
export default {
  methods: {
    incrementar() {
      this.contador++;
      // Emitir um evento com o novo valor
      this.$emit("incrementado", this.contador);
    },
  },
};
```

#### Composition API

```javascript
// <script setup>
const emit = defineEmits(["incrementado"]);

function incrementar() {
  contador.value++;
  // Emitir um evento com o novo valor
  emit("incrementado", contador.value);
}

// Ou com validação
const emit = defineEmits({
  incrementado: (valor) => {
    // Validação opcional
    if (typeof valor !== "number") {
      console.warn("incrementado deve receber um número");
      return false;
    }
    return true;
  },
});
```

### Escutando Eventos no Componente Pai

```html
<template>
  <div>
    <p>Contador pai: {{ contadorPai }}</p>

    <!-- Escutando o evento 'incrementado' do filho -->
    <contador-filho @incrementado="atualizarContador"></contador-filho>
  </div>
</template>

<script>
  import ContadorFilho from "./ContadorFilho.vue";

  export default {
    components: {
      ContadorFilho,
    },
    data() {
      return {
        contadorPai: 0,
      };
    },
    methods: {
      atualizarContador(novoValor) {
        this.contadorPai = novoValor;
      },
    },
  };
</script>
```

### Declarando Eventos Emitidos

É uma boa prática declarar explicitamente quais eventos um componente pode emitir:

#### Options API

```javascript
export default {
  emits: ["incrementado", "resetado"],

  // Ou com validação
  emits: {
    incrementado: (valor) => {
      return typeof valor === "number";
    },
    resetado: null, // Sem validação
  },
};
```

#### Composition API

```javascript
// <script setup>
const emit = defineEmits(["incrementado", "resetado"]);

// Ou com validação
const emit = defineEmits({
  incrementado: (valor) => {
    return typeof valor === "number";
  },
  resetado: null, // Sem validação
});
```

### Eventos vs Métodos

Eventos são usados para comunicação entre componentes, enquanto métodos são funções internas:

```html
<!-- Evento: comunicação filho para pai -->
<contador-filho @incrementado="atualizarContador"></contador-filho>

<!-- Método: chamada de função local -->
<button @click="resetarContador">Resetar</button>
```

### Passando Múltiplos Argumentos

Você pode passar múltiplos argumentos ao emitir um evento:

```javascript
// No componente filho
methods: {
  submeterFormulario() {
    this.$emit('submeter', this.nome, this.email, this.idade)
  }
}

// No componente pai
<formulario-usuario @submeter="processarSubmissao"></formulario-usuario>

methods: {
  processarSubmissao(nome, email, idade) {
    console.log(nome, email, idade)
  }
}
```

### Modificadores de Eventos Nativos com Eventos Personalizados

Você pode usar modificadores de eventos nativos com eventos personalizados usando `.native` (Vue 2) ou `v-on` (Vue 3):

```html
<!-- Vue 2 -->
<meu-componente @click.native="handleClick"></meu-componente>

<!-- Vue 3 -->
<meu-componente @click="handleClick"></meu-componente>
```

### Eventos com Kebab-case vs camelCase

Assim como com props, há uma convenção para nomes de eventos:

- Use **kebab-case** nos templates: `@item-selecionado="..."`
- Use **camelCase** ao emitir: `this.$emit('itemSelecionado')`

No entanto, o Vue automaticamente converte entre os dois, então ambos funcionarão.

### v-model em Componentes Personalizados

`v-model` é uma abreviação para passar uma prop e escutar um evento de atualização:

```html
<!-- Isso: -->
<input v-model="searchText" />

<!-- é abreviação para: -->
<input :value="searchText" @input="searchText = $event.target.value" />
```

Para componentes personalizados no Vue 3:

```html
<!-- Isso: -->
<custom-input v-model="searchText" />

<!-- é abreviação para: -->
<custom-input
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

Implementação no componente filho:

```javascript
// <script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
  emit("update:modelValue", event.target.value);
}
```

```html
<template>
  <input :value="modelValue" @input="updateValue" />
</template>
```

### Múltiplos v-model

No Vue 3, você pode ter múltiplos v-model em um componente:

```html
<user-form v-model:nome="usuario.nome" v-model:email="usuario.email" />
```

Implementação:

```javascript
// <script setup>
const props = defineProps({
  nome: String,
  email: String,
});

const emit = defineEmits(["update:nome", "update:email"]);

function atualizarNome(event) {
  emit("update:nome", event.target.value);
}

function atualizarEmail(event) {
  emit("update:email", event.target.value);
}
```

### Eventos vs Provide/Inject

- **Eventos**: Melhor para comunicação direta pai-filho
- **Provide/Inject**: Melhor para comunicação entre componentes distantes na árvore

### Eventos vs Estado Global

- **Eventos**: Melhor para comunicação local entre componentes relacionados
- **Estado Global (Vuex/Pinia)**: Melhor para comunicação entre componentes não relacionados ou dados compartilhados por toda a aplicação

### Melhores Práticas para Eventos

1. **Nomeie eventos claramente**: Use verbos que descrevam a ação
2. **Declare todos os eventos emitidos**: Melhora a documentação e manutenção
3. **Valide dados de eventos quando possível**: Garante que os dados estejam no formato esperado
4. **Emita eventos no momento apropriado**: Geralmente após uma ação do usuário ou mudança de estado
5. **Mantenha a consistência**: Use o mesmo padrão de nomenclatura em toda a aplicação
6. **Documente os parâmetros do evento**: Facilita o uso por outros desenvolvedores
7. **Prefira eventos a callbacks via props**: Mantém o fluxo de dados unidirecional

## Aula 4.4: Slots e conteúdo distribuído

### O que são Slots?

Slots são um mecanismo poderoso no Vue.js que permite passar conteúdo do template do componente pai para o componente filho. Eles são fundamentais para criar componentes verdadeiramente reutilizáveis e flexíveis.

Enquanto props permitem passar dados para um componente filho, slots permitem passar conteúdo de template (HTML, outros componentes, etc.).

### Slot Básico

#### Componente Filho (Botão.vue)

```html
<template>
  <button class="botao" @click="$emit('click')">
    <slot>Botão</slot>
  </button>
</template>

<style scoped>
  .botao {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```

#### Componente Pai

```html
<template>
  <div>
    <!-- Usando o slot padrão -->
    <botao @click="fazerAlgo">Clique Aqui</botao>

    <!-- Usando o conteúdo padrão do slot -->
    <botao @click="fazerOutraCoisa"></botao>
  </div>
</template>
```

### Conteúdo Padrão para Slots

Você pode definir conteúdo padrão para um slot, que será usado quando o componente pai não fornecer conteúdo:

```html
<slot>Conteúdo padrão se nada for fornecido</slot>
```

### Slots Nomeados

Quando você precisa de múltiplos slots em um componente, pode usar slots nomeados:

#### Componente Filho (Card.vue)

```html
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">Cabeçalho Padrão</slot>
    </div>

    <div class="card-body">
      <slot>Conteúdo Principal</slot>
    </div>

    <div class="card-footer">
      <slot name="footer">Rodapé Padrão</slot>
    </div>
  </div>
</template>
```

#### Componente Pai

```html
<template>
  <card>
    <template v-slot:header>
      <h2>Título do Card</h2>
    </template>

    <!-- Slot padrão (sem nome) -->
    <p>Este é o conteúdo principal do card.</p>

    <template v-slot:footer>
      <button>Ação</button>
    </template>
  </card>
</template>
```

### Sintaxe Abreviada para Slots

Você pode usar `#` como abreviação para `v-slot`:

```html
<card>
  <template #header>
    <h2>Título do Card</h2>
  </template>

  <p>Este é o conteúdo principal do card.</p>

  <template #footer>
    <button>Ação</button>
  </template>
</card>
```

### Slots com Escopo (Scoped Slots)

Slots com escopo permitem que o componente filho passe dados de volta para o conteúdo do slot no componente pai:

#### Componente Filho (ListaItens.vue)

```html
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <slot :item="item" :index="index"> {{ item.texto }} </slot>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
</script>
```

#### Componente Pai

```html
<template>
  <div>
    <lista-itens :items="tarefas">
      <template v-slot:default="slotProps">
        <div class="tarefa">
          <input type="checkbox" v-model="slotProps.item.concluida" />
          <span :class="{ concluida: slotProps.item.concluida }">
            {{ slotProps.item.texto }}
          </span>
          <span class="indice">({{ slotProps.index }})</span>
        </div>
      </template>
    </lista-itens>
  </div>
</template>

<script>
  import ListaItens from "./ListaItens.vue";

  export default {
    components: {
      ListaItens,
    },
    data() {
      return {
        tarefas: [
          { texto: "Aprender Vue", concluida: true },
          { texto: "Criar um projeto", concluida: false },
          { texto: "Compartilhar com a comunidade", concluida: false },
        ],
      };
    },
  };
</script>
```

### Desestruturação em Slots com Escopo

Você pode desestruturar as propriedades do slot para um código mais limpo:

```html
<lista-itens :items="tarefas">
  <template v-slot:default="{ item, index }">
    <div class="tarefa">
      <input type="checkbox" v-model="item.concluida" />
      <span :class="{ concluida: item.concluida }"> {{ item.texto }} </span>
      <span class="indice">({{ index }})</span>
    </div>
  </template>
</lista-itens>
```

### Slots Dinâmicos

Você pode usar nomes de slots dinâmicos:

```html
<template>
  <div>
    <base-layout>
      <template v-slot:[dynamicSlotName]> Conteúdo dinâmico </template>
    </base-layout>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicSlotName: "header",
      };
    },
  };
</script>
```

### Renderização Condicional com Slots

Você pode verificar se um slot tem conteúdo usando a propriedade `$slots`:

```html
<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

Na Composition API, você pode usar `useSlots()`:

```html
<script setup>
  import { useSlots } from "vue";

  const slots = useSlots();
</script>

<template>
  <div class="card">
    <div class="card-header" v-if="slots.header">
      <slot name="header"></slot>
    </div>

    <!-- ... -->
  </div>
</template>
```

### Slots vs Children

Em React, você usa `props.children` para conteúdo aninhado. No Vue, slots oferecem mais flexibilidade:

- Múltiplos pontos de distribuição (slots nomeados)
- Conteúdo padrão
- Passagem de dados do filho para o pai (slots com escopo)

### Padrões Comuns com Slots

#### 1. Componentes de Layout

```html
<base-layout>
  <template #header>
    <h1>Título da Página</h1>
  </template>

  <p>Conteúdo principal</p>

  <template #sidebar>
    <nav>Menu lateral</nav>
  </template>

  <template #footer>
    <p>© 2023 Minha Empresa</p>
  </template>
</base-layout>
```

#### 2. Componentes de Lista

```html
<ul-lista>
  <template #item="{ item }">
    <li class="item-personalizado">{{ item.nome }}</li>
  </template>
</ul-lista>
```

#### 3. Componentes de Tabela

```html
<data-table :items="usuarios">
  <template #cabecalho>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Ações</th>
    </tr>
  </template>

  <template #linha="{ item }">
    <tr>
      <td>{{ item.nome }}</td>
      <td>{{ item.email }}</td>
      <td>
        <button @click="editar(item)">Editar</button>
        <button @click="excluir(item)">Excluir</button>
      </td>
    </tr>
  </template>
</data-table>
```

#### 4. Componentes de Formulário

```html
<form-campo label="Nome" :error="errors.nome">
  <input v-model="usuario.nome" />
</form-campo>
```

#### 5. Componentes de Modal/Dialog

```html
<modal-dialog v-model="showModal">
  <template #titulo> Confirmar Ação </template>

  <p>Tem certeza que deseja continuar?</p>

  <template #acoes>
    <button @click="confirmar">Sim</button>
    <button @click="showModal = false">Cancelar</button>
  </template>
</modal-dialog>
```

### Melhores Práticas para Slots

1. **Use slots nomeados para clareza**: Especialmente quando há múltiplos slots
2. **Forneça conteúdo padrão sensato**: Facilita o uso do componente
3. **Documente os slots disponíveis**: Inclua nomes e dados passados (para slots com escopo)
4. **Mantenha a consistência**: Use o mesmo padrão de nomenclatura em toda a aplicação
5. **Evite lógica complexa em slots**: Slots devem focar na estrutura, não na lógica
6. **Considere a renderização condicional**: Verifique se um slot tem conteúdo antes de renderizar seu contêiner
7. **Use slots com escopo para flexibilidade**: Permitem que o componente pai personalize a renderização com dados do filho

## Exercício Prático: Desenvolvimento de um sistema de componentes reutilizáveis

### Objetivo

Criar um sistema de componentes reutilizáveis para construir interfaces de usuário, demonstrando o uso de props, eventos personalizados e slots.

### Requisitos

1. Criar componentes base: Button, Card, Modal, Form Input
2. Implementar comunicação entre componentes
3. Usar slots para conteúdo flexível
4. Criar uma página de demonstração que utilize todos os componentes

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest componentes-reutilizaveis -- --template vue
cd componentes-reutilizaveis
npm install
```

### Passo 2: Criar o Componente Button

Crie o arquivo `src/components/BaseButton.vue`:

```vue
<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      { 'base-button--block': block },
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__loader"></span>
    <span class="base-button__content" :class="{ invisible: loading }">
      <slot>Botão</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) =>
        [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
        ].includes(value),
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
};
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  min-height: 38px;
}

.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.base-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.base-button--block {
  display: flex;
  width: 100%;
}

.base-button--primary {
  background-color: #42b983;
  border-color: #42b983;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: #3aa876;
  border-color: #3aa876;
}

.base-button--secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: #5a6268;
  border-color: #5a6268;
}

.base-button--success {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.base-button--success:hover:not(:disabled) {
  background-color: #218838;
  border-color: #218838;
}

.base-button--danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background-color: #c82333;
  border-color: #c82333;
}

.base-button--warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

.base-button--warning:hover:not(:disabled) {
  background-color: #e0a800;
  border-color: #e0a800;
}

.base-button--info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.base-button--info:hover:not(:disabled) {
  background-color: #138496;
  border-color: #138496;
}

.base-button__loader {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

.invisible {
  visibility: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
```

### Passo 3: Criar o Componente Card

Crie o arquivo `src/components/BaseCard.vue`:

```vue
<template>
  <div class="base-card" :class="{ 'base-card--shadow': shadow }">
    <div v-if="$slots.header || title" class="base-card__header">
      <slot name="header">
        <h3 class="base-card__title">{{ title }}</h3>
      </slot>
    </div>

    <div class="base-card__body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    shadow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.base-card {
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  overflow: hidden;
}

.base-card--shadow {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.base-card__header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.base-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.base-card__body {
  padding: 1.25rem;
}

.base-card__footer {
  padding: 0.75rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
```

### Passo 4: Criar o Componente Modal

Crie o arquivo `src/components/BaseModal.vue`:

```vue
<template>
  <transition name="modal-fade">
    <div
      v-if="modelValue"
      class="modal-backdrop"
      @click="closeOnBackdrop && close()"
    >
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
          <button v-if="showCloseButton" class="modal-close" @click="close">
            &times;
          </button>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer">
            <base-button @click="close">Fechar</base-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseModal",
  components: {
    BaseButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal",
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
  },
  mounted() {
    if (this.modelValue) {
      document.body.style.overflow = "hidden";
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  color: #6c757d;
}

.modal-body {
  padding: 1rem;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
```

### Passo 5: Criar o Componente Form Input

Crie o arquivo `src/components/BaseInput.vue`:

```vue
<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>

    <div class="base-input__wrapper">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="['base-input__field', { 'base-input__field--error': error }]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
    </div>

    <div v-if="error" class="base-input__error">
      {{ error }}
    </div>

    <div v-if="hint" class="base-input__hint">
      {{ hint }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default() {
        return `input-${Math.random().toString(36).substr(2, 9)}`;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "blur"],
};
</script>

<style scoped>
.base-input {
  margin-bottom: 1rem;
}

.base-input__label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.base-input__required {
  color: #dc3545;
  margin-left: 0.25rem;
}

.base-input__wrapper {
  position: relative;
}

.base-input__field {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.base-input__field:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.base-input__field--error {
  border-color: #dc3545;
}

.base-input__field--error:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.base-input__error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}

.base-input__hint {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6c757d;
}
</style>
```

### Passo 6: Criar um Componente de Formulário

Crie o arquivo `src/components/BaseForm.vue`:

```vue
<template>
  <form class="base-form" @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "BaseForm",
  emits: ["submit"],
  methods: {
    handleSubmit(event) {
      this.$emit("submit", event);
    },
  },
};
</script>

<style scoped>
.base-form {
  margin-bottom: 1rem;
}
</style>
```

### Passo 7: Registrar Componentes Globalmente

Crie o arquivo `src/components/index.js`:

```javascript
import BaseButton from "./BaseButton.vue";
import BaseCard from "./BaseCard.vue";
import BaseModal from "./BaseModal.vue";
import BaseInput from "./BaseInput.vue";
import BaseForm from "./BaseForm.vue";

export default {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("BaseCard", BaseCard);
    app.component("BaseModal", BaseModal);
    app.component("BaseInput", BaseInput);
    app.component("BaseForm", BaseForm);
  },
};
```

Atualize o arquivo `src/main.js`:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import BaseComponents from "./components";
import "./style.css";

const app = createApp(App);
app.use(BaseComponents);
app.mount("#app");
```

### Passo 8: Criar a Página de Demonstração

Atualize o arquivo `src/App.vue`:

```vue
<template>
  <div class="container">
    <h1>Sistema de Componentes Reutilizáveis</h1>

    <section class="demo-section">
      <h2>Botões</h2>
      <div class="demo-row">
        <base-button>Padrão</base-button>
        <base-button variant="secondary">Secundário</base-button>
        <base-button variant="success">Sucesso</base-button>
        <base-button variant="danger">Perigo</base-button>
        <base-button variant="warning">Aviso</base-button>
        <base-button variant="info">Info</base-button>
      </div>

      <div class="demo-row">
        <base-button disabled>Desabilitado</base-button>
        <base-button loading>Carregando</base-button>
      </div>

      <div class="demo-row">
        <base-button block>Botão em Bloco</base-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Cards</h2>
      <div class="demo-grid">
        <base-card title="Card com Título">
          <p>Este é um card simples com título definido via prop.</p>
        </base-card>

        <base-card>
          <template #header>
            <div class="custom-header">
              <h3>Header Personalizado</h3>
              <base-button variant="secondary" size="sm">Ação</base-button>
            </div>
          </template>

          <p>Este card tem um header personalizado usando slots.</p>

          <template #footer>
            <div class="card-actions">
              <base-button variant="primary">Salvar</base-button>
              <base-button variant="secondary">Cancelar</base-button>
            </div>
          </template>
        </base-card>
      </div>
    </section>

    <section class="demo-section">
      <h2>Formulário</h2>
      <base-card>
        <base-form @submit="handleFormSubmit">
          <base-input
            v-model="form.nome"
            label="Nome"
            placeholder="Digite seu nome"
            required
            :error="errors.nome"
          />

          <base-input
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="Digite seu email"
            required
            :error="errors.email"
          />

          <base-input
            v-model="form.senha"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            required
            :error="errors.senha"
            hint="A senha deve ter pelo menos 8 caracteres"
          />

          <div class="form-actions">
            <base-button type="submit" :loading="formLoading"
              >Enviar</base-button
            >
            <base-button variant="secondary" @click="resetForm"
              >Limpar</base-button
            >
          </div>
        </base-form>
      </base-card>
    </section>

    <section class="demo-section">
      <h2>Modal</h2>
      <base-button @click="showModal = true">Abrir Modal</base-button>

      <base-modal v-model="showModal" title="Modal de Exemplo">
        <p>Este é um exemplo de modal usando nosso sistema de componentes.</p>
        <p>Você pode personalizar o conteúdo, o cabeçalho e o rodapé.</p>

        <template #footer>
          <base-button variant="secondary" @click="showModal = false"
            >Cancelar</base-button
          >
          <base-button variant="primary" @click="confirmModal"
            >Confirmar</base-button
          >
        </template>
      </base-modal>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showModal: false,
      formLoading: false,
      form: {
        nome: "",
        email: "",
        senha: "",
      },
      errors: {
        nome: "",
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    confirmModal() {
      // Simular uma ação de confirmação
      alert("Ação confirmada!");
      this.showModal = false;
    },

    validateForm() {
      let isValid = true;
      this.errors = {
        nome: "",
        email: "",
        senha: "",
      };

      if (!this.form.nome) {
        this.errors.nome = "O nome é obrigatório";
        isValid = false;
      }

      if (!this.form.email) {
        this.errors.email = "O email é obrigatório";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
        this.errors.email = "Email inválido";
        isValid = false;
      }

      if (!this.form.senha) {
        this.errors.senha = "A senha é obrigatória";
        isValid = false;
      } else if (this.form.senha.length < 8) {
        this.errors.senha = "A senha deve ter pelo menos 8 caracteres";
        isValid = false;
      }

      return isValid;
    },

    handleFormSubmit() {
      if (this.validateForm()) {
        this.formLoading = true;

        // Simular uma requisição
        setTimeout(() => {
          this.formLoading = false;
          alert("Formulário enviado com sucesso!");
          this.resetForm();
        }, 1500);
      }
    },

    resetForm() {
      this.form = {
        nome: "",
        email: "",
        senha: "",
      };
      this.errors = {
        nome: "",
        email: "",
        senha: "",
      };
    },
  },
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #42b983;
}

h2 {
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-header h3 {
  margin: 0;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
```

### Passo 9: Adicionar Estilos Globais

Crie ou atualize o arquivo `src/style.css`:

```css
:root {
  --primary: #42b983;
  --secondary: #6c757d;
  --success: #28a745;
  --danger: #dc3545;
  --warning: #ffc107;
  --info: #17a2b8;
  --light: #f8f9fa;
  --dark: #343a40;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Passo 10: Executar e Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para ver a demonstração dos componentes reutilizáveis.

# Exercícios Práticos - Módulo 4: Componentes

## Exercício 1: Comunicação entre Componentes

- Crie um sistema de comentários
- Use props para passar dados
- Emita eventos para atualizar estado pai
- Implemente componente de comentário reutilizável

## Exercício 2: Slots Dinâmicos

- Desenvolva um componente de modal genérico
- Use slots para conteúdo personalizado
- Implemente slots nomeados
- Adicione funcionalidade de abertura/fechamento

## Desafio Final

- Criar painel administrativo modular
- Use componentes dinâmicos
- Implemente comunicação complexa entre componentes

### Perguntas para Fixação

1. **Qual é a principal vantagem de usar slots em componentes Vue?**

   - a) Melhoram o desempenho do componente
   - b) Permitem passar conteúdo de template do componente pai para o filho
   - c) Facilitam a comunicação de dados do filho para o pai
   - d) Permitem definir estilos globais para componentes

2. **Como você pode passar dados de um componente filho para o pai?**

   - a) Usando props
   - b) Usando slots
   - c) Emitindo eventos personalizados
   - d) Usando variáveis globais

3. **Qual é a diferença entre slots nomeados e slots com escopo?**

   - a) Slots nomeados permitem múltiplos pontos de distribuição, enquanto slots com escopo não
   - b) Slots com escopo permitem passar dados do componente filho para o conteúdo do slot no pai
   - c) Slots nomeados só podem ser usados uma vez, enquanto slots com escopo podem ser reutilizados
   - d) Não há diferença, são termos intercambiáveis

4. **Como você pode validar props em um componente Vue?**

   - a) Usando a opção `validate` no componente
   - b) Definindo tipos e funções de validação na definição das props
   - c) Usando diretivas v-validate nos templates
   - d) Implementando hooks de ciclo de vida para validação

5. **Qual é a sintaxe correta para emitir um evento personalizado com dados em Vue 3 Composition API?**
   - a) `this.$emit('evento', dados)`
   - b) `emit('evento', dados)`
   - c) `emitEvent('evento', dados)`
   - d) `$emit.call(this, 'evento', dados)`

**Respostas:**

1. b) Permitem passar conteúdo de template do componente pai para o filho
2. c) Emitindo eventos personalizados
3. b) Slots com escopo permitem passar dados do componente filho para o conteúdo do slot no pai
4. b) Definindo tipos e funções de validação na definição das props
5. b) `emit('evento', dados)`
