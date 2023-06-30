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

<img src="基类派生类.png" alt="基类派生类" style="zoom:33%;" />
派生类转化成基类百分百成功，基类转派生类会出问题（转化后派生类自己的方法和属性丢失）。

## static_cast
编译时转化，运行时不检查所以没有安全性
- 派生类(本身、指针、引用)->基类(本身、指针、引用)安全
- 基类->派生类不安全
- 非const类型->const类型，反之错误
- 其他类型指针->void*
- 基本数据类型之间相互转化

## dynamic_cast
运行时转化，派生类->基类转化与static_cast效果一致，基类->派生类有类型检查功能所以安全
- 派生类(本身、指针、引用)->基类指针(本身、指针、引用)
- 基类指针(本身、指针、引用)->派生类(本身、指针、引用)

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


# 运算符重载

## ->运算符
p->m被解释为(p.operator->())->m， p.perator->()函数的返回值必须是能够访问m成员的指针
{% hideToggle display,bg,color %}
{% endhideToggle %}
```c++
//实际类
class Obj
{
	//静态成员声明
	static int i, j;
public:
	void f() const {cout << i++ << endl;}
	void g() const {cout << j++ << endl;}
};
//静态成员定义和初始化,不用加static限定符
int Obj::i = 10;
int Obj::j = 12;
//容器类
class ObjContainer
{
	vector<Obj*> a;
public:
	void add(Obj* obj)
	{
		//装入容器
		a.push_back(obj)
	}
	//声明友元类
	friend class SmartPointer;
};
//智能指针，访问Obj类型成员，友元类定义处不用加friend限定符
class SmartPointer
{
	ObjContainer oc;
	int index;
public:
	SmartPointer(ObjContainer& objc)
	{
		oc = objc;
		index = 0;
	}
	//++前缀版
	bool operator++()
	{
		if (index >= oc.a.size()-1) return false;
		if (oc.a[++index] == 0) return false;
		return true;
	}
	//++后缀版本
	bool operator++(int) 
	{
		return operator++();
	}
	//重载运算符->
	Obj* operator->() const
	{
		if (!oc.a[index])
		{
			cout << "Zero value";
			//强制类型转化空地址
			return (Obj*)0;
		}
		return oc.a[index];
	}
};

int main()
{
	const int sz =10;
	Obj o[sz];
	ObjContainer oc;
	for (int i=0; i<sz; i++)
	{
		oc.add(&o[i]);
	}
	SmartPointer sp(oc);
	do
	{
		sp->f();//(sp.operator->())->f()
		sp->g();
	}
	while(sp++)
}

```

## new
$$\mathrm{new}\left\{\begin{aligned}
	&普通\mathrm{new}在堆上:\left\{\begin{aligned} 
			&\mathrm{Type}* \quad ptr = \mathrm{new} \quad \mathrm{Type}(初始值) \\
			&\mathrm{Type}* \quad ptr = \mathrm{new} \quad \mathrm{Type}[num]
  	\end{aligned}\right.\\
	&定位\mathrm{new}在指定位置:\left\{\begin{aligned} 			    				&\mathrm{Type}* \quad ptr = \mathrm{new}(起始地址)\quad \mathrm{Type}(初始值) \\
			&\mathrm{Type}* \quad ptr = \mathrm{new}(起始地址) \quad \mathrm{Type}[num]
		\end{aligned}\right.
\end{aligned}\right.$$

# 名称解析过程

C++中如果编译器遇到一个名称，它会寻找这个名称代表什么。例如x*y, 如果x和y是变量名称，那么表达式就是乘法；如果x是类型名称，那么表达式就是声明一个指针。所以必须知道**上下文**才能知道表达式意义

## 名称分类
- qualified name即作用域被显式指明的名称，例如::, ->, .， this->count
- dependent name即依赖于模版参数的名称，也就是访问运算法符::左面的表达式类型依赖于模版参数(模版参数未知), std::vector<T>::iterator

##  名称查找

- $$ordinary\; lookup常规查找\left\{\begin{align*} & qualified\; name & & 在指定的作用域内查找 \\ & 非qualified\; name & & 作用域由内到外依次查找 \end{align*}\right.$$
- argument-dependent\; lookup参数依赖查找，只查找**非qualified name**，除了由内到外查找还会将函数表达式中实参的associated namespace(关联名称空间)和associated class(关联类型)纳入到查找范围中，来查找函数名，注ADL查找会会略using

## 解析依赖型模版名称

编译时期有两个阶段：tokening（符号化）和parsing（解析化）。

模版解析六方面：
- 非模版中上下文相关性
- 依赖型类型名称
- 依赖型模版名称
- using declaration中的依赖型名称
- ADL和显式模版实参
- 依赖型表达式

通常而言， 编译器会把模板名称后面的<当做模板参数列表的开始，否则，<就是比较运算符。但是，当引用的模板名称是 Dependent Name 时，编译器不会假定它是一个模板名称，除非显示的使用 template 关键字来指明，模板代码中常见的->template、.template、::template就应用于这种场景中。

````c++
template<unsigned long N>
void printBitset (std::bitset<N> const& bs) 
{
    std::cout << bs.template to_string<char, std::char_traits<char>, std::allocator<char>>();
}
```
