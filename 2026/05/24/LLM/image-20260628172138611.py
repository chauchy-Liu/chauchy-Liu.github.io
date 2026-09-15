#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
混合智能体（Hybrid Agent）- 财富管理投顾AI助手

基于LangGraph实现的混合型智能体，结合反应式架构的即时响应能力和深思熟虑架构的长期规划能力，
通过协调层动态切换处理模式，提供智能化财富管理咨询服务。

三层架构：
1. 底层（反应式）：即时响应客户查询，提供快速反馈
2. 中层（协调）：评估任务类型和优先级，动态选择处理模式
3. 顶层（深思熟虑）：进行复杂的投资分析和长期财务规划

LangSmith 集成：
本智能体已集成 LangSmith 用于调试、追踪和监控。要启用 LangSmith：

1. 获取 API 密钥：
   - 访问 https://smith.langchain.com
   - 注册账号并获取 API 密钥

2. 设置环境变量（Windows PowerShell）：
   $env:LANGSMITH_API_KEY="your-api-key-here"
   $env:LANGCHAIN_TRACING_V2="true"
   $env:LANGCHAIN_PROJECT="wealth-advisor-hybrid-agent"  # 可选，用于组织追踪记录

启用后，所有 LLM 调用和 Agent 执行流程都会自动记录到 LangSmith，
可以在 https://smith.langchain.com 查看详细的执行追踪、性能指标和调试信息。
"""

import os
import json
import re
from datetime import datetime
from typing import Dict, List, Any, Literal, TypedDict, Optional

# 修复 langchain 1.1.x 版本兼容性问题：在导入 langchain_core 之前设置必要的属性
import langchain
if not hasattr(langchain, 'verbose'):
    langchain.verbose = False
if not hasattr(langchain, 'debug'):
    langchain.debug = False
if not hasattr(langchain, 'llm_cache'):
    langchain.llm_cache = None

from langchain_core.prompts import ChatPromptTemplate
from langchain_community.llms import Tongyi
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.runnables import RunnableConfig
from pydantic import BaseModel, Field
from langgraph.graph import StateGraph, END
import warnings
warnings.filterwarnings("ignore")

# 设置API密钥
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY")

# ==================== LangSmith 配置 ====================
# LangSmith 用于 Agent 调试、追踪和监控
# 使用前需要设置以下环境变量：
# 1. LANGSMITH_API_KEY: 从 https://smith.langchain.com 获取
# 2. LANGCHAIN_TRACING_V2: 设置为 "true" 启用追踪
# 3. LANGCHAIN_PROJECT: 项目名称（可选，用于组织追踪记录）
# 4. LANGCHAIN_ENDPOINT: LangSmith API端点（可选，默认使用官方端点）

# 检查是否启用 LangSmith
LANGSMITH_ENABLED = os.getenv("LANGCHAIN_TRACING_V2", "").lower() == "true"
LANGSMITH_PROJECT = os.getenv("LANGCHAIN_PROJECT", "wealth-advisor-hybrid-agent")
print("LANGSMITH_ENABLED=", LANGSMITH_ENABLED)

# 创建LLM实例
llm = Tongyi(model_name="qwen-turbo-latest", dashscope_api_key=DASHSCOPE_API_KEY)

# 定义客户信息数据结构
class CustomerProfile(BaseModel):
    """客户画像信息"""
    customer_id: str = Field(..., description="客户ID")
    risk_tolerance: Literal["保守型", "稳健型", "平衡型", "成长型", "进取型"] = Field(..., description="风险承受能力")
    investment_horizon: Literal["短期", "中期", "长期"] = Field(..., description="投资期限")
    financial_goals: List[str] = Field(..., description="财务目标")
    investment_preferences: List[str] = Field(..., description="投资偏好")
    portfolio_value: float = Field(..., description="投资组合总价值")
    current_allocations: Dict[str, float] = Field(..., description="当前资产配置")

# 定义应急响应输出
class EmergencyResponseOutput(BaseModel):
    """紧急查询的即时响应"""
    response_type: str = Field(..., description="响应类型")
    direct_answer: str = Field(..., description="直接回答")
    data_points: Optional[Dict[str, Any]] = Field(None, description="相关数据点")
    suggested_actions: Optional[List[str]] = Field(None, description="建议操作")

# 定义深度分析输出
class InvestmentAnalysisOutput(BaseModel):
    """深度投资分析结果"""
    market_assessment: str = Field(..., description="市场评估")
    portfolio_analysis: Dict[str, Any] = Field(..., description="投资组合分析")
    recommendations: List[Dict[str, Any]] = Field(..., description="投资建议")
    risk_analysis: Dict[str, Any] = Field(..., description="风险分析")
    expected_outcomes: Dict[str, Any] = Field(..., description="预期结果")
    
# 定义状态类型
class WealthAdvisorState(TypedDict):
    """财富顾问智能体的状态"""
    # 输入
    user_query: str  # 用户查询
    customer_profile: Optional[Dict[str, Any]]  # 客户画像
    
    # 处理状态
    query_type: Optional[Literal["emergency", "informational", "analytical"]]  # 查询类型
    processing_mode: Optional[Literal["reactive", "deliberative"]]  # 处理模式
    emergency_response: Optional[Dict[str, Any]]  # 紧急响应结果
    market_data: Optional[Dict[str, Any]]  # 市场数据
    analysis_results: Optional[Dict[str, Any]]  # 分析结果
    
    # 输出
    final_response: Optional[str]  # 最终响应
    
    # 控制流
    current_phase: Optional[str]
    error: Optional[str]  # 错误信息

# 提示模板
ASSESSMENT_PROMPT = """你是一个财富管理投顾AI助手的协调层。请评估以下用户查询，确定其类型和应该采用的处理模式。

