# webpack简介

webpack是一种前端资源构建工具，一个静态模块打包器。

在webpack看来，前端的所有资源文件（js/json/css/img/less...）都会作为模块处理。

它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源。

## webpack五个核心概念

- entry

  入口指示webpack以哪个文件为入口起点开始打包，分析构建内部依赖图。

- output

  输出指示webpack打包后的资源bundles输出到哪里去，以及如何命名。

- loader

  loader让webpack能够去处理那些非js文件（webpack自身只理解js）

- plugins

  插件可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

- mode

  模式指示webpack使用相应模式的配置

  development	本地调试，开发环境

  production	优化上线，生产环境