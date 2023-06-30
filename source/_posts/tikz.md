---
typora-root-url: ./tikz
title: tikz
mathjax: true
date: 2022-12-13 20:28:18
categories:
- 作图
tags:
- tikz
- 卷积模块画图
---

# tikz知识

[tikz手册英文](https://tikz.dev/pgffor)

## foreach命令
使用格式
\foreach <variables> [<options>] in <list> <commands>

options可选参数讲解：
- var=<variable>可以替换位置参数<variables>,例如\foreach \x/\y in {0/red,1/green}替换为\foreach [var=\x,var=\y] in {0/red,1/green}
- evaluate=<variable> as <macro> using <formula>
	- evaluate=<variable>用于将列表项求值后输出到<variable>替代原样输出到<variable>，例如\foreach \x [evaluate=\x] in {2^0,2^...,2^3}{\$\x\$, }得到$1,2,4,8$而不是$2^0,2^1,2^2,2^3$
	- as <macro>将evaluate得到的值或者<formula>得到的值存到<macro>中而不是<variable>中，例如\foreach \x [evaluate=\x as \xeval] in {2^0,2^...,2^3}{\$\x=\xeval\$, }得到$2^0=1.0,2^1=2.0,2^2=4.0,2^3=8.0$
	- using <formula>求值时不用显式的将公式用到列表中每个项而将公式放到<formula>中，<formula>中必须包含至少一个<variable>，例如\foreach \x [evaluate=\x as \xeval using 2^\x] in {0,1,...,3}{\$\x=\xeval\$, }
- remember=<variable> as <macro> (initially <value>)将上一次迭代中的item值即上一次迭代存储到<variable>中的值在本次迭代中存储到<macro>中；如果变量被求值evaluate则求值结果保留在<macro>中，第一次迭代时<macro>是<value>, 例如\foreach \x [remember=\x as \lastx (initially A)] in {B,...,D}{\lastx\$\to\$\x, }结果是$A\to B,B\to C,C\to D$
- count=<macro> from <value>保持列表中项的次序，次序存在<macro>中，次序初始索引是<value>

## 使用风格
my style/.style={draw=red,fill=red!20}
定义一个style叫作my style，风格内容是描边red,填充red!20。/.style意思是键名my style不在这里使用，只是定义键名和值
## 键值参数化
\begin{tikzpicture}[outline/.style={draw=#1,thick,fill=#1!50}]
  \node [outline=red]  at (0,1) {red};
  \node [outline=blue] at (0,0) {blue};
\end{tikzpicture}
定义键名outline时使用#num，当使用outline时输入的实参参数值按次序替换#num形参。

