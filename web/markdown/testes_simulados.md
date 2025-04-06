# Testes Simulados para Certificação Mid-Level de Vue.js

Este documento contém três testes simulados para ajudar você a avaliar seu conhecimento e preparação para a certificação mid-level de Vue.js. Cada teste contém 30 questões que abrangem todos os tópicos relevantes para a certificação.

## Instruções

1. Reserve aproximadamente 60 minutos para cada teste simulado
2. Tente responder sem consultar materiais externos
3. Após concluir, verifique suas respostas e revise os tópicos em que teve dificuldade
4. Considere-se preparado quando atingir pelo menos 80% de acertos em cada teste

## Simulado 1

### Fundamentos e Reatividade

1. **Qual é a diferença entre `v-if` e `v-show`?**
   - a) `v-if` renderiza condicionalmente o elemento, enquanto `v-show` apenas altera sua visibilidade com CSS
   - b) `v-if` funciona apenas com elementos HTML, enquanto `v-show` funciona com componentes
   - c) `v-if` suporta a cláusula `else`, enquanto `v-show` não
   - d) `v-if` é mais performático para alterações frequentes de visibilidade

2. **O que acontece quando você modifica um array usando um índice no Vue 3?**
   - a) A modificação não é reativa e não atualiza a UI
   - b) A modificação é reativa apenas se o array estiver dentro de um objeto reactive
   - c) A modificação é reativa e atualiza a UI automaticamente
   - d) A modificação lança um erro de reatividade

3. **Qual método é recomendado para adicionar uma nova propriedade a um objeto reativo no Vue 3?**
   - a) `Vue.set(objeto, propriedade, valor)`
   - b) Simplesmente atribuir `objeto.propriedade = valor`
   - c) `objeto.$add(propriedade, valor)`
   - d) Criar um novo objeto com a propriedade adicional e substituir o original

4. **Qual é a principal diferença entre `computed` e `methods`?**
   - a) `computed` pode aceitar argumentos, enquanto `methods` não
   - b) `computed` é armazenado em cache baseado em suas dependências, enquanto `methods` é sempre executado
   - c) `computed` não pode conter lógica complexa, enquanto `methods` pode
   - d) `computed` é assíncrono, enquanto `methods` é síncrono

5. **Como você pode observar mudanças em objetos aninhados com `watch`?**
   - a) Usando a opção `nested: true`
   - b) Usando a opção `deep: true`
   - c) Observando cada propriedade aninhada individualmente
   - d) Objetos aninhados são observados automaticamente

6. **Qual é a sintaxe correta para um watcher que observa múltiplas propriedades?**
   - a) `watch: ['prop1', 'prop2', handler() {...}]`
   - b) `watch: { [['prop1', 'prop2']]: handler() {...} }`
   - c) `watch() { this.$watch(['prop1', 'prop2'], handler) }`
   - d) Não é possível observar múltiplas propriedades com um único watcher

7. **O que é o "unwrapping" automático de refs no template?**
   - a) A conversão automática de refs para valores primitivos
   - b) O acesso ao valor de uma ref sem usar `.value` em templates
   - c) A remoção automática de refs não utilizados
   - d) A conversão de refs para reactive

8. **Qual é a diferença entre `ref` e `reactive` no Vue 3?**
   - a) `ref` é usado apenas para valores primitivos, enquanto `reactive` é usado apenas para objetos
   - b) `ref` requer acesso via `.value`, enquanto `reactive` permite acesso direto às propriedades
   - c) `ref` não é reativo para objetos aninhados, enquanto `reactive` é
   - d) `ref` só pode ser usado na Composition API, enquanto `reactive` funciona em ambas APIs

### Componentes e Comunicação

9. **Qual é a maneira correta de validar props em um componente Vue?**
   - a) Usando a propriedade `validate` no componente
   - b) Definindo props como um objeto com propriedades `type`, `required`, `default`, etc.
   - c) Usando a função `this.$validateProps()` no hook `created`
   - d) Implementando um watcher para cada prop

10. **Como um componente filho pode comunicar eventos para seu componente pai?**
    - a) Usando `this.$parent.$emit()`
    - b) Usando `this.$emit()`
    - c) Modificando diretamente as props recebidas
    - d) Usando um barramento de eventos global

11. **O que são slots nomeados e como são definidos em um componente filho?**
    - a) Usando a diretiva `v-slot` com um nome
    - b) Usando o elemento `<slot>` com o atributo `name`
    - c) Usando a propriedade `slots` nas opções do componente
    - d) Usando a função `this.$slots.add(name)`

12. **Como você pode acessar o conteúdo de um slot a partir do JavaScript de um componente?**
    - a) Usando `this.$slots.default`
    - b) Usando `this.slots.default`
    - c) Usando `this.$children`
    - d) Não é possível acessar o conteúdo do slot a partir do JavaScript

