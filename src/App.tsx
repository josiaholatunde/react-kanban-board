import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Switch, Route } from 'react-router-dom';
import KanbanBoard from './components/kanban/KanbanBoard';
import { ToastContainer } from 'react-toastify';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Header />
        <Switch>
          <Route path="/dashboard" component={KanbanBoard} />
          <Route path="/" component={KanbanBoard} />
        </Switch>
        <Footer />
    </div>
  );
}

export default App;
