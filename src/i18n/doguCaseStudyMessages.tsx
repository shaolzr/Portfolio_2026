import type { ReactNode } from "react";
import type { Lang } from "./LanguageContext";

export type CaseSection = {
  id: string;
  title: string;
  paragraphs: (string | ReactNode)[];
};

type CaseStudyUI = {
  scrollToContinue: string;
  video: {
    systemDesignAria: string;
    miracleCgAria: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
  };
  results: {
    payingUsersIn5Days: string;
    firstWeekRevenue: string;
    sevenDayRetention: string;
  };
  research: {
    verifyHypothesis: ReactNode;
    weFound: ReactNode;
    playerSurveys: string;
    insightInterviews: string;
    skillEnhancement: string;
    companionship: string;
    companionSpendPerMonth: string;
    inGameSpendPerMonth: string;
  };
};

type CaseStudyMeta = {
  defaultDocumentTitle: string;
  siteSuffix: string;
};

export type CaseStudyMessages = {
  toc: { id: string; label: string }[];
  sections: CaseSection[];
  overviewSkills: string[];
  ui: CaseStudyUI;
  meta: CaseStudyMeta;
  systemDesign: {
    structureAlt: string;
    blocks: {
      interaction3d: { title: string; paragraphs: ReactNode[] };
      freeChat: { title: string; paragraphs: ReactNode[] };
      longTermMemory: { title: string; paragraphs: ReactNode[] };
    };
  };
};

