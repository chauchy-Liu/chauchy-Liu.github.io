---
typora-root-url: ./cmake
title: cmake
mathjax: true
date: 2022-11-15 13:43:56
categories:
- 编程语言
- c++
- cmake
tags:
- cmake
---

# CMake

## CMakeLists.txt

1. 指定语言版本
```cmake
set(CMAKE_CXX_STANDARD 11)
```
CMAKE_开头的变量都是CMAKE内置变量，CMAKE保留变量

2. 配置编译选项
```cmake
add_compile_options(-Wall -Wextra -pedantic -Werror)
#或者
set(CMAKE_CXX_FLAGS ""${CMAKE_CXX_FLAGS} -pipe -std=c++11"")
```

3. 配置编译类型
类型可设置为：Debug, Release, RelWithDebInfo, MinSizeRel。可以针对不同的编译类型设置不同的编译选项
```cmake
set(CMAKE_BUILD_TYPE Debug)
#-g开启调试信息 -o0不进行代码优化
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g -O0")
```
4. 全局宏定义
通过判断不同的宏定义在命令行cmake -DDEBUG=1 -DREAL_COOL_ENGINEER=0实现.cpp源代码中宏的流程控制
```cmake
add_definitions(-DDEBUG -DREAL_COOL_ENGINEER)
```
5. 添加include目录
```cmake
include_directories(src/include)
```