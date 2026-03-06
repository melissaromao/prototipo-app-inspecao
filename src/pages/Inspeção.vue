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

            <div class="flex justify-center">
                <div class="w-full max-w-sm md:max-w-md">
                    <h2 class="text-xl md:text-2xl font-bold mb-6 text-center">Nova Inspeção</h2>

                    <div v-if="alert" class="mb-2 p-3 bg-yellow-100 border border-yellow-400 text-amber-700 rounded-lg">
                        {{ alert }}
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <div class="flex flex-col gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2 text-left">Tipo de Inspeção</label>
                                <select v-model="inspection.type"
                                    class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none">
                                    <option value="">Selecione um tipo</option>
                                    <option value="seguranca">Segurança</option>
                                    <option value="limpeza">Limpeza</option>
                                    <option value="manutencao">Manutenção</option>
                                    <option value="acessibilidade">Acessibilidade</option>
                                    <option value="higiene">Higiene</option>
                                    <option value="infraestrutura">Infraestrutura</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-2 text-left">Estação CPTM</label>
                                <select v-model="inspection.station"
                                    class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none">
                                    <option value="">Selecione uma estação</option>
                                    <option value="luz">Luz</option>
                                    <option value="julio-prestes">Júlio Prestes</option>
                                    <option value="bom-retiro">Bom Retiro</option>
                                    <option value="brás">Brás</option>
                                    <option value="belém">Belém</option>
                                    <option value="tatuapé">Tatuapé</option>
                                    <option value="oratorio">Oratório</option>
                                    <option value="comendador-ermelino">Comendador Ermelino</option>
                                    <option value="itim">Itim</option>
                                    <option value="osasco">Osasco</option>
                                    <option value="villa-lobos">Villa-Lobos</option>
                                    <option value="lapa">Lapa</option>
                                    <option value="pompeia">Pompeia</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-2 text-left">Data</label>
                                <input v-model="inspection.date" type="date"
                                    class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-2 text-left">Responsável</label>
                                <input v-model="inspection.responsible"
                                    class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none"
                                    placeholder="Nome do inspetor" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-2 text-left">Nível de Prioridade</label>
                                <select v-model="inspection.priority"
                                    class="w-full text-base border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 focus:outline-none">
                                    <option value="">Selecione uma opção</option>
                                    <option value="critica">Crítica</option>
                                    <option value="alta">Alta</option>
                                    <option value="media">Média</option>
                                    <option value="baixa">Baixa</option>
                                </select>
                            </div>

                            <div class="flex gap-3 mt-2">
                                <button @click="saveInspection"
                                    class="flex-1 bg-emerald-600 text-white font-medium py-2 rounded-xl hover:bg-emerald-500 hover:cursor-pointer">Salvar</button>
                                <button @click="$router.back()"
                                    class="flex-1 bg-gray-300 text-gray-800 font-medium py-2 rounded-xl hover:bg-gray-400 hover:cursor-pointer">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nomeUsuario = ref('João Silva')
const localizacao = ref('São Paulo, SP')
const alert = ref('')
const inspection = ref({
    type: '',
    station: '',
    date: '',
    responsible: '',
    priority: ''
})

const goBack = () => {
    router.go(-1)
}

const logout = () => {
    router.push('/login')
}

const saveInspection = () => {
    if (inspection.value.type && inspection.value.station && inspection.value.date && inspection.value.responsible && inspection.value.priority) {
        alert.value = ''
        console.log('Inspeção salva:', inspection.value)
        router.push('/home')
    } else {
        alert.value = 'Preencha todos os campos'
    }
}
</script>