export const doguCaseStudyMessages: Record<Lang, CaseStudyMessages> = {
  en: {
    toc: [
      { id: "research", label: "Touchstone" },
      { id: "system-design", label: "System" },
      { id: "results", label: "Solution" },
      { id: "reflection", label: "Future" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          <>
            <span className="font-bold text-white">IROI</span> is a robot teaching assistant that helps students with Sensors
            and Circuits problems and reminds them of important steps and
            mistakes. When you raise your hand, IROI will come to you and help
            right away, so you do not need to wait for a TA anymore.
          </>,
          <>
            <span className="font-bold text-white">My role</span> is Robotics
            Engineer & AI Engineer.
          </>,
        ],
      },
      {
        id: "research",
        title: "Touchstone",
        paragraphs: [
          <>
            In hands-on lab learning, students often lack timely, contextual
            guidance during experiments, while existing AI tools rely mainly on
            text-driven interaction, encouraging shortcut learning and reducing
            opportunities for deeper engagement.
          </>,
        ],
      },
      {
        id: "system-design",
        title: "AI System",
        paragraphs: [],
      },
      {
        id: "risk-safety",
        title: "Risk & Safety",
        paragraphs: [
          "To ensure Miracle's stable operation in a large-scale game environment, we designed a multi-layer risk control framework covering content safety, hallucination mitigation, and system stability.",
          "At the prompt level, topic boundaries and behavioral constraints are enforced to prevent out-of-scope interactions and non-compliant content, ensuring the companion relationship remains within defined limits.",
          "At the system design and evaluation level, we categorized common issue types and implemented validation mechanisms and post-generation checks to reduce errors and hallucinations, maintaining consistency between responses and stored user information.",
          "Through this layered protection approach, we safeguard reliability while preserving the naturalness of emotional expression and the fluidity of user interaction.",
        ],
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "After launch we saw a clear lift in return rate and session length. Players who engaged with the companion came back more often and stayed longer.",
          'Qualitative feedback highlighted that users felt "seen" by the AI—the memory and continuity made the difference.',
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        paragraphs: [
          "This project reinforced my belief that AI product success is not defined by model capability alone, but by whether it truly solves user needs and drives sustainable business growth.",
          "I also learned that safety and stability must be embedded throughout the development process, supported by continuous testing and iteration.",
          "If redesigning the system, I would still prioritize defining what to build and why now before focusing on technical execution. Clear problem definition and value assessment are essential to aligning AI capability with real user and business impact.",
        ],
      },
    ],
    overviewSkills: [
      "Robotics (ROS)",
      "Perception (YOLO)",
      "Navigation & Mapping",
      "Multimodal AI",
      "LLM + RAG",
      "Prompt Engineering",
      "System Architecture",
      "Evaluation",
      "Deployment",
      "Human-Robot Interaction",
    ],
    ui: {
      scrollToContinue: "Scroll to Continue",
      video: {
        systemDesignAria: "System design video",
        miracleCgAria: "Miracle CG fullscreen",
        play: "Play",
        pause: "Pause",
        mute: "Mute",
        unmute: "Unmute",
      },
      results: {
        payingUsersIn5Days: "paying users in 5 days",
        firstWeekRevenue: "first-week revenue/¥",
        sevenDayRetention: "7-day retention",
      },
      research: {
        verifyHypothesis: (
          <>
            <span className="font-bold text-white">To verify this hypothesis</span>{" "}
            we conducted:
          </>
        ),
        weFound: (
          <>
            <span className="font-bold text-white">We found</span> that survey
            responses emphasized skill improvement, interview findings suggested
            a clear <span className="font-medium">social desirability bias</span>.
            Players were hesitant to openly express companionship needs, yet
            demonstrated strong emotional demand in actual behavior and spending
            patterns.
          </>
        ),
        playerSurveys: "Player Surveys",
        insightInterviews: "Insight Interviews",
        skillEnhancement: "Skill Enhancement",
        companionship: "Companionship",
        companionSpendPerMonth: "Companion spend / month",
        inGameSpendPerMonth: "In-game spend / month",
      },
    },
    meta: {
      defaultDocumentTitle: "DOGU - IROI",
      siteSuffix: "SHAO Linzhengrong",
    },
    systemDesign: {
      structureAlt: "System structure",
      blocks: {
        interaction3d: {
          title: "3D Action Interaction",
          paragraphs: [
            <>
              To distinguish Miracle from a typical conversational model and create
              a more immersive experience, we designed interactive actions,
              including touch-based responses and dialogue gestures.
            </>,
            <>
              We built a lightweight emotion model that enables Miracle to trigger
              visual reactions before generating text, creating a more immediate
              and lifelike interaction.
            </>,
            <p className="font-semibold text-white" key="flow-3d">
              User input → Emotion recognition → Action mapping → 3D response
            </p>,
            <>
              As the relationship progresses, more interactions unlock, such as
              heart gestures and photo poses between close companions.
            </>,
          ],
        },
        freeChat: {
          title: "Free Chat",
          paragraphs: [
            <>
              We first defined Miracle’s character based on user research, shaping
              her identity, tone, and relationship stages according to player
              preferences.
            </>,
            <>
              We then conducted prompt engineering to ensure consistent
              personality and emotional expression.
            </>,
            <>
              Next, we evaluated different models, testing multiple DeepSeek
              configurations and Qwen to select the most stable and reliable
              option.
            </>,
            <>
              Our test data covered daily life topics, scientific knowledge,
              news, and in-game player data to ensure Miracle stays in character
              while responding accurately.
            </>,
            <p className="font-semibold text-white" key="flow-free-chat">
              User Research → Persona Design → Prompt Engineering → Model Testing
              → Quality Validation
            </p>,
          ],
        },
        longTermMemory: {
          title: "Long-Term Memory",
          paragraphs: [
            <>
              To enable continuous companionship, we designed a long-term memory
              system that allows Miracle to remember users across sessions instead
              of restarting each conversation.
            </>,
            <>
              The system{" "}
              <span className="font-semibold text-white">
                extracts key information
              </span>{" "}
              from interactions — such as preferences, important events, and
              shared experiences — and stores them in structured categories with
              dynamic updates over time.
            </>,
            <>
              During conversations, relevant memories are naturally{" "}
              <span className="font-semibold text-white">recalled</span> based on
              context, enabling proactive engagement and transforming Miracle from
              a tool-based chatbot into a relationship-driven companion.
            </>,
          ],
        },
      },
    },
  },
  zh: {
    toc: [
      { id: "research", label: "Touchstone" },
      { id: "system-design", label: "System" },
      { id: "results", label: "Solution" },
      { id: "reflection", label: "Future" },
    ],
    sections: [
      {
        id: "overview",
        title: "项目概述",
        paragraphs: [
          <>
            <span className="font-bold text-white">米拉</span> 是《QQ飞车》中的{" "}
            <span className="font-medium">AI 陪伴型伙伴</span>，会在你回来的时候一直等你。
          </>,
          <>《QQ飞车》是一款以强竞技为核心的移动端赛车游戏。</>,
          <>
            我们引入米拉，用于验证{" "}
            <span className="font-medium">情感陪伴</span>是否能成为新的留存与增长驱动力。
          </>,
          <>
            <span className="font-bold text-white">我的角色</span>是负责产品策略与 AI 系统设计：
          </>,
        ],
      },
      {
        id: "research",
        title: "用户调研",
        paragraphs: [
          <>
            <span className="font-bold text-white">问题</span>在于《QQ飞车》难以进一步延长用户停留与互动。
          </>,
          <>
            许多玩家登录后完成日常任务便立即退出。长期留存提升有限，同时外观付费的增长也开始放缓。
          </>,
          <>
            团队最初提出打造一个{" "}
            <span className="font-medium">AI技能提升工具</span>，帮助玩家提升表现并更久地留在游戏中。
          </>,
        ],
      },
      {
        id: "system-design",
        title: "系统设计",
        paragraphs: [],
      },
      {
        id: "risk-safety",
        title: "风险与安全",
        paragraphs: [
          "为了保障米拉在大型游戏环境中的稳定运行，我们设计了覆盖内容安全、幻觉缓解与系统稳定性的多层风控框架。",
          "在Prompt层面，通过话题边界与行为约束防止越界互动与不合规内容，确保陪伴关系在可控范围内。",
          "在系统设计与评估层面，我们归类常见问题类型，引入验证机制与生成后检查以降低错误与幻觉，并保持回复与用户信息的一致性。",
          "通过分层保护，在不牺牲情感表达自然度与互动流畅性的前提下，提升整体可靠性。",
        ],
      },
      {
        id: "results",
        title: "结果",
        paragraphs: [
          "上线后，回访率与单次时长都有明显提升。与陪伴系统互动的玩家回流更频繁、停留更久。",
          "定性反馈显示，用户会觉得 AI “记得我、理解我”——记忆与连续性是关键差异点。",
        ],
      },
      {
        id: "reflection",
        title: "复盘",
        paragraphs: [
          "这个项目进一步强化了我的认知：AI 产品的成功不只取决于模型能力，更取决于是否真正解决用户需求，并推动可持续的业务增长。",
          "同时我也学到，安全与稳定必须贯穿开发全流程，需要持续测试与迭代作为支撑。",
          "如果重新设计系统，我依然会先明确“做什么”和“为什么现在做”，再进入技术实现。清晰的问题定义与价值评估，是让 AI 能力对齐真实用户与业务影响的关键。",
          "我真的很喜欢在这栋楼里看每一次日落，在那一刻，天空像一首诗，时间也被温柔地按下了暂停键。",
        ],
      },
    ],
    overviewSkills: [
      "Robotics (ROS)",
      "Perception (YOLO)",
      "Navigation & Mapping",
      "Multimodal AI",
      "LLM + RAG",
      "Prompt Engineering",
      "System Architecture",
      "Evaluation",
      "Deployment",
      "Human-Robot Interaction",
    ],
    ui: {
      scrollToContinue: "继续向下滚动",
      video: {
        systemDesignAria: "系统设计视频",
        miracleCgAria: "Miracle CG 全屏视频",
        play: "播放",
        pause: "暂停",
        mute: "静音",
        unmute: "取消静音",
      },
      results: {
        payingUsersIn5Days: "5 天内付费用户",
        firstWeekRevenue: "首周收入 / ¥",
        sevenDayRetention: "7 日留存",
      },
      research: {
        verifyHypothesis: (
          <>
            <span className="font-bold text-white">为验证这一假设</span>，我们开展了：
          </>
        ),
        weFound: (
          <>
            <span className="font-bold text-white">我们发现</span>，问卷结果更多强调“技能提升”，但访谈显示出明显的{" "}
            <span className="font-medium">社会期许偏差</span>：玩家不愿直接表达陪伴需求，但其真实行为与付费模式却体现出强烈的情感需求。
          </>
        ),
        playerSurveys: "玩家问卷",
        insightInterviews: "深度访谈",
        skillEnhancement: "技能提升",
        companionship: "陪伴需求",
        companionSpendPerMonth: "陪伴相关月均花费",
        inGameSpendPerMonth: "游戏内月均花费",
      },
    },
    meta: {
      defaultDocumentTitle: "DOGU - IROI",
      siteSuffix: "SHAO Linzhengrong",
    },
    systemDesign: {
      structureAlt: "系统结构",
      blocks: {
        interaction3d: {
          title: "3D 动作交互",
          paragraphs: [
            <>
              为了让米拉区别于传统对话模型并更沉浸，我们设计了触摸反馈、对话手势等交互动作。
            </>,
            <>
              同时构建轻量情绪模型，使米拉能在生成文本前先触发视觉反应，带来更即时、更拟真的互动体验。
            </>,
            <p className="font-semibold text-white" key="flow-3d">
              用户输入 → 情绪识别 → 动作映射 → 3D 响应
            </p>,
            <>随着关系推进，会解锁更多互动，例如亲密关系下的比心手势、合照姿势等。</>,
          ],
        },
        freeChat: {
          title: "自由对话",
          paragraphs: [
            <>
              我们首先基于用户研究定义米拉的角色设定，并按玩家偏好塑造她的身份、语气与关系阶段。
            </>,
            <>随后通过 Prompt 工程，保证人格一致性与情绪表达稳定。</>,
            <>接着评估不同模型，测试多种 DeepSeek 配置与 Qwen，选择更稳定可靠的方案。</>,
            <>
              测试数据覆盖日常话题、科学知识、新闻与玩家游戏数据，确保米拉既能保持人设，又能准确响应。
            </>,
            <p className="font-semibold text-white" key="flow-free-chat">
              用户研究 → 人设设计 → Prompt 工程 → 模型测试 → 质量验证
            </p>,
          ],
        },
        longTermMemory: {
          title: "长期记忆",
          paragraphs: [
            <>
              为了实现持续陪伴，我们设计了长期记忆系统，让米拉能跨会话记住用户，而不是每次对话都“从零开始”。
            </>,
            <>
              系统会从互动中{" "}
              <span className="font-semibold text-white">提取关键信息</span>
              ——例如偏好、重要事件与共同经历——并以结构化类别存储，随时间动态更新。
            </>,
            <>
              对话过程中，相关记忆会基于上下文自然{" "}
              <span className="font-semibold text-white">被唤起</span>，从而实现更主动的互动，让米拉从工具型聊天机器人转变为关系驱动的陪伴伙伴。
            </>,
          ],
        },
      },
    },
  },
};