13. **Qual é o propósito do modificador `.sync` (Vue 2) ou `v-model` com argumento (Vue 3) em props?**
    - a) Criar uma ligação bidirecional entre pai e filho
    - b) Otimizar a performance de atualizações de props
    - c) Validar automaticamente o tipo da prop
    - d) Impedir que a prop seja modificada pelo componente filho

14. **Como você implementa corretamente a comunicação entre componentes não relacionados?**
    - a) Usando variáveis globais
    - b) Usando um barramento de eventos ou gerenciamento de estado centralizado (Vuex/Pinia)
    - c) Sempre passando props através de todos os componentes intermediários
    - d) Usando localStorage para compartilhar dados

15. **O que é o padrão "props down, events up"?**
    - a) Uma técnica de otimização para melhorar a performance
    - b) Um padrão onde os dados fluem de componentes pais para filhos via props, e de filhos para pais via eventos
    - c) Um padrão para organizar o código em componentes
    - d) Uma técnica para minimizar o uso de Vuex

16. **Como você pode passar todos os atributos de um componente pai para um elemento específico no componente filho?**
    - a) Usando `v-bind="$attrs"` no elemento desejado
    - b) Usando `v-bind:all`
    - c) Usando `this.$parent.$attrs` no hook `mounted`
    - d) Isso não é possível, atributos são sempre aplicados ao elemento raiz

### Roteamento e Gerenciamento de Estado

17. **Como você define uma rota com parâmetros dinâmicos no Vue Router?**
    - a) `/user/:id`
    - b) `/user/{id}`
    - c) `/user/[id]`
    - d) `/user/$id`

18. **Qual hook de navegação do Vue Router é executado em todos os componentes durante a navegação?**
    - a) `beforeRouteEnter`
    - b) `beforeEach`
    - c) `beforeRouteUpdate`
    - d) `beforeResolve`

19. **Como você pode acessar parâmetros de rota em um componente usando a Composition API?**
    - a) `const route = useRoute(); route.params.id`
    - b) `const router = useRouter(); router.params.id`
    - c) `const { params } = Vue.useRoute()`
    - d) `import { params } from 'vue-router'`

20. **Qual é a diferença entre `router.push()` e `router.replace()`?**
    - a) `router.push()` adiciona uma entrada ao histórico, enquanto `router.replace()` substitui a entrada atual
    - b) `router.push()` navega para frente, enquanto `router.replace()` navega para trás
    - c) `router.push()` suporta parâmetros de consulta, enquanto `router.replace()` não
    - d) `router.push()` é assíncrono, enquanto `router.replace()` é síncrono

21. **No Vuex, qual é a única maneira correta de modificar o estado?**
    - a) Diretamente através de `this.$store.state.property = newValue`
    - b) Através de mutações
    - c) Através de ações
    - d) Através de getters

22. **Qual é a principal diferença entre ações e mutações no Vuex?**
    - a) Ações podem ser assíncronas, mutações devem ser síncronas
    - b) Ações modificam o estado diretamente, mutações através de getters
    - c) Ações são chamadas de componentes, mutações apenas internamente
    - d) Ações são usadas para leitura, mutações para escrita

23. **Como você acessa o estado do Vuex em um componente usando a Composition API?**
    - a) `const store = useStore(); store.state.counter`
    - b) `import { useState } from 'vuex'; const state = useState()`
    - c) `const { mapState } = useStore()`
    - d) `const store = Vue.store(); store.getState('counter')`

24. **Qual é o propósito dos módulos no Vuex?**
    - a) Melhorar a performance dividindo o estado em partes menores
    - b) Organizar o código dividindo o estado, mutações, ações e getters em arquivos separados
    - c) Permitir múltiplas instâncias do Vuex em uma aplicação
    - d) Isolar partes do estado para diferentes equipes de desenvolvimento

### Composition API e Testes

25. **Qual é a principal vantagem da Composition API sobre a Options API?**
    - a) Melhor performance em todos os casos
    - b) Melhor organização de código por funcionalidade lógica e reutilização
    - c) Sintaxe mais simples e menos verbosa
    - d) Suporte a mais recursos do Vue

26. **Como você define props em um componente usando `<script setup>`?**
    - a) `const props = defineProps({ ... })`
    - b) `export const props = { ... }`
    - c) `setup(props) { ... }`
    - d) `const props = useProps({ ... })`

27. **Qual é a maneira correta de emitir um evento em um componente com `<script setup>`?**
    - a) `const emit = defineEmit(['change']); emit('change', value)`
    - b) `const emit = defineEmits(['change']); emit('change', value)`
    - c) `this.$emit('change', value)`
    - d) `const { emit } = useContext(); emit('change', value)`

28. **Como você implementa um hook de ciclo de vida `mounted` usando a Composition API?**
    - a) `mounted(() => { ... })`
    - b) `onMounted(() => { ... })`
    - c) `useLifecycle('mounted', () => { ... })`
    - d) `this.$on('mounted', () => { ... })`

