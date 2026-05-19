// 题目数据（严格按你提供）
const questions = [
  {
    id: 1,
    question: "“天下之事，常成于困约而败于奢靡”“施惠无念，受恩莫忘”“先天下之忧而忧，后天下之乐而乐”等经典名句中蕴含的传统美德，在不知不觉中渗透我们的生活，指导我们的行为。这说明（ ）",
    options: {
      A: "①传承中华传统美德只需做到节俭、感恩和爱国",
      B: "②中华传统美德已融入我们的价值观念和行为方式",
      C: "③中华优秀传统文化蕴含着丰富的道德理念和规范",
      D: "④中华优秀传统文化是中华传统美德的精髓，是世代相传的民族智慧"
    },
    answer: "C",
    standardExplain: "①说法错误（过于狭隘）；②③正确，体现美德已内化于心、外化于行；④混淆概念（中华优秀传统文化是载体，不是‘精髓’本身）。"
  },
  {
    id: 2,
    question: "2025年度“新时代好少年”陈宇阳曾参加“重走长征路”百公里徒步挑战赛，凭借顽强的意志力挑战极限、走完全程；曾参与“乡村振兴，童声传爱”公益项目，为山区留守儿童捐赠书籍、录制有声故事，用爱心温暖他人……据此，下列优秀品质中她具备的有（ ）",
    options: {
      A: "①见贤思齐  ②扶危济困",
      B: "②扶危济困  ③见义勇为",
      C: "②扶危济困  ④自强不息",
      D: "①见贤思齐  ③见义勇为"
    },
    answer: "C",
    standardExplain: "徒步挑战体现自强不息；公益行动体现扶危济困。未体现‘见贤思齐’或‘见义勇为’。"
  },
  {
    id: 3,
    question: "外卖小哥彭清林因从十余米高桥跃下救起落水女孩，被称为“中国好人”。当被问及“下次还会这么做吗”，他坚定回答“会”。他的行为践行了（ ）",
    options: {
      A: "①见义勇为  ②敬业乐群",
      B: "②敬业乐群  ③孝亲爱亲",
      C: "①见义勇为  ④扶危济困",
      D: "③孝亲爱亲  ④扶危济困"
    },
    answer: "C",
    standardExplain: "跳桥救人是典型‘见义勇为’；帮助陌生人属‘扶危济困’。"
  },
  {
    id: 4,
    question: "习近平总书记强调：“道不可坐论，德不能空谈。”美德之事，注重“勿以恶小而为之，勿以善小而不为”。这两句话共同强调（ ）",
    options: {
      A: "①中华优秀传统文化的内涵丰富且与时俱进  ②我们应该将中华传统美德融入自己的行动",
      B: "①中华优秀传统文化的内涵丰富且与时俱进  ④传承中华传统美德，关键在于践行",
      C: "②我们应该将中华传统美德融入自己的行动  ③中华传统美德已成为现代世界各国的共识",
      D: "②我们应该将中华传统美德融入自己的行动  ④传承中华传统美德，关键在于践行"
    },
    answer: "D",
    standardExplain: "两句话核心都在说‘行动’——不能空谈，要从小事做起。②和④精准概括。"
  },
  {
    id: 5,
    question: "家规是指一个家庭的行为规范，一般是由一个家族传承下来的教育、规范后代子孙的准则。很多传承下来的老规矩对我们现在的生活依然具有重要意义。对照下图，反思自我，我们应该（ ）",
    options: {
      A: "①淘汰落后文化，坚持与时俱进  ③践行传统美德，提高自我修养",
      B: "①淘汰落后文化，坚持与时俱进  ④树立责任意识，肩负历史使命",
      C: "②传承优秀文化，坚守文化基因  ③践行传统美德，提高自我修养",
      D: "②传承优秀文化，坚守文化基因  ④树立责任意识，肩负历史使命"
    },
    answer: "C",
    standardExplain: "题干强调‘有意义的老规矩’，指向‘优秀文化’与‘美德践行’。①④属过度引申或拔高。"
  }
];

let currentAnswers = {};

// 渲染题目
function renderQuiz() {
  const quizArea = document.getElementById("quizArea");
  quizArea.innerHTML = "";
  questions.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "question-card";

    let optionsHtml = "";
    for (let key in q.options) {
      optionsHtml += `
        <label class="option-item" onclick="selectOption(${q.id}, '${key}')">
          <input type="radio" name="q${q.id}" value="${key}" />
          ${key}. ${q.options[key]}
        </label>
      `;
    }

    let imgHtml = "";
    if (q.id === 5) {
      imgHtml = `<img src="img/q5.jpg" alt="家规图" class="quiz-img">`;
    }

    card.innerHTML = `
      <div>
        <span class="question-number">${q.id}</span>
        <span class="question-text">${q.question}</span>
      </div>
      ${imgHtml}
      <div class="options">${optionsHtml}</div>
    `;
    quizArea.appendChild(card);
  });
}

