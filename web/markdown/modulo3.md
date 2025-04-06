# Módulo 3: Sistema de Reatividade do Vue.js

## Aula 3.1: Fundamentos de reatividade

### O que é Reatividade?

A reatividade é um dos conceitos fundamentais do Vue.js. Em termos simples, é a capacidade do Vue de detectar quando os dados mudam e atualizar automaticamente a interface do usuário para refletir essas mudanças.

Imagine um cenário onde você tem uma variável `contador` e um elemento na tela que exibe esse valor. Em JavaScript puro, se você alterar o valor de `contador`, a interface não será atualizada automaticamente - você precisaria escrever código adicional para atualizar o DOM. No Vue.js, essa atualização acontece automaticamente graças ao sistema de reatividade.

### Evolução do Sistema de Reatividade no Vue

#### Vue 2: Object.defineProperty

No Vue 2, a reatividade era implementada usando `Object.defineProperty()`, que permitia interceptar operações de leitura e gravação em propriedades de objetos:

```javascript
let data = { contador: 0 };
let contador = data.contador;

// Transformando a propriedade em reativa
Object.defineProperty(data, "contador", {
  get() {
    console.log("Propriedade contador foi acessada");
    return contador;
  },
  set(novoValor) {
    console.log(
      `Propriedade contador foi alterada de ${contador} para ${novoValor}`
    );
    contador = novoValor;
    // Aqui o Vue 2 notificaria os componentes para re-renderizar
  },
});

// Agora, quando acessamos ou modificamos a propriedade, os getters/setters são acionados
console.log(data.contador); // Aciona o getter
data.contador = 1; // Aciona o setter
```

**Limitações do Vue 2:**

- Não podia detectar adição/remoção de propriedades em objetos
- Não podia detectar modificações em arrays por índice
- Exigia métodos auxiliares como `Vue.set()` e `Vue.delete()`

#### Vue 3: Proxies JavaScript

O Vue 3 adotou Proxies JavaScript, uma funcionalidade mais moderna que permite interceptar operações em objetos de forma mais abrangente:

```javascript
let data = { contador: 0 };

// Criando um proxy reativo
const dataReativo = new Proxy(data, {
  get(target, key) {
    console.log(`Propriedade ${key} foi acessada`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`Propriedade ${key} foi alterada para ${value}`);
    target[key] = value;
    // Aqui o Vue 3 notificaria os componentes para re-renderizar
    return true; // Necessário para Proxies
  },
});

// Agora, quando acessamos ou modificamos a propriedade, o proxy intercepta
console.log(dataReativo.contador); // Aciona o handler get
dataReativo.contador = 1; // Aciona o handler set

// Adicionando uma nova propriedade (não funcionaria no Vue 2 sem Vue.set)
dataReativo.novaPropriedade = "valor"; // Também aciona o handler set
```

**Vantagens do Vue 3:**

- Detecta adição/remoção de propriedades em objetos
- Detecta modificações em arrays por índice
- Intercepta mais operações (delete, has, etc.)
- Melhor desempenho
- Não requer métodos auxiliares especiais

### Como o Vue 3 Implementa a Reatividade

O sistema de reatividade do Vue 3 é construído em torno de três conceitos principais:

1. **Proxies**: Para interceptar operações em objetos
2. **Efeitos**: Funções que são executadas quando os dados mudam
3. **Rastreamento de dependências**: Mecanismo para saber quais efeitos dependem de quais dados

Aqui está uma versão simplificada de como o Vue 3 implementa a reatividade:

```javascript
// Sistema de rastreamento de dependências
let efeitoAtivo = null;
const efeitos = new Map();

// Função para criar um efeito reativo
function efeito(fn) {
  const efeitoExecutavel = () => {
    efeitoAtivo = efeitoExecutavel;
    fn();
    efeitoAtivo = null;
  };

  // Executar o efeito imediatamente
  efeitoExecutavel();
  return efeitoExecutavel;
}

// Função para rastrear dependências
function rastrear(target, key) {
  if (efeitoAtivo) {
    // Obter o conjunto de efeitos para este objeto e propriedade
    if (!efeitos.has(target)) {
      efeitos.set(target, new Map());
    }

    const depsMap = efeitos.get(target);
    if (!depsMap.has(key)) {
      depsMap.set(key, new Set());
    }

    // Adicionar o efeito ativo às dependências
    depsMap.get(key).add(efeitoAtivo);
  }
}

// Função para acionar efeitos
function acionar(target, key) {
  // Verificar se há efeitos para este objeto e propriedade
  const depsMap = efeitos.get(target);
  if (!depsMap) return;

  const deps = depsMap.get(key);
  if (deps) {
    // Executar todos os efeitos associados
    deps.forEach((efeito) => efeito());
  }
}

// Função para criar um objeto reativo
function reativo(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const resultado = Reflect.get(target, key, receiver);

      // Rastrear a dependência
      rastrear(target, key);

      return resultado;
    },
    set(target, key, value, receiver) {
      const resultado = Reflect.set(target, key, value, receiver);

      // Acionar efeitos
      acionar(target, key);

      return resultado;
    },
  });
}

// Exemplo de uso
const estado = reativo({ contador: 0 });

// Criar um efeito que depende do estado.contador
efeito(() => {
  console.log(`O contador é: ${estado.contador}`);
});

// Quando alteramos o estado, o efeito é executado novamente
estado.contador++; // Imprime "O contador é: 1"
```

