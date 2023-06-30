---
typora-root-url: ./slam
title: slam
mathjax: true
date: 2022-11-04 09:21:41
categories:
- 建图和定位
tags:
- slam14讲
---

# 后端

## 状态估计概率解释

视觉里程计只有短暂记忆，而我们希望整个运动轨迹在较长时间内都能保持最优的状态。用最新的知识更新较久远的状态。这是个状态估计问题。
$$
状态估计方式\left\{\begin{align*}
	&批量式(\mathrm{Batch}): 过去信息+当前信息+未来信息更新状态 \\
	&渐进式(\mathrm{Incremental}): 只由过去信息更新状态
\end{align*}\right.
$$
假设$t=0$到$t=N$时间内，有位姿$x_0$到$x_N$，并有路标$y_0$，...，$y_M$，运动方程和观测方程为
$$
\begin{equation}
\left\{\begin{aligned}
	&\vec{x}_k=f(\vec{x}_{k-1},\vec{u}_k)+\vec{w}_k \\
	&\vec{z}_{k,j}=h(\vec{y}_j,\vec{x}_k)+\vec{v}_{k,j}
\end{aligned}\right.\quad\quad k=1,\cdots,N,\quad j=1,\cdots,M.
\end{equation}
$$
特点：
- 运动方程数量小于甚至远小于观测方程
- 没有运动方程相当于通过一组时序图像来恢复运动和结构

方程中的位姿$\vec{x}$和路标$\vec{y}$受噪声影响，所以应该看成服从某种概率分布的随机变量，而不是一个数。

**状态估计中的观测量和状态量**：
$$
\left\{\begin{align*}
	&状态量：位姿\vec{x}，路标\vec{y} \\
	&观测量：运动输入数据\vec{u}，观测数据\vec{z}
\end{align*}\right.
$$

**重新定义状态量**：$\vec{x}_k\overset{def}{=}\{\vec{x}_k,\vec{y}_1,\cdots,\vec{y}_m\}$表示k时刻状态量$\vec{x}_k$由k时刻位姿$\vec{x}_k$及$m$个路标$\vec{y}_*$组成。

**重新定义观测数据**：$\vec{z}_k\overset{def}{=}\{\vec{z}_{k,1},\cdots,\vec{z}_{k,m}\}$表示k时刻对m个路标的观测数据

**新的运动和观测方程**
$$
\begin{equation}
\label{eq:kinemic_and_observation}
\left\{\begin{aligned}
	&\vec{x}_k=f(\vec{x}_{k-1},\vec{u}_k)+\vec{w}_k\\
	&\vec{z}_{k}=h(\vec{x}_k)+\vec{v}_{k}
\end{aligned}\right.\quad\quad k=1,\cdots,N.
\end{equation}
$$

$k$时刻状态量几率函数用$0$到$k$时刻的观测量来估计，即**后验分布**记为$P(\vec{x}_k|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k})$, 这里$\vec{u}_{1:k}=\{\vec{u}_1,\vec{u}_2,\cdots,\vec{u}_k\}$，$\vec{z}_{1:k}=\{\vec{z}_1,\vec{z}_2,\cdots,\vec{z}_k\}$，根据贝叶斯法则，将后验分布分解成**似然分布**和**先验分布**的乘积

$$
\begin{equation}
P(\vec{x}_k|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k})\propto P(\vec{z}_k|\vec{x}_k)P(\vec{x}_k|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})
\end{equation}
$$

**先验分布**是基于过去所有状态估计得来，简化只受到$\vec{x}_{k-1}$影响，联合分布$P(\vec{x}_k，\vec{x}_{k-1}|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})$对$\vec{x}_{k-1}$积分得到边缘分布$P(\vec{x}_k|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})$即**先验分布**，联合分布可以通过条件概率公式转化为$\vec{x}_{k-1}$的条件概率形式，即$P(\vec{x}_k|\vec{x}_{k-1},\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})P(\vec{x}_{k-1}|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})$，因此**先验分布**可以表示成：
$$
\begin{equation}\label{eq:xianyan}
P(\vec{x}_k|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})=\int P(\vec{x}_k|\vec{x}_{k-1},\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})P(\vec{x}_{k-1}|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})\,\mathrm{d}\vec{x}_{k-1}
\end{equation}
$$