29. **Qual biblioteca é comumente usada para testar componentes Vue?**
    - a) Vue Test Utils
    - b) Vue Testing Library
    - c) Jest-Vue
    - d) Mocha-Vue

30. **Qual método do Vue Test Utils você usaria para simular um clique em um botão?**
    - a) `wrapper.click('button')`
    - b) `wrapper.find('button').trigger('click')`
    - c) `wrapper.simulate('click', 'button')`
    - d) `wrapper.find('button').click()`

## Simulado 2

### Fundamentos e Reatividade

1. **Qual é a diferença entre diretivas `v-bind` e `v-model`?**
   - a) `v-bind` cria uma ligação unidirecional, enquanto `v-model` cria uma ligação bidirecional
   - b) `v-bind` funciona com qualquer atributo HTML, enquanto `v-model` funciona apenas com inputs
   - c) `v-bind` é mais performático que `v-model`
   - d) `v-bind` é uma diretiva personalizada, enquanto `v-model` é nativa

2. **O que acontece quando você modifica um objeto reativo no Vue 3?**
   - a) Apenas a propriedade modificada aciona atualizações reativas
   - b) Todo o objeto aciona atualizações reativas, independentemente de qual propriedade foi modificada
   - c) Você precisa chamar `Vue.nextTick()` para acionar atualizações reativas
   - d) Você precisa usar o método `set` para acionar atualizações reativas

3. **Qual é a maneira correta de criar uma propriedade computada com getter e setter?**
   - a) `computed: { prop() { get() {...}, set() {...} } }`
   - b) `computed: { prop: { get() {...}, set() {...} } }`
   - c) `computed: { get prop() {...}, set prop(val) {...} }`
   - d) `computed() { return { prop: { get: ..., set: ... } } }`

4. **Como você pode observar mudanças em uma propriedade específica de um objeto com `watch`?**
   - a) `watch: { 'objeto.propriedade': handler }`
   - b) `watch: { objeto: { path: 'propriedade', handler } }`
   - c) `watch: { [objeto, 'propriedade']: handler }`
   - d) `watch() { this.$watch(objeto.propriedade, handler) }`

5. **Qual é a diferença entre `shallowRef` e `ref` no Vue 3?**
   - a) `shallowRef` não pode conter objetos, apenas valores primitivos
   - b) `shallowRef` cria uma reatividade rasa (apenas o valor de referência), enquanto `ref` cria reatividade profunda
   - c) `shallowRef` não requer `.value` para acessar o valor
   - d) `shallowRef` é mais performático, mas não suporta unwrapping automático em templates

6. **O que é o "proxy" no sistema de reatividade do Vue 3?**
   - a) Um padrão de design para interceptar acesso a propriedades
   - b) Um objeto JavaScript que intercepta operações como leitura e escrita de propriedades
   - c) Uma camada de cache para melhorar a performance
   - d) Um mecanismo para comunicação entre componentes

7. **Como você pode criar uma referência reativa a um elemento DOM no Vue 3?**
   - a) `const el = ref(null)` e então `<div ref="el">`
   - b) `const el = reactive({ value: null })` e então `<div ref="el">`
   - c) `const el = this.$refs.el` no hook `mounted`
   - d) `const el = document.querySelector(...)` no hook `mounted`

8. **Qual é a principal diferença entre `toRef` e `toRefs` no Vue 3?**
   - a) `toRef` cria uma ref para uma única propriedade, enquanto `toRefs` cria refs para todas as propriedades
   - b) `toRef` funciona com objetos reativos, enquanto `toRefs` funciona com objetos normais
   - c) `toRef` mantém a reatividade, enquanto `toRefs` cria cópias não reativas
   - d) `toRef` é usado na Options API, enquanto `toRefs` é usado na Composition API

### Componentes e Comunicação

9. **Como você pode definir um valor padrão para uma prop?**
   - a) `props: { msg: { default: 'Hello' } }`
   - b) `props: { msg: { type: String, default: 'Hello' } }`
   - c) `props: { msg: String = 'Hello' }`
   - d) `props: { msg: { type: String, value: 'Hello' } }`

10. **O que acontece se você tentar modificar diretamente uma prop em um componente filho?**
    - a) A modificação funciona normalmente
    - b) A modificação funciona, mas gera um aviso no console
    - c) A modificação é ignorada silenciosamente
    - d) A modificação lança um erro em tempo de execução

11. **Como você pode passar conteúdo para um slot com escopo (scoped slot)?**
    - a) `<template v-slot:default="slotProps">{{ slotProps.item }}</template>`
    - b) `<template scope="props">{{ props.item }}</template>`
    - c) `<div slot-scope="props">{{ props.item }}</div>`
    - d) `<component v-bind:slot-data="{ item }">{{ item }}</component>`