Este é um modelo simplificado, mas ilustra os princípios básicos do sistema de reatividade do Vue 3.

### Reatividade no Contexto de Componentes Vue

No contexto de componentes Vue, a reatividade funciona da seguinte forma:

1. **Definição de dados reativos**: Usando `data()`, `ref()`, `reactive()`, etc.
2. **Renderização inicial**: O Vue renderiza o componente com base nos dados iniciais
3. **Rastreamento de dependências**: Durante a renderização, o Vue rastreia quais propriedades reativas são usadas
4. **Atualização de dados**: Quando os dados mudam, o Vue aciona uma re-renderização apenas dos componentes afetados
5. **Renderização eficiente**: O Vue usa um algoritmo de DOM virtual para aplicar apenas as mudanças necessárias ao DOM real

## Aula 3.2: Refs vs Reactive

### Introdução às APIs de Reatividade do Vue 3

O Vue 3 introduziu a Composition API, que oferece duas principais formas de criar dados reativos: `ref()` e `reactive()`. Ambas servem ao mesmo propósito fundamental - criar dados reativos - mas têm diferenças importantes em termos de uso e comportamento.

### Ref: Valores Reativos Simples

A função `ref()` é usada para criar uma referência reativa a um valor simples. Ela envolve o valor em um objeto com uma propriedade `.value`:

```javascript
import { ref } from "vue";

// Criando uma referência reativa
const contador = ref(0);

// Acessando o valor
console.log(contador.value); // 0

// Modificando o valor
contador.value++;
console.log(contador.value); // 1
```

#### Características do Ref:

1. **Pode envolver qualquer tipo de valor**: primitivos (números, strings, booleanos) ou objetos complexos
2. **Sempre requer `.value` para acessar ou modificar o valor** (exceto em templates, onde o `.value` é implícito)
3. **Mantém a reatividade mesmo quando reatribuído**: `contador.value = novoValor`
4. **Pode ser desestruturado mantendo a reatividade**: usando `toRefs()` ou `toRef()`

#### Uso em Templates:

Nos templates, o Vue automaticamente "desempacota" refs, então você não precisa usar `.value`:

```html
<template>
  <div>
    <p>Contador: {{ contador }}</p>
    <button @click="contador++">Incrementar</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const contador = ref(0);
</script>
```

### Reactive: Objetos Reativos

A função `reactive()` é usada para criar um objeto reativo. Ela transforma todo o objeto em um proxy reativo:

```javascript
import { reactive } from "vue";

// Criando um objeto reativo
const estado = reactive({
  contador: 0,
  nome: "Vue",
  ativo: true,
});

// Acessando propriedades (sem .value)
console.log(estado.contador); // 0

// Modificando propriedades
estado.contador++;
console.log(estado.contador); // 1
```

#### Características do Reactive:

1. **Funciona apenas com objetos e arrays**: não pode ser usado com valores primitivos
2. **Acesso direto às propriedades**: não requer `.value`
3. **Reatividade perdida na desestruturação**: se você fizer `const { contador } = estado`, `contador` não será reativo
4. **Reatividade perdida na reatribuição**: não pode reatribuir o objeto inteiro (`estado = novoEstado` não funciona)
5. **Reatividade profunda**: todas as propriedades aninhadas também são reativas

### Comparação entre Ref e Reactive

| Característica    | Ref                                          | Reactive                                |
| ----------------- | -------------------------------------------- | --------------------------------------- |
| Tipos suportados  | Qualquer tipo                                | Apenas objetos e arrays                 |
| Sintaxe de acesso | `.value` (exceto em templates)               | Acesso direto                           |
| Reatribuição      | Mantém reatividade                           | Perde reatividade                       |
| Desestruturação   | Perde reatividade (a menos que use `toRefs`) | Perde reatividade                       |
| Uso típico        | Valores primitivos, objetos simples          | Objetos complexos, estado do componente |

### Quando Usar Cada Um?

#### Use `ref` quando:

- Trabalhar com valores primitivos (números, strings, booleanos)
- Precisar reatribuir o valor inteiro
- Precisar passar o valor reativo como prop ou retorná-lo de uma função
- Quiser uma sintaxe consistente para todos os tipos de dados

```javascript
const contador = ref(0);
const mensagem = ref("Olá");
const ativo = ref(true);
const usuario = ref({ nome: "João", idade: 30 });

// Reatribuição funciona
contador.value = 10;
usuario.value = { nome: "Maria", idade: 25 };
```

#### Use `reactive` quando:

- Trabalhar com objetos complexos com muitas propriedades
- Não precisar reatribuir o objeto inteiro
- Preferir uma sintaxe mais limpa sem `.value`
- Trabalhar com estado local de um componente

```javascript
const estado = reactive({
  contador: 0,
  usuario: {
    nome: "João",
    idade: 30,
  },
  itens: ["a", "b", "c"],
});

// Modificação de propriedades funciona
estado.contador++;
estado.usuario.nome = "Maria";
estado.itens.push("d");

// Mas reatribuição não mantém reatividade
// estado = { contador: 10 } // ❌ Não funciona
```

### Soluções para Limitações

#### Desestruturação com `toRefs` e `toRef`

Para desestruturar objetos reativos mantendo a reatividade:

```javascript
import { reactive, toRefs, toRef } from "vue";

const estado = reactive({
  contador: 0,
  nome: "Vue",
});

// Desestruturação com toRefs
const { contador, nome } = toRefs(estado);
contador.value++; // Atualiza estado.contador

// Ou para uma única propriedade
const soNome = toRef(estado, "nome");
soNome.value = "Vue 3"; // Atualiza estado.nome
```

