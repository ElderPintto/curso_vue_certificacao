# Exercícios Práticos para Certificação Mid-Level de Vue.js

Este documento contém exercícios práticos adicionais para ajudar na preparação para a certificação mid-level de Vue.js. Os exercícios estão organizados por módulo e aumentam gradualmente em complexidade.

## Exercício 1: Aplicação de Lista de Compras

**Objetivo**: Criar uma aplicação de lista de compras que demonstre os fundamentos do Vue.js.

**Requisitos**:
1. Adicionar, editar e remover itens da lista
2. Marcar itens como comprados
3. Filtrar itens por status (todos, pendentes, comprados)
4. Agrupar itens por categoria
5. Calcular o total estimado da compra

**Conceitos abordados**:
- Reatividade básica
- Diretivas (v-for, v-if, v-model)
- Eventos e métodos
- Computed properties
- Watchers

**Dicas de implementação**:
```vue
<template>
  <div class="shopping-list">
    <h1>Lista de Compras</h1>
    
    <!-- Formulário para adicionar itens -->
    <div class="add-item-form">
      <input v-model="newItem.name" placeholder="Nome do item" />
      <input v-model.number="newItem.price" type="number" placeholder="Preço" step="0.01" />
      <select v-model="newItem.category">
        <option value="">Selecione uma categoria</option>
        <option value="frutas">Frutas</option>
        <option value="legumes">Legumes</option>
        <option value="carnes">Carnes</option>
        <option value="laticínios">Laticínios</option>
        <option value="outros">Outros</option>
      </select>
      <button @click="addItem">Adicionar</button>
    </div>
    
    <!-- Filtros -->
    <div class="filters">
      <button @click="filter = 'all'">Todos</button>
      <button @click="filter = 'pending'">Pendentes</button>
      <button @click="filter = 'purchased'">Comprados</button>
    </div>
    
    <!-- Lista de itens agrupados por categoria -->
    <div v-for="(items, category) in groupedItems" :key="category" class="category-group">
      <h2>{{ category }}</h2>
      <ul>
        <li v-for="item in items" :key="item.id" :class="{ purchased: item.purchased }">
          <input type="checkbox" v-model="item.purchased" />
          <span>{{ item.name }} - R$ {{ item.price.toFixed(2) }}</span>
          <button @click="editItem(item)">Editar</button>
          <button @click="removeItem(item.id)">Remover</button>
        </li>
      </ul>
    </div>
    
    <!-- Total -->
    <div class="total">
      <p>Total estimado: R$ {{ totalPrice.toFixed(2) }}</p>
      <p>Itens pendentes: {{ pendingCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newItem: {
        name: '',
        price: 0,
        category: '',
        purchased: false
      },
      filter: 'all',
      editingItem: null
    }
  },
  computed: {
    filteredItems() {
      if (this.filter === 'all') return this.items
      if (this.filter === 'pending') return this.items.filter(item => !item.purchased)
      if (this.filter === 'purchased') return this.items.filter(item => item.purchased)
      return this.items
    },
    groupedItems() {
      // Implemente o agrupamento por categoria
    },
    totalPrice() {
      // Calcule o preço total
    },
    pendingCount() {
      // Conte os itens pendentes
    }
  },
  methods: {
    addItem() {
      // Implemente a adição de itens
    },
    editItem(item) {
      // Implemente a edição de itens
    },
    removeItem(id) {
      // Implemente a remoção de itens
    }
  }
}
</script>

<style>
/* Adicione estilos para a aplicação */
</style>
```

## Exercício 2: Dashboard de Monitoramento

**Objetivo**: Criar um dashboard que exiba dados de monitoramento em tempo real usando a Composition API.

**Requisitos**:
1. Exibir gráficos de métricas (CPU, memória, rede)
2. Atualizar dados periodicamente
3. Permitir configurar o intervalo de atualização
4. Mostrar alertas para valores críticos
5. Salvar configurações do usuário

**Conceitos abordados**:
- Composition API
- Refs e Reactive
- Lifecycle hooks
- Composables personalizados
- Integração com bibliotecas de terceiros (charts)

