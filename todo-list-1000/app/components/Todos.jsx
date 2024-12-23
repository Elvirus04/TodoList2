"use client";
import { useState } from "react";

export default function Todos() {
  const [todo, setTodo] = useState(""); // Gère le texte de la nouvelle tâche
  const [todos, setTodos] = useState([]); // Liste des tâches
  const [editingIndex, setEditingIndex] = useState(null); // Indice de la tâche en cours de modification
  const [editValue, setEditValue] = useState(""); // Texte temporaire pour modification

  // Gère le changement de l'entrée pour une nouvelle tâche
  function addTodoInput(e) {
    setTodo(e.target.value);
  }

  // Ajoute une nouvelle tâche
  function addTodo() {
    if (todo.trim() === "") return alert("La tâche ne peut pas être vide.");
    if (todos.includes(todo)) return alert("La tâche existe déjà.");
    setTodos([...todos, todo]);
    setTodo(""); // Réinitialise l'entrée
  }

  // Supprime une tâche par son indice
  const deleteTodo = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  // Active le mode d'édition pour une tâche
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditValue(todos[index]); // Charge la valeur actuelle de la tâche à modifier
  };

  // Gère la modification de la tâche
  const editTodoInput = (e) => {
    setEditValue(e.target.value);
  };

  // Enregistre la tâche modifiée
  const saveEdit = () => {
    const updatedTodos = todos.map((item, index) =>
      index === editingIndex ? editValue : item
    );
    setTodos(updatedTodos);
    setEditingIndex(null); // Désactive le mode d'édition
    setEditValue(""); // Réinitialise la valeur temporaire
  };

  return (
    <>
      <input
        value={todo}
        onChange={addTodoInput}
        placeholder="Nouvelle tâche"
      />

      <button onClick={addTodo}>Ajouter</button>

      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              // Mode édition
              <>
                <input
                  value={editValue}
                  onChange={editTodoInput}
                  placeholder="Modifier la tâche"
                />
                <button onClick={saveEdit}>Enregistrer</button>
                <button onClick={() => setEditingIndex(null)}>Annuler</button>
              </>
            ) : (
              // Mode affichage
              <>
                {todo}
                <button onClick={() => startEditing(index)}>Modifier</button>
                <button onClick={() => deleteTodo(index)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