#### Objetos Reativos com `shallowReactive`

Se você precisar de reatividade apenas no primeiro nível:

```javascript
import { shallowReactive } from "vue";

const estado = shallowReactive({
  contador: 0,
  usuario: {
    nome: "João", // Alterações aqui não serão reativas
  },
});
```

#### Refs Superficiais com `shallowRef`

Se você tiver um objeto grande e só precisar reagir à reatribuição do objeto inteiro:

```javascript
import { shallowRef } from "vue";

const usuario = shallowRef({ nome: "João", idade: 30 });

// Isso aciona reatividade
usuario.value = { nome: "Maria", idade: 25 };

// Isso não aciona reatividade
usuario.value.nome = "Pedro";
```

### Melhores Práticas

1. **Seja consistente**: Escolha uma abordagem e mantenha-a em todo o componente
2. **Use `ref` para valores primitivos**: É a única opção para tornar primitivos reativos
3. **Considere `reactive` para estado local complexo**: Especialmente quando não precisa reatribuir o objeto inteiro
4. **Use `toRefs` ao retornar estado de composables**: Permite desestruturação mantendo reatividade
5. **Evite misturar `ref` e `reactive` para o mesmo dado**: Pode levar a confusão e bugs

## Aula 3.3: Computed Properties em profundidade

### O que são Propriedades Computadas?

Propriedades computadas são valores derivados que dependem de outras propriedades reativas. Elas são calculadas automaticamente quando suas dependências mudam e são cacheadas com base nessas dependências, o que significa que o cálculo só é refeito quando necessário.

### Sintaxe Básica

```javascript
// Options API
export default {
  data() {
    return {
      primeiroNome: 'João',
      sobrenome: 'Silva'
    }
  },
  computed: {
    nomeCompleto() {
      return `${this.primeiroNome} ${this.sobrenome}`
    }
  }
}

// Composition API
import { ref, computed } from 'vue'

export default {
  setup() {
    const primeiroNome = ref('João')
    const sobrenome = ref('Silva')

    const nomeCompleto = computed(() => {
      return `${primeiroNome.value} ${sobrenome.value}`
    })

    return {
      primeiroNome,
      sobrenome,
      nomeCompleto
    }
  }
}
```

### Como Funcionam as Propriedades Computadas

Internamente, uma propriedade computada:

1. **Executa a função getter** quando é acessada pela primeira vez
2. **Rastreia automaticamente as dependências reativas** usadas durante a execução
3. **Armazena em cache o valor retornado**
4. **Só recalcula o valor** quando uma dependência rastreada muda
5. **Retorna o valor em cache** em acessos subsequentes, se as dependências não mudaram

Este comportamento de cache é uma vantagem significativa sobre métodos regulares, que são sempre executados quando acessados.

### Propriedades Computadas vs Métodos

```html
<template>
  <p>Método: {{ metodoNomeCompleto() }}</p>
  <p>Computada: {{ nomeCompletoComputado }}</p>
</template>

<script>
  export default {
    data() {
      return {
        primeiroNome: "João",
        sobrenome: "Silva",
      };
    },
    methods: {
      metodoNomeCompleto() {
        console.log("Método executado");
        return `${this.primeiroNome} ${this.sobrenome}`;
      },
    },
    computed: {
      nomeCompletoComputado() {
        console.log("Computada executada");
        return `${this.primeiroNome} ${this.sobrenome}`;
      },
    },
  };
</script>
```

Se este componente for renderizado, você verá:

- "Método executado" é registrado toda vez que o componente é re-renderizado
- "Computada executada" é registrado apenas uma vez, a menos que `primeiroNome` ou `sobrenome` mudem

### Propriedades Computadas Graváveis (Getters e Setters)

Por padrão, propriedades computadas são somente leitura, mas você pode torná-las graváveis fornecendo um getter e um setter:

```javascript
// Options API
computed: {
  nomeCompleto: {
    get() {
      return `${this.primeiroNome} ${this.sobrenome}`
    },
    set(novoValor) {
      const nomes = novoValor.split(' ')
      this.primeiroNome = nomes[0]
      this.sobrenome = nomes[1] || ''
    }
  }
}

// Composition API
const nomeCompleto = computed({
  get: () => `${primeiroNome.value} ${sobrenome.value}`,
  set: (novoValor) => {
    const nomes = novoValor.split(' ')
    primeiroNome.value = nomes[0]
    sobrenome.value = nomes[1] || ''
  }
})
```

Uso:

```javascript
// Leitura
console.log(nomeCompleto.value); // "João Silva"

// Escrita
nomeCompleto.value = "Maria Oliveira";
console.log(primeiroNome.value); // "Maria"
console.log(sobrenome.value); // "Oliveira"
```

### Propriedades Computadas em Componentes

As propriedades computadas são frequentemente usadas para:

1. **Formatação de dados**: Transformar dados brutos em formatos legíveis
2. **Filtragem e ordenação**: Processar listas e arrays
3. **Cálculos derivados**: Realizar cálculos baseados em outras propriedades
4. **Combinação de dados**: Mesclar dados de diferentes fontes
5. **Validação de formulários**: Verificar se os dados de entrada são válidos

#### Exemplo: Filtragem e Ordenação