12. **Qual é a sintaxe correta para fornecer dados com `provide` na Composition API?**
    - a) `provide('key', value)`
    - b) `const provide = useProvide(); provide('key', value)`
    - c) `setup() { provide: { key: value } }`
    - d) `const { provide } = inject(); provide('key', value)`

13. **Como você pode garantir que um valor fornecido com `provide` seja reativo?**
    - a) Usar `reactive` ou `ref` para o valor e fornecer diretamente
    - b) Adicionar a opção `reactive: true` ao chamar `provide`
    - c) Usar o hook `useReactiveProvide` em vez de `provide`
    - d) Valores fornecidos são automaticamente reativos

14. **Qual é a maneira correta de implementar herança de atributos personalizada em um componente?**
    - a) Definir a opção `inheritAttrs: false` e usar `v-bind="$attrs"` no elemento desejado
    - b) Usar a diretiva `v-inherit` no elemento desejado
    - c) Definir a opção `attrs: { inherit: false }` e usar `v-bind:attrs` no elemento desejado
    - d) Usar `this.$parent.$attrs` no hook `created` e aplicar manualmente

15. **O que são componentes assíncronos e quando você deve usá-los?**
    - a) Componentes que carregam dados de APIs, usados para conteúdo dinâmico
    - b) Componentes que são carregados sob demanda, usados para melhorar o tempo de carregamento inicial
    - c) Componentes que usam Promises em seus métodos, usados para operações assíncronas
    - d) Componentes que são renderizados após um atraso, usados para animações

16. **Como você pode implementar um componente recursivo no Vue?**
    - a) Usando a opção `recursive: true` nas opções do componente
    - b) Dando ao componente um nome e referenciando-o em seu próprio template
    - c) Usando a diretiva `v-recursive` no elemento que deve ser recursivo
    - d) Importando o componente dentro de si mesmo

### Roteamento e Gerenciamento de Estado

17. **Como você pode implementar redirecionamento de rota no Vue Router?**
    - a) `{ path: '/old', redirect: '/new' }`
    - b) `{ path: '/old', redirectTo: '/new' }`
    - c) `{ path: '/old', alias: '/new' }`
    - d) `{ path: '/old', forward: '/new' }`

18. **Qual é a diferença entre `beforeEnter`, `beforeRouteEnter` e `beforeEach` no Vue Router?**
    - a) `beforeEnter` é por rota, `beforeRouteEnter` é por componente, `beforeEach` é global
    - b) `beforeEnter` é executado primeiro, seguido por `beforeEach` e depois `beforeRouteEnter`
    - c) `beforeEnter` e `beforeRouteEnter` são síncronos, enquanto `beforeEach` é assíncrono
    - d) `beforeEnter` é para verificação de autenticação, `beforeRouteEnter` para carregamento de dados, `beforeEach` para logging

19. **Como você pode acessar parâmetros de consulta (query parameters) em um componente?**
    - a) `this.$route.query.param` ou `route.query.param` (Composition API)
    - b) `this.$router.query.param` ou `router.query.param` (Composition API)
    - c) `this.$route.params.query.param` ou `route.params.query.param` (Composition API)
    - d) `this.$query.param` ou `useQuery().param` (Composition API)

20. **Qual é o propósito da opção `props: true` em uma configuração de rota?**
    - a) Passar parâmetros de rota como props para o componente
    - b) Permitir que o componente defina props para a rota
    - c) Habilitar a validação de parâmetros de rota
    - d) Tornar a rota acessível apenas com autenticação

21. **No Pinia, qual é a diferença entre `state`, `getters` e `actions`?**
    - a) `state` é o estado, `getters` são propriedades computadas, `actions` são métodos
    - b) `state` é imutável, `getters` são para leitura, `actions` são para modificação
    - c) `state` é local, `getters` são compartilhados, `actions` são globais
    - d) `state` é síncrono, `getters` são cacheados, `actions` são assíncronos

22. **Como você define um getter no Vuex que depende de outro getter?**
    - a) `getters: { doubleCount(state, getters) { return getters.count * 2 } }`
    - b) `getters: { doubleCount(state) { return this.getters.count * 2 } }`
    - c) `getters: { doubleCount: state => state => state.getters.count * 2 }`
    - d) `getters: { doubleCount: (state, { count }) => count * 2 }`

23. **Qual é a maneira correta de despachar uma ação do Vuex em um componente usando a Composition API?**
    - a) `const store = useStore(); store.dispatch('increment')`
    - b) `const { dispatch } = useStore(); dispatch('increment')`
    - c) `import { useActions } from 'vuex'; const { increment } = useActions()`
    - d) `const store = useStore(); store.actions.increment()`

24. **Como você pode implementar persistência de estado no Vuex?**
    - a) Usando a opção `persistent: true` na definição do store
    - b) Implementando um plugin que salva e restaura o estado do localStorage
    - c) Usando o módulo oficial `vuex-persist`
    - d) Opções B e C estão corretas

### Composition API e Testes

