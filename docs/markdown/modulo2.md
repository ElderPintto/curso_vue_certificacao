# Módulo 2: Fundamentos do Vue.js

## Aula 2.1: Criando uma aplicação Vue

### Diferentes Formas de Criar uma Aplicação Vue

Existem várias maneiras de iniciar um projeto Vue.js, cada uma adequada para diferentes cenários:

#### 1. Via CDN (Content Delivery Network)

A maneira mais simples de começar com Vue.js é incluí-lo diretamente em um arquivo HTML via CDN:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aplicação Vue via CDN</title>
  </head>
  <body>
    <div id="app">
      <h1>{{ mensagem }}</h1>
      <button @click="contagem++">Cliques: {{ contagem }}</button>
    </div>

    <!-- Importando o Vue.js via CDN -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

    <script>
      // Criando a aplicação Vue
      const { createApp, ref } = Vue;

      createApp({
        setup() {
          const mensagem = ref("Olá, Vue!");
          const contagem = ref(0);

          return {
            mensagem,
            contagem,
          };
        },
      }).mount("#app");
    </script>
  </body>
</html>
```

**Quando usar:**

- Para protótipos rápidos
- Para pequenas aplicações
- Para adicionar Vue a uma página existente
- Para aprendizado e experimentação

**Limitações:**

- Não suporta Single-File Components (SFC)
- Sem suporte para ferramentas de build
- Sem gerenciamento de dependências

#### 2. Usando Vite (Recomendado para Vue 3)

Vite é uma ferramenta de build moderna que oferece um servidor de desenvolvimento extremamente rápido:

```bash
# Criar um novo projeto
npm create vite@latest meu-projeto-vue -- --template vue

# Navegar para o diretório do projeto
cd meu-projeto-vue

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

**Quando usar:**

- Para novos projetos Vue 3
- Para aplicações de médio a grande porte
- Quando a velocidade de desenvolvimento é importante
- Para projetos que se beneficiam de um sistema de módulos

**Vantagens:**

- Extremamente rápido (HMR instantâneo)
- Suporte nativo para TypeScript, JSX, CSS modules, etc.
- Configuração mínima necessária
- Otimizado para produção

#### 3. Usando Vue CLI

Vue CLI é uma ferramenta completa para desenvolvimento Vue.js:

```bash
# Instalar o Vue CLI globalmente
npm install -g @vue/cli

# Criar um novo projeto
vue create meu-projeto-vue

# Navegar para o diretório do projeto
cd meu-projeto-vue

# Iniciar o servidor de desenvolvimento
npm run serve
```

**Quando usar:**

- Para projetos que precisam de configurações personalizadas
- Para projetos Vue 2 (embora também suporte Vue 3)
- Quando você precisa de um conjunto abrangente de plugins e presets

**Vantagens:**

- Interface gráfica para gerenciamento de projeto (vue ui)
- Sistema de plugins extensível
- Configurações personalizáveis
- Integração com ferramentas populares

#### 4. Usando Nuxt.js

Nuxt.js é um framework baseado em Vue que simplifica o desenvolvimento de aplicações universais (SSR):

```bash
# Usando npx
npx nuxi init meu-projeto-nuxt

# Navegar para o diretório do projeto
cd meu-projeto-nuxt

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

**Quando usar:**

- Para aplicações que precisam de Server-Side Rendering (SSR)
- Para aplicações que precisam de Static Site Generation (SSG)
- Para projetos que se beneficiam de uma estrutura de arquivos baseada em convenções
- Para aplicações que precisam de SEO aprimorado

**Vantagens:**

- Renderização do lado do servidor
- Geração de sites estáticos
- Divisão de código automática
- Estrutura de arquivos baseada em convenções

### A Instância da Aplicação Vue

No Vue 3, tudo começa com a criação de uma instância de aplicação usando a função `createApp`:

```javascript
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// Configurações globais
app.config.errorHandler = (err) => {
  console.error("Erro global:", err);
};

// Registrar componentes globais
app.component("MeuComponenteGlobal", {
  template: "<div>Um componente global</div>",
});

// Registrar diretivas globais
app.directive("foco", {
  mounted: (el) => el.focus(),
});

// Usar plugins
app.use(meuPlugin, { opcao: "valor" });

// Montar a aplicação no DOM
app.mount("#app");
```

#### Métodos Importantes da Instância da Aplicação

| Método            | Descrição                                                     |
| ----------------- | ------------------------------------------------------------- |
| `app.component()` | Registra ou recupera um componente global                     |
| `app.directive()` | Registra ou recupera uma diretiva global                      |
| `app.use()`       | Instala um plugin                                             |
| `app.mixin()`     | Aplica um mixin global (use com cautela)                      |
| `app.provide()`   | Fornece um valor que pode ser injetado em qualquer componente |
| `app.mount()`     | Monta a aplicação em um elemento do DOM                       |
| `app.unmount()`   | Desmonta a aplicação                                          |

#### Configurações Globais

A instância da aplicação Vue 3 possui um objeto `config` que permite personalizar o comportamento global:

```javascript
// Configurar opções globais
app.config.errorHandler = (err, vm, info) => {
  // Manipular erros
};