```javascript
import { ref, computed } from "vue";

export default {
  setup() {
    const tarefas = ref([
      { id: 1, texto: "Aprender Vue", concluida: true },
      { id: 2, texto: "Criar um projeto", concluida: false },
      { id: 3, texto: "Fazer deploy", concluida: false },
    ]);

    const filtro = ref("todas"); // 'todas', 'ativas', 'concluidas'

    const tarefasFiltradas = computed(() => {
      switch (filtro.value) {
        case "ativas":
          return tarefas.value.filter((t) => !t.concluida);
        case "concluidas":
          return tarefas.value.filter((t) => t.concluida);
        default:
          return tarefas.value;
      }
    });

    const tarefasOrdenadas = computed(() => {
      return [...tarefasFiltradas.value].sort((a, b) =>
        a.texto.localeCompare(b.texto)
      );
    });

    return {
      tarefas,
      filtro,
      tarefasFiltradas,
      tarefasOrdenadas,
    };
  },
};
```

### Propriedades Computadas Encadeadas

Você pode usar propriedades computadas como dependências de outras propriedades computadas:

```javascript
const primeiroNome = ref("João");
const sobrenome = ref("Silva");

const nomeCompleto = computed(() => `${primeiroNome.value} ${sobrenome.value}`);
const nomeCompletoMaiusculo = computed(() => nomeCompleto.value.toUpperCase());
const saudacao = computed(() => `Olá, ${nomeCompletoMaiusculo.value}!`);
```

Neste exemplo, se `primeiroNome` ou `sobrenome` mudar, todas as três propriedades computadas serão recalculadas em cascata.

### Propriedades Computadas com Efeitos Colaterais

Propriedades computadas **não devem** ter efeitos colaterais, como modificar o DOM ou fazer chamadas de API. Elas devem ser funções puras que apenas calculam e retornam um valor.

```javascript
// ❌ Incorreto: Propriedade computada com efeito colateral
const contador = ref(0);
const contadorDobro = computed(() => {
  const resultado = contador.value * 2;
  localStorage.setItem("contador", resultado); // Efeito colateral!
  return resultado;
});

// ✅ Correto: Use um watcher para efeitos colaterais
const contador = ref(0);
const contadorDobro = computed(() => contador.value * 2);

watch(contadorDobro, (novoValor) => {
  localStorage.setItem("contador", novoValor);
});
```

### Propriedades Computadas Assíncronas

Propriedades computadas não suportam operações assíncronas diretamente. Para dados assíncronos, considere estas alternativas:

#### Opção 1: Usar um ref/reactive com um watcher

```javascript
const userId = ref(1);
const userData = ref(null);
const loading = ref(false);

watch(
  userId,
  async (newId) => {
    loading.value = true;
    try {
      const response = await fetch(`https://api.example.com/users/${newId}`);
      userData.value = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
```

#### Opção 2: Usar um composable personalizado

```javascript
// useAsyncComputed.js
import { ref, watch } from "vue";

export function useAsyncComputed(getter, defaultValue = null) {
  const value = ref(defaultValue);
  const loading = ref(true);
  const error = ref(null);

  let lastPromise = null;

  const update = async () => {
    loading.value = true;
    error.value = null;

    try {
      const promise = getter();
      lastPromise = promise;
      const result = await promise;

      if (promise === lastPromise) {
        value.value = result;
      }
    } catch (e) {
      if (promise === lastPromise) {
        error.value = e;
      }
    } finally {
      if (promise === lastPromise) {
        loading.value = false;
      }
    }
  };

  update();

  return { value, loading, error, update };
}

// Uso
import { computed } from "vue";
import { useAsyncComputed } from "./useAsyncComputed";

const userId = ref(1);
const {
  value: userData,
  loading,
  error,
} = useAsyncComputed(() =>
  fetch(`https://api.example.com/users/${userId.value}`).then((res) =>
    res.json()
  )
);
```

### Melhores Práticas para Propriedades Computadas

1. **Mantenha-as simples**: Propriedades computadas devem ser concisas e focadas em uma única responsabilidade
2. **Evite efeitos colaterais**: Use watchers para efeitos colaterais
3. **Nomeie adequadamente**: Use nomes que descrevam o que a propriedade representa, não como é calculada
4. **Evite computações caras**: Para cálculos intensivos, considere memoização adicional ou lazy loading
5. **Use-as para derivar dados**: Não duplique estado que pode ser derivado de outro estado
6. **Prefira propriedades computadas a métodos** para valores derivados que serão acessados frequentemente

## Aula 3.4: Watchers e quando utilizá-los

### O que são Watchers?

Watchers são funções especiais que observam mudanças em dados reativos e executam efeitos colaterais quando esses dados mudam. Diferentemente das propriedades computadas, que são usadas para derivar valores, watchers são usados para executar ações em resposta a mudanças de dados.

### Sintaxe Básica

```javascript
// Options API
export default {
  data() {
    return {
      pergunta: ''
    }
  },
  watch: {
    pergunta(novoValor, valorAntigo) {
      console.log(`A pergunta mudou de "${valorAntigo}" para "${novoValor}"`)
      this.buscarResposta()
    }
  },
  methods: {
    buscarResposta() {
      // Lógica para buscar resposta
    }
  }
}

// Composition API
import { ref, watch } from 'vue'

export default {
  setup() {
    const pergunta = ref('')

    watch(pergunta, (novoValor, valorAntigo) => {
      console.log(`A pergunta mudou de "${valorAntigo}" para "${novoValor}"`)
      buscarResposta()
    })

    function buscarResposta() {
      // Lógica para buscar resposta
    }

    return {
      pergunta
    }
  }
}
```

### Tipos de Watchers na Composition API

#### 1. Observando uma única fonte

```javascript
const contador = ref(0);