25. **Qual é a principal diferença entre `setup()` e `<script setup>`?**
    - a) `setup()` é uma função que deve retornar um objeto, enquanto `<script setup>` expõe automaticamente variáveis para o template
    - b) `setup()` é usado na Options API, enquanto `<script setup>` é usado na Composition API
    - c) `setup()` suporta async/await, enquanto `<script setup>` não
    - d) `setup()` tem acesso a `this`, enquanto `<script setup>` não

26. **Como você pode expor métodos de um componente com `<script setup>` para que componentes pais possam acessá-los?**
    - a) `export { method1, method2 }`
    - b) `defineExpose({ method1, method2 })`
    - c) `return { method1, method2 }`
    - d) Métodos definidos em `<script setup>` são automaticamente expostos

27. **Qual é a maneira correta de criar um composable reutilizável?**
    - a) Criar uma classe com métodos e propriedades
    - b) Criar uma função que retorna um objeto com estado reativo e métodos
    - c) Criar um componente com a opção `abstract: true`
    - d) Criar um mixin com estado e métodos

28. **Como você pode testar um componente que usa o Vue Router?**
    - a) Mockando o objeto `$route` e `$router`
    - b) Criando um router real para testes
    - c) Usando a biblioteca `vue-router-test-utils`
    - d) Opções A e B estão corretas

29. **Qual é a maneira correta de testar um componente que emite eventos?**
    - a) `expect(wrapper.emitted()).toHaveProperty('event-name')`
    - b) `expect(wrapper.emitted('event-name')).toBeTruthy()`
    - c) `expect(wrapper.events).toContain('event-name')`
    - d) `expect(wrapper.vm.$emit).toHaveBeenCalledWith('event-name')`

30. **Como você pode testar um componente que usa Vuex/Pinia?**
    - a) Mockando o store inteiro
    - b) Criando um store real para testes
    - c) Injetando um store mockado via `mocks` ou `global.plugins`
    - d) Todas as opções acima são válidas

## Simulado 3

### Fundamentos e Reatividade

1. **Qual é a diferença entre `v-on:click` e `@click`?**
   - a) `v-on:click` é a sintaxe completa, `@click` é a abreviação
   - b) `v-on:click` funciona apenas com elementos HTML, `@click` funciona com componentes
   - c) `v-on:click` suporta modificadores, `@click` não
   - d) `v-on:click` é mais performático que `@click`

2. **O que é o "two-way binding" no Vue e como é implementado?**
   - a) É a sincronização automática entre o modelo e a visualização, implementada com `v-model`
   - b) É a comunicação bidirecional entre componentes pai e filho, implementada com props e eventos
   - c) É a sincronização entre o estado local e o Vuex, implementada com `mapState` e `mapMutations`
   - d) É a sincronização entre cliente e servidor, implementada com WebSockets

3. **Qual é a diferença entre `computed` e `watch` no Vue?**
   - a) `computed` é usado para cálculos síncronos baseados em dependências reativas, `watch` é usado para reações a mudanças
   - b) `computed` é mais performático que `watch` em todos os casos
   - c) `computed` pode ser usado apenas na Options API, `watch` em ambas APIs
   - d) `computed` é para leitura, `watch` é para escrita

4. **Como você pode criar uma propriedade computada com cache desabilitado?**
   - a) `computed: { prop: { cache: false, get() {...} } }`
   - b) `computed: { prop() { this.$noCache(); return ... } }`
   - c) Não é possível, propriedades computadas são sempre cacheadas
   - d) Usar um método em vez de uma propriedade computada

5. **O que é o "unwrapping" de refs no Vue 3?**
   - a) A conversão automática de refs para valores primitivos em operações específicas
   - b) O acesso ao valor de uma ref sem usar `.value` em templates
   - c) A remoção automática de refs não utilizados para otimização de memória
   - d) A extração de valores de um array de refs

6. **Qual é a diferença entre `reactive` e `readonly` no Vue 3?**
   - a) `reactive` cria um objeto reativo mutável, `readonly` cria uma versão somente leitura de um objeto reativo
   - b) `reactive` funciona com qualquer tipo de valor, `readonly` apenas com objetos
   - c) `reactive` é mais performático, `readonly` é mais seguro
   - d) `reactive` é usado na Composition API, `readonly` na Options API

7. **Como você pode criar uma referência reativa a uma propriedade específica de um objeto reativo?**
   - a) `const propRef = ref(obj.prop)`
   - b) `const propRef = toRef(obj, 'prop')`
   - c) `const propRef = reactive({ value: obj.prop })`
   - d) `const propRef = computed(() => obj.prop)`

8. **O que acontece quando você passa um objeto para `ref()` no Vue 3?**
   - a) O objeto é convertido para um valor primitivo
   - b) O objeto é encapsulado em um ref, mas não se torna reativo internamente
   - c) O objeto é internamente convertido para `reactive` e encapsulado em um ref
   - d) Um erro é lançado, pois `ref()` só aceita valores primitivos

