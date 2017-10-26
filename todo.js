var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.    
    this.todos.forEach(function(todo) { // we pass a callback function with an argument named 'todo' because each time the forEach function is called on one specific todo 
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      // Case 1: If everything’s true, make everything false.
      if (completedTodos === totalTodos) {
          todo.completed = false;
           // Case 2: Otherwise, make everything true.
        } else {
          todo.completed = true;
        }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    // this === refers to the view object
    // the callback function is not a function/method on our view object
    // we need to do: forEach(callback, this) // here 'this' is equal to the 'this' in 'view'. Before 'this' was in the callback function scope
    
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id = position; 
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());  // append a delete button to our todo Li (we pass it to our new delete button)
      todosUl.appendChild(todoLi);
    }, this); // the 'this' is the same inside our displayTodo method
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    // access the delete elements
    deleteButton.className = 'deleteButton';
    return deleteButton;
  }, 
  setUpEventListener: function() { // this event delegation pattern listen to every click on Ul, but the if statement acts only if element = deleteButton
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
        // Get the element that was clicked on
        var elementClicked = event.target;

        // Check if elementClicked id a delete button
        if (elementClicked.className === 'deleteButton') {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); // we get the elementClicked, we look at his parent id, 
          //because it's a string we use parseInt to transform strings into a number/ then we pass that number into handlers.deleteTodo
      }
    });
  }
};

view.setUpEventListener();