app.config.warnHandler = (msg, vm, trace) => {
  // Manipular avisos
};

app.config.performance = true; // Ativar medição de desempenho

app.config.compilerOptions.isCustomElement = (tag) => {
  // Verificar se uma tag é um elemento personalizado
  return tag.startsWith("ion-");
};
```

### Ciclo de Vida da Aplicação

O ciclo de vida de uma aplicação Vue começa com sua criação e termina quando é desmontada:

1. **Criação**: `createApp()` é chamado
2. **Configuração**: Plugins, componentes e diretivas são registrados
3. **Montagem**: `app.mount()` é chamado, a aplicação é renderizada no DOM
4. **Atualização**: A aplicação reage a mudanças de estado
5. **Desmontagem**: `app.unmount()` é chamado, a aplicação é removida do DOM

## Aula 2.2: Sintaxe de template e diretivas básicas

### Sintaxe de Template no Vue.js

O Vue.js utiliza uma sintaxe de template baseada em HTML, que permite vincular de forma declarativa o DOM renderizado aos dados da instância do componente Vue.

#### Interpolação de Texto

A forma mais básica de vinculação de dados é a interpolação de texto usando a sintaxe "Mustache" (chaves duplas):

```html
<span>Mensagem: {{ mensagem }}</span>
```

O conteúdo dentro das chaves duplas será substituído pelo valor da propriedade `mensagem` do componente. A interpolação será atualizada sempre que a propriedade `mensagem` mudar.

#### Expressões JavaScript

Dentro das chaves duplas, você pode usar expressões JavaScript completas:

```html
<span>{{ mensagem.split('').reverse().join('') }}</span>
<span>{{ ok ? 'SIM' : 'NÃO' }}</span>
<span>{{ numero + 1 }}</span>
```

Estas expressões serão avaliadas como JavaScript no escopo de dados do componente. No entanto, cada vinculação pode conter apenas **uma expressão**.

#### HTML Puro com v-html

Para inserir HTML puro, use a diretiva `v-html`:

```html
<div v-html="htmlConteudo"></div>
```

**Atenção**: Usar `v-html` com conteúdo não confiável pode levar a vulnerabilidades XSS. Use apenas com conteúdo que você controla e confia.

#### Atributos com v-bind

Para vincular atributos HTML, use a diretiva `v-bind`:

```html
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Botão</button>
```

Forma abreviada (mais comum):

```html
<div :id="dynamicId"></div>
<button :disabled="isButtonDisabled">Botão</button>
```

#### Classes e Estilos

O Vue fornece aprimoramentos especiais quando `v-bind` é usado com `class` e `style`:

**Vinculação de Classes:**

```html
<!-- Objeto -->
<div :class="{ active: isActive, 'text-danger': hasError }"></div>

<!-- Array -->
<div :class="[activeClass, errorClass]"></div>

<!-- Condicionais em array -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>

<!-- Combinando com classes estáticas -->
<div class="static" :class="{ active: isActive }"></div>
```

**Vinculação de Estilos:**

```html
<!-- Objeto -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- Array -->
<div :style="[baseStyles, overridingStyles]"></div>

<!-- Prefixos automáticos -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

### Diretivas Básicas

Diretivas são atributos especiais com o prefixo `v-`. Elas aplicam comportamentos reativos especiais ao DOM renderizado.

#### v-if, v-else-if, v-else

Renderiza condicionalmente um elemento:

```html
<div v-if="tipo === 'A'">A</div>
<div v-else-if="tipo === 'B'">B</div>
<div v-else-if="tipo === 'C'">C</div>
<div v-else>Não A/B/C</div>
```

#### v-show

Alterna a visibilidade de um elemento usando CSS `display`:

```html
<div v-show="isVisible">Conteúdo visível</div>
```

**Diferença entre v-if e v-show:**

- `v-if` é renderização condicional "real" - o elemento é realmente adicionado/removido do DOM
- `v-show` apenas alterna a propriedade CSS `display` - o elemento sempre está no DOM

#### v-for

Renderiza uma lista de elementos com base em um array ou objeto:

```html
<!-- Array -->
<ul>
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.nome }}
  </li>
</ul>

<!-- Objeto -->
<ul>
  <li v-for="(valor, chave, index) in objeto" :key="chave">
    {{ index }}. {{ chave }}: {{ valor }}
  </li>
</ul>

<!-- Range numérico -->
<span v-for="n in 10" :key="n">{{ n }}</span>
```

**Importante**: Sempre use a propriedade `:key` com `v-for` para fornecer uma identidade única a cada item renderizado.

#### v-on

Anexa um ouvinte de eventos ao elemento:

