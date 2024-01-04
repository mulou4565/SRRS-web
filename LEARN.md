# vue-srrs

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# 项目结构

- api API接口
- assets 静态资源
- components 组件
- composables 组合函数/通用函数
- directives 全局指令
- router 路由
- stores 数据
- styles 全局样式
- utils 工具函数

## 别名联想提示
在编写代码的过程中，一旦输入`@/`，VSCode会立刻联想出src下的所有子目录和文件，统一文件路径访问

在`jsconfig.json`中，配置@/`提示`：compilerOptions

在vite.config.js中，别名`@`路径的配置--->进行实际的路径转换
```
alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
}
```

# 组件
## 通用型ElementPlus
### 主题风格
- 主题色
- 辅助色
  
如何定制：scss变量替换，准备定制样式.scss文件对elementplus样式进行覆盖。
> 存放位置：styles/element/index.scss

## 业务定制化组件

# 统一接口配置axios
基础配置
- 接口基地址
- 接口超时时间
- 请求拦截器
- 响应拦截器

## 项目路由设计
一级路由：页面整体切换
- 首页 path: #/
- 登录页 path: #/login
  
二级路由：在一级路由页的内部切换
- 分类页
- 默认Home页
  
# 静态资源
- 图片资源
- 样式资源：项目初始化进行样式重置，开源的normalize.css

## 自动导入scss文件
将一些组件共享的色值以scss变量的方式统一放到一个.scss文件下，自动导入后直接使用内部变量。

# 静态模板搭建
## Layout
- Nav区域
- Header区域
- 二级路由出口区域
- Footer区域
## Home
- Category
- Banner
- New
- Hot
- Product
## 一级分类
- 面包屑导航
- 轮播图banner
- 激活状态控制和分类
- 路由缓存
## 二级分类
- 面包屑导航
- 基础商品列表
- 列表筛选
- 列表无限加载
  > 基础思路
  > 1. 触底条件满足之后 page++，拉取下一页数据
  > 2. 新老数据做数组拼接
  > 3. 判断是否已经全部加载完毕，停止监听
- 定制路由滚动行为
## 详情页
- 面包屑导航
- 热榜
- 图片预览组件 Props适配
  - 小图切换大图显示
  - 放大镜-滑块跟随鼠标移动
  - 放大镜-大图效果展示
- SKU组件：产出当前用户选择的商品规格
  > 存货单位

> 熟悉一个三方组件
> props：当前组件接受什么数据
> emit：当前组件会产出什么数据

>封装复杂交互组件的通用思路
> - 功能拆解
> - 寻找核心实现思路
> - 寻找关键技术
> - 逐个实现，逐个验证，最后优化

>图片预览组件的封装逻辑
> - 1.小图切换大图显示 2.放大镜实现
> - 获取鼠标相对位移，操作滑块left/top
> - useMouseInElement
> - 验证优化

### SKU
选中和取消选中实现
> 基本思路：
> 1. 每一个规格按钮都拥有自己的选中状态数据-selected，true为选中，false为取消选中
> 2. 配合动态class，把选中状态selected作为判断条件，true让active类名显示，false让active类名不显示
> 3. 点击的是未选中，把同一个规格的其他取消选中，当前点击项选中；点击的是已选中，直接取消


根据路径字典设置组合状态
> 思路：
> 1. 根据当前选中规格，生成顺序规格数组 =>  ['黑色', undefined, undefined ]
> 2. 遍历每一个规格按钮
> 如何规格按钮已经选中，忽略判断
> 如果规格按钮未选中，拿着按钮的name值按顺序套入匹配数组对应的位置，最后过滤掉没有值的选项，通过-进行拼接成字符串key, 去路径字典中查找，没有找到则把当前规格按钮禁用

## 登录页
ElementPlus表单校验
- el-form：绑定表单对象和规则对象
- el-form-item：绑定使用的规则字段
- el-input：双向绑定表单数据
  
>设计思想：通过多个组件各自复杂某个小功能，再组成一个复杂的大功能

Pinia用户数据持久化
>pinia的存储是基于内存的，刷新就丢失

为了保持登录状态，需要配合持久化缓存进行存储----> pinia-plugin-persistedstate

请求拦截器携带token
> 基础思想：很多接口如果想要获取数据必须要带着有效的Token信息才可以，拦截器中做一次，用到axios实例的其他都可以拿到

## 购物车列表
单选功能
>注意事项：`v-model双向绑定指令`不方便进行命令式的操作（调用接口），所以可回退到一般模式，即`:model-value`和`@change`的配合使用

- :model-value：使用pinia中的数据
- @change：有所操作时修改pinia中对应的数据

```
<el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
```

#### 合并购物车业务

在用户登陆时，把**本地的购物车**数据和**服务端购物车**数据进行合并操作。

## 订单页
`tab切换类`需求
1. 点击时`记录`一个当前激活对象active
2. 通过动态类名:class控制激活样式类型active是否存在，判断条件为：激活对象id===当前项id

## 支付页

### 支付宝沙箱账号信息
| 账号 | [jfjbwb4477@sandbox.com](mailto:jfjbwb4477@sandbox.com) |
| --- | --- |
| 登录密码 | 111111 |
| 支付密码 | 111111 |

### 倒计时逻辑函数封装

定时器容易出现内存溢出，要及时清除

### 图片懒加载指令
场景：首页通常很长，用户不一定能访问到**页面靠下的图片**，这类图片提供懒加载优化手段可以做到**只有进入视口区域才发生图片请求**。
  
# Pinia
通过Pinia集中管理数据，再把数据分发给组件使用。**单次请求多组件中使用**。

