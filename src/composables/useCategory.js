import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import { onMounted, ref } from "vue"
import { getTopCategoryAPI } from "@/api/category"

// 获取分类数据
export function useCategory () {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => getCategory())

  // 目标:路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数 请求最新的分类数据
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}