```html
<button v-on:click="contador++">Incrementar</button>
<button v-on:click="saudar('Olá')">Saudar</button>
```

Forma abreviada (mais comum):

```html
<button @click="contador++">Incrementar</button>
<button @click="saudar('Olá')">Saudar</button>
```

**Modificadores de Eventos:**

```html
<!-- Impedir comportamento padrão -->
<form @submit.prevent="onSubmit"></form>

<!-- Parar propagação -->
<button @click.stop="onClick"></button>

<!-- Apenas uma vez -->
<button @click.once="onClick"></button>

<!-- Teclas específicas -->
<input @keyup.enter="submit" />
<input @keyup.esc="cancel" />

<!-- Modificadores de mouse -->
<button @click.right="onRightClick"></button>
<button @click.middle="onMiddleClick"></button>
```

#### v-model

Cria vinculação bidirecional em elementos de formulário:

```html
<input v-model="mensagem" placeholder="Edite-me" />
<p>Mensagem: {{ mensagem }}</p>

<textarea v-model="mensagem"></textarea>

<input type="checkbox" v-model="checked" />

<select v-model="selecionado">
  <option disabled value="">Selecione</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

**Modificadores de v-model:**

```html
<!-- Atualizar apenas no evento change -->
<input v-model.lazy="mensagem" />

<!-- Converter para número -->
<input v-model.number="idade" type="number" />

<!-- Remover espaços em branco -->
<input v-model.trim="mensagem" />
```

#### v-slot

Define slots nomeados ou slots com escopo:

```html
<!-- Slot nomeado -->
<template v-slot:header> Conteúdo do cabeçalho </template>

<!-- Forma abreviada -->
<template #header> Conteúdo do cabeçalho </template>

<!-- Slot com escopo -->
<template v-slot:item="slotProps"> {{ slotProps.item.text }} </template>
```

#### v-pre

Pula a compilação para este elemento e todos os seus filhos:

```html
<span v-pre>{{ Isso não será compilado }}</span>
```

#### v-cloak

Usado para esconder templates não compilados até que o Vue esteja pronto:

```html
<div v-cloak>{{ mensagem }}</div>
```

Com CSS:

```css
[v-cloak] {
  display: none;
}
```

#### v-once

Renderiza o elemento/componente apenas uma vez:

```html
<span v-once>Isso nunca mudará: {{ mensagem }}</span>
```

### Ordem de Precedência de Diretivas

Quando múltiplas diretivas são aplicadas ao mesmo elemento, a ordem de avaliação é:

1. `v-if` / `v-else` / `v-else-if`
2. `v-for`
3. `v-on`
4. `v-bind`
5. `v-slot`
6. `v-model`
7. Outras diretivas

**Nota importante**: Evite usar `v-if` e `v-for` no mesmo elemento devido a problemas de precedência. Prefira usar `v-for` em um elemento wrapper.

## Aula 2.3: Manipulação de eventos

### Escutando Eventos

O Vue.js permite escutar eventos do DOM usando a diretiva `v-on`, que geralmente é abreviada para `@`:

```html
<button v-on:click="contador++">Incrementar</button>
<!-- Forma abreviada -->
<button @click="contador++">Incrementar</button>
```

### Métodos de Manipulação de Eventos

Para lógica mais complexa, é melhor usar métodos:

```html
<button @click="saudar">Saudar</button>
```

```javascript
// Options API
export default {
  data() {
    return {
      nome: 'Vue.js'
    }
  },
  methods: {
    saudar(event) {
      alert(`Olá, ${this.nome}!`)
      console.log(event) // Objeto de evento nativo
    }
  }
}

// Composition API
import { ref } from 'vue'

export default {
  setup() {
    const nome = ref('Vue.js')

    function saudar(event) {
      alert(`Olá, ${nome.value}!`)
      console.log(event) // Objeto de evento nativo
    }

    return {
      nome,
      saudar
    }
  }
}
```

### Passando Argumentos para Métodos de Evento

Você pode passar argumentos para métodos de evento:

```html
<button @click="saudar('Mundo')">Saudar Mundo</button>
<button @click="saudar('João', $event)">Saudar João</button>
```

```javascript
// Options API
methods: {
  saudar(mensagem, event) {
    alert(`Olá, ${mensagem}!`)
    if (event) {
      console.log(event)
    }
  }
}

// Composition API
setup() {
  function saudar(mensagem, event) {
    alert(`Olá, ${mensagem}!`)
    if (event) {
      console.log(event)
    }
  }

  return { saudar }
}
```

### Modificadores de Eventos

O Vue fornece modificadores de eventos para lidar com tarefas comuns:

#### Modificadores de Evento

```html
<!-- Impedir comportamento padrão -->
<form @submit.prevent="onSubmit"></form>

<!-- Parar propagação -->
<button @click.stop="onClick"></button>

<!-- Ambos juntos -->
<button @click.stop.prevent="onClick"></button>

<!-- Capturar evento na fase de captura -->
<div @click.capture="onClick"></div>

