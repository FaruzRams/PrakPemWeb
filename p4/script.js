// 1. Ambil elemen dari HTML
const todoInput = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const todoList = document.getElementById('todo-list')

// 2. Data kita (State)
let todos = JSON.parse(localStorage.getItem('todos')) || []

// 3. Fungsi render — tugasnya SATU: tampilkan data ke layar
function renderTodos() {
    todoList.innerHTML = '' // Bersihkan dulu

    todos.forEach((todo) => {
        const li = document.createElement('li')
        li.className = 'flex justify-between items-center p-3 border rounded'
        
        li.innerHTML = `
            <span onclick="toggleTodo(${todo.id})" 
                  style="cursor:pointer; ${todo.completed ? 'text-decoration:line-through; color:gray' : ''}">
                ${todo.text}
            </span>
            <button onclick="deleteTodo(${todo.id})" style="color:red">
                Hapus
            </button>
        `
        
        todoList.appendChild(li)
    })

    // Simpan ke localStorage setiap kali render
    localStorage.setItem('todos', JSON.stringify(todos))
}

// 4. Fungsi tambah todo
function addTodo() {
    const value = todoInput.value.trim()
    
    if (value === '') return // Kalau kosong, stop
    
    const todoBaru = {
        id: Date.now(), // ID unik dari timestamp
        text: value,
        completed: false
    }
    
    todos = [...todos, todoBaru] // Spread! Bikin array baru
    
    renderTodos() // Perbarui tampilan
    todoInput.value = '' // Kosongkan input
}

// Dengerin klik tombol
addBtn.addEventListener('click', addTodo)

// Dengerin kalau tekan Enter
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo()
})

// 5. Toggle selesai/belum
window.toggleTodo = (id) => {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed }
        }
        return todo
    })
    renderTodos()
}

// 6. Hapus todo
window.deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id)
    renderTodos()
}

// Jalankan render pertama kali
renderTodos()