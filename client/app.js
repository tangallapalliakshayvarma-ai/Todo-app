// If you host the frontend with the same Express server, keep baseUrl empty.
// If you open index.html directly via file://, set this to 'http://localhost:5000'
const baseUrl = '';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const count = document.getElementById('count');
const filters = document.querySelectorAll('.filters button');
const clearBtn = document.getElementById('clear-completed');

let currentFilter = 'all';
let todos = [];

async function fetchTodos() {
  const res = await fetch(`${baseUrl}/api/todos`);
  todos = await res.json();
  render();
}

function render() {
  list.innerHTML = '';
  const filtered = todos.filter(t => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true;
  });

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = 'todo';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = t.completed;
    checkbox.addEventListener('change', () => toggleCompleted(t._id, checkbox.checked));

    const title = document.createElement('span');
    title.className = 'todo-title' + (t.completed ? ' completed' : '');
    title.textContent = t.title;
    title.title = 'Click to edit';
    title.addEventListener('click', () => startInlineEdit(title, t));

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => deleteTodo(t._id));

    actions.appendChild(del);

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(actions);
    list.appendChild(li);
  });

  const remaining = todos.filter(t => !t.completed).length;
  count.textContent = `${remaining} item${remaining === 1 ? '' : 's'} left`;
  filters.forEach(b => b.classList.toggle('active', b.dataset.filter === currentFilter));
}

function startInlineEdit(span, todo) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.title;
  input.style.flex = '1';
  span.replaceWith(input);
  input.focus();

  const commit = async () => {
    const newTitle = input.value.trim();
    if (newTitle && newTitle !== todo.title) {
      await updateTodo(todo._id, { title: newTitle });
    } else {
      render();
    }
  };
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') render();
  });
}

async function createTodo(title) {
  const res = await fetch(`${baseUrl}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  if (!res.ok) {
    const err = await res.json();
    alert(err.error || 'Failed to add todo');
    return;
  }
  const todo = await res.json();
  todos.unshift(todo);
  render();
}

async function updateTodo(id, update) {
  const res = await fetch(`${baseUrl}/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  });
  if (!res.ok) {
    alert('Failed to update');
    return;
  }
  const updated = await res.json();
  const idx = todos.findIndex(t => t._id === id);
  if (idx !== -1) todos[idx] = updated;
  render();
}

async function toggleCompleted(id, completed) {
  await updateTodo(id, { completed });
}

async function deleteTodo(id) {
  const res = await fetch(`${baseUrl}/api/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    alert('Failed to delete');
    return;
  }
  todos = todos.filter(t => t._id !== id);
  render();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  createTodo(title);
  input.value = '';
});

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener('click', async () => {
  const completed = todos.filter(t => t.completed);
  for (const t of completed) {
    await deleteTodo(t._id);
  }
});

fetchTodos();
