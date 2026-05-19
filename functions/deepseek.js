// functions/deepseek.js
const axios = require('axios');

exports.handler = async (event, context) => {
  const { question, options, userAnswer, correctAnswer, standardExplain, grade, subject } = JSON.parse(event.body);

  // 🔑 请在此处填入你的 DeepSeek API Key（部署前务必设置环境变量！）
  const API_KEY = process.env.DEEPSEEK_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing DEEPSEEK_API_KEY" })
    };
  }

  const prompt = `
你是一名初中《道德与法治》教师，正在为七年级学生设计错题讲解。
请用亲切、生活化、鼓励式语言（避免说教），为以下题目生成一段120字以内的讲解，要求：

1. 开头点明正确答案；
2. 解释为什么该选项正确；
3. 指出学生错选的原因（若用户作答错误）；
4. 联系学生日常生活，给出1个具体行动建议；
5. 体现课标要求：政治认同、责任意识、健全人格。

题目：${question}
选项：${JSON.stringify(options)}
学生答案：${userAnswer}
正确答案：${correctAnswer}
标准解析：${standardExplain}

请直接输出讲解内容，不要加标题或额外说明。
`;

  try {
    const response = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一位经验丰富的初中道法教师，语言亲切、有温度、有启发性。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 150
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiResponse = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(aiResponse)
    };
  } catch (error) {
    console.error("DeepSeek API Error:", error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DeepSeek API request failed", details: error.message })
    };
  }
};