### Componentes e Comunicação

9. **Qual é a maneira correta de validar que uma prop seja um array de números?**
   - a) `props: { numbers: { type: Array<Number> } }`
   - b) `props: { numbers: { type: Array, validator: arr => arr.every(n => typeof n === 'number') } }`
   - c) `props: { numbers: { type: [Number] } }`
   - d) `props: { numbers: { type: Array, itemType: Number } }`

10. **Como você pode implementar uma prop obrigatória condicional?**
    - a) `props: { prop: { required: condition } }`
    - b) `props: { prop: { required: true, default: condition ? undefined : value } }`
    - c) `props: { prop: { validator(value) { return !condition || value !== undefined } } }`
    - d) Não é possível, props são sempre obrigatórias ou opcionais

11. **Qual é a diferença entre slots normais e slots com escopo (scoped slots)?**
    - a) Slots normais são renderizados no componente pai, slots com escopo no componente filho
    - b) Slots normais não podem acessar dados do componente filho, slots com escopo podem
    - c) Slots normais são estáticos, slots com escopo são dinâmicos
    - d) Slots normais são mais performáticos que slots com escopo

12. **Como você pode acessar slots em um componente funcional?**
    - a) Através do parâmetro `context.slots`
    - b) Através da propriedade `this.$slots`
    - c) Através da função `getSlots()`
    - d) Componentes funcionais não podem usar slots

13. **Qual é o propósito do padrão "renderless component"?**
    - a) Criar componentes sem template para melhor performance
    - b) Criar componentes que fornecem apenas lógica, delegando a renderização para o componente pai via scoped slots
    - c) Criar componentes que não são visíveis, mas afetam outros componentes
    - d) Criar componentes que são renderizados condicionalmente

14. **Como você pode implementar um componente que renderiza elementos diferentes com base em uma prop?**
    - a) Usando o componente `<component :is="componentName">`
    - b) Usando diretivas `v-if` e `v-else` baseadas na prop
    - c) Usando a função `render()` com JSX
    - d) Todas as opções acima são válidas

15. **O que é o "teleport" no Vue 3 e quando você deve usá-lo?**
    - a) Um mecanismo para mover componentes entre diferentes partes da árvore de componentes
    - b) Um componente que permite renderizar conteúdo em um nó DOM fora da hierarquia do componente
    - c) Uma técnica para otimizar a renderização de listas longas
    - d) Um método para comunicação entre componentes distantes

16. **Como você pode implementar um componente que se adapta ao tamanho de seu conteúdo?**
    - a) Usando a diretiva `v-resize`
    - b) Usando CSS com `width: auto` e `height: auto`
    - c) Usando a API ResizeObserver em um hook de ciclo de vida
    - d) Usando a prop `adaptive: true`

### Roteamento e Gerenciamento de Estado

17. **Como você pode implementar uma navegação programática com o Vue Router?**
    - a) `this.$router.navigate('/path')`
    - b) `this.$router.push('/path')` ou `router.push('/path')` (Composition API)
    - c) `this.$route.go('/path')`
    - d) `this.$navigate('/path')`

18. **Qual é a diferença entre `params` e `query` no Vue Router?**
    - a) `params` são parte do padrão de rota (ex: `/user/:id`), `query` são parâmetros de consulta (ex: `/search?q=term`)
    - b) `params` são para dados sensíveis, `query` para dados públicos
    - c) `params` são preservados entre navegações, `query` não
    - d) `params` são limitados a strings, `query` pode conter qualquer tipo de valor

19. **Como você pode implementar uma rota com múltiplos parâmetros opcionais?**
    - a) `/user/:id?/:name?`
    - b) `/user/:id(/:name)`
    - c) `/user(/:id)(/:name)`
    - d) `/user/:id?:name?`

20. **Qual é o propósito da função `scrollBehavior` na configuração do Vue Router?**
    - a) Controlar o comportamento de rolagem durante a navegação
    - b) Implementar rolagem infinita em listas
    - c) Otimizar a performance de rolagem
    - d) Sincronizar a posição de rolagem entre diferentes dispositivos

21. **No Vuex, qual é a diferença entre `mapState`, `mapGetters`, `mapMutations` e `mapActions`?**
    - a) `mapState` e `mapGetters` são para leitura, `mapMutations` e `mapActions` para escrita
    - b) `mapState` é para estado básico, `mapGetters` para estado computado, `mapMutations` para mudanças síncronas, `mapActions` para operações assíncronas
    - c) `mapState` e `mapMutations` são para o estado local, `mapGetters` e `mapActions` para estado global
    - d) `mapState` e `mapMutations` são usados na Options API, `mapGetters` e `mapActions` na Composition API

22. **Como você pode acessar o estado de um módulo namespaced no Vuex?**
    - a) `this.$store.state.module.property` ou `store.state.module.property` (Composition API)
    - b) `this.$store.module.state.property` ou `store.module.state.property` (Composition API)
    - c) `this.$store.getModule('module').state.property`
    - d) `this.$store.getState('module.property')`

