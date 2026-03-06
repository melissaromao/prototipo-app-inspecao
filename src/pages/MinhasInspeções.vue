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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div @click="navigateToScheduled" class="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition cursor-pointer">
                    <div class="flex items-center justify-center mb-4">
                        <div class="bg-yellow-100 rounded-full p-4">
                            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 text-center">Inspeções Agendadas</h2>
                    <p class="text-gray-600 text-center mt-2">{{ inspectionsScheduled.length }} inspecções agendadas</p>
                </div>

                <div @click="navigateToFinalized" class="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition cursor-pointer">
                    <div class="flex items-center justify-center mb-4">
                        <div class="bg-emerald-100 rounded-full p-4">
                            <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 text-center">Inspeções Finalizadas</h2>
                    <p class="text-gray-600 text-center mt-2">{{ inspectionsFinalized.length }} inspeções finalizadas</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const inspectionsScheduled = ref([
    { id: 1, station: 'Luz', type: 'Segurança', date: '2026-03-15' },
    { id: 2, station: 'Osasco', type: 'Limpeza', date: '2026-03-20' }
])

const inspectionsFinalized = ref([
    { id: 3, station: 'Brás', type: 'Manutenção', date: '2026-03-01' },
    { id: 4, station: 'Belém', type: 'Higiene', date: '2026-02-28' }
])

const navigateToScheduled = () => {
    router.push('/scheduled-inspections')
}

const navigateToFinalized = () => {
    router.push('/finalized-inspections')
}

const nomeUsuario = ref('João Silva')
const localizacao = ref('São Paulo, SP')

const goBack = () => {
    router.go(-1)
}

const logout = () => {
    router.push('/login')
}
</script>
