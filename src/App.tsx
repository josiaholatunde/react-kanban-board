import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { KanbanBoard } from './components/kanban/KanbanBoard';

function App() {
  return (
    <div className="App">
        <Header />
        <Switch>
          <Route path="/dashboard" component={KanbanBoard} />
          <Route path="/" component={KanbanBoard} />
        </Switch>
    </div>
  );
}

export default App;
