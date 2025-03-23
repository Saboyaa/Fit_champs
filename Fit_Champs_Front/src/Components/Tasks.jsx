import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";

function Tasks({ initialTasks = [], onTasksUpdate }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [newTask, setNewTask] = useState({
    id: null,
    text: "Segunda-feira",
    descripition: "Treino de Peito",
    Nexercicio: 1,
    reminder: false,
  });

  // Notifica o componente pai sempre que as tasks mudarem
  useEffect(() => {
    if (onTasksUpdate) {
      onTasksUpdate(tasks);
    }
  }, [tasks, onTasksUpdate]);

  const toggleReminderCheck = (id, opcaoDescricao) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, descripition: opcaoDescricao, reminder: !task.reminder }
        : task
    );
    setTasks(updatedTasks);
  };

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTaskWithId = { id, ...task };
    setTasks([...tasks, newTaskWithId]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSelectChange = (id, field, value) => {
    setSelectedOptions({ ...selectedOptions, [`${id}-${field}`]: value });
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.text) {
      alert("Por favor, adicione um dia da semana");
      return;
    }
    addTask(newTask);
    setNewTask({
      text: "Segunda-feira",
      descripition: "Treino de Peito",
      Nexercicio: 1,
      reminder: false,
    });
  };

  return (
    <div className="bg-sky-950 p-5 shadow rounded-md">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-gray-200 mb-1">Dia da Semana</label>
            <select
              name="text"
              value={newTask.text}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-800 text-white rounded-md"
            >
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-200 mb-1">Tipo de Treino</label>
            <select
              name="descripition"
              value={newTask.descripition}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-800 text-white rounded-md"
            >
              <option value="Treino de Peito">Peito</option>
              <option value="Treino de Costas">Costas</option>
              <option value="Treino de Braço">Braço</option>
              <option value="Treino de Perna">Perna</option>
              <option value="Treino de Ombro">Ombro</option>
              <option value="Day Off">Day Off</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-200 mb-1">
              Número de Exercícios
            </label>
            <select
              name="Nexercicio"
              value={newTask.Nexercicio}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-800 text-white rounded-md"
            >
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-neutral-800 text-white p-2 rounded-md flex items-center gap-2 hover:opacity-80"
          >
            <PlusCircleIcon size={22} />
            Adicionar Tarefa
          </button>
        </div>
      </form>

      {tasks.length > 0 ? (
        <div className="space-y-3">
          <h3 className="font-bold text-gray-200">Suas Tarefas:</h3>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center gap-2"
              >
                <span className="bg-neutral-800 text-white p-2 rounded-md w-full text-left">
                  {task.text} - {task.descripition} ({task.Nexercicio}{" "}
                  exercícios)
                </span>
                <select
                  name="descripition"
                  className="bg-neutral-800 text-white p-2 rounded-md"
                  onChange={(e) =>
                    handleSelectChange(task.id, "descripition", e.target.value)
                  }
                  value={task.descripition}
                >
                  <option value="Treino de Peito">Peito</option>
                  <option value="Treino de Costas">Costas</option>
                  <option value="Treino de Braço">Braço</option>
                  <option value="Treino de Perna">Perna</option>
                  <option value="Treino de Ombro">Ombro</option>
                  <option value="Day Off">Day Off</option>
                </select>
                <select
                  name="Nexercicio"
                  className="bg-neutral-800 text-white p-2 rounded-md"
                  onChange={(e) =>
                    handleSelectChange(task.id, "Nexercicio", e.target.value)
                  }
                  value={task.Nexercicio}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-md bg-neutral-800 text-white"
                >
                  <TrashIcon size={24} className="hover:opacity-80" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-200 text-center">Nenhum treino adicionado.</p>
      )}
    </div>
  );
}

export default Tasks;