watch(contador, (novoValor, valorAntigo) => {
  console.log(`Contador mudou de ${valorAntigo} para ${novoValor}`);
});
```

#### 2. Observando múltiplas fontes com array

```javascript
const x = ref(0);
const y = ref(0);

watch([x, y], ([novoX, novoY], [antigoX, antigoY]) => {
  console.log(`X mudou de ${antigoX} para ${novoX}`);
  console.log(`Y mudou de ${antigoY} para ${novoY}`);
});
```

#### 3. Observando uma função getter

```javascript
const usuario = reactive({
  nome: "João",
  idade: 30,
});

// Observa apenas a propriedade nome
watch(
  () => usuario.nome,
  (novoNome, antigoNome) => {
    console.log(`Nome mudou de ${antigoNome} para ${novoNome}`);
  }
);
```

#### 4. Observando objetos reativos

```javascript
const usuario = reactive({
  nome: "João",
  idade: 30,
});

// Observa o objeto inteiro (mudanças superficiais)
watch(
  usuario,
  (novoUsuario, antigoUsuario) => {
    console.log("Usuário mudou:", novoUsuario, antigoUsuario);
  },
  { deep: true }
); // deep: true é necessário para detectar mudanças em propriedades aninhadas
```

### Opções de Watchers

#### Execução Imediata

Por padrão, o callback do watcher só é chamado quando o valor observado muda. Para executar o callback imediatamente na criação do watcher:

```javascript
watch(fonte, callback, { immediate: true });
```

#### Observação Profunda

Para detectar mudanças em propriedades aninhadas de objetos:

```javascript
watch(objetoReativo, callback, { deep: true });
```

#### Observação Superficial

Para melhorar o desempenho quando você só precisa observar mudanças no primeiro nível:

```javascript
import { shallowRef, watch } from "vue";

const estado = shallowRef({ contador: 0 });

// Só será acionado quando estado.value for reatribuído,
// não quando estado.value.contador mudar
watch(estado, () => {
  console.log("Estado mudou");
});
```

#### Limpeza de Efeitos

Para limpar recursos ou cancelar operações pendentes quando o watcher é acionado novamente ou parado:

```javascript
watch(id, (novoId, antigoId, onInvalidate) => {
  // Iniciar uma operação assíncrona
  const token = buscarDados(novoId);

  // Registrar função de limpeza
  onInvalidate(() => {
    // Chamado quando o watcher é acionado novamente ou parado
    token.cancel();
  });
});
```

#### Parando Watchers

Watchers são automaticamente parados quando o componente é desmontado. Para parar manualmente:

```javascript
const parar = watch(fonte, callback);

// Mais tarde
parar(); // Para o watcher
```

### watchEffect: Uma Alternativa Simplificada

`watchEffect` é uma forma mais concisa de criar watchers que rastreia automaticamente suas dependências:

```javascript
import { ref, watchEffect } from "vue";

const contador = ref(0);
const dobro = ref(0);

// Rastreia automaticamente dependências
watchEffect(() => {
  // Será executado imediatamente e sempre que contador.value mudar
  dobro.value = contador.value * 2;
  console.log(`Dobro: ${dobro.value}`);
});
```

#### Diferenças entre watch e watchEffect

| Característica               | watch                | watchEffect |
| ---------------------------- | -------------------- | ----------- |
| Rastreamento de dependências | Explícito            | Automático  |
| Acesso a valores antigos     | Sim                  | Não         |
| Execução inicial             | Opcional (immediate) | Sempre      |
| Múltiplas fontes             | Sim (array)          | Implícito   |
| Controle granular            | Alto                 | Baixo       |

#### watchPostEffect e watchSyncEffect

Vue 3 oferece variantes do `watchEffect` com diferentes timings de execução:

```javascript
import { watchEffect, watchPostEffect, watchSyncEffect } from "vue";

// Executa antes das atualizações do componente (padrão)
watchEffect(() => {});

// Executa após as atualizações do componente e DOM
watchPostEffect(() => {});

// Executa sincronicamente quando reatividade é acionada
watchSyncEffect(() => {});
```

### Quando Usar Watchers vs Propriedades Computadas

#### Use Propriedades Computadas quando:

- Precisa derivar um valor de outros dados
- O resultado será usado em renderização ou outros cálculos
- Não há efeitos colaterais
- Precisa de caching baseado em dependências

```javascript
// ✅ Bom uso de propriedade computada
const nomeCompleto = computed(() => `${primeiroNome.value} ${sobrenome.value}`);
```

#### Use Watchers quando:

- Precisa executar efeitos colaterais em resposta a mudanças de dados
- Precisa fazer operações assíncronas
- Precisa acessar valores antigos e novos
- Precisa controlar quando a execução acontece (immediate, deep)

```javascript
// ✅ Bom uso de watcher
watch(pergunta, async (novaPergunta) => {
  if (novaPergunta.trim()) {
    isLoading.value = true;
    try {
      resposta.value = await buscarRespostaDaAPI(novaPergunta);
    } catch (error) {
      erro.value = error;
    } finally {
      isLoading.value = false;
    }
  }
});
```

### Casos de Uso Comuns para Watchers

#### 1. Chamadas de API em resposta a mudanças

```javascript
const usuarioId = ref(1);
const usuarioDados = ref(null);

