import httpInstance from "@/utils/http"

export function getCategoryAPI() {
    // 返回一个Promise对象
    return httpInstance({
      url: 'home/category/head'
    })
}