<!-- Apenas se o evento ocorrer no próprio elemento (não em filhos) -->
<div @click.self="onClick"></div>

<!-- Evento dispara apenas uma vez -->
<button @click.once="onClick"></button>

<!-- Propagação continua mesmo se .prevent for usado -->
<button @click.passive="onScroll"></button>
```

#### Modificadores de Tecla

```html
<!-- Apenas quando Enter é pressionado -->
<input @keyup.enter="submit" />

<!-- Apenas quando Esc é pressionado -->
<input @keyup.esc="cancel" />

<!-- Teclas comuns: enter, tab, delete, esc, space, up, down, left, right -->
<input @keyup.space="onSpace" />

<!-- Teclas de modificação: ctrl, alt, shift, meta -->
<input @keydown.ctrl="onCtrl" />

<!-- Apenas quando Ctrl+Enter é pressionado -->
<input @keyup.ctrl.enter="onCtrlEnter" />

<!-- Apenas quando Alt+C é pressionado -->
<input @keyup.alt.67="onAltC" />
```

#### Modificadores de Mouse

```html
<!-- Botões do mouse: left, right, middle -->
<button @click.left="onClick">Clique Esquerdo</button>
<button @click.right="onRightClick">Clique Direito</button>
<button @click.middle="onMiddleClick">Clique do Meio</button>
```

### Eventos Personalizados

Componentes podem emitir eventos personalizados usando o método `$emit`:

```html
<!-- Componente Filho -->
<template>
  <button @click="incrementar">Incrementar</button>
</template>

<script>
  // Options API
  export default {
    data() {
      return {
        contador: 0
      }
    },
    methods: {
      incrementar() {
        this.contador++
        this.$emit('atualizar', this.contador)
      }
    }
  }

  // Composition API
  import { ref } from 'vue'

  export default {
    setup(props, { emit }) {
      const contador = ref(0)

      function incrementar() {
        contador.value++
        emit('atualizar', contador.value)
      }

      return {
        contador,
        incrementar
      }
    }
  }
</script>
```

```html
<!-- Componente Pai -->
<template>
  <ComponenteFilho @atualizar="onAtualizar" />
  <p>Contador: {{ contador }}</p>
</template>

<script>
  import ComponenteFilho from './ComponenteFilho.vue'

  // Options API
  export default {
    components: {
      ComponenteFilho
    },
    data() {
      return {
        contador: 0
      }
    },
    methods: {
      onAtualizar(valor) {
        this.contador = valor
      }
    }
  }

  // Composition API
  import { ref } from 'vue'

  export default {
    components: {
      ComponenteFilho
    },
    setup() {
      const contador = ref(0)

      function onAtualizar(valor) {
        contador.value = valor
      }

      return {
        contador,
        onAtualizar
      }
    }
  }
</script>
```

### Validação de Eventos

Você pode definir os eventos que um componente emite usando a opção `emits`:

```javascript
// Options API
export default {
  emits: ['atualizar'],
  // ou com validação
  emits: {
    atualizar: (valor) => {
      // retornar false para rejeitar a emissão
      return typeof valor === 'number'
    }
  }
}

// Composition API
export default {
  emits: ['atualizar'],
  setup(props, { emit }) {
    // ...
  }
}
```

### v-model em Componentes

O `v-model` em um componente é uma abreviação para:

```html
<ComponenteFilho
  :modelValue="valor"
  @update:modelValue="novoValor => valor = novoValor"
/>
```

Implementação no componente filho:

```javascript
// Options API
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    atualizar(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}

// Composition API
import { computed } from 'vue'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function atualizar(e) {
      emit('update:modelValue', e.target.value)
    }

    return { atualizar }
  }
}
```

### Múltiplos v-model

No Vue 3, você pode ter múltiplos v-model em um componente:

```html
<ComponenteUsuario v-model:nome="usuario.nome" v-model:email="usuario.email" />
```

Implementação no componente:

```javascript
// Options API
export default {
  props: {
    nome: String,
    email: String
  },
  emits: ['update:nome', 'update:email'],
  methods: {
    atualizarNome(nome) {
      this.$emit('update:nome', nome)
    },
    atualizarEmail(email) {
      this.$emit('update:email', email)
    }
  }
}

// Composition API
export default {
  props: {
    nome: String,
    email: String
  },
  emits: ['update:nome', 'update:email'],
  setup(props, { emit }) {
    function atualizarNome(nome) {
      emit('update:nome', nome)
    }

    function atualizarEmail(email) {
      emit('update:email', email)
    }

    return {
      atualizarNome,
      atualizarEmail
    }
  }
}
```

## Aula 2.4: Propriedades computadas e watchers

### Propriedades Computadas

Propriedades computadas são valores derivados que dependem de outras propriedades reativas. Elas são cacheadas com base em suas dependências e só são recalculadas quando alguma dependência muda.

#### Sintaxe Básica

```javascript
// Options API
export default {
  data() {
    return {
      mensagem: 'Olá'
    }
  },
  computed: {
    mensagemInvertida() {
      return this.mensagem.split('').reverse().join('')
    }
  }
}