用户查询: {user_query}

请判断:
1. 查询类型: 
   - "emergency": 紧急的或直接的查询，需要立即响应（如市场状况、账户信息、产品信息等）
   - "informational": 信息性的查询，需要特定领域知识（如税务政策、投资工具介绍等）
   - "analytical": 需要深度分析的查询（如投资组合优化、长期理财规划等）

2. 建议的处理模式:
   - "reactive": 适用于需要快速反应的查询
   - "deliberative": 适用于需要深度思考和分析的查询

请以JSON格式返回结果，包含以下字段:
- query_type: 查询类型（上述三种类型之一）
- processing_mode: 处理模式（上述两种模式之一）
- reasoning: 决策理由的简要说明
"""

REACTIVE_PROMPT = """你是一个财富管理投顾AI助手，专注于提供快速准确的响应。请针对用户的查询提供直接的回答。

用户查询: {user_query}

客户信息:
{customer_profile}

请提供:
1. 直接回答用户问题
2. 相关的关键数据点（如适用）
3. 建议的后续操作（如适用）

以JSON格式返回响应，包含以下字段:
- response_type: 响应类型
- direct_answer: 直接回答
- data_points: 相关数据点（可选）
- suggested_actions: 建议操作（可选）
"""

DATA_COLLECTION_PROMPT = """你是一个财富管理投顾AI助手的数据收集模块。基于以下用户查询，确定需要收集哪些市场和财务数据进行深入分析。

用户查询: {user_query}

客户信息:
{customer_profile}

请确定需要收集的数据类型，例如:
- 资产类别表现数据
- 经济指标
- 行业趋势
- 历史回报率
- 风险指标
- 税收信息
- 其他相关数据

以JSON格式返回结果，包含以下字段:
- required_data_types: 需要收集的数据类型列表
- data_sources: 建议的数据来源列表
- collected_data: 模拟收集的数据（为简化示例，请生成合理的模拟数据）
"""

ANALYSIS_PROMPT = """你是一个财富管理投顾AI助手的分析引擎。请根据收集的数据对用户的投资情况进行深入分析。

用户查询: {user_query}

客户信息:
{customer_profile}

市场数据:
{market_data}

请提供全面的投资分析，包括:
1. 当前市场状况评估
2. 客户投资组合分析
3. 个性化投资建议
4. 风险评估
5. 预期结果和回报预测

以JSON格式返回分析结果，包含以下字段:
- market_assessment: 市场评估
- portfolio_analysis: 投资组合分析
- recommendations: 投资建议列表
- risk_analysis: 风险分析
- expected_outcomes: 预期结果
"""

RECOMMENDATION_PROMPT = """你是一个财富管理投顾AI助手。请根据深入分析结果，为客户准备最终的咨询建议。