**Dicas de implementação**:
```vue
<template>
  <div class="dashboard">
    <h1>Dashboard de Monitoramento</h1>
    
    <!-- Configurações -->
    <div class="settings">
      <label>
        Intervalo de atualização:
        <select v-model="updateInterval">
          <option :value="5000">5 segundos</option>
          <option :value="10000">10 segundos</option>
          <option :value="30000">30 segundos</option>
          <option :value="60000">1 minuto</option>
        </select>
      </label>
      <button @click="startMonitoring">Iniciar</button>
      <button @click="stopMonitoring">Parar</button>
    </div>
    
    <!-- Alertas -->
    <div v-if="alerts.length" class="alerts">
      <div v-for="(alert, index) in alerts" :key="index" class="alert">
        {{ alert.message }}
        <button @click="dismissAlert(index)">×</button>
      </div>
    </div>
    
    <!-- Gráficos -->
    <div class="charts">
      <div class="chart">
        <h2>CPU</h2>
        <canvas ref="cpuChart"></canvas>
      </div>
      <div class="chart">
        <h2>Memória</h2>
        <canvas ref="memoryChart"></canvas>
      </div>
      <div class="chart">
        <h2>Rede</h2>
        <canvas ref="networkChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import Chart from 'chart.js/auto'

// Refs para os elementos canvas
const cpuChart = ref(null)
const memoryChart = ref(null)
const networkChart = ref(null)

// Estado reativo
const updateInterval = ref(10000)
const monitoring = ref(false)
const alerts = ref([])
const metrics = reactive({
  cpu: [],
  memory: [],
  network: []
})

// Instâncias de gráficos
let cpuChartInstance = null
let memoryChartInstance = null
let networkChartInstance = null
let updateTimer = null

// Composable para gerenciar alertas
function useAlerts() {
  function addAlert(message, type = 'warning') {
    alerts.value.push({ message, type, timestamp: Date.now() })
  }
  
  function dismissAlert(index) {
    alerts.value.splice(index, 1)
  }
  
  return { addAlert, dismissAlert }
}

const { addAlert, dismissAlert } = useAlerts()

// Composable para simular dados de métricas
function useMetricsSimulator() {
  function generateRandomData() {
    return {
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      network: Math.random() * 1000
    }
  }
  
  function updateMetrics() {
    const data = generateRandomData()
    
    // Atualizar métricas
    metrics.cpu.push(data.cpu)
    if (metrics.cpu.length > 10) metrics.cpu.shift()
    
    metrics.memory.push(data.memory)
    if (metrics.memory.length > 10) metrics.memory.shift()
    
    metrics.network.push(data.network)
    if (metrics.network.length > 10) metrics.network.shift()
    
    // Verificar alertas
    if (data.cpu > 90) {
      addAlert(`Alerta: CPU em ${data.cpu.toFixed(1)}%`)
    }
    
    if (data.memory > 85) {
      addAlert(`Alerta: Memória em ${data.memory.toFixed(1)}%`)
    }
    
    // Atualizar gráficos
    updateCharts()
  }
  
  return { updateMetrics }
}

const { updateMetrics } = useMetricsSimulator()

// Inicializar gráficos
function initCharts() {
  // Implemente a inicialização dos gráficos usando Chart.js
}

// Atualizar gráficos
function updateCharts() {
  // Implemente a atualização dos gráficos
}

// Iniciar monitoramento
function startMonitoring() {
  if (monitoring.value) return
  
  monitoring.value = true
  updateMetrics() // Atualizar imediatamente
  
  // Configurar timer para atualizações periódicas
  updateTimer = setInterval(updateMetrics, updateInterval.value)
}

// Parar monitoramento
function stopMonitoring() {
  monitoring.value = false
  clearInterval(updateTimer)
}

// Observar mudanças no intervalo de atualização
watch(updateInterval, (newValue) => {
  if (monitoring.value) {
    stopMonitoring()
    startMonitoring()
  }
})

// Lifecycle hooks
onMounted(() => {
  initCharts()
})

onUnmounted(() => {
  stopMonitoring()
  
  // Limpar instâncias de gráficos
  if (cpuChartInstance) cpuChartInstance.destroy()
  if (memoryChartInstance) memoryChartInstance.destroy()
  if (networkChartInstance) networkChartInstance.destroy()
})
</script>

<style>
/* Adicione estilos para o dashboard */
</style>
```

## Exercício 3: Sistema de Gerenciamento de Tarefas

**Objetivo**: Criar um sistema de gerenciamento de tarefas com múltiplas visualizações e gerenciamento de estado.

**Requisitos**:
1. Visualização em lista e em quadro Kanban
2. Categorização de tarefas por projeto e prioridade
3. Filtros e pesquisa
4. Armazenamento persistente (localStorage)
5. Estatísticas e relatórios

**Conceitos abordados**:
- Vuex/Pinia para gerenciamento de estado
- Vue Router para navegação
- Componentes dinâmicos
- Slots e provide/inject
- Mixins ou composables

**Dicas de implementação**:

### Estrutura de Arquivos
```
src/
  assets/
  components/
    TaskForm.vue
    TaskItem.vue
    TaskList.vue
    KanbanBoard.vue
    FilterPanel.vue
    StatisticsPanel.vue
  views/
    HomeView.vue
    ListView.vue
    KanbanView.vue
    StatisticsView.vue
    SettingsView.vue
  store/
    index.js
    modules/
      tasks.js
      projects.js
      settings.js
  router/
    index.js
  composables/
    useTaskFilters.js
    useTaskStatistics.js
    useLocalStorage.js
  App.vue
  main.js
```

### Store (Pinia)
```javascript
// store/tasks.js
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getTaskById: (state) => (id) => state.tasks.find(task => task.id === id),
    
    getTasksByProject: (state) => (projectId) => 
      state.tasks.filter(task => task.projectId === projectId),
    
    getTasksByStatus: (state) => (status) => 
      state.tasks.filter(task => task.status === status),
    
    getTasksByPriority: (state) => (priority) => 
      state.tasks.filter(task => task.priority === priority),
    
    completedTasks: (state) => 
      state.tasks.filter(task => task.status === 'completed'),
    
    pendingTasks: (state) => 
      state.tasks.filter(task => task.status !== 'completed')
  },
  
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        // Simular chamada de API ou carregar do localStorage
        const storedTasks = localStorage.getItem('tasks')
        this.tasks = storedTasks ? JSON.parse(storedTasks) : []
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async addTask(task) {
      // Implementar adição de tarefa
    },
    
    async updateTask(id, updates) {
      // Implementar atualização de tarefa
    },
    
    async deleteTask(id) {
      // Implementar exclusão de tarefa
    },
    
    async moveTask(id, newStatus) {
      // Implementar movimentação de tarefa entre status
    }
  }
})
```

