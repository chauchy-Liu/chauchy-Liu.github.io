---
typora-root-url: ./c-知识汇总
title: c++知识汇总
mathjax: true
date: 2022-10-26 17:24:46
categories: 
- 编程语言
- c++
- 碎片化知识补丁
tags: 
- 博客
- c++
---

# 数据对齐

## 字节对齐
字节对齐是指变量存储首地址是其类型长度的整数倍，例如4字节对齐是存储首地址是4的整数倍0x0000,0x0004,0x0008,0x000C,0x0010等

## 字节对齐目的
提高cpu访问效率以及内存管理，在字节对齐时cpu只需读取一次可以将数据全部提取出来，若字节不对齐要读区数次

## 字节对齐实现方法
在c++定义语句中添加\__attribute__((aligned(n)))代码，添加位置可以在原定义语句之前或之后，$n=2^i$, 例如
```c++
//2字节对齐
typedef __attribute__((aligned(2))) struct A
{
	char a;
	char b;
	int c;
};
//char a占1字节，char b占1字节，int c占4字节且起始地址必须是4的整数倍所以char b和int c之间补2字节，整个结构体的尾后地址也必须是2字节对齐(即2的整数倍地址)
//1byte(a) + 1byte(b) + 2byte(变量间补) + 4byte(c) + 0byte(结构体补)
//4字节对齐
typedef __attribute__((aligned(4))) struct A
{
	char a;
	char b;
	int c;
};
//char a占1字节，char b占1字节，int c占4字节且起始地址必须是4的整数倍所以char b和int c之间补2字节，整个结构体的尾后地址也必须是4字节对齐(即4的整数倍地址)
//1byte(a) + 1byte(b) + 2byte(变量间补) + 4byte(c) + 0byte(结构体补)
```
## 小结
- 结构体中成员类型和数量相同的情况下，只改变位置占用空间可以得到优化，所以应从变量类型所占空间少的成员添加

- 当结构体成员变量类型长度大于结构体指定对齐数目n时，（例如2字节对齐时有int c成员变量），则按照成员变量类型长度对结构体进行最后对齐

- 1. 根据变量定义顺序和所占字节分配空间
  2. 当变量存储的起始地址不满足对齐方式(自身对齐方式)时要填补字节知直到满足对齐方式
  3. 所有变量分配空间完成后，整个结构体按照要求的对齐方式（ \__attribute__((aligned(n))) ）,默认对齐方式是结构体中最大数据类型所占的空间)判断是否再添补空间

![存储图](内存副本.jpg)
图中上边区域是4字节对齐，下边是4字节对齐，类型数量都一致但是顺序不同

# 类型转换
## reinterpret_cast
允许将任意指针转换成其他类型指针，允许任意整数类型和任意指针类型转化，转化时是逐比特位的复制操作，但后续cpu读取内存时会根据转化后的类型进行。
- reinterpret_cast不关心继承关系，不会在继承类间穿梭
```c++
class A
{
public:
	int a;
	void funA(){cout<<"A::funA"<<endl;}
};
class B
{
public:
	int b;
	void funB(){cout<<"B::funB"<<endl;}
};
class D: public A, public B
{
public:
	int d;
	void funD(){cout<<"D::funD"<<endl;}
};
B* pb;
D d;
pb = &d;
//pd1指向d对象中B类型部分的起始地址，即*pd1的地址和d的地址不一致
D* pd1 = reinterpret_cast<D*>(pb);
//pd2指向d对象中D类型部分的起始地址，即*pd2的地址和d的地址一致
D* pd2 = static_cast<D*>(pb);
```
- reinterpret_cast不会强制去掉const, 例如
```c++
//创建函数
void thump(char* p){*p = 'x';}
//命名函数指针类型
typedef void (*PF)(const char*);
//创建函数指针
PF pf;
//给函数指针赋值
pf = reinterpret_cast<PF>(&thump);
//pf = static_cast<PF>(&thump);错误：无法将void (*)(char*)函数值指针转换成void (*)(const char*)函数指针
const char* str = 'h';
pf(str);
```