23. **Qual é a maneira correta de estruturar uma grande aplicação Vuex?**
    - a) Um único arquivo com todas as definições
    - b) Dividir em módulos por funcionalidade, cada um com seu próprio estado, getters, mutações e ações
    - c) Separar estado, getters, mutações e ações em arquivos diferentes
    - d) Opções B e C são abordagens válidas

24. **Como você pode implementar um plugin Vuex para logging?**
    - a) `const plugin = store => { store.subscribe((mutation, state) => { console.log(mutation, state) }) }`
    - b) `const plugin = { install(store) { store.on('mutation', console.log) } }`
    - c) `const plugin = { logger: true }`
    - d) `const plugin = store => { store.logger = true }`

### Composition API e Testes

25. **Qual é a principal diferença entre `reactive` e `shallowReactive` no Vue 3?**
    - a) `reactive` cria reatividade profunda (aninhada), `shallowReactive` cria reatividade apenas no nível superior
    - b) `reactive` funciona com qualquer objeto, `shallowReactive` apenas com objetos simples
    - c) `reactive` é mais performático, `shallowReactive` é mais flexível
    - d) `reactive` é usado para objetos, `shallowReactive` para arrays

26. **Como você pode criar um composable que limpa recursos quando o componente é desmontado?**
    - a) Retornar uma função de limpeza do composable
    - b) Usar `onUnmounted` dentro do composable
    - c) Usar `this.$on('unmounted', cleanup)` dentro do composable
    - d) Usar `Vue.onCleanup(cleanup)` dentro do composable

27. **Qual é a maneira correta de compartilhar estado entre componentes usando a Composition API?**
    - a) Criar um composable que retorna estado reativo
    - b) Usar provide/inject com estado reativo
    - c) Usar Vuex/Pinia
    - d) Todas as opções acima são válidas

28. **Como você pode testar um componente que usa `defineEmits` com Vue Test Utils?**
    - a) `wrapper.vm.$emit('event')` e verificar se foi emitido
    - b) `await wrapper.find('button').trigger('click')` e então `expect(wrapper.emitted()).toHaveProperty('event')`
    - c) `wrapper.vm.emit('event')` e verificar se foi emitido
    - d) `expect(wrapper.vm.emits).toContain('event')`

29. **Qual é a maneira correta de testar um componente assíncrono?**
    - a) Usar `await wrapper.vm.$nextTick()`
    - b) Usar `await flushPromises()`
    - c) Configurar Jest/Vitest com `useFakeTimers()`
    - d) Opções A e B são válidas

30. **Como você pode simular uma API em testes de componentes?**
    - a) Mockando a função fetch/axios globalmente
    - b) Usando uma biblioteca como MSW (Mock Service Worker)
    - c) Injetando mocks via provide/inject
    - d) Todas as opções acima são válidas

## Respostas

### Simulado 1

1. a) `v-if` renderiza condicionalmente o elemento, enquanto `v-show` apenas altera sua visibilidade com CSS
2. c) A modificação é reativa e atualiza a UI automaticamente
3. b) Simplesmente atribuir `objeto.propriedade = valor`
4. b) `computed` é armazenado em cache baseado em suas dependências, enquanto `methods` é sempre executado
5. b) Usando a opção `deep: true`
6. d) Não é possível observar múltiplas propriedades com um único watcher
7. b) O acesso ao valor de uma ref sem usar `.value` em templates
8. b) `ref` requer acesso via `.value`, enquanto `reactive` permite acesso direto às propriedades
9. b) Definindo props como um objeto com propriedades `type`, `required`, `default`, etc.
10. b) Usando `this.$emit()`
11. b) Usando o elemento `<slot>` com o atributo `name`
12. a) Usando `this.$slots.default`
13. a) Criar uma ligação bidirecional entre pai e filho
14. b) Usando um barramento de eventos ou gerenciamento de estado centralizado (Vuex/Pinia)
15. b) Um padrão onde os dados fluem de componentes pais para filhos via props, e de filhos para pais via eventos
16. a) Usando `v-bind="$attrs"` no elemento desejado
17. a) `/user/:id`
18. b) `beforeEach`
19. a) `const route = useRoute(); route.params.id`
20. a) `router.push()` adiciona uma entrada ao histórico, enquanto `router.replace()` substitui a entrada atual
21. b) Através de mutações
22. a) Ações podem ser assíncronas, mutações devem ser síncronas
23. a) `const store = useStore(); store.state.counter`
24. b) Organizar o código dividindo o estado, mutações, ações e getters em arquivos separados
25. b) Melhor organização de código por funcionalidade lógica e reutilização
26. a) `const props = defineProps({ ... })`
27. b) `const emit = defineEmits(['change']); emit('change', value)`
28. b) `onMounted(() => { ... })`
29. a) Vue Test Utils
30. b) `wrapper.find('button').trigger('click')`