### Router
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import KanbanView from '../views/KanbanView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
  },
  {
    path: '/kanban',
    name: 'kanban',
    component: KanbanView
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### Composable para Filtros
```javascript
// composables/useTaskFilters.js
import { ref, computed } from 'vue'
import { useTasksStore } from '../store/tasks'

export function useTaskFilters() {
  const tasksStore = useTasksStore()
  
  const filters = ref({
    status: 'all',
    priority: 'all',
    project: 'all',
    search: ''
  })
  
  const filteredTasks = computed(() => {
    let result = [...tasksStore.tasks]
    
    // Filtrar por status
    if (filters.value.status !== 'all') {
      result = result.filter(task => task.status === filters.value.status)
    }
    
    // Filtrar por prioridade
    if (filters.value.priority !== 'all') {
      result = result.filter(task => task.priority === filters.value.priority)
    }
    
    // Filtrar por projeto
    if (filters.value.project !== 'all') {
      result = result.filter(task => task.projectId === filters.value.project)
    }
    
    // Filtrar por texto de pesquisa
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        task.description.toLowerCase().includes(searchLower)
      )
    }
    
    return result
  })
  
  function setFilter(filterName, value) {
    filters.value[filterName] = value
  }
  
  function resetFilters() {
    filters.value = {
      status: 'all',
      priority: 'all',
      project: 'all',
      search: ''
    }
  }
  
  return {
    filters,
    filteredTasks,
    setFilter,
    resetFilters
  }
}
```

### Componente KanbanBoard
```vue
<template>
  <div class="kanban-board">
    <div 
      v-for="column in columns" 
      :key="column.id" 
      class="kanban-column"
    >
      <h2>{{ column.title }} ({{ tasksInColumn(column.id).length }})</h2>
      
      <div class="task-list">
        <div
          v-for="task in tasksInColumn(column.id)"
          :key="task.id"
          class="task-card"
          :class="'priority-' + task.priority"
          draggable="true"
          @dragstart="dragStart($event, task)"
          @dragend="dragEnd"
        >
          <div class="task-header">
            <span class="task-title">{{ task.title }}</span>
            <span class="task-priority">{{ getPriorityLabel(task.priority) }}</span>
          </div>
          
          <div class="task-body">
            <p>{{ task.description }}</p>
          </div>
          
          <div class="task-footer">
            <span class="task-project">{{ getProjectName(task.projectId) }}</span>
            <span class="task-due-date">{{ formatDate(task.dueDate) }}</span>
          </div>
          
          <div class="task-actions">
            <button @click="editTask(task)">Editar</button>
            <button @click="deleteTask(task.id)">Excluir</button>
          </div>
        </div>
        
        <div 
          class="drop-zone" 
          @dragover.prevent
          @dragenter.prevent="dragEnter($event, column.id)"
          @dragleave="dragLeave"
          @drop="drop($event, column.id)"
        ></div>
      </div>
      
      <button @click="addTask(column.id)" class="add-task-btn">+ Adicionar Tarefa</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '../store/tasks'
import { useProjectsStore } from '../store/projects'

const tasksStore = useTasksStore()
const projectsStore = useProjectsStore()

// Definir colunas do Kanban
const columns = [
  { id: 'todo', title: 'A Fazer' },
  { id: 'in-progress', title: 'Em Progresso' },
  { id: 'review', title: 'Em Revisão' },
  { id: 'completed', title: 'Concluído' }
]

// Estado para drag and drop
const draggedTask = ref(null)
const draggedElement = ref(null)
const activeDropZone = ref(null)

// Computed para tarefas em cada coluna
function tasksInColumn(columnId) {
  return tasksStore.tasks.filter(task => task.status === columnId)
}

// Funções auxiliares
function getPriorityLabel(priority) {
  const labels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    urgent: 'Urgente'
  }
  return labels[priority] || priority
}

function getProjectName(projectId) {
  const project = projectsStore.getProjectById(projectId)
  return project ? project.name : 'Sem projeto'
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// Funções de ação
function addTask(status) {
  // Implementar adição de tarefa
}

function editTask(task) {
  // Implementar edição de tarefa
}

function deleteTask(id) {
  // Implementar exclusão de tarefa
}

// Funções de drag and drop
function dragStart(event, task) {
  draggedTask.value = task
  draggedElement.value = event.target
  event.target.classList.add('dragging')
  
  // Definir dados para transferência
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', task.id)
}

function dragEnd() {
  if (draggedElement.value) {
    draggedElement.value.classList.remove('dragging')
  }
  draggedTask.value = null
  draggedElement.value = null
}

function dragEnter(event, columnId) {
  if (draggedTask.value && draggedTask.value.status !== columnId) {
    event.target.classList.add('active-drop-zone')
    activeDropZone.value = event.target
  }
}

function dragLeave(event) {
  if (event.target === activeDropZone.value) {
    event.target.classList.remove('active-drop-zone')
    activeDropZone.value = null
  }
}

function drop(event, columnId) {
  event.preventDefault()
  
  if (activeDropZone.value) {
    activeDropZone.value.classList.remove('active-drop-zone')
    activeDropZone.value = null
  }
  
  if (draggedTask.value && draggedTask.value.status !== columnId) {
    tasksStore.moveTask(draggedTask.value.id, columnId)
  }
}
</script>

<style scoped>
/* Adicione estilos para o quadro Kanban */
</style>
```

## Exercício 4: Aplicação de E-commerce

**Objetivo**: Criar uma aplicação de e-commerce com catálogo de produtos, carrinho de compras e checkout.

**Requisitos**:
1. Exibir catálogo de produtos com filtragem e pesquisa
2. Adicionar produtos ao carrinho
3. Gerenciar carrinho (atualizar quantidades, remover itens)
4. Processo de checkout com validação de formulário
5. Histórico de pedidos

**Conceitos abordados**:
- Gerenciamento de estado complexo
- Formulários e validação
- Rotas aninhadas e guardas de rota
- Lazy loading de componentes
- Transições e animações

**Dicas de implementação**:

### Estrutura de Rotas
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/products',
    component: () => import('../views/ProductsView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ProductList.vue')
      },
      {
        path: ':id',
        component: () => import('../components/ProductDetail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/checkout',
    component: () => import('../views/CheckoutView.vue'),
    meta: { requiresAuth: false }, // Na vida real seria true
    beforeEnter: (to, from, next) => {
      const cartStore = useCartStore()
      if (cartStore.items.length === 0) {
        next('/cart')
      } else {
        next()
      }
    }
  },
  {
    path: '/orders',
    component: () => import('../views/OrdersView.vue'),
    meta: { requiresAuth: false } // Na vida real seria true
  },
  {
    path: '/account',
    component: () => import('../views/AccountView.vue'),
    meta: { requiresAuth: false }, // Na vida real seria true
    children: [
      {
        path: 'profile',
        component: () => import('../components/UserProfile.vue')
      },
      {
        path: 'addresses',
        component: () => import('../components/UserAddresses.vue')
      },
      {
        path: 'payment-methods',
        component: () => import('../components/PaymentMethods.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guarda de rota global para verificar autenticação
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verificar se o usuário está autenticado
    const isAuthenticated = false // Na vida real, verificaria o estado de autenticação
    
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
```

### Store do Carrinho (Pinia)
```javascript
// store/cart.js
import { defineStore } from 'pinia'
import { useProductsStore } from './products'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    couponCode: null,
    discount: 0
  }),
  
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    subtotal: (state) => {
      const productsStore = useProductsStore()
      
      return state.items.reduce((sum, item) => {
        const product = productsStore.getProductById(item.productId)
        return sum + (product ? product.price * item.quantity : 0)
      }, 0)
    },
    
    total: (state) => {
      return state.subtotal - state.discount
    },
    
    isEmpty: (state) => state.items.length === 0
  },
  
  actions: {
    addItem(productId, quantity = 1) {
      const existingItem = this.items.find(item => item.productId === productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          productId,
          quantity
        })
      }
      
      this.saveCart()
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.productId === productId)
      
      if (item) {
        item.quantity = Math.max(1, quantity)
        this.saveCart()
      }
    },
    
    removeItem(productId) {
      const index = this.items.findIndex(item => item.productId === productId)
      
      if (index !== -1) {
        this.items.splice(index, 1)
        this.saveCart()
      }
    },
    
    clearCart() {
      this.items = []
      this.couponCode = null
      this.discount = 0
      this.saveCart()
    },
    
    applyCoupon(code) {
      // Simular verificação de cupom
      if (code === 'DISCOUNT10') {
        this.couponCode = code
        this.discount = this.subtotal * 0.1
        return true
      } else if (code === 'DISCOUNT20') {
        this.couponCode = code
        this.discount = this.subtotal * 0.2
        return true
      }
      
      return false
    },
    
    loadCart() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const { items, couponCode, discount } = JSON.parse(savedCart)
        this.items = items
        this.couponCode = couponCode
        this.discount = discount
      }
    },
    
    saveCart() {
      localStorage.setItem('cart', JSON.stringify({
        items: this.items,
        couponCode: this.couponCode,
        discount: this.discount
      }))
    }
  }
})
```

### Componente de Checkout
```vue
<template>
  <div class="checkout">
    <h1>Checkout</h1>
    
    <div class="checkout-container">
      <div class="checkout-form">
        <h2>Informações de Envio</h2>
        
        <form @submit.prevent="submitOrder">
          <!-- Etapas do checkout -->
          <div v-if="currentStep === 'shipping'" class="checkout-step">
            <div class="form-group">
              <label for="fullName">Nome Completo</label>
              <input 
                id="fullName" 
                v-model="shippingInfo.fullName" 
                :class="{ 'is-invalid': v$.shippingInfo.fullName.$error }"
              />
              <div v-if="v$.shippingInfo.fullName.$error" class="error-message">
                {{ v$.shippingInfo.fullName.$errors[0].$message }}
              </div>
            </div>
            
            <div class="form-group">
              <label for="address">Endereço</label>
              <input 
                id="address" 
                v-model="shippingInfo.address" 
                :class="{ 'is-invalid': v$.shippingInfo.address.$error }"
              />
              <div v-if="v$.shippingInfo.address.$error" class="error-message">
                {{ v$.shippingInfo.address.$errors[0].$message }}
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="city">Cidade</label>
                <input 
                  id="city" 
                  v-model="shippingInfo.city" 
                  :class="{ 'is-invalid': v$.shippingInfo.city.$error }"
                />
                <div v-if="v$.shippingInfo.city.$error" class="error-message">
                  {{ v$.shippingInfo.city.$errors[0].$message }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="zipCode">CEP</label>
                <input 
                  id="zipCode" 
                  v-model="shippingInfo.zipCode" 
                  :class="{ 'is-invalid': v$.shippingInfo.zipCode.$error }"
                />
                <div v-if="v$.shippingInfo.zipCode.$error" class="error-message">
                  {{ v$.shippingInfo.zipCode.$errors[0].$message }}
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="phone">Telefone</label>
              <input 
                id="phone" 
                v-model="shippingInfo.phone" 
                :class="{ 'is-invalid': v$.shippingInfo.phone.$error }"
              />
              <div v-if="v$.shippingInfo.phone.$error" class="error-message">
                {{ v$.shippingInfo.phone.$errors[0].$message }}
              </div>
            </div>
            
            <button 
              type="button" 
              @click="nextStep" 
              :disabled="v$.shippingInfo.$invalid"
              class="btn-primary"
            >
              Continuar para Pagamento
            </button>
          </div>
          
          <div v-else-if="currentStep === 'payment'" class="checkout-step">
            <div class="form-group">
              <label for="cardName">Nome no Cartão</label>
              <input 
                id="cardName" 
                v-model="paymentInfo.cardName" 
                :class="{ 'is-invalid': v$.paymentInfo.cardName.$error }"
              />
              <div v-if="v$.paymentInfo.cardName.$error" class="error-message">
                {{ v$.paymentInfo.cardName.$errors[0].$message }}
              </div>
            </div>
            
            <div class="form-group">
              <label for="cardNumber">Número do Cartão</label>
              <input 
                id="cardNumber" 
                v-model="paymentInfo.cardNumber" 
                :class="{ 'is-invalid': v$.paymentInfo.cardNumber.$error }"
              />
              <div v-if="v$.paymentInfo.cardNumber.$error" class="error-message">
                {{ v$.paymentInfo.cardNumber.$errors[0].$message }}
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="expiryDate">Data de Validade</label>
                <input 
                  id="expiryDate" 
                  v-model="paymentInfo.expiryDate" 
                  placeholder="MM/AA"
                  :class="{ 'is-invalid': v$.paymentInfo.expiryDate.$error }"
                />
                <div v-if="v$.paymentInfo.expiryDate.$error" class="error-message">
                  {{ v$.paymentInfo.expiryDate.$errors[0].$message }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input 
                  id="cvv" 
                  v-model="paymentInfo.cvv" 
                  :class="{ 'is-invalid': v$.paymentInfo.cvv.$error }"
                />
                <div v-if="v$.paymentInfo.cvv.$error" class="error-message">
                  {{ v$.paymentInfo.cvv.$errors[0].$message }}
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="previousStep" class="btn-secondary">
                Voltar
              </button>
              
              <button 
                type="button" 
                @click="nextStep" 
                :disabled="v$.paymentInfo.$invalid"
                class="btn-primary"
              >
                Revisar Pedido
              </button>
            </div>
          </div>
          
          <div v-else-if="currentStep === 'review'" class="checkout-step">
            <h3>Revisar Pedido</h3>
            
            <div class="review-section">
              <h4>Informações de Envio</h4>
              <p>{{ shippingInfo.fullName }}</p>
              <p>{{ shippingInfo.address }}</p>
              <p>{{ shippingInfo.city }}, {{ shippingInfo.zipCode }}</p>
              <p>{{ shippingInfo.phone }}</p>
            </div>
            
            <div class="review-section">
              <h4>Método de Pagamento</h4>
              <p>Cartão terminado em {{ paymentInfo.cardNumber.slice(-4) }}</p>
            </div>
            
            <div class="review-section">
              <h4>Itens do Pedido</h4>
              <div v-for="item in cartItems" :key="item.productId" class="review-item">
                <div class="item-details">
                  <span class="item-name">{{ item.product.name }}</span>
                  <span class="item-quantity">Qtd: {{ item.quantity }}</span>
                </div>
                <span class="item-price">{{ formatCurrency(item.product.price * item.quantity) }}</span>
              </div>
            </div>
            
            <div class="order-summary">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>{{ formatCurrency(cartStore.subtotal) }}</span>
              </div>
              
              <div v-if="cartStore.discount > 0" class="summary-row discount">
                <span>Desconto ({{ cartStore.couponCode }})</span>
                <span>-{{ formatCurrency(cartStore.discount) }}</span>
              </div>
              
              <div class="summary-row">
                <span>Frete</span>
                <span>{{ formatCurrency(shippingCost) }}</span>
              </div>
              
              <div class="summary-row total">
                <span>Total</span>
                <span>{{ formatCurrency(cartStore.total + shippingCost) }}</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="previousStep" class="btn-secondary">
                Voltar
              </button>
              
              <button type="submit" class="btn-primary">
                Finalizar Compra
              </button>
            </div>
          </div>
          
          <div v-else-if="currentStep === 'confirmation'" class="checkout-step">
            <div class="order-confirmation">
              <div class="confirmation-icon">✓</div>
              <h2>Pedido Confirmado!</h2>
              <p>Seu pedido #{{ orderNumber }} foi recebido e está sendo processado.</p>
              <p>Um e-mail de confirmação foi enviado para você.</p>
              
              <div class="confirmation-actions">
                <router-link to="/orders" class="btn-secondary">
                  Ver Meus Pedidos
                </router-link>
                
                <router-link to="/products" class="btn-primary">
                  Continuar Comprando
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <div class="order-summary-sidebar">
        <h3>Resumo do Pedido</h3>
        
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.productId" class="cart-item">
            <div class="item-image">
              <img :src="item.product.image" :alt="item.product.name" />
            </div>
            <div class="item-details">
              <div class="item-name">{{ item.product.name }}</div>
              <div class="item-price">{{ formatCurrency(item.product.price) }} x {{ item.quantity }}</div>
            </div>
            <div class="item-total">
              {{ formatCurrency(item.product.price * item.quantity) }}
            </div>
          </div>
        </div>
        
        <div class="coupon-code">
          <input 
            v-model="couponCode" 
            placeholder="Código de cupom" 
            :disabled="currentStep === 'confirmation'"
          />
          <button 
            @click="applyCoupon" 
            :disabled="!couponCode || currentStep === 'confirmation'"
          >
            Aplicar
          </button>
        </div>
        
        <div class="order-totals">
          <div class="total-row">
            <span>Subtotal</span>
            <span>{{ formatCurrency(cartStore.subtotal) }}</span>
          </div>
          
          <div v-if="cartStore.discount > 0" class="total-row discount">
            <span>Desconto</span>
            <span>-{{ formatCurrency(cartStore.discount) }}</span>
          </div>
          
          <div class="total-row">
            <span>Frete</span>
            <span>{{ formatCurrency(shippingCost) }}</span>
          </div>
          
          <div class="total-row grand-total">
            <span>Total</span>
            <span>{{ formatCurrency(cartStore.total + shippingCost) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useCartStore } from '../store/cart'
import { useProductsStore } from '../store/products'
import { useOrdersStore } from '../store/orders'

const router = useRouter()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const ordersStore = useOrdersStore()

// Estado do checkout
const currentStep = ref('shipping')
const couponCode = ref('')
const shippingCost = ref(10)
const orderNumber = ref('')

// Informações de envio
const shippingInfo = reactive({
  fullName: '',
  address: '',
  city: '',
  zipCode: '',
  phone: ''
})

// Informações de pagamento
const paymentInfo = reactive({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// Regras de validação
const rules = computed(() => ({
  shippingInfo: {
    fullName: { required: helpers.withMessage('Nome é obrigatório', required) },
    address: { required: helpers.withMessage('Endereço é obrigatório', required) },
    city: { required: helpers.withMessage('Cidade é obrigatória', required) },
    zipCode: { 
      required: helpers.withMessage('CEP é obrigatório', required),
      minLength: helpers.withMessage('CEP deve ter pelo menos 5 caracteres', minLength(5))
    },
    phone: { required: helpers.withMessage('Telefone é obrigatório', required) }
  },
  paymentInfo: {
    cardName: { required: helpers.withMessage('Nome no cartão é obrigatório', required) },
    cardNumber: { 
      required: helpers.withMessage('Número do cartão é obrigatório', required),
      minLength: helpers.withMessage('Número do cartão deve ter pelo menos 16 dígitos', minLength(16))
    },
    expiryDate: { required: helpers.withMessage('Data de validade é obrigatória', required) },
    cvv: { 
      required: helpers.withMessage('CVV é obrigatório', required),
      minLength: helpers.withMessage('CVV deve ter pelo menos 3 dígitos', minLength(3))
    }
  }
}))

const v$ = useVuelidate(rules, { shippingInfo, paymentInfo })

// Itens do carrinho com detalhes do produto
const cartItems = computed(() => {
  return cartStore.items.map(item => {
    const product = productsStore.getProductById(item.productId)
    return {
      ...item,
      product
    }
  })
})

// Métodos
function nextStep() {
  if (currentStep.value === 'shipping') {
    v$.value.shippingInfo.$touch()
    if (!v$.value.shippingInfo.$invalid) {
      currentStep.value = 'payment'
    }
  } else if (currentStep.value === 'payment') {
    v$.value.paymentInfo.$touch()
    if (!v$.value.paymentInfo.$invalid) {
      currentStep.value = 'review'
    }
  }
}

function previousStep() {
  if (currentStep.value === 'payment') {
    currentStep.value = 'shipping'
  } else if (currentStep.value === 'review') {
    currentStep.value = 'payment'
  }
}

function applyCoupon() {
  if (couponCode.value) {
    const success = cartStore.applyCoupon(couponCode.value)
    if (!success) {
      alert('Cupom inválido')
    } else {
      couponCode.value = ''
    }
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

async function submitOrder() {
  try {
    // Criar objeto de pedido
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cartStore.items,
      shippingInfo,
      paymentInfo: {
        cardName: paymentInfo.cardName,
        cardNumber: `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`
      },
      subtotal: cartStore.subtotal,
      discount: cartStore.discount,
      shippingCost: shippingCost.value,
      total: cartStore.total + shippingCost.value,
      status: 'processing'
    }
    
    // Salvar pedido
    await ordersStore.addOrder(order)
    
    // Definir número do pedido
    orderNumber.value = order.id
    
    // Limpar carrinho
    cartStore.clearCart()
    
    // Mostrar confirmação
    currentStep.value = 'confirmation'
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error)
    alert('Ocorreu um erro ao finalizar seu pedido. Por favor, tente novamente.')
  }
}

// Carregar dados ao montar o componente
onMounted(() => {
  cartStore.loadCart()
  productsStore.fetchProducts()
  
  // Redirecionar se o carrinho estiver vazio
  if (cartStore.isEmpty) {
    router.push('/cart')
  }
})
</script>

<style scoped>
/* Adicione estilos para o checkout */
</style>
```

## Exercício 5: Aplicação de Blog com CMS

**Objetivo**: Criar uma aplicação de blog com painel administrativo para gerenciar conteúdo.

**Requisitos**:
1. Área pública para leitura de posts
2. Painel administrativo protegido
3. Editor de conteúdo rico (WYSIWYG)
4. Gerenciamento de categorias e tags
5. Comentários e interações

**Conceitos abordados**:
- Autenticação e autorização
- Renderização condicional avançada
- Integração com bibliotecas de terceiros
- Renderização de conteúdo rico
- Otimização de performance

**Dicas de implementação**:

### Estrutura de Arquivos
```
src/
  assets/
  components/
    public/
      PostCard.vue
      PostList.vue
      CommentForm.vue
      CommentList.vue
    admin/
      PostEditor.vue
      CategoryManager.vue
      TagManager.vue
      Dashboard.vue
  views/
    public/
      HomeView.vue
      PostView.vue
      CategoryView.vue
      AuthorView.vue
    admin/
      AdminDashboard.vue
      AdminPosts.vue
      AdminCategories.vue
      AdminComments.vue
      AdminSettings.vue
  composables/
    useAuth.js
    usePosts.js
    useComments.js
  store/
    auth.js
    posts.js
    categories.js
    comments.js
  router/
    index.js
  App.vue
  main.js
```

### Implementação do Editor de Conteúdo
```vue
<!-- components/admin/PostEditor.vue -->
<template>
  <div class="post-editor">
    <div class="editor-header">
      <h2>{{ isEditing ? 'Editar Post' : 'Novo Post' }}</h2>
      
      <div class="editor-actions">
        <button @click="saveDraft" class="btn-secondary">Salvar Rascunho</button>
        <button @click="publishPost" class="btn-primary">Publicar</button>
      </div>
    </div>
    
    <div class="editor-form">
      <div class="form-group">
        <label for="title">Título</label>
        <input 
          id="title" 
          v-model="post.title" 
          placeholder="Digite o título do post"
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="slug">Slug</label>
        <div class="slug-input">
          <input 
            id="slug" 
            v-model="post.slug" 
            placeholder="url-amigavel-do-post"
            class="form-control"
          />
          <button @click="generateSlug" class="btn-icon" title="Gerar slug a partir do título">
            ↺
          </button>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="category">Categoria</label>
          <select id="category" v-model="post.categoryId" class="form-control">
            <option value="">Selecione uma categoria</option>
            <option 
              v-for="category in categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Tags</label>
          <div class="tags-input">
            <div class="selected-tags">
              <span 
                v-for="tag in selectedTags" 
                :key="tag.id" 
                class="tag"
              >
                {{ tag.name }}
                <button @click="removeTag(tag)" class="tag-remove">×</button>
              </span>
            </div>
            
            <div class="tags-dropdown">
              <input 
                v-model="tagSearch" 
                @focus="showTagDropdown = true"
                @blur="hideTagDropdownDelayed"
                placeholder="Adicionar tag"
                class="form-control"
              />
              
              <div v-show="showTagDropdown" class="dropdown-menu">
                <div 
                  v-for="tag in filteredTags" 
                  :key="tag.id" 
                  @mousedown="addTag(tag)"
                  class="dropdown-item"
                >
                  {{ tag.name }}
                </div>
                
                <div 
                  v-if="filteredTags.length === 0 && tagSearch" 
                  @mousedown="createAndAddTag"
                  class="dropdown-item create"
                >
                  Criar tag "{{ tagSearch }}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="excerpt">Resumo</label>
        <textarea 
          id="excerpt" 
          v-model="post.excerpt" 
          placeholder="Breve resumo do post"
          class="form-control"
          rows="3"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>Conteúdo</label>
        <div class="editor-toolbar">
          <button @click="formatText('bold')" class="toolbar-btn" title="Negrito">B</button>
          <button @click="formatText('italic')" class="toolbar-btn" title="Itálico">I</button>
          <button @click="formatText('heading')" class="toolbar-btn" title="Título">H</button>
          <button @click="formatText('link')" class="toolbar-btn" title="Link">🔗</button>
          <button @click="formatText('image')" class="toolbar-btn" title="Imagem">🖼️</button>
          <button @click="formatText('list')" class="toolbar-btn" title="Lista">•</button>
        </div>
        
        <div 
          ref="editorElement"
          class="content-editor"
          contenteditable="true"
          @input="updateContent"
          v-html="post.content"
        ></div>
      </div>
      
      <div class="form-group">
        <label for="featuredImage">Imagem Destacada</label>
        <div class="image-upload">
          <input 
            type="file" 
            id="featuredImage" 
            @change="handleImageUpload" 
            accept="image/*"
            class="file-input"
          />
          
          <div class="image-preview" v-if="post.featuredImage">
            <img :src="post.featuredImage" alt="Preview" />
            <button @click="removeFeaturedImage" class="remove-image">×</button>
          </div>
          
          <label for="featuredImage" class="upload-label" v-if="!post.featuredImage">
            Clique para fazer upload
          </label>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="post.status" class="form-control">
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="scheduled">Agendado</option>
          </select>
        </div>
        
        <div class="form-group" v-if="post.status === 'scheduled'">
          <label for="publishDate">Data de Publicação</label>
          <input 
            type="datetime-local" 
            id="publishDate" 
            v-model="post.publishDate"
            class="form-control"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="post.allowComments" />
          Permitir comentários
        </label>
      </div>
      
      <div class="form-actions">
        <button @click="cancel" class="btn-secondary">Cancelar</button>
        <button @click="saveDraft" class="btn-secondary">Salvar Rascunho</button>
        <button @click="publishPost" class="btn-primary">Publicar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore } from '../../store/posts'
import { useCategoriesStore } from '../../store/categories'
import { useTagsStore } from '../../store/tags'
import { slugify } from '../../utils/string'

const router = useRouter()
const route = useRoute()
const postsStore = usePostsStore()
const categoriesStore = useCategoriesStore()
const tagsStore = useTagsStore()

// Estado do editor
const isEditing = computed(() => !!route.params.id)
const editorElement = ref(null)
const tagSearch = ref('')
const showTagDropdown = ref(false)

// Post sendo editado
const post = reactive({
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  categoryId: '',
  tagIds: [],
  status: 'draft',
  publishDate: null,
  allowComments: true
})

// Categorias e tags
const categories = computed(() => categoriesStore.categories)
const tags = computed(() => tagsStore.tags)

// Tags selecionadas
const selectedTags = computed(() => {
  return post.tagIds.map(id => tags.value.find(tag => tag.id === id)).filter(Boolean)
})

// Tags filtradas para o dropdown
const filteredTags = computed(() => {
  if (!tagSearch.value) return []
  
  const search = tagSearch.value.toLowerCase()
  return tags.value
    .filter(tag => 
      tag.name.toLowerCase().includes(search) && 
      !post.tagIds.includes(tag.id)
    )
    .slice(0, 5)
})

// Carregar dados
onMounted(async () => {
  await Promise.all([
    categoriesStore.fetchCategories(),
    tagsStore.fetchTags()
  ])
  
  if (isEditing.value) {
    const postData = await postsStore.fetchPost(route.params.id)
    if (postData) {
      Object.assign(post, postData)
    }
  }
})

// Métodos
function generateSlug() {
  if (post.title) {
    post.slug = slugify(post.title)
  }
}

function updateContent(event) {
  post.content = event.target.innerHTML
}

function formatText(format) {
  // Implementar formatação de texto
  // Esta é uma implementação simplificada
  // Em um caso real, você usaria uma biblioteca como TinyMCE, CKEditor, etc.
  
  const selection = window.getSelection()
  
  if (!selection.rangeCount) return
  
  const range = selection.getRangeAt(0)
  
  if (format === 'bold') {
    document.execCommand('bold', false)
  } else if (format === 'italic') {
    document.execCommand('italic', false)
  } else if (format === 'heading') {
    document.execCommand('formatBlock', false, '<h2>')
  } else if (format === 'link') {
    const url = prompt('Digite a URL do link:')
    if (url) {
      document.execCommand('createLink', false, url)
    }
  } else if (format === 'image') {
    const url = prompt('Digite a URL da imagem:')
    if (url) {
      document.execCommand('insertImage', false, url)
    }
  } else if (format === 'list') {
    document.execCommand('insertUnorderedList', false)
  }
  
  // Atualizar o conteúdo após a formatação
  post.content = editorElement.value.innerHTML
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  // Em um caso real, você faria upload para um servidor
  // Aqui, apenas convertemos para base64 para demonstração
  const reader = new FileReader()
  reader.onload = (e) => {
    post.featuredImage = e.target.result
  }
  reader.readAsDataURL(file)
}

function removeFeaturedImage() {
  post.featuredImage = ''
}

function addTag(tag) {
  if (!post.tagIds.includes(tag.id)) {
    post.tagIds.push(tag.id)
  }
  tagSearch.value = ''
}

function removeTag(tag) {
  const index = post.tagIds.indexOf(tag.id)
  if (index !== -1) {
    post.tagIds.splice(index, 1)
  }
}

async function createAndAddTag() {
  if (!tagSearch.value) return
  
  try {
    const newTag = await tagsStore.createTag({ name: tagSearch.value })
    post.tagIds.push(newTag.id)
    tagSearch.value = ''
  } catch (error) {
    console.error('Erro ao criar tag:', error)
  }
}

function hideTagDropdownDelayed() {
  setTimeout(() => {
    showTagDropdown.value = false
  }, 200)
}

async function saveDraft() {
  try {
    post.status = 'draft'
    await savePost()
    router.push('/admin/posts')
  } catch (error) {
    console.error('Erro ao salvar rascunho:', error)
  }
}

async function publishPost() {
  try {
    post.status = 'published'
    await savePost()
    router.push('/admin/posts')
  } catch (error) {
    console.error('Erro ao publicar post:', error)
  }
}

async function savePost() {
  if (!post.title) {
    alert('O título é obrigatório')
    return
  }
  
  if (!post.slug) {
    generateSlug()
  }
  
  if (isEditing.value) {
    await postsStore.updatePost(post)
  } else {
    await postsStore.createPost(post)
  }
}

function cancel() {
  router.push('/admin/posts')
}
</script>

<style scoped>
/* Adicione estilos para o editor */
</style>
```

## Perguntas para Fixação

### Exercício 1: Lista de Compras

1. **Qual diretiva Vue você usaria para renderizar uma lista de itens de compra?**
   - a) v-for
   - b) v-list
   - c) v-each
   - d) v-render

2. **Como você implementaria o agrupamento de itens por categoria?**
   - a) Usando v-if para verificar a categoria de cada item
   - b) Criando uma computed property que retorna um objeto com categorias como chaves e arrays de itens como valores
   - c) Usando a diretiva v-group
   - d) Ordenando os itens por categoria no array original

3. **Qual é a melhor abordagem para calcular o preço total da lista de compras?**
   - a) Calcular no método de renderização
   - b) Usar uma computed property
   - c) Atualizar uma variável de dados sempre que um item é adicionado
   - d) Usar um watcher para monitorar mudanças nos itens

### Exercício 2: Dashboard de Monitoramento

1. **Qual hook de ciclo de vida você usaria para iniciar o monitoramento quando o componente é montado?**
   - a) created
   - b) beforeMount
   - c) onMounted
   - d) mounted

2. **Como você implementaria a atualização periódica dos dados?**
   - a) Usando setTimeout recursivo
   - b) Usando setInterval e limpando-o no hook onUnmounted
   - c) Usando a API Fetch com a opção refresh
   - d) Usando a diretiva v-update

3. **Qual é a melhor maneira de criar um composable para gerenciar alertas?**
   - a) Criar uma classe JavaScript tradicional
   - b) Usar um mixin
   - c) Criar uma função que retorna estado reativo e métodos
   - d) Usar um componente global

### Exercício 3: Sistema de Gerenciamento de Tarefas

1. **Qual é a melhor abordagem para implementar a funcionalidade de arrastar e soltar no quadro Kanban?**
   - a) Usar a API nativa de Drag and Drop do HTML5
   - b) Implementar manualmente com eventos de mouse
   - c) Usar uma biblioteca como vue-draggable
   - d) Usar a diretiva v-drag do Vue

2. **Como você implementaria a persistência de tarefas no localStorage?**
   - a) Salvando manualmente após cada operação
   - b) Usando um watcher para observar mudanças no estado e salvar
   - c) Usando a opção persist do Vuex/Pinia
   - d) Usando cookies em vez de localStorage

3. **Qual padrão você usaria para filtrar tarefas por diferentes critérios?**
   - a) Múltiplas computed properties para cada filtro
   - b) Uma única computed property com lógica condicional baseada no filtro ativo
   - c) Métodos que retornam diferentes conjuntos de tarefas
   - d) Armazenar versões filtradas no estado

### Exercício 4: Aplicação de E-commerce

1. **Como você implementaria a validação de formulário no checkout?**
   - a) Validação manual com métodos personalizados
   - b) Usando a diretiva v-validate
   - c) Usando uma biblioteca como Vuelidate ou VeeValidate
   - d) Usando apenas validação HTML5

2. **Qual é a melhor abordagem para gerenciar o estado do carrinho de compras?**
   - a) Usar o localStorage diretamente
   - b) Usar variáveis de estado no componente raiz
   - c) Usar Vuex ou Pinia com persistência
   - d) Passar props entre componentes

3. **Como você implementaria as etapas do processo de checkout?**
   - a) Usando componentes separados para cada etapa
   - b) Usando uma variável de estado para controlar qual etapa está ativa
   - c) Usando rotas diferentes para cada etapa
   - d) Usando abas com v-if/v-else

### Exercício 5: Aplicação de Blog com CMS

1. **Qual é a melhor abordagem para implementar o editor de conteúdo rico?**
   - a) Usar textarea com formatação manual
   - b) Implementar um editor personalizado com contenteditable
   - c) Integrar uma biblioteca como TinyMCE, CKEditor ou Quill
   - d) Usar markdown em vez de WYSIWYG

2. **Como você implementaria a autorização para o painel administrativo?**
   - a) Verificando permissões em cada componente
   - b) Usando guardas de navegação do Vue Router
   - c) Usando middleware no servidor
   - d) Verificando permissões apenas no login

3. **Qual é a melhor maneira de gerenciar o upload de imagens para posts?**
   - a) Converter para base64 e armazenar no banco de dados
   - b) Fazer upload para um serviço de armazenamento como AWS S3
   - c) Armazenar no localStorage
   - d) Usar apenas URLs de imagens externas

## Respostas

### Exercício 1
1. a) v-for
2. b) Criando uma computed property que retorna um objeto com categorias como chaves e arrays de itens como valores
3. b) Usar uma computed property

### Exercício 2
1. c) onMounted
2. b) Usando setInterval e limpando-o no hook onUnmounted
3. c) Criar uma função que retorna estado reativo e métodos

### Exercício 3
1. a) Usar a API nativa de Drag and Drop do HTML5
2. b) Usando um watcher para observar mudanças no estado e salvar
3. b) Uma única computed property com lógica condicional baseada no filtro ativo

### Exercício 4
1. c) Usando uma biblioteca como Vuelidate ou VeeValidate
2. c) Usar Vuex ou Pinia com persistência
3. b) Usando uma variável de estado para controlar qual etapa está ativa

### Exercício 5
1. c) Integrar uma biblioteca como TinyMCE, CKEditor ou Quill
2. b) Usando guardas de navegação do Vue Router
3. b) Fazer upload para um serviço de armazenamento como AWS S3
