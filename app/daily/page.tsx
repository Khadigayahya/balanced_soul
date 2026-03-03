"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
  type: "دين" | "دنيا";
}

interface Achievement {
  id: number;
  text: string;
  date: string;
}

const ADHKAR = [
  "سبحان الله وبحمده، سبحان الله العظيم",
  "اللهم إني أسألك العفو والعافية في الدنيا والآخرة",
  "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
  "اللهم أعني على ذكرك وشكرك وحسن عبادتك",
  "رب اشرح لي صدري ويسر لي أمري",
];

export default function DailyPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskType, setTaskType] = useState<"دين" | "دنيا">("دنيا");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [adhkarDone, setAdhkarDone] = useState<boolean[]>(Array(ADHKAR.length).fill(false));
  const [todayDhikr, setTodayDhikr] = useState(0);

  useEffect(() => {
    const savedTasks = localStorage.getItem("bawsala-tasks");
    const savedAchievements = localStorage.getItem("bawsala-achievements");
    const savedAdhkar = localStorage.getItem("bawsala-adhkar");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedAdhkar) setAdhkarDone(JSON.parse(savedAdhkar));
  }, []);

  const saveTasks = (updated: Task[]) => {
    setTasks(updated);
    localStorage.setItem("bawsala-tasks", JSON.stringify(updated));
  };

  const saveAchievements = (updated: Achievement[]) => {
    setAchievements(updated);
    localStorage.setItem("bawsala-achievements", JSON.stringify(updated));
  };

  const saveAdhkar = (updated: boolean[]) => {
    setAdhkarDone(updated);
    localStorage.setItem("bawsala-adhkar", JSON.stringify(updated));
    setTodayDhikr(updated.filter(Boolean).length);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now(), text: newTask, done: false, type: taskType }];
    saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasks(updated);
  };

  const deleteTask = (id: number) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const addAchievement = () => {
    if (!newAchievement.trim()) return;
    const updated = [
      { id: Date.now(), text: newAchievement, date: new Date().toLocaleDateString("ar-EG") },
      ...achievements,
    ];
    saveAchievements(updated);
    setNewAchievement("");
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 3000);
  };

  const toggleAdhkar = (i: number) => {
    const updated = [...adhkarDone];
    updated[i] = !updated[i];
    saveAdhkar(updated);
  };

  const doneTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const adhkarCount = adhkarDone.filter(Boolean).length;

  return (
    <main>
      <nav className="nav">
        <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>
        <ul className="nav-links">
          <li><a href="/audio">المسموعات</a></li>
          <li><a href="/daily">يومياتي</a></li>
          <li><a href="/#vision">رؤيتنا</a></li>
        </ul>
      </nav>

      {/* CELEBRATE */}
      {celebrate && (
        <div className="celebrate-banner">
          ✨ أحسنت! كل إنجاز يقربك من هدفك — بارك الله فيك ✨
        </div>
      )}

      {/* HEADER */}
      <div className="daily-header">
        <span className="section-label">يومياتي</span>
        <h1 className="section-title">يومٌ جديد، فرصةٌ جديدة</h1>
        <p className="section-subtitle">
          نظّم يومك بتوازن بين أمور الدين والدنيا، وسجّل إنجازاتك مهما صغرت.
        </p>
      </div>

      <div className="daily-grid">

        {/* PROGRESS */}
        <div className="daily-card progress-card">
          <h2 className="card-title">📊 تقدّم اليوم</h2>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-num">{doneTasks}</span>
              <span className="stat-label">مهمة مكتملة</span>
            </div>
            <div className="stat">
              <span className="stat-num">{totalTasks - doneTasks}</span>
              <span className="stat-label">مهمة متبقية</span>
            </div>
            <div className="stat">
              <span className="stat-num">{adhkarCount}</span>
              <span className="stat-label">ذكر مكتمل</span>
            </div>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-label">{progress}% من مهام اليوم</p>
        </div>

        {/* TASKS */}
        <div className="daily-card tasks-card">
          <h2 className="card-title">📋 مهام اليوم</h2>
          <div className="task-input-row">
            <input
              className="task-input"
              placeholder="أضف مهمة جديدة..."
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
            />
            <select
              className="task-type-select"
              value={taskType}
              onChange={e => setTaskType(e.target.value as "دين" | "دنيا")}
            >
              <option value="دنيا">دنيا</option>
              <option value="دين">دين</option>
            </select>
            <button className="task-add-btn" onClick={addTask}>إضافة</button>
          </div>

          {tasks.length === 0 && (
            <p className="empty-msg">لا توجد مهام بعد — ابدأ بإضافة مهمتك الأولى 🌱</p>
          )}

          <ul className="tasks-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.done ? "task-done" : ""}`}>
                <button className="task-check" onClick={() => toggleTask(task.id)}>
                  {task.done ? "✓" : ""}
                </button>
                <span className="task-text">{task.text}</span>
                <span className={`task-badge ${task.type === "دين" ? "badge-deen" : "badge-dunya"}`}>
                  {task.type}
                </span>
                <button className="task-delete" onClick={() => deleteTask(task.id)}>×</button>
              </li>
            ))}
          </ul>
        </div>

        {/* ADHKAR */}
        <div className="daily-card adhkar-card">
          <h2 className="card-title">🤲 أذكار اليوم</h2>
          <ul className="adhkar-list">
            {ADHKAR.map((dhikr, i) => (
              <li
                key={i}
                className={`adhkar-item ${adhkarDone[i] ? "adhkar-done" : ""}`}
                onClick={() => toggleAdhkar(i)}
              >
                <span className="adhkar-check">{adhkarDone[i] ? "✓" : "○"}</span>
                <span className="adhkar-text">{dhikr}</span>
              </li>
            ))}
          </ul>
          <p className="adhkar-progress">{adhkarCount} / {ADHKAR.length} أذكار مكتملة</p>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="daily-card achievements-card">
          <h2 className="card-title">🌟 إنجازاتي</h2>
          <div className="achievement-input-row">
            <input
              className="task-input"
              placeholder="سجّل إنجازاً اليوم..."
              value={newAchievement}
              onChange={e => setNewAchievement(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addAchievement()}
            />
            <button className="task-add-btn" onClick={addAchievement}>تسجيل</button>
          </div>

          {achievements.length === 0 && (
            <p className="empty-msg">سجّل أول إنجازاتك — مهما كان صغيراً فهو يستحق 🌱</p>
          )}

          <ul className="achievements-list">
            {achievements.map(a => (
              <li key={a.id} className="achievement-item">
                <span className="achievement-icon">✦</span>
                <div>
                  <p className="achievement-text">{a.text}</p>
                  <p className="achievement-date">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* HADITH */}
      <div className="hadith-section">
        <p className="hadith-text">«الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ»</p>
        <p className="hadith-source">صحيح مسلم</p>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}