先验分布的处理方式：

$$
\left\{\begin{align*}
&k时刻状态\vec{x}_k的分布只和k-1时刻的状态\vec{x}_{k-1}有关即马尔可夫假设&&: 扩展卡尔曼滤波(EKF) \\
&k时刻状态\vec{x}_k的分布与之前所有状态\vec{x}_{1:k}有关&&: 非线性优化
\end{align*}\right.
$$

## 线性系统和卡尔曼滤波（KF）

根据k时刻状态$\vec{x}_k$的分布只和k-1时刻的状态$\vec{x}_{k-1}$有关，所以可以去掉$\vec{x}_{0:k-2}$这些状态量，k时刻状态量$\vec{x}_k$和k时刻运动输入量$\vec{u}_k$以及观测量$\vec{z}_k$有关和其它时刻没关系，公式$\ref{eq:xianyan}$中右侧第一部分可简化为

$$
\begin{equation}
P(\vec{x}_k|\vec{x}_{k-1},\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})=P(\vec{x}_k|\vec{x}_{k-1},\vec{u}_k)
\end{equation}
$$

由于k-1时刻状态量$\vec{x}_k$还是按照和之前状态都有关的假设，公式$\ref{eq:xianyan}$中右侧第二部分可简化为

$$
\begin{equation}
\label{eq:k-1zhuang_tai_liang}
P(\vec{x}_{k-1}|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})=P(\vec{x}_{k-1}|\vec{x}_{0},\vec{u}_{1:k-1},\vec{z}_{1:k-1})
\end{equation}
$$

公式$\ref{eq:k-1zhuang_tai_liang}$就是k-1时刻的状态分布。

**线性高斯系统**

将公式$\ref{eq:kinemic_and_observation}$中的运动方程和观测方程按照线性函数的形式展开

