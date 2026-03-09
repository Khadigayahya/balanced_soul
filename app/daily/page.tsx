"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Task {
  id: number;
  text: string;
  done: boolean;
  type: "دين" | "دنيا";
  start_date: string;
  duration_type: "يوم" | "أسبوع" | "شهر" | "مخصص";
  end_date: string;
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

const calcEndDate = (start: string, duration: string, customEnd: string) => {
  if (duration === "مخصص") return customEnd;
  const d = new Date(start);
  if (duration === "يوم") d.setDate(d.getDate() + 1);
  if (duration === "أسبوع") d.setDate(d.getDate() + 7);
  if (duration === "شهر") d.setMonth(d.getMonth() + 1);
  return d.toISOString().split("T")[0];
};

export default function DailyPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskType, setTaskType] = useState<"دين" | "دنيا">("دنيا");
  const [durationType, setDurationType] = useState<"يوم" | "أسبوع" | "شهر" | "مخصص">("يوم");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [customEnd, setCustomEnd] = useState("");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [adhkarDone, setAdhkarDone] = useState<boolean[]>(Array(ADHKAR.length).fill(false));
  const [todayDhikr, setTodayDhikr] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const userId = session.user.id;

      const { data: tasksData } = await supabase
        .from("tasks").select("*").eq("user_id", userId);
      if (tasksData) setTasks(tasksData);

      const { data: achievementsData } = await supabase
        .from("achievements").select("*").eq("user_id", userId)
        .order("id", { ascending: false });
      if (achievementsData) setAchievements(achievementsData);

      const savedAdhkar = localStorage.getItem("bawsala-adhkar");
      if (savedAdhkar) setAdhkarDone(JSON.parse(savedAdhkar));
    });
  }, []);

  const getUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user.id;
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const userId = await getUserId();
    const end_date = calcEndDate(startDate, durationType, customEnd);
    const { data } = await supabase
      .from("tasks")
      .insert({
        user_id: userId,
        text: newTask,
        done: false,
        type: taskType,
        start_date: startDate,
        duration_type: durationType,
        end_date,
      })
      .select().single();
    if (data) setTasks([...tasks, data]);
    setNewTask("");
    setCustomEnd("");
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newDone = !task.done;
    await supabase.from("tasks").update({ done: newDone }).eq("id", id);
    setTasks(tasks.map(t => t.id === id ? { ...t, done: newDone } : t));

    if (newDone) {
      const userId = await getUserId();
      const date = new Date().toLocaleDateString("ar-EG");
      const { data } = await supabase
        .from("achievements")
        .insert({ user_id: userId, text: task.text, date })
        .select().single();
      if (data) setAchievements(prev => [data, ...prev]);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000);
    } else {
      const match = achievements.find(a => a.text === task.text);
      if (match) {
        await supabase.from("achievements").delete().eq("id", match.id);
        setAchievements(prev => prev.filter(a => a.id !== match.id));
      }
    }
  };

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const deleteAchievement = async (id: number, text: string) => {
    await supabase.from("achievements").delete().eq("id", id);
    setAchievements(prev => prev.filter(a => a.id !== id));

    const match = tasks.find(t => t.text === text && t.done);
    if (match) {
      await supabase.from("tasks").update({ done: false }).eq("id", match.id);
      setTasks(prev => prev.map(t => t.id === match.id ? { ...t, done: false } : t));
    }
  };

  const addAchievement = async () => {
    if (!newAchievement.trim()) return;
    const userId = await getUserId();
    const date = new Date().toLocaleDateString("ar-EG");
    const { data } = await supabase
      .from("achievements")
      .insert({ user_id: userId, text: newAchievement, date })
      .select().single();
    if (data) setAchievements([data, ...achievements]);
    setNewAchievement("");
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 3000);
  };

  const saveAdhkar = (updated: boolean[]) => {
    setAdhkarDone(updated);
    localStorage.setItem("bawsala-adhkar", JSON.stringify(updated));
    setTodayDhikr(updated.filter(Boolean).length);
  };

  const toggleAdhkar = (i: number) => {
    const updated = [...adhkarDone];
    updated[i] = !updated[i];
    saveAdhkar(updated);
  };

  const pendingTasks = tasks.filter(t => !t.done);
  const doneTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const adhkarCount = adhkarDone.filter(Boolean).length;

  return (
    <main>
      <nav className="nav">
        <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>
        <ul className="nav-links">
          <li><a href="/#vision">رؤيتنا</a></li>
          <li><a href="/audio">المسموعات</a></li>
          <li><a href="/readings">المقروءات</a></li>
          <li><a href="/daily">يومياتي</a></li>
          <li><a href="/adhkar">أذكاري</a></li>
          <li><a href="/consultation">استشارة</a></li>
        </ul>
      </nav>

      {celebrate && (
        <div className="celebrate-banner">
          ✨ أحسنت! كل إنجاز يقربك من هدفك — بارك الله فيك ✨
        </div>
      )}

      <div className="daily-header">
        <span className="section-label">يومياتي</span>
        <h1 className="section-title">يومٌ جديد، فرصةٌ جديدة</h1>
        <p className="section-subtitle">نظّم يومك بتوازن بين أمور الدين والدنيا، وسجّل إنجازاتك مهما صغرت.</p>
      </div>

      <div className="daily-grid">

        <div className="daily-card progress-card">
          <h2 className="card-title">📊 تقدّم اليوم</h2>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-num">{doneTasks}</span>
              <span className="stat-label">مهمة مكتملة</span>
            </div>
            <div className="stat">
              <span className="stat-num">{pendingTasks.length}</span>
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
          <p className="progress-label">{progress}% من المهام</p>
        </div>

        <div className="daily-card tasks-card">
          <h2 className="card-title">📋 مهامي</h2>

          <div className="task-input-group">
            <input
              className="task-input"
              placeholder="أضف مهمة جديدة..."
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
            />
            <div className="task-meta-row">
              <select className="task-type-select" value={taskType}
                onChange={e => setTaskType(e.target.value as "دين" | "دنيا")}>
                <option value="دنيا">دنيا</option>
                <option value="دين">دين</option>
              </select>
              <select className="task-type-select" value={durationType}
                onChange={e => setDurationType(e.target.value as any)}>
                <option value="يوم">يوم</option>
                <option value="أسبوع">أسبوع</option>
                <option value="شهر">شهر</option>
                <option value="مخصص">مخصص</option>
              </select>
              <input type="date" className="task-date-input" value={startDate}
                onChange={e => setStartDate(e.target.value)} />
              {durationType === "مخصص" && (
                <input type="date" className="task-date-input" value={customEnd}
                  onChange={e => setCustomEnd(e.target.value)} />
              )}
              <button className="task-add-btn" onClick={addTask}>إضافة</button>
            </div>
          </div>

          {pendingTasks.length === 0 && (
            <p className="empty-msg">لا توجد مهام متبقية — أحسنت! 🌱</p>
          )}

          <ul className="tasks-list">
            {pendingTasks.map(task => (
              <li key={task.id} className="task-item">
                <button className="task-check" onClick={() => toggleTask(task.id)}></button>
                <div className="task-info">
                  <span className="task-text">{task.text}</span>
                  <span className="task-dates">
                    {task.start_date} ← {task.end_date} · {task.duration_type}
                  </span>
                </div>
                <span className={`task-badge ${task.type === "دين" ? "badge-deen" : "badge-dunya"}`}>
                  {task.type}
                </span>
                <button className="task-delete" onClick={() => deleteTask(task.id)}>×</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="daily-card adhkar-card">
          <h2 className="card-title">🤲 أذكار اليوم</h2>
          <ul className="adhkar-list">
            {ADHKAR.map((dhikr, i) => (
              <li key={i}
                className={`adhkar-item ${adhkarDone[i] ? "adhkar-done" : ""}`}
                onClick={() => toggleAdhkar(i)}>
                <span className="adhkar-check">{adhkarDone[i] ? "✓" : "○"}</span>
                <span className="adhkar-text">{dhikr}</span>
              </li>
            ))}
          </ul>
          <p className="adhkar-progress">{adhkarCount} / {ADHKAR.length} أذكار مكتملة</p>
        </div>

        <div className="daily-card achievements-card">
          <h2 className="card-title">🌟 إنجازاتي</h2>
          <div className="achievement-input-row">
            <input
              className="task-input"
              placeholder="سجّل إنجازاً يدوياً..."
              value={newAchievement}
              onChange={e => setNewAchievement(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addAchievement()}
            />
            <button className="task-add-btn" onClick={addAchievement}>تسجيل</button>
          </div>

          {achievements.length === 0 && (
            <p className="empty-msg">أنجز مهمة لتظهر هنا تلقائياً 🌱</p>
          )}

          <ul className="achievements-list">
            {achievements.map(a => (
              <li key={a.id} className="achievement-item">
                <span className="achievement-icon">✦</span>
                <div>
                  <p className="achievement-text">{a.text}</p>
                  <p className="achievement-date">{a.date}</p>
                </div>
                <button className="task-delete" onClick={() => deleteAchievement(a.id, a.text)}>×</button>
              </li>
            ))}
          </ul>
        </div>

      </div>

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