window.selectOption = function(qId, opt) {
  document.querySelectorAll(`.option-item`).forEach(el => el.classList.remove("selected"));
  const el = document.querySelector(`input[name="q${qId}"][value="${opt}"]`);
  if (el) el.parentElement.classList.add("selected");
  currentAnswers[qId] = opt;
};

window.submitQuiz = async function() {
  const scoreEl = document.getElementById("scoreText");
  const resultBox = document.getElementById("resultBox");
  const wrongList = document.getElementById("wrongList");

  let score = 0;
  let wrongItems = [];

  questions.forEach(q => {
    const userAns = currentAnswers[q.id] || null;
    if (userAns === q.answer) score++;
    else wrongItems.push({ ...q, userAns });
  });

  resultBox.style.display = "block";
  scoreEl.innerHTML = `你的得分：<strong>${score} / ${questions.length}</strong> ${
    score === 5 ? "🎉 全部正确！美德小达人！" : ""
  }`;

  if (wrongItems.length === 0) {
    wrongList.innerHTML = `
      <div class="wrong-item">
        <h3><i class="fas fa-trophy"></i> 恭喜你！5题全对！</h3>
        <p class="explanation">你已深刻理解中华传统美德的内涵与践行路径。请将这份认知转化为家庭、校园、社会中的具体行动！</p>
      </div>`;
  } else {
    wrongList.innerHTML = `<h3 style="color:var(--warning); margin-bottom:16px;"><i class="fas fa-exclamation-triangle"></i> 以下题目需巩固：</h3>`;
    wrongItems.forEach(item => {
      const aiBoxId = `ai-${item.id}`;
      wrongList.innerHTML += `
        <div class="wrong-item">
          <h3><i class="fas fa-question-circle"></i> 第${item.id}题</h3>
          <div class="question-text">${item.question}</div>
          <div><strong>你的答案：</strong><span style="color:${item.userAns===item.answer?'green':'red'}">${item.userAns || "未作答"}</span></div>
          <div><strong>正确答案：</strong><span class="success">${item.answer}</span></div>
          <div class="explanation"><strong>标准解析：</strong>${item.standardExplain}</div>

          <div class="btn-row">
            <button class="btn-small btn-voice" onclick="speakText('${item.id}', '${item.question}', '${item.standardExplain}')">
              <i class="fas fa-volume-up"></i> 语音讲解
            </button>
            <button class="btn-small btn-ai" onclick="fetchAIDemo(${item.id})">
              <i class="fas fa-robot"></i> AI助教讲解
            </button>
          </div>

          <div class="ai-box" id="${aiBoxId}"></div>
        </div>
      `;
    });
  }

  resultBox.scrollIntoView({ behavior: "smooth" });
};

function speakText(id, question, explain) {
  const text = `第${id}题：${question}。正确答案是${questions.find(q=>q.id===parseInt(id)).answer}。解析：${explain}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// ✅ 真实调用 DeepSeek API（通过 /api/deepseek 代理）
window.fetchAIDemo = async function(id) {
  const q = questions.find(x => x.id === id);
  const userAns = currentAnswers[id] || "未作答";
  const aiBox = document.getElementById(`ai-${id}`);
  aiBox.innerHTML = `<div class="loading"></div> 正在请求 DeepSeek AI...`;
  aiBox.classList.add("show");

  try {
    const response = await fetch("/.netlify/functions/deepseek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: q.question,
        options: q.options,
        userAnswer: userAns,
        correctAnswer: q.answer,
        standardExplain: q.standardExplain,
        grade: "七年级",
        subject: "道德与法治"
      })
    });

    const data = await response.json();
    if (response.ok && data?.choices?.[0]?.message?.content) {
      const content = data.choices[0].message.content.trim();
      aiBox.innerHTML = `<p><strong>🤖 AI助教亲切版讲解：</strong><br>${content}</p>`;
      speakText(id, q.question, content); // 自动朗读
    } else {
      throw new Error("AI 返回内容异常");
    }
  } catch (err) {
    console.error("AI请求失败", err);
    aiBox.innerHTML = `<div style="color:var(--danger);"><i class="fas fa-exclamation-circle"></i> 请求失败：${err.message || '网络错误'}</div>`;
  }
};

window.resetQuiz = function() {
  currentAnswers = {};
  document.querySelectorAll(".option-item").forEach(el => el.classList.remove("selected"));
  document.querySelectorAll("input[type='radio']").forEach(r => r.checked = false);
  document.getElementById("resultBox").style.display = "none";
  document.getElementById("wrongList").innerHTML = "";
  document.getElementById("scoreText").innerHTML = "请完成答题";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
  document.getElementById("submitBtn").addEventListener("click", submitQuiz);
  document.getElementById("resetBtn").addEventListener("click", resetQuiz);
});