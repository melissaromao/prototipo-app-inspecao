<template>
    <div class="text-center min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-xs">
            <div class="mb-8">
                <img :src="logo" alt="CPTM Logo" class="w-16 h-16 mx-auto mb-2" />
                <h2 class="text-xl font-bold text-gray-700">CPTM</h2>
            </div>

            <h1 class="text-2xl font-bold mb-6">Boas-vindas</h1>

            <div v-if="alert" class="mb-2 p-3 bg-yellow-100 border border-yellow-400 text-amber-700 rounded-lg">
                {{ alert }}
            </div>

            <div class="flex flex-col gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2 text-left">Login</label>
                    <input v-model="email"
                        class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2 text-left">Senha</label>
                    <input v-model="password" type="password"
                        class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none" />
                </div>
                <button @click="login"
                    class="w-full bg-emerald-600 text-white font-medium py-2 rounded-xl hover:bg-emerald-500 hover:cursor-pointer">Entrar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/cptm.png'

const router = useRouter()
const email = ref('')
const password = ref('')
const alert = ref('')

const login = () => {
    if (email.value && password.value) {
        router.push('/home')
    } else {
        alert.value = 'Preencha todos os campos'
    }
}
</script>
