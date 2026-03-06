<template>
    <div class="min-h-screen bg-gray-50 p-4 md:p-6">
        <div class="max-w-4xl mx-auto">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                <div class="mb-4 md:mb-0">
                    <h1 class="text-2xl md:text-4xl font-bold text-gray-900">Bem-vindo, {{ nomeUsuario }}</h1>
                    <p class="text-gray-600 mt-2">{{ localizacao }}</p>
                </div>
                <div class="flex space-x-2 md:space-x-4">
                    <button @click="goBack" class="bg-gray-600 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-gray-700 transition text-sm md:text-base">
                        Voltar
                    </button>
                    <button @click="logout" class="bg-red-600 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-red-700 transition text-sm md:text-base">
                        Sair
                    </button>
                </div>
            </div>

            <div class="border-b-2 border-gray-300 mb-8"></div>

            <div v-if="filteredInspections.length === 0" class="text-center py-12">
                <p class="text-gray-500 text-lg">Nenhuma inspeção agendada</p>
            </div>

            <div v-else class="space-y-4">
                <div 
                    v-for="inspection in filteredInspections" 
                    :key="inspection.id" 
                    @click="openInspectionReport(inspection)"
                    :class="[
                        'bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition',
                        isInspectionDay(inspection.date) ? 'cursor-pointer hover:bg-blue-50' : 'opacity-75 cursor-not-allowed'
                    ]"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="text-xl font-bold text-gray-900">{{ inspection.station }}</h3>
                                <span v-if="!isInspectionDay(inspection.date)" class="flex items-center gap-1 text-gray-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17 9V7a4 4 0 00-8 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" />
                                    </svg>
                                    Bloqueado
                                </span>
                                <span v-else class="flex items-center gap-1 text-green-600 font-semibold">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    Liberado
                                </span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p class="text-sm text-gray-500">Tipo de Inspeção</p>
                                    <p class="text-gray-900 font-medium">{{ inspection.type }}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Prioridade</p>
                                    <span :class="getPriorityClass(inspection.priority)" class="inline-block px-3 py-1 rounded-full text-sm font-semibold">
                                        {{ formatPriority(inspection.priority) }}
                                    </span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Data Agendada</p>
                                    <p class="text-gray-900 font-medium">{{ formatDate(inspection.date) }}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Responsável</p>
                                    <p class="text-gray-900 font-medium">{{ inspection.responsible }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nomeUsuario = ref('João Silva')
const localizacao = ref('São Paulo, SP')

const goBack = () => {
    router.go(-1)
}

const logout = () => {
    router.push('/login')
}

const inspections = ref([
    { 
        id: 1, 
        station: 'Estação Luz', 
        type: 'Segurança', 
        priority: 'critica',
        date: '2026-03-06',
        responsible: 'João Silva'
    },
    { 
        id: 2, 
        station: 'Estação Osasco', 
        type: 'Limpeza', 
        priority: 'alta',
        date: '2026-03-20',
        responsible: 'Maria Santos'
    },
    { 
        id: 3, 
        station: 'Estação Brás', 
        type: 'Manutenção', 
        priority: 'media',
        date: '2026-03-25',
        responsible: 'João Silva'
    },
    { 
        id: 4, 
        station: 'Estação Belém', 
        type: 'Higiene', 
        priority: 'baixa',
        date: '2026-03-30',
        responsible: 'João Silva'
    }
])

const filteredInspections = computed(() => {
    return inspections.value.filter(inspection => inspection.responsible === nomeUsuario.value)
})

const isInspectionDay = (date) => {
    const today = new Date().toISOString().split('T')[0]
    return date === today
}

const getPriorityClass = (priority) => {
    const classes = {
        'critica': 'bg-red-100 text-red-700',
        'alta': 'bg-orange-100 text-orange-700',
        'media': 'bg-yellow-100 text-yellow-700',
        'baixa': 'bg-blue-100 text-blue-700'
    }
    return classes[priority] || 'bg-gray-100 text-gray-700'
}

const formatPriority = (priority) => {
    const labels = {
        'critica': 'Crítica',
        'alta': 'Alta',
        'media': 'Média',
        'baixa': 'Baixa'
    }
    return labels[priority] || priority
}

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const openInspectionReport = (inspection) => {
    if (isInspectionDay(inspection.date)) {
        router.push({
            name: 'InspectionReport',
            params: { id: inspection.id },
            query: { inspection: JSON.stringify(inspection) }
        })
    }
}
</script>