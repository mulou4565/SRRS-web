<script setup>
import Sticky from './components/Sticky.vue';
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// 触发 获取导航列表的action
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})

</script>

<template>
  <div>
    <Sticky />
    <Nav />
    <Header />
    LAYOUT
    <!--二级路由出口-->
    <RouterView />
    <Footer />
  </div>
</template>