// Composition API
import { ref, computed } from 'vue'

export default {
  setup() {
    const mensagem = ref('Olá')

    const mensagemInvertida = computed(() => {
      return mensagem.value.split('').reverse().join('')
    })

    return {
      mensagem,
      mensagemInvertida
    }
  }
}
```

#### Uso no Template

```html
<div>Mensagem original: {{ mensagem }}</div>
<div>Mensagem invertida: {{ mensagemInvertida }}</div>
```

#### Propriedades Computadas vs Métodos

Métodos também podem ser usados para lógica similar:

```html
<div>{{ mensagemInvertida() }}</div>
```

```javascript
// Options API
methods: {
  mensagemInvertida() {
    return this.mensagem.split('').reverse().join('')
  }
}

// Composition API
setup() {
  function mensagemInvertida() {
    return mensagem.value.split('').reverse().join('')
  }

  return { mensagemInvertida }
}
```

**Diferença principal**: Propriedades computadas são cacheadas com base em suas dependências reativas. Um método é sempre executado novamente quando ocorre uma re-renderização.

#### Propriedades Computadas Graváveis

Por padrão, propriedades computadas são somente leitura, mas você pode torná-las graváveis fornecendo um getter e um setter:

```javascript
// Options API
computed: {
  nomeCompleto: {
    get() {
      return `${this.nome} ${this.sobrenome}`
    },
    set(novoValor) {
      const nomes = novoValor.split(' ')
      this.nome = nomes[0]
      this.sobrenome = nomes[1] || ''
    }
  }
}

// Composition API
import { ref, computed } from 'vue'

setup() {
  const nome = ref('João')
  const sobrenome = ref('Silva')

  const nomeCompleto = computed({
    get: () => `${nome.value} ${sobrenome.value}`,
    set: (novoValor) => {
      const nomes = novoValor.split(' ')
      nome.value = nomes[0]
      sobrenome.value = nomes[1] || ''
    }
  })

  return {
    nome,
    sobrenome,
    nomeCompleto
  }
}
```

Uso:

```html
<input v-model="nomeCompleto" />
```

### Watchers

Watchers permitem executar efeitos colaterais quando propriedades reativas mudam.

#### Sintaxe Básica

```javascript
// Options API
export default {
  data() {
    return {
      pergunta: '',
      resposta: 'As perguntas geralmente contêm um ponto de interrogação.'
    }
  },
  watch: {
    pergunta(novaPergunta, antigaPergunta) {
      if (novaPergunta.includes('?')) {
        this.buscarResposta()
      }
    }
  },
  methods: {
    buscarResposta() {
      this.resposta = 'Pensando...'
      // Simular uma API
      setTimeout(() => {
        this.resposta = 'Resposta para: ' + this.pergunta
      }, 1000)
    }
  }
}

// Composition API
import { ref, watch } from 'vue'

export default {
  setup() {
    const pergunta = ref('')
    const resposta = ref('As perguntas geralmente contêm um ponto de interrogação.')

    function buscarResposta() {
      resposta.value = 'Pensando...'
      // Simular uma API
      setTimeout(() => {
        resposta.value = 'Resposta para: ' + pergunta.value
      }, 1000)
    }

    watch(pergunta, (novaPergunta, antigaPergunta) => {
      if (novaPergunta.includes('?')) {
        buscarResposta()
      }
    })

    return {
      pergunta,
      resposta
    }
  }
}
```

#### Observando Múltiplas Fontes

```javascript
// Options API
watch: {
  // Observando múltiplas propriedades usando um array
  // Requer Vue 3.2+
  '$props.firstName, $props.lastName'(newValues, oldValues) {
    // ...
  }
}

// Composition API
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  // ...
})
```

#### Watchers Profundos

Por padrão, o watch não detecta mudanças em propriedades aninhadas de objetos. Para isso, use a opção `deep`:

```javascript
// Options API
watch: {
  obj: {
    handler(novoObj, antigoObj) {
      // Será chamado mesmo para mudanças aninhadas
    },
    deep: true
  }
}

// Composition API
watch(obj, (novoObj, antigoObj) => {
  // ...
}, { deep: true })
```

#### Watchers Imediatos

Por padrão, os watchers são executados apenas quando a fonte muda. Para executar o callback imediatamente, use a opção `immediate`:

```javascript
// Options API
watch: {
  pergunta: {
    handler(novaPergunta) {
      // Chamado imediatamente e quando pergunta mudar
    },
    immediate: true
  }
}

// Composition API
watch(pergunta, (novaPergunta) => {
  // ...
}, { immediate: true })
```

#### watchEffect

O `watchEffect` é uma forma simplificada de watch que rastreia automaticamente suas dependências:

```javascript
// Composition API
import { ref, watchEffect } from "vue";