用户查询: {user_query}

客户信息:
{customer_profile}

分析结果:
{analysis_results}

请提供专业、个性化且详细的投资建议，语言应友好易懂，避免过多专业术语。建议应包括:
1. 总体投资策略
2. 具体行动步骤
3. 资产配置建议
4. 风险管理策略
5. 时间框架
6. 预期收益
7. 后续跟进计划

返回格式应为自然语言文本，适合直接呈现给客户。
"""

def query_shanghai_index(_: str = "") -> str:
    """上证指数实时查询工具（模拟版），返回固定的行情数据"""
    # 直接返回模拟数据，避免外部API不可用导致报错
    name = "上证指数"
    price = "3125.62"
    change = "6.32"
    pct = "0.20"
    result = f"{name} 当前点位: {price}，涨跌: {change}，涨跌幅: {pct}%"
    print('result=', result)
    return result

# 第一阶段：情境评估 - 确定查询类型和处理模式
def assess_query(state: WealthAdvisorState) -> WealthAdvisorState:
    print("[DEBUG] 进入节点: assess_query")
    """评估用户查询，确定类型和处理模式"""
    
    try:
        # 准备提示
        prompt = ChatPromptTemplate.from_template(ASSESSMENT_PROMPT)
        
        # 构建输入
        input_data = {
            "user_query": state["user_query"],
        }
        
        # 调用LLM
        chain = prompt | llm | JsonOutputParser()
        result = chain.invoke(input_data)
        print("[DEBUG] LLM评估输出:", result)
        print(f"[DEBUG] 分支判断: processing_mode={result.get('processing_mode', '未知')}, query_type={result.get('query_type', '未知')}")
        # 获取处理模式，确保有值
        processing_mode = result.get("processing_mode", "reactive")
        if processing_mode not in ["reactive", "deliberative"]:
            processing_mode = "reactive"  # 默认使用反应式处理
        # 获取查询类型，确保有值
        query_type = result.get("query_type", "emergency")
        if query_type not in ["emergency", "informational", "analytical"]:
            query_type = "emergency"  # 默认为紧急查询
        # ==========================
        # 更新状态
        updated_state = {
            **state,
            "query_type": query_type,
            "processing_mode": processing_mode,
        }
        return updated_state
    except Exception as e:
        return {
            **state,
            "error": f"评估阶段出错: {str(e)}",
            "final_response": "评估查询时发生错误，无法处理您的请求。"
        }

# 反应式处理 - 快速响应简单查询
def reactive_processing(state: WealthAdvisorState) -> WealthAdvisorState:
    print("[DEBUG] 进入节点: reactive_processing")
    """反应式处理模式，提供快速响应，支持工具调用"""
    try:
        # 定义可用工具
        tools_map = {
            "上证指数查询": query_shanghai_index,
        }

        # 构建提示模板
        REACTIVE_AGENT_PROMPT = """你是一个财富管理投顾AI助手，请根据用户的问题回答。

你可以使用以下工具：
- 上证指数查询: 用于查询上证指数的最新行情

如果用户询问上证指数相关信息，请在回答中包含 [CALL_TOOL:上证指数查询] 标记。
如果不需要使用工具，直接回答用户问题即可。

用户问题: {input}

请提供专业、简洁、准确的回答。
"""

        user_query = state["user_query"]

        # 第一轮：让LLM决定是否需要工具
        prompt = ChatPromptTemplate.from_template(REACTIVE_AGENT_PROMPT)
        chain = prompt | llm | StrOutputParser()
        first_response = chain.invoke({"input": user_query})

        # 检查是否需要调用工具
        if "[CALL_TOOL:上证指数查询]" in first_response:
            # 调用工具获取数据
            tool_result = query_shanghai_index("")

            # 构建最终回答的提示
            FINAL_PROMPT = """你是一个财富管理投顾AI助手。

用户问题: {input}
工具返回数据: {tool_result}

