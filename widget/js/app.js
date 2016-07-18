var filterState = {
    none: 0,
    active: 1,
    completed: 2
};

let TodoBox = React.createClass({
    getInitialState: function() {
        return {
            todoName: '',
            filterState: filterState.none,
            todos: [
                {name: "Buy milk", isCompleted: true},
                {name: "Brush teeth", isCompleted: false}
            ]
        };
    },
    addTodo: function(name){
        var newState = this.state.todos;
        newState.unshift({name: name, isCompleted: false});

        this.setState({
            todoName: '',
            filterState: this.state.filterState,
            todos: newState
        });
    },
    updateFilter: function(filterState){
        this.setState({
            todoName: this.state.todoName,
            filterState: filterState,
            todos: this.state.todos
        });
    },
    render: function() {
        return (
            <div>
                <section className="todoapp">
                    <Header name={this.state.todoName} onNewTodo={this.addTodo}  />

                    <section className="main">
                        <ToogleAll />
                        <TodoList todos={this.state.todos} statusFilter={this.state.filterState} />
                    </section>
                    <Footer count={this.state.todos.length}
                            statusFilter={this.state.filterState}
                            onUpdateFilter={this.updateFilter} />
                </section>
                <SubFooter />
            </div>
        );
    }
});

let Header = React.createClass({
    add: function(event){
        if(event.keyCode == 13){
            this.props.onNewTodo(
                this.refs.todoName.value
            );

            this.refs.todoName.value = '';
        }
    },
    render: function(){
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" ref="todoName" placeholder="What needs to be done?" onKeyDown={this.add} />
            </header>
        );
    }
});

let Footer = React.createClass({
    showAll: function(){
        this.props.onUpdateFilter(filterState.none);
    },
    showActive: function(){
        this.props.onUpdateFilter(filterState.active);
    },
    showCompleted: function(){
        this.props.onUpdateFilter(filterState.completed);
    },
    render: function(){
        return (
           <footer className="footer">
               <span className="todo-count"><strong>{this.props.count}</strong> item left</span>
        
               <ul className="filters">
                   <li>
                       <a className={this.props.statusFilter === filterState.none ? 'selected' : ''}  href="#/" onClick={this.showAll}>All</a>
                   </li>
                   <li>
                       <a className={this.props.statusFilter === filterState.active ? 'selected' : ''} href="#/active" onClick={this.showActive}>Active</a>
                   </li>
                   <li>
                       <a className={this.props.statusFilter === filterState.completed ? 'selected' : ''} href="#/completed" onClick={this.showCompleted}>Completed</a>
                   </li>
               </ul>
        
               <button className="clear-completed">Clear completed</button>
           </footer>
        );
    }
});

let SubFooter = React.createClass({
   render: function(){
       return(
           <footer className="info">
               <p>Double-click to edit a todo</p>
               <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
               <p>Created by <a href="http://todomvc.com">you</a></p>
               <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
           </footer>
       );
   } 
});

let ToogleAll = React.createClass({
    render: function() {
        return (
            <div>
                <input className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">Mark all as complete</label>
            </div>
        );
    }
});

let TodoList = React.createClass({
    handleChange: function(name) {
        console.log(name);
    },
    render: function() {
        var globalFilter = this.props.statusFilter;

        let todo = this.props.todos.filter(function(todo){

            if(globalFilter === filterState.none){
                return true;
            }
            else {

                if(globalFilter == filterState.completed){
                    return (todo.isCompleted);
                }
                else{
                    return (!todo.isCompleted);
                }
            }
        }).map(function(todo) {
            return (
                <li className={todo.isCompleted ? 'checked completed' : ''} key={todo.name}>
                    <div className="view">
                        <input type="checkbox"
                               className="toggle"
                               defaultChecked={todo.isCompleted}
                               onClick={this.handleChange(todo.name)} />
                        <label>{todo.name}</label>
                        <button className="destroy"></button>
                    </div>
                </li>
            );
        }, this);
        return (
            <ul className="todo-list">
                <div id="content"></div>
                {todo}
            </ul>
        );
    }
});

ReactDOM.render(
<TodoBox />,
    document.getElementById('content')
);
