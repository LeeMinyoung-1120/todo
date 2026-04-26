import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 프로젝트 UI 설계', category: 'Study', priority: 'High', date: '2026.04.25 (토)', completed: false },
    { id: 2, text: '매일 30분 운동하기', category: 'Health', priority: 'Low', date: '2026.05.02 (토)', completed: true },
    { id: 3, text: '주간 회의 자료 준비', category: 'Work', priority: 'Medium', date: '2026.05.01 (금)', completed: false },
  ]);

  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filteredTodos = todos.filter(todo => {
    const matchCategory = categoryFilter === '전체' || todo.category === categoryFilter;
    const matchStatus = 
      statusFilter === '전체' || 
      (statusFilter === '진행 중' && !todo.completed) || 
      (statusFilter === '완료' && todo.completed);
    
    return matchCategory && matchStatus;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>ClearTodo</h1>
            <p className={styles.subtitle}>
              오늘 할 일을 계획하고 완벽하게 달성해보세요.
            </p>
          </div>
          <div className={styles.headerDate}>
            ☀️ 2026년 4월 25일 (토)
          </div>
        </header>
        <section className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>전체 할 일</span>
            <span className={styles.statNumber} style={{ color: '#6C83FF' }}>12</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>완료한 일</span>
            <span className={styles.statNumber} style={{ color: '#22C55E' }}>5</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>진행 중</span>
            <span className={styles.statNumber} style={{ color: '#FFB800' }}>7</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>오늘 마감</span>
            <span className={styles.statNumber} style={{ color: '#8B5CF6' }}>3</span>
          </div>
        </section>

        <section className={styles.filterSection}>
          <div className={styles.filterHeader}>필터</div>

          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>카테고리</span>
              <div className={styles.filterButtons}>
                {['전체', '🔵 Study', '🟠 Work', '🟢 Health', '🟣 Personal'].map((cat) => (
                  <button 
                    key={cat}
                    className={`${styles.filterBtn} ${categoryFilter === cat ? styles.filterBtnActive : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                  {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>상태</span>
              <div className={styles.filterButtons}>
                {['전체', '진행 중', '완료'].map((status) => (
                  <button 
                    key={status}
                    className={`${styles.filterBtn} ${statusFilter === status ? styles.filterBtnActive : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.searchRow}>
            <div className={styles.leftBlock}>
              <input
                className={styles.searchInput}
                placeholder="할 일 검색..."
              />
            </div>

            <div className={styles.rightBlock}>
              <select className={styles.sortSelect}>
                <option>정렬: 마감일 순</option>
                <option>정렬: 생성일 순</option>
                <option>정렬: 중요도 순</option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.addCard}>
          <h2 className={styles.sectionTitle}>할 일 추가</h2>

          <input
            className={styles.inputMain}
            placeholder="할 일을 입력하세요..."
          />

          <div className={styles.addOptionsRow}>
            <div className={styles.selectors}>
              <select className={styles.selectBox}>
                <option>카테고리 선택</option>
                <option>Study</option>
                <option>Work</option>
                <option>Health</option>
                <option>Personal</option>
              </select>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className={styles.priorityBtn} style={{ color: '#FF6B6B' }}>High</button>
                <button className={styles.priorityBtn}>Medium</button>
                <button className={styles.priorityBtn}>Low</button>
              </div>

              <input type="date" className={styles.selectBox} />
            </div>

            <button className={styles.plusButton}>+</button>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            전체 할 일 <span style={{ color: '#6C83FF' }}>12</span>
          </h2>

          {todos.map(todo => (
            <div key={todo.id} className={styles.todoItem}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={todo.completed} readOnly />

                <span className={styles.todoText}>
                  {todo.text}
                </span>

                <span className={`${styles.tag} ${styles.categoryStudy}`}>
                  {todo.category}
                </span>

                <span className={`${styles.tag} ${
                  todo.priority === 'High'
                    ? styles.priorityHigh
                    : todo.priority === 'Medium'
                    ? styles.priorityMedium
                    : styles.priorityLow
                }`}>
                  {todo.priority}
                </span>
              </div>
              <div className={styles.dateCaption}>
                {todo.date}
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}

export default App;