请根据工具返回的数据，为用户提供专业、简洁的回答。
"""
            final_prompt = ChatPromptTemplate.from_template(FINAL_PROMPT)
            final_chain = final_prompt | llm | StrOutputParser()
            final_response = final_chain.invoke({"input": user_query, "tool_result": tool_result})
        else:
            final_response = first_response.replace("[CALL_TOOL:上证指数查询]", "").strip()

        return {
            **state,
            "final_response": final_response
        }
    except Exception as e:
        return {
            **state,
            "error": f"反应式处理出错: {str(e)}",
            "final_response": "处理您的查询时发生错误，无法提供响应。"
        }

# 数据收集 - 收集进行深度分析所需的数据
def collect_data(state: WealthAdvisorState) -> WealthAdvisorState:
    print("[DEBUG] 进入节点: collect_data")
    """收集市场数据和客户信息进行深入分析"""
    
    try:
        # 准备提示
        prompt = ChatPromptTemplate.from_template(DATA_COLLECTION_PROMPT)
        
        # 构建输入
        input_data = {
            "user_query": state["user_query"],
            "customer_profile": json.dumps(state.get("customer_profile", {}), ensure_ascii=False, indent=2)
        }
        
        # 调用LLM
        chain = prompt | llm | JsonOutputParser()
        result = chain.invoke(input_data)
        
        # 更新状态
        return {
            **state,
            "market_data": result.get("collected_data", {}),
            "current_phase": "analyze"
        }
    except Exception as e:
        return {
            **state,
            "error": f"数据收集阶段出错: {str(e)}",
            "current_phase": "collect_data"  # 保持在当前阶段
        }

# 深度分析 - 分析数据和客户情况
def analyze_data(state: WealthAdvisorState) -> WealthAdvisorState:
    print("[DEBUG] 进入节点: analyze_data")
    """进行深度投资分析"""
    
    try:
        # 确保必要数据已收集
        if not state.get("market_data"):
            return {
                **state,
                "error": "分析阶段缺少市场数据",
                "current_phase": "collect_data"  # 回到数据收集阶段
            }
        
        # 准备提示
        prompt = ChatPromptTemplate.from_template(ANALYSIS_PROMPT)
        
        # 构建输入
        input_data = {
            "user_query": state["user_query"],
            "customer_profile": json.dumps(state.get("customer_profile", {}), ensure_ascii=False, indent=2),
            "market_data": json.dumps(state.get("market_data", {}), ensure_ascii=False, indent=2)
        }
        
        # 调用LLM
        chain = prompt | llm | JsonOutputParser()
        result = chain.invoke(input_data)
        
        # 更新状态
        return {
            **state,
            "analysis_results": result,
            "current_phase": "recommend"
        }
    except Exception as e:
        return {
            **state,
            "error": f"分析阶段出错: {str(e)}",
            "current_phase": "analyze"  # 保持在当前阶段
        }

# 生成建议 - 根据分析结果提供投资建议
def generate_recommendations(state: WealthAdvisorState) -> WealthAdvisorState:
    print("[DEBUG] 进入节点: generate_recommendations")
    """生成投资建议和行动计划"""
    
    try:
        # 确保分析结果已存在
        if not state.get("analysis_results"):
            return {
                **state,
                "error": "建议生成阶段缺少分析结果",
                "current_phase": "analyze"  # 回到分析阶段
            }
        
        # 准备提示
        prompt = ChatPromptTemplate.from_template(RECOMMENDATION_PROMPT)
        
        # 构建输入
        input_data = {
            "user_query": state["user_query"],
            "customer_profile": json.dumps(state.get("customer_profile", {}), ensure_ascii=False, indent=2),
            "analysis_results": json.dumps(state.get("analysis_results", {}), ensure_ascii=False, indent=2)
        }
        
        # 调用LLM
        chain = prompt | llm | StrOutputParser()
        result = chain.invoke(input_data)
        
        # 更新状态
        return {
            **state,
            "final_response": result,
            "current_phase": "respond"
        }
    except Exception as e:
        return {
            **state,
            "error": f"建议生成阶段出错: {str(e)}",
            "current_phase": "recommend"  # 保持在当前阶段
        }

# 创建智能体工作流
def create_wealth_advisor_workflow() -> StateGraph:
    """创建财富顾问混合智能体工作流"""
    
    # 创建状态图
    workflow = StateGraph(WealthAdvisorState)
    
    # 添加节点，每个节点都确保返回完整的状态
    workflow.add_node("assess", assess_query)
    workflow.add_node("reactive", reactive_processing)
    workflow.add_node("collect_data", collect_data)
    workflow.add_node("analyze", analyze_data)
    workflow.add_node("recommend", generate_recommendations)
    
    # 定义一个显式的响应节点函数
    def respond_function(state: WealthAdvisorState) -> WealthAdvisorState:
        """最终响应生成节点，原样返回状态"""
        # 确保final_response字段有值
        if not state.get("final_response"):
            state = {
                **state,
                "final_response": "无法生成响应。请检查处理流程。",
                "error": state.get("error", "未知错误")
            }
        return state
    
    workflow.add_node("respond", respond_function)
    
    # 设置入口点
    workflow.set_entry_point("assess")
    
    # 添加分支路由
    workflow.add_conditional_edges(
        "assess",
        lambda x: "reactive" if x.get("processing_mode") == "reactive" else "collect_data",
        {
            "reactive": "reactive",
            "collect_data": "collect_data"
        }
    )
    
    # 添加固定路径边
    workflow.add_edge("reactive", "respond")
    workflow.add_edge("collect_data", "analyze")
    workflow.add_edge("analyze", "recommend")
    workflow.add_edge("recommend", "respond")
    workflow.add_edge("respond", END)
    
    # 编译工作流
    return workflow.compile()

# 示例客户画像数据
SAMPLE_CUSTOMER_PROFILES = {
    "customer1": {
        "customer_id": "C10012345",
        "risk_tolerance": "平衡型",
        "investment_horizon": "中期",
        "financial_goals": ["退休规划", "子女教育金"],
        "investment_preferences": ["ESG投资", "科技行业"],
        "portfolio_value": 1500000.0,
        "current_allocations": {
            "股票": 0.40,
            "债券": 0.30,
            "现金": 0.10,
            "另类投资": 0.20
        }
    },
    "customer2": {
        "customer_id": "C10067890",
        "risk_tolerance": "进取型",
        "investment_horizon": "长期",
        "financial_goals": ["财富增长", "资产配置多元化"],
        "investment_preferences": ["新兴市场", "高成长行业"],
        "portfolio_value": 3000000.0,
        "current_allocations": {
            "股票": 0.65,
            "债券": 0.15,
            "现金": 0.05,
            "另类投资": 0.15
        }
    }
}

# 运行智能体
def run_wealth_advisor(user_query: str, customer_id: str = "customer1") -> Dict[str, Any]:
    """运行财富顾问智能体并返回结果"""
    
    # 创建工作流
    agent = create_wealth_advisor_workflow()
    
    # 获取客户画像
    customer_profile = SAMPLE_CUSTOMER_PROFILES.get(customer_id, SAMPLE_CUSTOMER_PROFILES["customer1"])
    
    # 准备初始状态
    initial_state = {
        "user_query": user_query,
        "customer_profile": customer_profile,
        "query_type": None,
        "processing_mode": None,
        "emergency_response": None,
        "market_data": None,
        "analysis_results": None,
        "final_response": None,
        "current_phase": "assess",
        "error": None
    }
    
    try:
        print("LangGraph Mermaid流程图：")
        print(agent.get_graph().draw_mermaid())

        # 准备 LangSmith 配置（如果启用）
        config = {}
        if LANGSMITH_ENABLED:
            # 添加 LangSmith 配置：标签和元数据
            config = RunnableConfig(
                tags=[
                    "wealth-advisor",
                    "hybrid-agent",
                    f"customer-{customer_id}",
                    customer_profile.get("risk_tolerance", "unknown")
                ],
                metadata={
                    "customer_id": customer_id,
                    "risk_tolerance": customer_profile.get("risk_tolerance", "unknown"),
                    "investment_horizon": customer_profile.get("investment_horizon", "unknown"),
                    "portfolio_value": customer_profile.get("portfolio_value", 0),
                    "user_query": user_query[:100],  # 只记录前100个字符
                    "timestamp": datetime.now().isoformat()
                },
                run_name=f"wealth-advisor-{customer_id}-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
            )

        # 运行智能体并捕获可能的异常
        if config:
            result = agent.invoke(initial_state, config=config)
        else:
            result = agent.invoke(initial_state)
        return result
    except Exception as e:
        error_msg = str(e)
        print(f"捕获异常: {error_msg}")
        # 返回带有错误信息的状态
        return {
            **initial_state,
            "error": f"执行过程中发生错误: {error_msg}",
            "final_response": "很抱歉，处理您的请求时出现了问题。"
        }

# 主函数
if __name__ == "__main__":
    print("=== 混合智能体 - 财富管理投顾AI助手 ===\n")
    print("使用模型：Qwen-Turbo-Latest\n")
    
    # 显示 LangSmith 状态
    if LANGSMITH_ENABLED:
        print(f"✓ LangSmith 追踪已启用")
        print(f"  项目: {LANGSMITH_PROJECT}")
        print(f"  查看追踪: https://smith.langchain.com\n")
    else:
        print("ℹ LangSmith 追踪未启用")
        print("  要启用追踪，请设置环境变量:")
        print("  - LANGSMITH_API_KEY: 您的 API 密钥")
        print("  - LANGCHAIN_TRACING_V2: true")
        print("  - LANGCHAIN_PROJECT: 项目名称（可选）\n")
    
    print("-"*50 + "\n")
    
    # 示例查询
    SAMPLE_QUERIES = [
        # 紧急/简单查询 - 适合反应式处理
        "今天上证指数的表现如何？",
        "我的投资组合中科技股占比是多少？",
        "请解释一下什么是ETF？",
        
        # 分析性查询 - 适合深思熟虑处理
        "根据当前市场情况，我应该如何调整投资组合以应对可能的经济衰退？",
        "考虑到我的退休目标，请评估我当前的投资策略并提供优化建议。",
        "我想为子女准备教育金，请帮我设计一个10年期的投资计划。"
    ]
    
    # 用户选择查询示例或输入自定义查询
    print("请选择一个示例查询或输入您自己的查询:\n")
    for i, query in enumerate(SAMPLE_QUERIES, 1):
        print(f"{i}. {query}")
    print("0. 输入自定义查询")
    
    choice = input("\n请输入选项数字(0-6): ")
    
    if choice == "0":
        user_query = input("请输入您的查询: ")
    else:
        try:
            idx = int(choice) - 1
            if 0 <= idx < len(SAMPLE_QUERIES):
                user_query = SAMPLE_QUERIES[idx]
            else:
                print("无效选择，使用默认查询")
                user_query = SAMPLE_QUERIES[0]
        except ValueError:
            print("无效输入，使用默认查询")
            user_query = SAMPLE_QUERIES[0]
    
    # 选择客户
    customer_id = "customer1"  # 默认客户
    customer_choice = input("\n选择客户 (1: 平衡型投资者, 2: 进取型投资者): ")
    if customer_choice == "2":
        customer_id = "customer2"
    
    print(f"\n用户查询: {user_query}")
    print(f"选择客户: {SAMPLE_CUSTOMER_PROFILES[customer_id]['risk_tolerance']} 投资者")
    print("\n正在处理...\n")
    
    try:
        # 运行智能体
        start_time = datetime.now()
        result = run_wealth_advisor(user_query, customer_id)
        end_time = datetime.now()
        
        # 如果有错误，显示错误信息并退出
        if result.get("error"):
            print(f"处理过程中发生错误: {result['error']}")
            print(f"\n最终响应: {result.get('final_response', '未能生成响应')}")
            process_time = (end_time - start_time).total_seconds()
            print(f"\n处理用时: {process_time:.2f}秒")
            exit(1)
        
        # 显示处理模式
        process_mode = result.get("processing_mode", "未知")
        if process_mode == "reactive":
            print("【处理模式: 反应式】- 快速响应简单查询")
        else:
            print("【处理模式: 深思熟虑】- 深度分析复杂查询")
        
        # 显示结果
        print("\n=== 响应结果 ===\n")
        print(result.get("final_response", "未生成响应"))
        
        # 显示处理时间
        process_time = (end_time - start_time).total_seconds()
        print(f"\n处理用时: {process_time:.2f}秒")
        
    except Exception as e:
        print(f"\n运行过程中发生意外错误: {str(e)}") 