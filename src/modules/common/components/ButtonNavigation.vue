<template>
    <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    
        <button
        :disabled="isFirstPage"
        @click="$router.push({query:{page:page-1}})"
        class="flex items-center space-x-1.5 px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 rounded-lg
        hover:bg-blue-600 transition.all">
        <ArrowLeft/>
        <span>Anterior</span>
        </button>
         <button
         :disabled="hasMoreData"
        @click="$router.push({query:{page:page+1}})"
        class="flex items-center space-x-1.5 px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 rounded-lg
        hover:bg-blue-600 transition.all">
        <span>Siguinte</span>
        <ArrowRight/>

        </button>

    </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/icons/ArrowLeft.vue';
import ArrowRight from '@/icons/ArrowRight.vue';

interface Props{
    page:number,
    isFirstPage:boolean,
    hasMoreData:boolean
}
defineProps<Props>();

</script>

<style scoped>

</style>