watch(usuarioId, async (novoId) => {
  usuarioDados.value = await fetch(`/api/usuarios/${novoId}`).then((res) =>
    res.json()
  );
});
```

#### 2. Validação de formulários

```javascript
const email = ref("");
const emailValido = ref(true);
const mensagemErro = ref("");

watch(email, (novoEmail) => {
  if (!novoEmail) {
    emailValido.value = false;
    mensagemErro.value = "Email é obrigatório";
  } else if (!/^\S+@\S+\.\S+$/.test(novoEmail)) {
    emailValido.value = false;
    mensagemErro.value = "Email inválido";
  } else {
    emailValido.value = true;
    mensagemErro.value = "";
  }
});
```

#### 3. Persistência de dados

```javascript
const preferencias = reactive({
  tema: "claro",
  idioma: "pt-BR",
});

watch(
  preferencias,
  (novasPreferencias) => {
    localStorage.setItem("preferencias", JSON.stringify(novasPreferencias));
  },
  { deep: true }
);
```

#### 4. Sincronização com APIs externas

```javascript
const mapa = ref(null);
const centro = reactive({ lat: 0, lng: 0 });

// Quando o componente monta, inicializa o mapa
onMounted(() => {
  mapa.value = new GoogleMap("#mapa");
});

// Sincroniza o centro do mapa quando as coordenadas mudam
watch(
  centro,
  (novoCentro) => {
    if (mapa.value) {
      mapa.value.setCenter(novoCentro);
    }
  },
  { deep: true }
);
```

#### 5. Debounce de entrada do usuário

```javascript
import { ref, watch } from "vue";
import { debounce } from "lodash-es";

export default {
  setup() {
    const consulta = ref("");
    const resultados = ref([]);

    // Cria uma versão debounced da função de busca
    const buscarDebounced = debounce(async (texto) => {
      if (texto) {
        resultados.value = await buscarAPI(texto);
      } else {
        resultados.value = [];
      }
    }, 300);

    // Observa mudanças na consulta e aciona a busca debounced
    watch(consulta, (novaConsulta) => {
      buscarDebounced(novaConsulta);
    });

    return {
      consulta,
      resultados,
    };
  },
};
```

### Melhores Práticas para Watchers

1. **Mantenha-os focados**: Cada watcher deve ter uma única responsabilidade
2. **Evite watchers aninhados**: Pode levar a comportamentos inesperados e loops infinitos
3. **Use `immediate: true` com cautela**: Pode causar problemas se depender de elementos que ainda não foram montados
4. **Limpe recursos**: Use o callback `onInvalidate` para limpar recursos quando o watcher é invalidado
5. **Prefira propriedades computadas quando possível**: Para valores derivados sem efeitos colaterais
6. **Considere o desempenho**: Watchers profundos (`deep: true`) podem ser caros para objetos grandes

## Exercício Prático: Criação de um formulário reativo com validação

### Objetivo

Criar um formulário de cadastro reativo com validação em tempo real, demonstrando o uso de refs, reactive, computed properties e watchers.

### Requisitos

1. Formulário com campos: nome, email, senha, confirmação de senha
2. Validação em tempo real para todos os campos
3. Botão de envio desabilitado até que todos os campos sejam válidos
4. Feedback visual para campos válidos/inválidos
5. Exibição de mensagens de erro específicas

### Passo 1: Configuração do Projeto

```bash
# Criar um novo projeto Vue com Vite
npm create vite@latest formulario-reativo -- --template vue
cd formulario-reativo
npm install
```

### Passo 2: Implementação do Componente de Formulário

Crie o arquivo `src/components/FormularioCadastro.vue`:

```vue
<template>
  <div class="formulario-container">
    <h2>Cadastro de Usuário</h2>

    <form @submit.prevent="enviarFormulario" class="formulario">
      <!-- Campo Nome -->
      <div class="campo-formulario" :class="{ 'campo-invalido': erros.nome }">
        <label for="nome">Nome Completo</label>
        <input
          id="nome"
          v-model="formulario.nome"
          type="text"
          @blur="validarCampo('nome')"
        />
        <span v-if="erros.nome" class="mensagem-erro">{{ erros.nome }}</span>
      </div>

      <!-- Campo Email -->
      <div class="campo-formulario" :class="{ 'campo-invalido': erros.email }">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="formulario.email"
          type="email"
          @blur="validarCampo('email')"
        />
        <span v-if="erros.email" class="mensagem-erro">{{ erros.email }}</span>
      </div>

      <!-- Campo Senha -->
      <div class="campo-formulario" :class="{ 'campo-invalido': erros.senha }">
        <label for="senha">Senha</label>
        <input
          id="senha"
          v-model="formulario.senha"
          type="password"
          @blur="validarCampo('senha')"
        />
        <span v-if="erros.senha" class="mensagem-erro">{{ erros.senha }}</span>

        <!-- Indicador de força da senha -->
        <div v-if="formulario.senha" class="forca-senha">
          <div class="forca-barra">
            <div
              class="forca-nivel"
              :style="{ width: forcaSenha.porcentagem + '%' }"
              :class="forcaSenha.classe"
            ></div>
          </div>
          <span>{{ forcaSenha.texto }}</span>
        </div>
      </div>

      <!-- Campo Confirmação de Senha -->
      <div
        class="campo-formulario"
        :class="{ 'campo-invalido': erros.confirmacaoSenha }"
      >
        <label for="confirmacaoSenha">Confirmar Senha</label>
        <input
          id="confirmacaoSenha"
          v-model="formulario.confirmacaoSenha"
          type="password"
          @blur="validarCampo('confirmacaoSenha')"
        />
        <span v-if="erros.confirmacaoSenha" class="mensagem-erro">{{
          erros.confirmacaoSenha
        }}</span>
      </div>

      <!-- Termos e Condições -->
      <div class="campo-formulario checkbox">
        <input id="termos" v-model="formulario.aceitaTermos" type="checkbox" />
        <label for="termos">Aceito os termos e condições</label>
        <span v-if="erros.aceitaTermos" class="mensagem-erro">{{
          erros.aceitaTermos
        }}</span>
      </div>

      <!-- Botão de Envio -->
      <button type="submit" class="botao-enviar" :disabled="!formularioValido">
        Cadastrar
      </button>

      <!-- Mensagem de Sucesso -->
      <div v-if="enviado" class="mensagem-sucesso">
        Cadastro realizado com sucesso!
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from "vue";