### Simulado 2

1. a) `v-bind` cria uma ligação unidirecional, enquanto `v-model` cria uma ligação bidirecional
2. a) Apenas a propriedade modificada aciona atualizações reativas
3. b) `computed: { prop: { get() {...}, set() {...} } }`
4. a) `watch: { 'objeto.propriedade': handler }`
5. b) `shallowRef` cria uma reatividade rasa (apenas o valor de referência), enquanto `ref` cria reatividade profunda
6. b) Um objeto JavaScript que intercepta operações como leitura e escrita de propriedades
7. a) `const el = ref(null)` e então `<div ref="el">`
8. a) `toRef` cria uma ref para uma única propriedade, enquanto `toRefs` cria refs para todas as propriedades
9. b) `props: { msg: { type: String, default: 'Hello' } }`
10. b) A modificação funciona, mas gera um aviso no console
11. a) `<template v-slot:default="slotProps">{{ slotProps.item }}</template>`
12. a) `provide('key', value)`
13. a) Usar `reactive` ou `ref` para o valor e fornecer diretamente
14. a) Definir a opção `inheritAttrs: false` e usar `v-bind="$attrs"` no elemento desejado
15. b) Componentes que são carregados sob demanda, usados para melhorar o tempo de carregamento inicial
16. b) Dando ao componente um nome e referenciando-o em seu próprio template
17. a) `{ path: '/old', redirect: '/new' }`
18. a) `beforeEnter` é por rota, `beforeRouteEnter` é por componente, `beforeEach` é global
19. a) `this.$route.query.param` ou `route.query.param` (Composition API)
20. a) Passar parâmetros de rota como props para o componente
21. a) `state` é o estado, `getters` são propriedades computadas, `actions` são métodos
22. a) `getters: { doubleCount(state, getters) { return getters.count * 2 } }`
23. a) `const store = useStore(); store.dispatch('increment')`
24. d) Opções B e C estão corretas
25. a) `setup()` é uma função que deve retornar um objeto, enquanto `<script setup>` expõe automaticamente variáveis para o template
26. b) `defineExpose({ method1, method2 })`
27. b) Criar uma função que retorna um objeto com estado reativo e métodos
28. d) Opções A e B estão corretas
29. a) `expect(wrapper.emitted()).toHaveProperty('event-name')`
30. d) Todas as opções acima são válidas

### Simulado 3

1. a) `v-on:click` é a sintaxe completa, `@click` é a abreviação
2. a) É a sincronização automática entre o modelo e a visualização, implementada com `v-model`
3. a) `computed` é usado para cálculos síncronos baseados em dependências reativas, `watch` é usado para reações a mudanças
4. d) Usar um método em vez de uma propriedade computada
5. b) O acesso ao valor de uma ref sem usar `.value` em templates
6. a) `reactive` cria um objeto reativo mutável, `readonly` cria uma versão somente leitura de um objeto reativo
7. b) `const propRef = toRef(obj, 'prop')`
8. c) O objeto é internamente convertido para `reactive` e encapsulado em um ref
9. b) `props: { numbers: { type: Array, validator: arr => arr.every(n => typeof n === 'number') } }`
10. c) `props: { prop: { validator(value) { return !condition || value !== undefined } } }`
11. b) Slots normais não podem acessar dados do componente filho, slots com escopo podem
12. a) Através do parâmetro `context.slots`
13. b) Criar componentes que fornecem apenas lógica, delegando a renderização para o componente pai via scoped slots
14. d) Todas as opções acima são válidas
15. b) Um componente que permite renderizar conteúdo em um nó DOM fora da hierarquia do componente
16. c) Usando a API ResizeObserver em um hook de ciclo de vida
17. b) `this.$router.push('/path')` ou `router.push('/path')` (Composition API)
18. a) `params` são parte do padrão de rota (ex: `/user/:id`), `query` são parâmetros de consulta (ex: `/search?q=term`)
19. c) `/user(/:id)(/:name)`
20. a) Controlar o comportamento de rolagem durante a navegação
21. b) `mapState` é para estado básico, `mapGetters` para estado computado, `mapMutations` para mudanças síncronas, `mapActions` para operações assíncronas
22. a) `this.$store.state.module.property` ou `store.state.module.property` (Composition API)
23. d) Opções B e C são abordagens válidas
24. a) `const plugin = store => { store.subscribe((mutation, state) => { console.log(mutation, state) }) }`
25. a) `reactive` cria reatividade profunda (aninhada), `shallowReactive` cria reatividade apenas no nível superior
26. b) Usar `onUnmounted` dentro do composable
27. d) Todas as opções acima são válidas
28. b) `await wrapper.find('button').trigger('click')` e então `expect(wrapper.emitted()).toHaveProperty('event')`
29. d) Opções A e B são válidas
30. d) Todas as opções acima são válidas