export default {
  setup() {
    const pergunta = ref("");
    const resposta = ref("");

    watchEffect(() => {
      // Este efeito será executado imediatamente e
      // re-executado sempre que pergunta.value mudar
      console.log(`Pergunta atual: ${pergunta.value}`);

      if (pergunta.value.includes("?")) {
        resposta.value = "Pensando...";
        // Simular uma API
        setTimeout(() => {
          resposta.value = "Resposta para: " + pergunta.value;
        }, 1000);
      }
    });

    return {
      pergunta,
      resposta,
    };
  },
};
```

#### Parando Watchers

Watchers retornam uma função que pode ser chamada para parar o watcher:

```javascript
// Composition API
const parar = watch(fonte, callback);
// Mais tarde
parar();

// Ou com watchEffect
const parar = watchEffect(() => {
  // ...
});
// Mais tarde
parar();
```

#### Tempo de Limpeza

Você pode executar uma função de limpeza quando o watcher é parado ou antes da próxima execução:

```javascript
// Composition API
watchEffect((onInvalidate) => {
  const token = performAsyncOperation(id.value);

  // Chamado quando o watcher é invalidado
  onInvalidate(() => {
    token.cancel();
  });
});

// Ou com watch
watch(id, (newId, oldId, onInvalidate) => {
  const token = performAsyncOperation(newId);

  onInvalidate(() => {
    token.cancel();
  });
});
```

### Quando Usar Computed vs Watch

- **Computed**: Use para valores derivados que dependem de outras propriedades. Ideal para transformações de dados.
- **Watch**: Use para executar efeitos colaterais (como chamadas de API, manipulação do DOM) quando os dados mudam.

| Característica | Computed                | Watch                                       |
| -------------- | ----------------------- | ------------------------------------------- |
| Propósito      | Derivar novos dados     | Executar efeitos colaterais                 |
| Caching        | Sim                     | Não                                         |
| Execução       | Lazy (quando acessado)  | Eager (quando a fonte muda)                 |
| Retorno        | Valor calculado         | Nenhum (void)                               |
| Uso típico     | Transformações de dados | Requisições assíncronas, manipulação do DOM |

## Exercício Prático: Desenvolvimento de uma aplicação de lista de tarefas

### Objetivo

Criar uma aplicação de lista de tarefas (Todo List) que demonstre os conceitos fundamentais do Vue.js, incluindo:

- Criação de aplicação
- Sintaxe de template e diretivas
- Manipulação de eventos
- Propriedades computadas e watchers

### Requisitos

1. Adicionar novas tarefas
2. Marcar tarefas como concluídas
3. Filtrar tarefas (todas, ativas, concluídas)
4. Excluir tarefas
5. Mostrar contagem de tarefas restantes
6. Limpar todas as tarefas concluídas

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest todo-list -- --template vue
cd todo-list
npm install
```

### Passo 2: Implementação do Componente Principal

Crie o arquivo `src/components/TodoList.vue`:

```vue
<template>
  <div class="todo-container">
    <h1>Lista de Tarefas</h1>

    <!-- Formulário para adicionar tarefas -->
    <div class="add-todo">
      <input
        v-model="novaTarefa"
        @keyup.enter="adicionarTarefa"
        placeholder="O que precisa ser feito?"
        class="todo-input"
      />
      <button @click="adicionarTarefa" class="add-button">Adicionar</button>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <button
        @click="filtroAtual = 'todas'"
        :class="{ active: filtroAtual === 'todas' }"
      >
        Todas
      </button>
      <button
        @click="filtroAtual = 'ativas'"
        :class="{ active: filtroAtual === 'ativas' }"
      >
        Ativas
      </button>
      <button
        @click="filtroAtual = 'concluidas'"
        :class="{ active: filtroAtual === 'concluidas' }"
      >
        Concluídas
      </button>
    </div>

    <!-- Lista de tarefas -->
    <ul class="todo-list" v-if="tarefasFiltradas.length > 0">
      <li
        v-for="tarefa in tarefasFiltradas"
        :key="tarefa.id"
        :class="{ completed: tarefa.concluida }"
        class="todo-item"
      >
        <div class="todo-content">
          <input
            type="checkbox"
            :checked="tarefa.concluida"
            @change="alternarTarefa(tarefa)"
          />
          <span :class="{ 'todo-completed': tarefa.concluida }">
            {{ tarefa.texto }}
          </span>
        </div>
        <button @click="removerTarefa(tarefa.id)" class="delete-button">
          ×
        </button>
      </li>
    </ul>
    <p v-else class="empty-list">Nenhuma tarefa encontrada.</p>

    <!-- Rodapé -->
    <div class="todo-footer" v-if="tarefas.length > 0">
      <span
        >{{ tarefasRestantes }}
        {{
          tarefasRestantes === 1 ? "tarefa restante" : "tarefas restantes"
        }}</span
      >
      <button
        @click="limparConcluidas"
        v-if="tarefasConcluidas > 0"
        class="clear-button"
      >
        Limpar concluídas
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tarefas: [],
      novaTarefa: "",
      filtroAtual: "todas",
      proximoId: 1,
    };
  },
  computed: {
    tarefasFiltradas() {
      switch (this.filtroAtual) {
        case "ativas":
          return this.tarefas.filter((tarefa) => !tarefa.concluida);
        case "concluidas":
          return this.tarefas.filter((tarefa) => tarefa.concluida);
        default:
          return this.tarefas;
      }
    },
    tarefasRestantes() {
      return this.tarefas.filter((tarefa) => !tarefa.concluida).length;
    },
    tarefasConcluidas() {
      return this.tarefas.filter((tarefa) => tarefa.concluida).length;
    },
  },
  methods: {
    adicionarTarefa() {
      const texto = this.novaTarefa.trim();
      if (texto) {
        this.tarefas.push({
          id: this.proximoId++,
          texto,
          concluida: false,
        });
        this.novaTarefa = "";
      }
    },
    alternarTarefa(tarefa) {
      tarefa.concluida = !tarefa.concluida;
    },
    removerTarefa(id) {
      this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
    },
    limparConcluidas() {
      this.tarefas = this.tarefas.filter((tarefa) => !tarefa.concluida);
    },
  },
  watch: {
    tarefas: {
      handler(novasTarefas) {
        console.log("Tarefas atualizadas:", novasTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
      },
      deep: true,
    },
  },
  mounted() {
    // Carregar tarefas do localStorage
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      this.tarefas = JSON.parse(tarefasSalvas);
      // Encontrar o maior ID para continuar a sequência
      if (this.tarefas.length > 0) {
        this.proximoId = Math.max(...this.tarefas.map((t) => t.id)) + 1;
      }
    }
  },
};
</script>

<style scoped>
.todo-container {
  max-width: 550px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}

h1 {
  text-align: center;
  color: #42b983;
  margin-bottom: 20px;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.add-button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #3aa876;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filters button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-content {
  display: flex;
  align-items: center;
}

.todo-content input[type="checkbox"] {
  margin-right: 10px;
}

.todo-completed {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  background-color: transparent;
  border: none;
  color: #e74c3c;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
}

.delete-button:hover {
  color: #c0392b;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

.clear-button {
  background-color: transparent;
  border: 1px solid #ddd;
  color: #666;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.clear-button:hover {
  background-color: #f8f8f8;
}

.empty-list {
  text-align: center;
  color: #999;
  margin: 20px 0;
}
</style>
```

### Passo 3: Atualizar o Componente App

Modifique o arquivo `src/App.vue`:

```vue
<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9f9f9;
  margin: 0;
  padding: 20px;
}

.app {
  max-width: 800px;
  margin: 0 auto;
}
</style>
```

### Passo 4: Versão com Composition API

Aqui está a mesma aplicação usando Composition API:

```vue
<template>
  <div class="todo-container">
    <h1>Lista de Tarefas</h1>

    <!-- Formulário para adicionar tarefas -->
    <div class="add-todo">
      <input
        v-model="novaTarefa"
        @keyup.enter="adicionarTarefa"
        placeholder="O que precisa ser feito?"
        class="todo-input"
      />
      <button @click="adicionarTarefa" class="add-button">Adicionar</button>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <button
        @click="filtroAtual = 'todas'"
        :class="{ active: filtroAtual === 'todas' }"
      >
        Todas
      </button>
      <button
        @click="filtroAtual = 'ativas'"
        :class="{ active: filtroAtual === 'ativas' }"
      >
        Ativas
      </button>
      <button
        @click="filtroAtual = 'concluidas'"
        :class="{ active: filtroAtual === 'concluidas' }"
      >
        Concluídas
      </button>
    </div>

    <!-- Lista de tarefas -->
    <ul class="todo-list" v-if="tarefasFiltradas.length > 0">
      <li
        v-for="tarefa in tarefasFiltradas"
        :key="tarefa.id"
        :class="{ completed: tarefa.concluida }"
        class="todo-item"
      >
        <div class="todo-content">
          <input
            type="checkbox"
            :checked="tarefa.concluida"
            @change="alternarTarefa(tarefa)"
          />
          <span :class="{ 'todo-completed': tarefa.concluida }">
            {{ tarefa.texto }}
          </span>
        </div>
        <button @click="removerTarefa(tarefa.id)" class="delete-button">
          ×
        </button>
      </li>
    </ul>
    <p v-else class="empty-list">Nenhuma tarefa encontrada.</p>

    <!-- Rodapé -->
    <div class="todo-footer" v-if="tarefas.length > 0">
      <span
        >{{ tarefasRestantes }}
        {{
          tarefasRestantes === 1 ? "tarefa restante" : "tarefas restantes"
        }}</span
      >
      <button
        @click="limparConcluidas"
        v-if="tarefasConcluidas > 0"
        class="clear-button"
      >
        Limpar concluídas
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

// Estado reativo
const tarefas = ref([]);
const novaTarefa = ref("");
const filtroAtual = ref("todas");
const proximoId = ref(1);

// Propriedades computadas
const tarefasFiltradas = computed(() => {
  switch (filtroAtual.value) {
    case "ativas":
      return tarefas.value.filter((tarefa) => !tarefa.concluida);
    case "concluidas":
      return tarefas.value.filter((tarefa) => tarefa.concluida);
    default:
      return tarefas.value;
  }
});

const tarefasRestantes = computed(() => {
  return tarefas.value.filter((tarefa) => !tarefa.concluida).length;
});

const tarefasConcluidas = computed(() => {
  return tarefas.value.filter((tarefa) => tarefa.concluida).length;
});

// Métodos
function adicionarTarefa() {
  const texto = novaTarefa.value.trim();
  if (texto) {
    tarefas.value.push({
      id: proximoId.value++,
      texto,
      concluida: false,
    });
    novaTarefa.value = "";
  }
}

function alternarTarefa(tarefa) {
  tarefa.concluida = !tarefa.concluida;
}

function removerTarefa(id) {
  tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id);
}

function limparConcluidas() {
  tarefas.value = tarefas.value.filter((tarefa) => !tarefa.concluida);
}

// Watchers
watch(
  tarefas,
  (novasTarefas) => {
    console.log("Tarefas atualizadas:", novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
  },
  { deep: true }
);

// Lifecycle hooks
onMounted(() => {
  // Carregar tarefas do localStorage
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas) {
    tarefas.value = JSON.parse(tarefasSalvas);
    // Encontrar o maior ID para continuar a sequência
    if (tarefas.value.length > 0) {
      proximoId.value = Math.max(...tarefas.value.map((t) => t.id)) + 1;
    }
  }
});
</script>

<style scoped>
/* Mesmo CSS do exemplo anterior */
</style>
```

### Passo 5: Executar e Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para testar a aplicação.

# Exercícios Práticos - Módulo 2: Fundamentos

## Exercício 1: Lista de Tarefas Dinâmica

- Crie um componente de lista de tarefas
- Implemente adição e remoção de tarefas
- Use `v-for` para renderizar lista
- Adicione estado de conclusão com `v-model`

## Exercício 2: Renderização Condicional

- Desenvolva um componente de calculadora
- Implemente operações básicas
- Use renderização condicional para mostrar resultados
- Adicione tratamento de erros

## Desafio Final

- Criar um aplicativo de conversão de moedas
- Use two-way data binding
- Implemente lógica de conversão
- Adicione validações de entrada

### Perguntas para Fixação

1. **Qual é a diferença entre `v-if` e `v-show`?**

   - a) Não há diferença, ambos controlam a visibilidade de elementos
   - b) `v-if` remove o elemento do DOM, enquanto `v-show` apenas altera o CSS `display`
   - c) `v-show` é mais eficiente para elementos que mudam frequentemente
   - d) Todas as alternativas acima estão corretas

2. **Como você pode passar um argumento para um método de evento no Vue?**

   - a) `<button @click="metodo(arg)">Clique</button>`
   - b) `<button v-on:click="metodo(arg)">Clique</button>`
   - c) `<button @click="metodo" :arg="valor">Clique</button>`
   - d) As alternativas a e b estão corretas

3. **Qual é a principal diferença entre propriedades computadas e métodos no Vue?**

   - a) Métodos podem aceitar argumentos, propriedades computadas não
   - b) Propriedades computadas são cacheadas com base em suas dependências reativas
   - c) Métodos são mais eficientes para cálculos complexos
   - d) Propriedades computadas não podem ser usadas em templates

4. **Quando você deve usar um watcher em vez de uma propriedade computada?**

   - a) Quando precisa realizar operações assíncronas em resposta a mudanças de dados
   - b) Quando precisa observar múltiplas propriedades ao mesmo tempo
   - c) Quando precisa executar efeitos colaterais quando os dados mudam
   - d) As alternativas a e c estão corretas

5. **Qual é a sintaxe correta para criar uma propriedade computada gravável no Vue 3 com Composition API?**
   - a) `const prop = computed(() => { get: () => value, set: (newVal) => { value = newVal } })`
   - b) `const prop = computed({ get: () => value, set: (newVal) => { value = newVal } })`
   - c) `const prop = computed(() => value, (newVal) => { value = newVal })`
   - d) `const prop = watch(value, (newVal) => { value = newVal }, { immediate: true })`

**Respostas:**

1. d) Todas as alternativas acima estão corretas
2. d) As alternativas a e b estão corretas
3. b) Propriedades computadas são cacheadas com base em suas dependências reativas
4. d) As alternativas a e c estão corretas
5. b) `const prop = computed({ get: () => value, set: (newVal) => { value = newVal } })`