export default {
  setup() {
    // Estado do formulário usando reactive
    const formulario = reactive({
      nome: "",
      email: "",
      senha: "",
      confirmacaoSenha: "",
      aceitaTermos: false,
    });

    // Estado de erros usando reactive
    const erros = reactive({
      nome: "",
      email: "",
      senha: "",
      confirmacaoSenha: "",
      aceitaTermos: "",
    });

    // Estado de envio
    const enviado = ref(false);

    // Validação de campos individuais
    const validarCampo = (campo) => {
      switch (campo) {
        case "nome":
          if (!formulario.nome) {
            erros.nome = "Nome é obrigatório";
          } else if (formulario.nome.length < 3) {
            erros.nome = "Nome deve ter pelo menos 3 caracteres";
          } else {
            erros.nome = "";
          }
          break;

        case "email":
          if (!formulario.email) {
            erros.email = "Email é obrigatório";
          } else if (!/^\S+@\S+\.\S+$/.test(formulario.email)) {
            erros.email = "Email inválido";
          } else {
            erros.email = "";
          }
          break;

        case "senha":
          if (!formulario.senha) {
            erros.senha = "Senha é obrigatória";
          } else if (formulario.senha.length < 8) {
            erros.senha = "Senha deve ter pelo menos 8 caracteres";
          } else if (!/[A-Z]/.test(formulario.senha)) {
            erros.senha = "Senha deve conter pelo menos uma letra maiúscula";
          } else if (!/[0-9]/.test(formulario.senha)) {
            erros.senha = "Senha deve conter pelo menos um número";
          } else {
            erros.senha = "";
          }

          // Validar confirmação de senha se já preenchida
          if (formulario.confirmacaoSenha) {
            validarCampo("confirmacaoSenha");
          }
          break;

        case "confirmacaoSenha":
          if (!formulario.confirmacaoSenha) {
            erros.confirmacaoSenha = "Confirmação de senha é obrigatória";
          } else if (formulario.confirmacaoSenha !== formulario.senha) {
            erros.confirmacaoSenha = "As senhas não coincidem";
          } else {
            erros.confirmacaoSenha = "";
          }
          break;

        case "aceitaTermos":
          erros.aceitaTermos = formulario.aceitaTermos
            ? ""
            : "Você deve aceitar os termos";
          break;
      }
    };

    // Validar todos os campos
    const validarFormulario = () => {
      validarCampo("nome");
      validarCampo("email");
      validarCampo("senha");
      validarCampo("confirmacaoSenha");
      validarCampo("aceitaTermos");
    };

    // Computed property para verificar se o formulário é válido
    const formularioValido = computed(() => {
      return (
        formulario.nome &&
        formulario.email &&
        formulario.senha &&
        formulario.confirmacaoSenha &&
        formulario.aceitaTermos &&
        !erros.nome &&
        !erros.email &&
        !erros.senha &&
        !erros.confirmacaoSenha &&
        !erros.aceitaTermos
      );
    });

    // Computed property para calcular a força da senha
    const forcaSenha = computed(() => {
      if (!formulario.senha) {
        return { porcentagem: 0, classe: "", texto: "" };
      }

      let pontos = 0;
      let feedback = [];

      // Comprimento básico
      if (formulario.senha.length >= 8) {
        pontos += 25;
      } else {
        feedback.push("muito curta");
      }

      // Letras maiúsculas
      if (/[A-Z]/.test(formulario.senha)) {
        pontos += 25;
      } else {
        feedback.push("sem maiúsculas");
      }

      // Letras minúsculas
      if (/[a-z]/.test(formulario.senha)) {
        pontos += 25;
      } else {
        feedback.push("sem minúsculas");
      }

      // Números
      if (/[0-9]/.test(formulario.senha)) {
        pontos += 25;
      } else {
        feedback.push("sem números");
      }

      // Caracteres especiais
      if (/[^A-Za-z0-9]/.test(formulario.senha)) {
        pontos += 25;
      } else {
        feedback.push("sem caracteres especiais");
      }

      // Ajustar para máximo de 100%
      pontos = Math.min(100, pontos);

      // Determinar classe e texto
      let classe, texto;

      if (pontos < 30) {
        classe = "fraca";
        texto = "Fraca";
      } else if (pontos < 60) {
        classe = "media";
        texto = "Média";
      } else if (pontos < 80) {
        classe = "boa";
        texto = "Boa";
      } else {
        classe = "forte";
        texto = "Forte";
      }

      if (feedback.length) {
        texto += ` (${feedback.join(", ")})`;
      }

      return { porcentagem: pontos, classe, texto };
    });

    // Watcher para validar termos quando o checkbox muda
    watch(
      () => formulario.aceitaTermos,
      () => {
        validarCampo("aceitaTermos");
      }
    );

    // Função para enviar o formulário
    const enviarFormulario = () => {
      validarFormulario();

      if (formularioValido.value) {
        // Simulação de envio para API
        console.log("Formulário enviado:", formulario);

        // Resetar formulário após envio
        Object.keys(formulario).forEach((key) => {
          if (key === "aceitaTermos") {
            formulario[key] = false;
          } else {
            formulario[key] = "";
          }
        });

        // Mostrar mensagem de sucesso
        enviado.value = true;

        // Esconder mensagem após 3 segundos
        setTimeout(() => {
          enviado.value = false;
        }, 3000);
      }
    };

    return {
      formulario,
      erros,
      enviado,
      validarCampo,
      enviarFormulario,
      formularioValido,
      forcaSenha,
    };
  },
};
</script>

