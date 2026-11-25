(function () {
  window.LEVELS = [
    {
      id: 1,
      tier: "beginner",
      title: { zh: "提示词的基本结构", en: "Basic Prompt Structure" },
      concept: { zh: "一句好指令 = 任务 + 背景 + 要求", en: "A good prompt = task + context + requirements" },
      learn: {
        zh: "AI 不会读心。很多翻车都来自只说了半句——「帮我写一个」只给了任务，没说给谁、要什么样。把三样补齐，AI 才有足够信息答对。",
        en: "AI can't read your mind. Most failures come from half-finished prompts. State the task, the context, and the desired output — then AI has enough to answer well."
      },
      points: [
        { zh: "任务：你要它做什么（写、总结、翻译、分析）", en: "Task: what to do (write, summarize, translate, analyze)" },
        { zh: "背景：给谁、什么场景、有什么约束", en: "Context: who it's for, the situation, the constraints" },
        { zh: "要求：长度、风格、格式、必须包含或避免的内容", en: "Requirements: length, style, format, what to include or avoid" },
        { zh: "三样缺一个，AI 就只能靠猜", en: "Miss one, and AI can only guess" }
      ],
      why: { zh: "补齐这三样是第一性原理，后面每一关的技巧都建立在这个骨架上。", en: "Filling in these three is the foundation every later technique builds on." },
      example: {
        bad: { zh: "帮我写个介绍", en: "Write me an intro." },
        good: { zh: "为一款 200 元以内的学生台灯写一句 30 字的产品介绍，突出护眼和便宜。", en: "Write a 30-word product intro for a student desk lamp under $40, highlighting eye-care and affordability." }
      },
      challenge: {
        type: "choose",
        question: { zh: "下面哪个提示词把「任务、背景、要求」三样都补齐了？", en: "Which prompt includes task, context, and requirements all at once?" },
        options: [
          { zh: "帮我写个东西，详细一点", en: "Write something for me, with detail." },
          { zh: "为一款主打便携的蓝牙音箱写一句 20 字以内的广告语，突出轻和小。", en: "Write a tagline under 20 words for a portable Bluetooth speaker, highlighting how light and small it is." },
          { zh: "写一句 20 字以内的广告语，突出轻和小。", en: "Write a tagline under 20 words, highlighting how light and small it is." }
        ],
        correctIndex: 1,
        explanation: { zh: "中间那条三样都齐：任务（写广告语）、背景（便携蓝牙音箱）、要求（20 字以内、突出轻和小）。另外两条一个没说对象，一个什么都没说清。", en: "The middle one has all three. The others either miss the subject or say almost nothing." }
      },
      sandbox: [
        { input: { zh: "帮我写点东西", en: "Write something for me" }, output: { zh: "（AI 只能猜）你想写什么？给谁看？", en: "(AI can only guess) What do you want, and for whom?" } },
        { input: { zh: "为一款降噪耳机写一句 15 字广告语，突出安静。", en: "Write a 15-word tagline for noise-cancelling headphones, highlighting quietness." }, output: { zh: "喧嚣世界，一键静音。", en: "Silence the noise, keep the moment." } }
      ]
    },
    {
      id: 2,
      tier: "beginner",
      title: { zh: "说清楚、直接一点", en: "Be Clear and Direct" },
      concept: { zh: "把模糊的词换成可验收的标准", en: "Replace vague words with checkable standards" },
      learn: {
        zh: "「好一点」「专业一点」这种话 AI 只能靠猜，而且这次和下次的结果可能完全不一样。模糊的形容词带来随机结果。",
        en: "Words like 'better' or 'more professional' force AI to guess — and the answer may differ every time. Vague adjectives produce random results."
      },
      points: [
        { zh: "模糊词：好、专业、有趣、合适 —— 都不可判断", en: "Vague: good, professional, fun, suitable — none are checkable" },
        { zh: "换成可判断标准：字数、语气、格式、必须保留或删除", en: "Use checkable standards: length, tone, format, keep or remove" },
        { zh: "说清「不要什么」和「要什么」同样重要", en: "Saying what you DON'T want matters as much as what you do" },
        { zh: "给一个可验收的标准，结果才稳定", en: "A checkable standard makes the output stable" }
      ],
      why: { zh: "提示词越可验收，AI 越稳定；这也是你能在面试里讲清的一项能力。", en: "The more checkable the prompt, the more stable the AI — a skill you can talk about in interviews." },
      example: {
        bad: { zh: "把这段文案改得专业一点", en: "Make this copy more professional." },
        good: { zh: "把这段文案改得语气正式，去掉口语词，控制在 50 字以内。", en: "Rewrite this copy in a formal tone, remove slang, and keep it under 50 words." }
      },
      challenge: {
        type: "choose",
        question: { zh: "哪个指令给出了「可验收」的标准？", en: "Which instruction gives a checkable standard?" },
        options: [
          { zh: "把这段话改得更有吸引力", en: "Make this more attractive." },
          { zh: "把这段话改得专业一点，顺便优化一下", en: "Make this more professional, and optimize it a bit." },
          { zh: "把这段话压缩到 30 字以内，保留价格和卖点，去掉感叹号。", en: "Condense this to under 30 words, keep the price and selling point, remove exclamation marks." }
        ],
        correctIndex: 2,
        explanation: { zh: "只有第三条给了可验收标准：30 字、保留两个信息、去掉感叹号。前两条全是模糊形容词。", en: "Only the third gives checkable limits. The first two are all vague adjectives." }
      },
      sandbox: [
        { input: { zh: "帮我改得好一点", en: "Make it better" }, output: { zh: "（AI 只能猜）更好是指更短、更正式，还是更有趣？", en: "(AI can only guess) Better how — shorter, more formal, or more fun?" } },
        { input: { zh: "把这段话压缩到 30 字，保留价格和卖点。", en: "Condense this to 30 words, keeping the price and selling point." }, output: { zh: "（给出符合要求的精简版）", en: "(Returns a tightened version that meets the limits)" } }
      ]
    },
    {
      id: 3,
      tier: "beginner",
      title: { zh: "给 AI 安排角色", en: "Assign a Role" },
      concept: { zh: "角色决定立场、语气和知识范围", en: "A role sets the stance, tone, and knowledge scope" },
      learn: {
        zh: "开头一句「你是一名……」，AI 就会用那个身份的知识、语气和标准来回答。角色不是装饰，它决定了 AI 站在谁的立场上思考。",
        en: "Start with 'You are a…' and AI answers from that persona's knowledge, tone, and standards. A role is not decoration — it decides whose shoes AI thinks in."
      },
      points: [
        { zh: "角色决定立场和知识范围", en: "The role sets the stance and knowledge scope" },
        { zh: "选一个和任务匹配的角色，而不是随便套", en: "Pick a role that matches the task, not just any role" },
        { zh: "角色 + 具体任务一起用，才有效", en: "Role plus a concrete task — both together, not either alone" },
        { zh: "常见角色：文案、HR、律师、医生、选品经理", en: "Common roles: copywriter, HR, lawyer, doctor, sourcing manager" }
      ],
      why: { zh: "同一个问题，问医生和问朋友的答案完全不同；角色帮你锁定「该听谁的」。", en: "The same question gets very different answers from a doctor vs. a friend — a role locks in whose advice to trust." },
      example: {
        bad: { zh: "给我讲一下这个产品", en: "Tell me about this product." },
        good: { zh: "你是一名跨境电商选品经理。请从目标市场和定价两个角度分析这个产品。", en: "You are a cross-border e-commerce sourcing manager. Analyze this product from target market and pricing angles." }
      },
      challenge: {
        type: "choose",
        question: { zh: "哪个提示词的角色和任务最匹配？", en: "Which prompt matches its role to the task best?" },
        options: [
          { zh: "你是一名健身教练。请分析这份合同的三个法律风险。", en: "You are a fitness coach. Identify three legal risks in this contract." },
          { zh: "你是一名律师。请分析这份合同的三个法律风险，并用大白话解释。", en: "You are a lawyer. Identify three legal risks in this contract and explain them in plain language." },
          { zh: "请分析这份合同的三个法律风险，用大白话解释。", en: "Identify three legal risks in this contract and explain them in plain language." }
        ],
        correctIndex: 1,
        explanation: { zh: "法律任务该配律师。第一条角色用错了，第三条没给角色；只有第二条角色和任务都匹配，还补了输出要求。", en: "A legal task needs a lawyer. The first uses the wrong role, the third omits it; only the second matches role to task and adds an output requirement." }
      },
      sandbox: [
        { input: { zh: "分析一下这个产品", en: "Analyze this product" }, output: { zh: "（泛泛而谈，没有立场）", en: "(Generic answer, no clear stance)" } },
        { input: { zh: "你是一名电商运营。请从转化率角度分析这个详情页。", en: "You are an e-commerce operator. Analyze this product page from a conversion angle." }, output: { zh: "（从转化率拆解标题、卖点、价格锚点）", en: "(Breaks down title, selling points, and price anchoring)" } }
      ]
    },
    {
      id: 4,
      tier: "intermediate",
      title: { zh: "把资料和指令分开", en: "Separate Data from Instructions" },
      concept: { zh: "用分隔符分清「要求」和「要处理的内容」", en: "Use delimiters to separate instructions from content" },
      learn: {
        zh: "把要处理的原文单独放一块，AI 才不会把你的要求当成内容、或把内容当成要求。尤其原文里出现「请」「帮我」这类字眼时，最容易串。",
        en: "Put the source text in its own block so AI doesn't mix instructions with content — especially when the source itself contains words like 'please' or 'help'."
      },
      points: [
        { zh: "用分隔符标记内容块：比如【资料】、三引号、XML 标签", en: "Mark the content block with delimiters like [DATA], triple quotes, or XML tags" },
        { zh: "指令放在内容块外面，内容原样放里面", en: "Instructions stay outside the block; content stays inside, unchanged" },
        { zh: "明确告诉 AI 只处理【资料】里的内容", en: "Tell AI to process only what's inside the block" },
        { zh: "内容一长，指令和资料混在一起就会听错对象", en: "Long content mixes instructions and data — that's when AI misreads" }
      ],
      why: { zh: "分开是处理长内容的标配；不分开，AI 可能把你资料里的一句话当成指令去执行。", en: "Separation is standard for long content; without it, AI may treat a sentence inside your data as a command." },
      example: {
        bad: { zh: "总结一下，重点看价格：这款产品定价 199 元，主打续航……", en: "Summarize this, focus on price: this product costs 199, battery…" },
        good: { zh: "请总结下面【资料】的内容，重点看价格。\n【资料】这款产品定价 199 元，主打续航……", en: "Summarize the [DATA] below, focusing on price.\n[DATA] This product costs 199, battery…" }
      },
      challenge: {
        type: "sort",
        question: { zh: "把一个清晰的提示词拆成了三部分，请按正确的组成顺序排好。", en: "Arrange these three parts of a clear prompt into the correct order." },
        items: [
          { zh: "【任务】把下面资料总结成 3 条要点", en: "[TASK] Summarize the data below into 3 bullets" },
          { zh: "【要求】重点写价格和续航", en: "[REQUIREMENT] Focus on price and battery" },
          { zh: "【资料】产品定价 199 元，续航 12 小时……", en: "[DATA] The product costs 199, battery lasts 12 hours…" }
        ],
        explanation: { zh: "正确顺序是：先任务，再要求，最后放资料。资料放在最外层，AI 才不会把里面的字当成指令。", en: "The clean order is task, requirements, then the data block — data goes on the outside so AI won't read it as an instruction." }
      },
      sandbox: [
        { input: { zh: "总结一下重点看价格：……（指令和内容混在一起）", en: "Summarize, focus on price: …(instructions and content mixed together)" }, output: { zh: "（AI 可能分不清哪些是要求）", en: "(AI may not tell requirements from content)" } },
        { input: { zh: "请总结【资料】的内容，重点看价格。\n【资料】……", en: "Summarize the [DATA], focusing on price.\n[DATA] …" }, output: { zh: "（按要求只输出价格相关总结）", en: "(Outputs a price-focused summary as instructed)" } }
      ]
    },
    {
      id: 5,
      tier: "intermediate",
      title: { zh: "控制输出格式", en: "Control the Output Format" },
      concept: { zh: "告诉 AI 你要什么格式，结果才能直接用", en: "Name the format so the output is usable" },
      learn: {
        zh: "说出你想要的结构，结果马上更好用。格式不只是好看，它决定了你拿到手能不能直接贴进表格、代码或表单。",
        en: "Name the structure you want and the result becomes usable. Format isn't just looks — it decides whether you can drop the output straight into a table, code, or form."
      },
      points: [
        { zh: "明确格式：表格、列表、JSON、段落", en: "Name the format: table, list, JSON, paragraphs" },
        { zh: "明确字段：哪些列、几个要点", en: "Name the fields: which columns, how many points" },
        { zh: "明确长度：字数、条数", en: "Name the length: word count, item count" },
        { zh: "格式对了，输出才能直接复用", en: "Right format = output you can reuse directly" }
      ],
      why: { zh: "同样是「对比产品」，要表格和要一段话结果天差地别；格式就是给结果加说明书。", en: "For the same 'compare products', a table vs. a paragraph is a world apart — format is the spec sheet for your output." },
      example: {
        bad: { zh: "对比一下这两个产品", en: "Compare these two products." },
        good: { zh: "用表格对比这两个产品，列出价格、续航、适用人群三列。", en: "Compare these two products in a table with columns for price, battery, and target user." }
      },
      challenge: {
        type: "choose",
        question: { zh: "哪个提示词能得到「可直接复用」的结果？", en: "Which prompt gets a directly reusable result?" },
        options: [
          { zh: "介绍一下这家公司，详细点", en: "Introduce this company, with detail." },
          { zh: "分析一下这份数据，给我结论", en: "Analyze this data and give me conclusions." },
          { zh: "把这份数据整理成表格，列三列：月份、销量、环比涨幅，并保留两位小数。", en: "Organize this data into a table with columns for month, sales, and month-over-month growth, to two decimal places." }
        ],
        correctIndex: 2,
        explanation: { zh: "第三条明确到表格、列名和小数位，拿到就能用；前两条都没指定格式。", en: "The third names the table, columns, and decimals — ready to use. The first two don't specify a format." }
      },
      sandbox: [
        { input: { zh: "对比一下这两个产品", en: "Compare these two products" }, output: { zh: "（一段没有结构的文字）", en: "(An unstructured paragraph)" } },
        { input: { zh: "用表格对比，列出价格、续航、适用人群。", en: "Compare in a table with price, battery, and target user columns." }, output: { zh: "（返回一张三列表格）", en: "(Returns a three-column table)" } }
      ]
    },
    {
      id: 6,
      tier: "intermediate",
      title: { zh: "让 AI 一步步想", en: "Think Step by Step" },
      concept: { zh: "先分析、再结论，AI 更少跳步出错", en: "Analyze first, then conclude — fewer skipped steps" },
      learn: {
        zh: "让 AI 先列条件、再推导、最后给结论，它能少跳步、少出错。尤其数学、逻辑、多条件判断，加一句「一步步来」效果明显。",
        en: "Ask AI to list conditions, reason, then conclude — it skips fewer steps. For math, logic, and multi-condition tasks, 'think step by step' helps a lot."
      },
      points: [
        { zh: "复杂任务先拆步骤", en: "Break complex tasks into steps first" },
        { zh: "明确「先…再…最后…」", en: "Make the order explicit: first… then… finally…" },
        { zh: "让它把思考过程写出来，而不是只给答案", en: "Have it show the reasoning, not just the answer" },
        { zh: "简单任务不必硬拆，够用就好", en: "Don't over-split simple tasks — keep it as simple as needed" }
      ],
      why: { zh: "跳步是 AI 出错的主因之一；把过程摊开，既提高准确率，也方便你自己检查。", en: "Skipping steps is a leading cause of AI errors; showing the process boosts accuracy and makes it checkable." },
      example: {
        bad: { zh: "这道题答案是什么", en: "What's the answer to this problem?" },
        good: { zh: "请一步步分析这道题：先列出已知条件，再推导，最后给答案。", en: "Analyze this problem step by step: list the conditions, reason, then answer." }
      },
      challenge: {
        type: "sort",
        question: { zh: "把一次「让 AI 先想再答」的完整过程排成正确顺序。", en: "Order the full 'think before answering' process correctly." },
        items: [
          { zh: "列出已知条件", en: "List the given conditions" },
          { zh: "一步步推导", en: "Reason through it step by step" },
          { zh: "得出候选答案", en: "Reach a candidate answer" },
          { zh: "检查自洽后给出最终结论", en: "Check consistency, then give the final conclusion" }
        ],
        explanation: { zh: "先列条件、再推导、得到候选答案、最后检查再下结论——多一步检查，AI 就不容易跳步。", en: "List, reason, reach a candidate, then check before concluding — the extra check stops AI from skipping." }
      },
      sandbox: [
        { input: { zh: "这道题答案是什么", en: "What's the answer?" }, output: { zh: "（可能直接给一个没过程的答案）", en: "(May give an answer with no reasoning)" } },
        { input: { zh: "先列条件，再一步步推导，最后给答案。", en: "List the conditions, reason step by step, then answer." }, output: { zh: "（带过程的完整解答）", en: "(A complete answer with reasoning shown)" } }
      ]
    },
    {
      id: 7,
      tier: "intermediate",
      title: { zh: "给 AI 例子", en: "Show Examples" },
      concept: { zh: "一个例子，同时定下语气、长度和格式", en: "One example sets tone, length, and format together" },
      learn: {
        zh: "想让它写成什么样，直接给例子最快。一个例子能同时定下语气、长度和格式，比堆一堆形容词都管用。",
        en: "The fastest way to set tone, length, and format is to show an example — better than piling on adjectives."
      },
      points: [
        { zh: "例子 = 风格说明书", en: "An example is a style spec" },
        { zh: "给 1-2 个典型例子就够", en: "One or two typical examples is enough" },
        { zh: "例子要和任务同类型", en: "The example must match the task type" },
        { zh: "让 AI「参考例子 + 照风格 + 写 N 条」", en: "Ask AI to 'follow the example, match the style, write N items'" }
      ],
      why: { zh: "形容词很难描述「调性」，例子一下就能对齐——这也是「few-shot」的日常版。", en: "Adjectives can't capture 'tone', but an example aligns it instantly — this is the everyday version of few-shot." },
      example: {
        bad: { zh: "写一条好听的文案", en: "Write a nice slogan." },
        good: { zh: "参考这个例子写文案：「小空间，也要睡得好。」请按同样的简短风格写 3 条。", en: "Follow this example: 'Small space, still sleep well.' Write 3 more in the same short style." }
      },
      challenge: {
        type: "choose",
        question: { zh: "哪个提示词能让 AI 稳稳对齐风格？", en: "Which prompt makes AI reliably match the style?" },
        options: [
          { zh: "写几条文案，要求有趣、有网感", en: "Write a few slogans that are fun and trendy." },
          { zh: "写 3 条早安文案，要温暖", en: "Write 3 good-morning messages that feel warm." },
          { zh: "参考「今天也要加油呀」的轻松语气，写 3 条早安文案。", en: "Following the cheerful tone of 'Keep going today!', write 3 good-morning messages." }
        ],
        correctIndex: 2,
        explanation: { zh: "第三条用具体例子锁定了风格；前两条只有形容词，AI 只能猜「有趣」「温暖」到底是什么。", en: "The third locks the style with a concrete example; the first two leave 'fun' and 'warm' to AI's guess." }
      },
      sandbox: [
        { input: { zh: "写一条好听的文案", en: "Write a nice slogan" }, output: { zh: "（风格随机，可能不是你要的）", en: "(Random style, maybe not what you wanted)" } },
        { input: { zh: "参考「小空间，也要睡得好。」的风格写 3 条。", en: "Write 3 in the style of 'Small space, still sleep well.'" }, output: { zh: "（3 条风格一致的精简文案）", en: "(Three consistent, concise slogans)" } }
      ]
    },
    {
      id: 8,
      tier: "advanced",
      title: { zh: "防止 AI 乱编", en: "Avoid Hallucinations" },
      concept: { zh: "让 AI 不知道就说不知道，并标出来源", en: "Tell AI to admit uncertainty and cite sources" },
      learn: {
        zh: "AI 会一本正经地编造，尤其是要具体数字、人名、来源时。加一句「不确定就说明，不要猜测」，并让它标来源，能明显减少瞎编。",
        en: "AI confidently makes things up, especially for exact numbers, names, and sources. Adding 'say so if unsure, don't guess, cite sources' sharply reduces fabrication."
      },
      points: [
        { zh: "事实类问题，要求给来源", en: "For factual questions, require sources" },
        { zh: "明确「没有可靠信息就说不知道」", en: "Say 'if no reliable info, tell me you don't know'" },
        { zh: "区分「事实」和「观点/创作」", en: "Separate facts from opinions or creative writing" },
        { zh: "重要结论，自己再查证一遍", en: "Double-check important conclusions yourself" }
      ],
      why: { zh: "幻觉是最隐蔽的错误——语气越自信越危险；教会 AI「承认不知道」是使用底线。", en: "Hallucination is the sneakiest error — the more confident, the more dangerous. Teaching AI to admit 'I don't know' is a baseline." },
      example: {
        bad: { zh: "这个行业的市场规模是多少？", en: "What's the market size of this industry?" },
        good: { zh: "这个行业的市场规模是多少？如果数据不足，请明确说不知道，不要猜测，并标出来源。", en: "What's the market size? If data is insufficient, say you don't know, don't guess, and cite sources." }
      },
      challenge: {
        type: "choose",
        question: { zh: "哪个提示词最能把「编造」的路堵死？", en: "Which prompt best closes the fabrication loophole?" },
        options: [
          { zh: "给我一个准确的市场规模数字", en: "Give me an exact market size number." },
          { zh: "告诉我最新数据，越具体越好", en: "Tell me the latest data, the more specific the better." },
          { zh: "给出市场规模并注明来源；没有可靠来源就明确说无法确认。", en: "Give the market size and cite sources; if there is no reliable source, say it can't be confirmed." }
        ],
        correctIndex: 2,
        explanation: { zh: "第三条要求来源并允许说不知道；前两条都在逼 AI 给具体数字，反而诱导它编造。", en: "The third requires sources and allows 'I don't know'. The first two push for specific numbers, which invites fabrication." }
      },
      sandbox: [
        { input: { zh: "告诉我这个市场有多大，要具体数字", en: "Tell me the market size, exact numbers" }, output: { zh: "（可能给一个无法核实的具体数字）", en: "(May give an unverifiable specific number)" } },
        { input: { zh: "给出市场规模并注明来源；没有可靠来源就说明无法确认。", en: "Give the market size with sources; say so if you can't confirm." }, output: { zh: "（要么带来源，要么明确说不知道）", en: "(Either cites a source or admits it can't confirm)" } }
      ]
    },
    {
      id: 9,
      tier: "advanced",
      title: { zh: "搭一个复杂提示词", en: "Build a Complex Prompt" },
      concept: { zh: "把前面几招组合起来，解决真实任务", en: "Combine the earlier techniques for real tasks" },
      learn: {
        zh: "真实任务很少只用一招。角色定语气、任务定目标、资料给依据、要求定边界、例子定风格——按需把它们组合起来。",
        en: "Real tasks rarely use one technique. Role sets tone, task sets the goal, data gives facts, requirements set limits, examples set style — combine what you need."
      },
      points: [
        { zh: "角色 → 立场和语气", en: "Role → stance and tone" },
        { zh: "任务 → 做什么", en: "Task → what to do" },
        { zh: "资料 → 处理什么内容", en: "Data → what content to process" },
        { zh: "要求 → 长度、格式、边界", en: "Requirements → length, format, limits" },
        { zh: "例子（可选）→ 风格", en: "Examples (optional) → style" }
      ],
      why: { zh: "前面八关是零件，这一关是组装；会组合，才算真的会写提示词。", en: "The first eight levels are parts; this one is assembly. Combining them is what 'knowing how to prompt' really means." },
      example: {
        bad: { zh: "帮我写客服回复", en: "Write a customer-service reply." },
        good: { zh: "你是客服主管。请根据下面的【工单】和【政策】写一封回复：语气礼貌，先道歉，再给出退款方案，不超过 80 字。", en: "You are a support lead. Using the [TICKET] and [POLICY] below, write a reply: polite, apologize first, then offer a refund plan, under 80 words." }
      },
      challenge: {
        type: "sort",
        question: { zh: "把一段完整提示词的组成部分，按合理顺序排好。", en: "Order the parts of a complete prompt sensibly." },
        items: [
          { zh: "【角色】你是一名资深客服主管", en: "[ROLE] You are a senior support lead" },
          { zh: "【任务】根据工单写一封回复", en: "[TASK] Write a reply based on the ticket" },
          { zh: "【资料】工单和退款政策", en: "[DATA] The ticket and refund policy" },
          { zh: "【要求】语气礼貌，先道歉再给方案，80 字以内", en: "[REQUIREMENT] Polite, apologize first, offer a plan, under 80 words" }
        ],
        explanation: { zh: "角色定语气，任务定目标，资料给依据，要求定边界，组合起来就是一条能干活的好提示词。", en: "Role sets tone, task sets the goal, data gives facts, requirements set limits." }
      },
      sandbox: [
        { input: { zh: "帮我写客服回复", en: "Write a support reply" }, output: { zh: "（可能语气和内容都不对）", en: "(Tone and content may be off)" } },
        { input: { zh: "你是客服主管。根据【工单】和【政策】写回复：先道歉，给退款方案，80 字内。", en: "You are a support lead. Using [TICKET] and [POLICY], write a reply: apologize first, offer a refund, under 80 words." }, output: { zh: "（礼貌、有方案、符合字数）", en: "(Polite, actionable, within the word limit)" } }
      ]
    }
  ];
})();
