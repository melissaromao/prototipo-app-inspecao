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

            <div class="text-center flex flex-col items-center justify-center p-4">
                <div class="w-full max-w-2xl">
                    <h2 class="text-xl md:text-2xl font-bold mb-2">Relatório de Inspeção</h2>
                    <p class="text-gray-600 mb-6">{{ inspection.station }} - {{ formatDate(inspection.date) }}</p>

                    <div v-if="alert" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-amber-700 rounded-lg">
                        {{ alert }}
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
                        <div class="flex flex-col gap-6">
                            <div>
                                <label class="block text-sm font-medium mb-3 text-left">Tipo de Inspeção</label>
                                <p class="text-gray-900 font-medium text-left">{{ inspection.type }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-3 text-left">Itens de Verificação</label>
                        <div class="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div v-for="(item, index) in checklistItems" :key="index" class="flex items-center">
                                <input 
                                    v-model="report.checklist[index]" 
                                    type="checkbox" 
                                    :id="`item-${index}`"
                                    class="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                >
                                <label :for="`item-${index}`" class="ml-3 text-gray-700 cursor-pointer">
                                    {{ item }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2 text-left">Observações</label>
                        <textarea 
                            v-model="report.observations"
                            rows="4"
                            class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none"
                            placeholder="Descreva detalhes adicionais da inspeção..."
                        ></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-3 text-left">Status da Inspeção</label>
                        <div class="space-y-2">
                            <div class="flex items-center">
                                <input 
                                    v-model="report.status" 
                                    type="radio" 
                                    value="concluida"
                                    id="status-concluida"
                                    class="w-4 h-4 text-emerald-600 cursor-pointer"
                                >
                                <label for="status-concluida" class="ml-3 text-gray-700 cursor-pointer">
                                    Concluída com Sucesso
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input 
                                    v-model="report.status" 
                                    type="radio" 
                                    value="problemas"
                                    id="status-problemas"
                                    class="w-4 h-4 text-orange-600 cursor-pointer"
                                >
                                <label for="status-problemas" class="ml-3 text-gray-700 cursor-pointer">
                                    Identificados Problemas
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input 
                                    v-model="report.status" 
                                    type="radio" 
                                    value="nao-concluida"
                                    id="status-nao-concluida"
                                    class="w-4 h-4 text-red-600 cursor-pointer"
                                >
                                <label for="status-nao-concluida" class="ml-3 text-gray-700 cursor-pointer">
                                    Não Concluída
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2 text-left">Responsável</label>
                        <input 
                            v-model="report.responsible"
                            type="text"
                            class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none"
                            placeholder="Nome do inspetor"
                        />
                    </div>

                    <div class="flex gap-3 mt-4">
                        <button @click="submitReport" class="flex-1 bg-emerald-600 text-white font-medium py-2 rounded-xl hover:bg-emerald-500 hover:cursor-pointer transition">
                            Enviar Relatório
                        </button>
                        <button @click="$router.back()" class="flex-1 bg-gray-300 text-gray-800 font-medium py-2 rounded-xl hover:bg-gray-400 hover:cursor-pointer transition">
                            Cancelar
                        </button>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const nomeUsuario = ref('João Silva')
const localizacao = ref('São Paulo, SP')

const goBack = () => {
    router.go(-1)
}

const logout = () => {
    router.push('/login')
}

const alert = ref('')

const checklistItems = [
    'Ambiente limpo e organizado',
    'Equipamentos funcionando corretamente',
    'Segurança adequada',
    'Acessibilidade em ordem',
    'Sinalização apropriada',
    'Sem danos estruturais visíveis'
]

const inspection = ref({
    id: 1,
    station: 'Estação Luz',
    type: 'Segurança',
    date: '2026-03-06',
    priority: 'critica',
    responsible: 'João Silva'
})

const report = ref({
    checklist: [false, false, false, false, false, false],
    observations: '',
    status: 'concluida',
    responsible: 'João Silva'
})

onMounted(() => {
    if (route.query.inspection) {
        try {
            inspection.value = JSON.parse(route.query.inspection)
        } catch (e) {
            console.error('Erro ao parse inspeção:', e)
        }
    }
})

const submitReport = () => {
    if (!report.value.status || !report.value.responsible) {
        alert.value = 'Preencha todos os campos obrigatórios'
        return
    }

    alert.value = ''
    console.log('Relatório enviado:', {
        inspection: inspection.value,
        report: report.value
    })
    
    router.push('/my-inspections')
}

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
}
</script>