<style scoped>
.formulario-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.campo-formulario {
  display: flex;
  flex-direction: column;
}

.campo-formulario.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.campo-invalido input {
  border-color: #e74c3c;
}

.mensagem-erro {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.botao-enviar {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.botao-enviar:hover:not(:disabled) {
  background-color: #3aa876;
}

.botao-enviar:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.mensagem-sucesso {
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
}

.forca-senha {
  margin-top: 10px;
}

.forca-barra {
  height: 5px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.forca-nivel {
  height: 100%;
  transition: width 0.3s ease;
}

.forca-nivel.fraca {
  background-color: #e74c3c;
}

.forca-nivel.media {
  background-color: #f39c12;
}

.forca-nivel.boa {
  background-color: #3498db;
}

.forca-nivel.forte {
  background-color: #2ecc71;
}

.forca-senha span {
  display: block;
  font-size: 12px;
  margin-top: 5px;
  color: #666;
}
</style>
```

### Passo 3: Atualizar o Componente App

Modifique o arquivo `src/App.vue`:

```vue
<template>
  <div class="app">
    <FormularioCadastro />
  </div>
</template>

<script>
import FormularioCadastro from "./components/FormularioCadastro.vue";

export default {
  name: "App",
  components: {
    FormularioCadastro,
  },
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  margin: 0;
  padding: 20px;
  color: #2c3e50;
}

.app {
  max-width: 800px;
  margin: 0 auto;
}

* {
  box-sizing: border-box;
}
</style>
```

### Passo 4: Executar e Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para testar o formulário reativo.

# Exercícios Práticos - Módulo 3: Reatividade

## Exercício 1: Computed Properties

- Crie um componente de carrinho de compras
- Calcule total e subtotal usando computed properties
- Implemente desconto condicional

## Exercício 2: Watchers

- Desenvolva um formulário de cadastro
- Use watchers para validação em tempo real
- Implemente validações complexas
- Forneça feedback instantâneo

## Desafio Final

- Criar dashboard de métricas
- Use computed e watchers para processamento de dados
- Simule atualização de dados em tempo real

### Perguntas para Fixação

1. **Qual é a principal diferença entre `ref` e `reactive` no Vue 3?**

   - a) `ref` é usado apenas para valores primitivos, enquanto `reactive` é usado apenas para objetos
   - b) `ref` requer `.value` para acessar ou modificar o valor, enquanto `reactive` permite acesso direto às propriedades
   - c) `reactive` mantém a reatividade na desestruturação, enquanto `ref` não
   - d) `ref` é mais eficiente para objetos grandes do que `reactive`

2. **Como você pode manter a reatividade ao desestruturar um objeto reativo?**

   - a) Usando `computed()`
   - b) Usando `toRefs()`
   - c) Usando `watch()`
   - d) Usando `shallowRef()`

3. **Qual é a principal vantagem das propriedades computadas sobre métodos?**

   - a) Propriedades computadas podem acessar o contexto `this`
   - b) Propriedades computadas são cacheadas com base em suas dependências reativas
   - c) Propriedades computadas podem ter efeitos colaterais
   - d) Propriedades computadas são mais rápidas para cálculos complexos

4. **Quando você deve usar um watcher em vez de uma propriedade computada?**

   - a) Quando precisa formatar dados para exibição
   - b) Quando precisa combinar múltiplas propriedades em um único valor
   - c) Quando precisa executar operações assíncronas em resposta a mudanças de dados
   - d) Quando precisa de um valor derivado para usar em templates

5. **Qual é a diferença entre `watch` e `watchEffect`?**
   - a) `watch` observa explicitamente fontes específicas, enquanto `watchEffect` rastreia automaticamente dependências
   - b) `watch` é executado imediatamente, enquanto `watchEffect` só é executado quando as dependências mudam
   - c) `watch` não pode observar objetos reativos, enquanto `watchEffect` pode
   - d) `watch` é mais eficiente para observar múltiplas fontes do que `watchEffect`

**Respostas:**

1. b) `ref` requer `.value` para acessar ou modificar o valor, enquanto `reactive` permite acesso direto às propriedades
2. b) Usando `toRefs()`
3. b) Propriedades computadas são cacheadas com base em suas dependências reativas
4. c) Quando precisa executar operações assíncronas em resposta a mudanças de dados
5. a) `watch` observa explicitamente fontes específicas, enquanto `watchEffect` rastreia automaticamente dependências