$$
\begin{equation}
\left\{\begin{aligned}
	&\vec{x}_k=A_k\vec{x}_{k-1}+\vec{u}_k+\vec{w}_k \\
	&\vec{z}_{k}=C_k\vec{x}_k+\vec{v}_{k}
\end{aligned}\right.\quad\quad k=1,\cdots,N.
\end{equation}
$$

运动噪声和观测噪声都服从0均值正态分布：

$$
\begin{equation}
\vec{w}_k\sim N(0,R_{k})\quad\quad\quad \vec{v}_k\sim N(0,Q_{k})
\end{equation}
$$

**记号区分**：上帽子$\hat{\vec{x}}_k$表示后验，下帽子$\check{\vec{x}}_k$表示先验

**已知**k-1时刻的后验状态估计为$\hat{\vec{x}}_{k-1}$及其协方差$\hat{P}_{k-1}$，状态估计服从高斯分布，**求**k时刻的状态估计及其协方差

**运动方程**确定$\vec{x}_k$的**先验分布**（随机变量函数的分布函数），扰动传递规则
$$
\begin{equation}
P(\vec{x}_k|\vec{x}_0,\vec{u}_{1:k},\vec{z}_{1:k-1})=N(A_k\hat{\vec{x}}_{k-1}+\vec{u}_k,A_k\hat{P}_{k-1}A^T_k+R_{k})
\end{equation}
$$
**先验分布**得到k时刻状态估计，记为$\check{\vec{x}}=A_k\hat{\vec{x}}_{k-1}+\vec{u}_k$，$\check{P}_k=A_k\hat{P}_{k-1}A_k^T+R_k$

**观测方程**确定状态量的**似然函数**$P(\vec{z}_k|\vec{x}_k)=N(C_k\vec{x}_k, Q_k)$

**贝叶斯公式**确定状态量的**后验分布**
$$
\begin{equation}
N(\hat{\vec{x}}_k,\hat{P}_k)=\eta N(C_k\vec{x}_k,Q_k)\cdot N(\check{\vec{x}}_k,\check{P}_k)
\end{equation}
$$

归纳为：预测和更新两步
1. 预测
$$
\begin{equation}
\check{\vec{x}}_k=A_k\hat{\vec{x}}_{k-1}+\vec{u}_k,\quad\quad \check{P}_k=A_k\hat{P}_{k-1}A^T_k+R_k
\end{equation}
$$
2. 更新：
2.1.  先计算$K_k$，称为卡尔曼增益
$$
\begin{equation}
K=\check{P}_kC_k^T(C_k\check{P}_kC_k^T+Q_k)^{-1}
\end{equation}
$$
​      2.2. 计算后验分布的估计量
$$
\begin{equation}
\hat{\vec{x}}_k=\check{\vec{x}}_k+K_k(\vec{z}_k-C_k\check{\vec{x}}_k), \quad\quad \hat{P}_k=(I-K_kC_k)\check{P}_k
\end{equation}
$$


## 非线性系统和扩展卡尔曼滤波（EKF）

SLAM中的运动观测方程是非线性函数
$$
\left\{\begin{align*}
&高斯分布\xrightarrow{线性变换}高斯分布\\
&高斯分布\xrightarrow{非线性变换}非高斯分布
\end{align*}\right.
$$
解决方法：在状态量附近对**运动方程**和**观测方程**进行泰勒展开，保留一阶项，从而得到近似的线性部分，再按照线性系统进行推到。

**已知**k-1时刻的后验状态估计为$\hat{\vec{x}}_{k-1}$及其协方差$\hat{P}_{k-1}$，状态估计服从高斯分布，**求**k时刻的状态估计及其协方差，将**运动方程**和**观测方程**在$\hat{\vec{x}}_{k-1}$和$\hat{P}_k$处进行**线性化**。

对运动方程
$$
\begin{equation}
\vec{x}_k\approx f(\hat{\vec{x}}_{k-1},\vec{u}_k)+\left.\frac{\partial f}{\partial \vec{x}_{k-1}}\right|_{\hat{\vec{x}}_{k-1}}(\vec{x}_{k-1}-\hat{\vec{x}}_{k-1})+\vec{w}_k
\end{equation}
$$
记偏导数为
$$
\begin{equation}
F=\left.\frac{\partial f}{\partial \vec{x}_{k-1}}\right|_{\hat{\vec{x}}_{k-1}}
\end{equation}
$$
对观测方程
$$
\begin{equation}
\vec{z}_k\approx h(\check{\vec{x}}_{k})+\left.\frac{\partial h}{\partial \vec{x}_{k}}\right|_{\check{\vec{x}}_{k}}(\vec{x}_{k}-\check{\vec{x}}_{k-1})+\vec{v}_k
\end{equation}
$$
记偏导数为
$$
\begin{equation}
H=\left.\frac{\partial h}{\partial \vec{x}_{k}}\right|_{\check{\vec{x}}_{k}}
\end{equation}
$$

仿照线性变换部分计算先验、似然和后验分布，根据分布求状态量的估计值
归纳为：预测和更新两步
1. 预测
$$
\begin{equation}
\check{\vec{x}}_k=f(\hat{\vec{x}}_{k-1},\vec{u}_k),\quad\quad \check{P}_k=F\hat{P}_{k-1}F^T+R_k
\end{equation}
$$
2. 更新：
2.1.  先计算$K_k$，称为卡尔曼增益
$$
\begin{equation}
K_k=\check{P}_kH^T(H\check{P}_kH^T+Q_k)^{-1}
\end{equation}
$$
​      2.2. 计算后验分布的估计量
$$
\begin{equation}
\hat{\vec{x}}_k=\check{\vec{x}}_k+K_k(\vec{z}_k-h(\check{\vec{x}}_k)), \quad\quad \hat{P}_k=(I-K_kH)\check{P}_k
\end{equation}
$$


## 非线性优化：Bundle Adjustment（BA）

1. 世界坐标系下的点记作$$\vec{p}_w=[X_w,Y_w,Z_w]^T$$，
2. 相机坐标系下的点$$\vec{p}_c=[X_c,Y_c,Z_c]^T$$，
3. 归一化平面上的点$$\vec{p}_{c_n}=[u_c,v_c,1]^T=[X_c/Z_c,Y_c/Z_c,1]^T$$
4. 归一化坐标的畸变情况，还原畸变矫正前的原始投影坐标，只考虑径向畸变
$$
\begin{equation}
\left\{\begin{aligned}
&u_c^\prime =u_c(1+k_1r_c^2+k_2r_c^4)\\
&v_c^\prime =v_c(1+k_1r_c^2+k_2r_c^4)
\end{aligned}\right. \quad\quad r_c^2=u_c^2+v_c^2
\end{equation}
$$
5. 根据相机内参（焦距，像素平面的原点坐标）计算像素坐标
$$
\begin{equation}
\left\{\begin{aligned}
&u_s=f_xu_c^\prime+c_x\\
&v_s=f_yu_c^\prime+c_y
\end{aligned}\right.
\end{equation}
$$

在**i时刻**，$\vec{x_i}$指代相机**位姿**即$R_i，\vec{t_i}$，其对应的李群为$T_i$，李代数为$\vec{\xi}_i$。**j路标**$\vec{y}_j$即三维点$\vec{p}_j$，**观测数据**是像素坐标$\vec{z}_{i,j}\overset{def}{=}[u_{s_{i,j}},v_{s_{i,j}}]^T$。观测误差
$$
\begin{equation}
\vec{e_{i,j}}=\vec{z}_{i,j}-h(T_i,\vec{p}_j)
\end{equation}
$$
个时刻对所有路标观测的整体误差
$$
\begin{equation}
\frac{1}{2}\sum_{i=i}^{m}\sum_{j=1}^{n}||\vec{e}_{i,j}||^2=\frac{1}{2}\sum_{i=i}^{m}\sum_{j=1}^{n}||\vec{z}_{i,j}-h(T_i,\vec{p}_j)||^2
\end{equation}
$$


### 求解BA

BA目标函数的**自变量**定义成
$$
\begin{equation}
\vec{x}=[T_1,\cdots,T_m,\vec{p}_1,\cdots,\vec{p}_n]^T
\end{equation}
$$
给自变量一个增量$\Delta \vec{x}$
$$
\begin{align}\label{eq:BA:object_fun}
\frac{1}{2}||f(\vec{x}+\Delta\vec{x})||^2&\approx\frac{1}{2}\sum_{i=i}^{m}\sum_{j=1}^{n}||\vec{e_{i,j}}+F_{i,j}\Delta\vec{\xi}_{i}+E_{i,j}\Delta\vec{p}_j)||^2 \\
F_{i,j}&=\frac{\partial \vec{e}_{i,j}}{\partial \vec{\xi}_i}\\
E_{i,j}&=\frac{\partial \vec{e}_{i,j}}{\partial \vec{p}_j}
\end{align}
$$
将**位姿**变量放在一起，**路标**变量放在一起，记作：
$$
\begin{equation}
\vec{x}_c=[\vec{\xi}_1,\vec{\xi}_2,\cdots,\vec{\xi}_m]^T\in\mathbb{R}^{6m}
\end{equation}
$$
$$
\begin{equation}
\vec{x}_p=[\vec{p}_1,\vec{p}_2,\cdots,\vec{p}_n]^T\in\mathbb{R}^{3m}
\end{equation}
$$
公式$\ref{eq:BA:object_fun}$记作：
$$
\begin{equation}
\frac{1}{2}||f(\vec{x}+\Delta\vec{x})||^2\approx\frac{1}{2}\sum_{i=i}^{m}\sum_{j=1}^{n}||\vec{e}+F\Delta\vec{x}_{c}+E\Delta\vec{x}_p)||^2\quad这里的E和F是由若干小矩阵块E_{i,j}和F_{i,j}各自拼凑起来的
\end{equation}
$$
无论**高斯牛顿法**还是**列文伯格-马夸尔特方法**增量线性方程都是：
$$
\begin{equation}
H\Delta\vec{x}=\vec{g}
\end{equation}
$$
$$
区别: H\left\{\begin{align*}
&J^TJ & &高斯牛顿法\\
&J^TJ+\lambda I & &列文伯格-马夸尔特方法
\end{align*}\right.
$$
注：有些博客用$H=J^T\Omega J$,$\Omega$应该是正态分布协方差的逆矩阵$\Sigma^{-1}$，它是2x2矩阵，可以从$\vec{e}$是二维向量推出,已将自变量归类成位姿和空间点两种形式，雅可比矩阵亦分块成
$$
\begin{equation}
J=[F \quad E]
\end{equation}
$$

求高斯牛顿$H$，逆运算复杂度$O(n^3)$，但$H$是有稀疏矩阵结构
$$
\begin{equation}
H=J^TJ=\left[\begin{aligned}
&F^TF & &F^TE\\
&E^TF & &E^TE
\end{aligned}\right]
\end{equation}
$$


### 利用稀疏性和边缘化求解BA

雅可比矩阵的结构
$$
\begin{equation}
J_{i,j}(\vec{x})=\left(\vec{0}_{2\times6},\cdots,\vec{0}_{2\times6},\frac{\partial\vec{e}_{i,j}}{\partial T_i},\vec{0}_{2\times6},\cdots\left|\vec{0}_{2\times3},\cdots,\vec{0}_{2\times3},\frac{\partial\vec{e}_{i,j}}{\partial \vec{p}_j},\vec{0}_{2\times3},\cdots,\vec{0}_{2\times3}\right.\right)
\end{equation}
$$
![稀疏结构](image-20221107155224157.png)

***
举例：考虑一个场景内有2个相机位姿($C_1$,$C_2$)和6个路标点($P_1$,$P_2$,$P_3$,$P_4$,$P_5$,$P_6$)，相机在位姿$C_1$处观察到路标$P_1$,$P_2$,$P_3$,$P_4$，在位姿$C_2$处观察到路标$P_3$,$P_4$,$P_5$,$P_6$，如图![举例示例](image-20221107161443842.png)
该场景下的BA目标函数
$$
\begin{equation}
\frac{1}{2}\left(||\vec{e}_{11}||^2+||\vec{e}_{12}||^2+||\vec{e}_{13}||^2+||\vec{e}_{14}||^2+||\vec{e}_{23}||^2+||\vec{e}_{24}||^2+||\vec{e}_{25}||^2+||\vec{e}_{26}||^2\right)
\end{equation}
$$
$\vec{e}_{11}$描述了$C_1$看到$P_1$这件事，与其它位姿和路标无关，所以对它们求导为0，按照变量$\vec{x}=(\vec{\xi}_1,\vec{\xi}_2,\vec{p}_1,\cdots,\vec{p}_6)$，有
$$
\begin{equation}
J_{11}=\frac{\partial \vec{e}_{11}}{\partial \vec{x}}=\left(\frac{\vec{e}_{11}}{\partial\vec{\xi}_1},\vec{0}_{2\times6},\frac{\vec{e}_{11}}{\partial\vec{p}_1},\vec{0}_{2\times3},\vec{0}_{2\times3},\vec{0}_{2\times3},\vec{0}_{2\times3},\vec{0}_{2\times3}\right)
\end{equation}
$$
形状如图![分块雅可比矩阵稀疏结构](image-20221107162453662.png)
拼接$J_{ij}$可以得到整体雅可比矩阵和$H$矩阵如图![完整雅可比矩阵稀疏结构](image-20221107162722048.png)

***
**图优化结构和增量方程的稀疏性存在联系**：$H$矩阵中的非对角部分的非零矩阵块可以理解为其对应的位姿和路标变量之间存在联系也可称为约束，如图![增量矩阵和图优化结构的联系](image-20221107163948504.png)
当有m个相机位姿和n个路标点时，且路标数量远大于位姿数量，即$n\gg m$，$H$矩阵左上角区域会非常小，右下脚区域非常大，非对角部分分布散乱的约束块，形状如箭头

<center><img src="image-20221107164511662.png" alt="一般情况下H矩阵块" style="zoom: 33%;" /></center>

**Schur消元**即**Marginalization边缘化**加速计算稀疏矩阵$H$，$H$矩阵分成4块，分别为$B,E,E^T,C$如图。
<center><img src="image-20221107165342106.png" alt="H矩阵分块" style="zoom: 33%;"  /></center>
$$
\begin{equation}\label{eq:Joint_probability_distribution}
\left[\begin{aligned}
&B & &E\\
&E^T & &C
\end{aligned}\right]
\left[\begin{aligned}
&\Delta\vec{x}_c\\
&\Delta\vec{x}_p
\end{aligned}\right]
=
\left[\begin{aligned}
&\vec{v}\\
&\vec{w}
\end{aligned}\right]
\end{equation}
$$
其中$B$是对角块矩阵，每个对角块的维度和相机位姿的维度相同，对角块的个数和位姿的个数相同(李群：9维，李代数：6维)；同理$C$是对角块矩阵，每个对角块的维度和路标的维度(三维)相同，对角块的个数和路标个数相同， 公式$\ref{eq:Joint_probability_distribution}$可以理解成**联合概率分布**。

**边缘化**即消去路标变量对应的系数矩阵，使方程中只含有位姿变量和其系数矩阵
$$
\begin{equation}
\left[\begin{aligned}
&I & &-EC^{-1}\\
&[0]_{n\times m} & &I
\end{aligned}\right]
\left[\begin{aligned}
&B & &E\\
&E^T & &C
\end{aligned}\right]
\left[\begin{aligned}
&\Delta\vec{x}_c\\
&\Delta\vec{x}_p
\end{aligned}\right]
=
\left[\begin{aligned}
&I & &-EC^{-1}\\
&[0]_{n\times m} & &I
\end{aligned}\right]
\left[\begin{aligned}
&\vec{v}\\
&\vec{w}
\end{aligned}\right]
\end{equation}
$$

位姿部分的增量方程为
$$
\begin{equation}
\label{eq:marginalization}
\left[B-EC^{-1}\right]\Delta \vec{x}_c=\vec{v}-EC^{-1}\vec{w}
\end{equation}
$$
这可以理解成$\Delta\vec{x}_c$的**先验函数**，求解$\Delta\vec{x}_c$后再求解$\Delta\vec{x}_p$，求解$\Delta\vec{x}_p$的方程可以理解成**条件概率**（已知$\Delta\vec{x}_c$），利用对角块矩阵$C$的逆运算容易求解
$$
\begin{equation}
\Delta\vec{x}_p=C^{-1}(\vec{w}-E^T\Delta\vec{x}_c)
\end{equation}
$$

公式$\ref{eq:marginalization}$的系数矩阵$\left[B-EC^{-1}\right]\Delta \vec{x}_c$记作$S$，它的稀疏性是不规则的，如图
<center><img src="image-20221108112428467.png" alt="边缘化系数矩阵稀疏结构" style="zoom: 33%;" /></center>

如同$H$矩阵的**非对角块处的非零块**对应着**相机位姿**和**路标**的联系，$S$矩阵的**非对角块处的非零块**对应着**相机的两个位姿**之间存在着**共同观测的路标**也称**共视路标**

### 鲁棒核函数

目标函数采用最小化误差项的二范数平方和的方式，**存在的问题**是误匹配导致优化时对误匹配的误差进行了优化从而忽略了对正确匹配的误差的优化，这是由于误差很大时二范数增长太快。**解决方法**采用核函数，保证每个数据误差不会因为大得没边而掩盖其它数据误差。核函数的性质：1、增长不快，2、函数光滑（可导），例如Huber核函数：
$$
\begin{equation}
H(e)=\left\{\begin{aligned}
&\frac{1}{2}e^2 & &当|e|\le\delta,\\
&\delta(|e|-\frac{1}{2}\delta) & &其它
\end{aligned}\right.
\end{equation}
$$
<img src="image-20221108141628283.png" alt="huber核函数" style="zoom:33%;" />

