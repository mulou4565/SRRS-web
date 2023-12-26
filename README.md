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

## 项目结构

- api API接口
- assets 静态资源
- components 组件
- composables 组合函数/通用函数
- directives 全局指令
- router 路由
- stores 数据
- styles 全局样式
- utils 工具函数

### 别名联想提示
在编写代码的过程中，一旦输入`@/`，VSCode会立刻联想出src下的所有子目录和文件，统一文件路径访问

在`jsconfig.json`中，配置@/`提示`：compilerOptions

在vite.config.js中，别名`@`路径的配置--->进行实际的路径转换
```
alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
}
```

## 组件
### 通用型ElementPlus
#### 主题风格
- 主题色
- 辅助色
  
如何定制：scss变量替换，准备定制样式.scss文件对elementplus样式进行覆盖。
> 存放位置：styles/element/index.scss



### 业务定制化组件