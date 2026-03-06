<template>
    <div class="min-h-screen bg-gray-50 p-4 md:p-6">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <img :src="logo" alt="CPTM Logo" class="w-16 h-16 mx-auto mb-2" />
                <h2 class="text-xl font-bold text-gray-700">CPTM</h2>
            </div>

            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                <div class="mb-4 md:mb-0">
                    <h1 class="text-2xl md:text-4xl font-bold text-gray-900">Bem-vindo, {{ nomeUsuario }}</h1>
                    <p class="text-gray-600 mt-2">{{ localizacao }}</p>
                </div>
                <div class="flex space-x-2 md:space-x-4">
                    <button @click="logout" class="bg-red-600 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-red-700 transition text-sm md:text-base">
                        Sair
                    </button>
                </div>
            </div>

            <div class="border-b-2 border-gray-300 mb-8"></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div @click="$router.push('/new-inspection')" class="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition cursor-pointer">
                    <div class="flex items-center justify-center mb-4">
                        <div class="bg-blue-100 rounded-full p-4">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 text-center">Nova Inspeção</h2>
                    <p class="text-gray-600 text-center mt-2">Iniciar uma nova inspeção</p>
                </div>

                <div @click="$router.push('/my-inspections')" class="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition cursor-pointer">
                    <div class="flex items-center justify-center mb-4">
                        <div class="bg-green-100 rounded-full p-4">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 text-center">Minhas Inspeções</h2>
                    <p class="text-gray-600 text-center mt-2">Ver histórico de inspeções</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/CPTM.png'

const router = useRouter()

const nomeUsuario = ref('João Silva')
const localizacao = ref('São Paulo, SP')

const goBack = () => {
    router.go(-1)
}

const logout = () => {
    router.push('/login')
}
</script>
