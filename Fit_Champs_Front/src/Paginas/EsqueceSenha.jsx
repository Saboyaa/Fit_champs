import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";

function Tasks({ initialTasks = [], onTasksUpdate, weekStartDate }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedOptions, setSelectedOptions] = useState({});

  const calculateTaskDate = (dayOfWeek, startDate) => {
    const [day, month, year] = startDate.split("-").map(Number);
    const baseDate = new Date(2000 + year, month - 1, day);

    const dayOffsets = {
      Domingo: 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      Sábado: 6,
    };

    const taskDate = new Date(baseDate);
    taskDate.setDate(baseDate.getDate() + dayOffsets[dayOfWeek]);

    return `${taskDate.getDate().toString().padStart(2, "0")}-${(
      taskDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${taskDate.getFullYear().toString().slice(-2)}`;
  };

  const [newTask, setNewTask] = useState({
    id: null,
    text: "Segunda-feira",
    descripition: "Treino de Peito",
    Nexercicio: 1,
    reminder: false,
    volumedetreino: 0,
    data: calculateTaskDate("Segunda-feira", weekStartDate),
  });

  useEffect(() => {
    if (onTasksUpdate) {
      onTasksUpdate(tasks);
    }
  }, [tasks, onTasksUpdate]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTaskWithId = {
      ...task,
      id,
      data: calculateTaskDate(task.text, weekStartDate),
    };
    setTasks([...tasks, newTaskWithId]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSelectChange = (id, field, value) => {
    setSelectedOptions({ ...selectedOptions, [`${id}-${field}`]: value });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          [field]: value,
          ...(field === "text"
            ? { data: calculateTaskDate(value, weekStartDate) }
            : {}),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
      ...(name === "text"
        ? {
            data: calculateTaskDate(value, weekStartDate),
          }
        : {}),
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
      volumedetreino: 0,
      data: calculateTaskDate("Segunda-feira", weekStartDate),
    });
  };

  const getTrainingColor = (type) => {
    const colors = {
      "Treino de Peito": "bg-blue-900/10 text-blue-600",
      "Treino de Costas": "bg-green-900/10 text-green-600",
      "Treino de Braço": "bg-purple-900/10 text-purple-600",
      "Treino de Perna": "bg-red-900/10 text-red-600",
      "Treino de Ombro": "bg-yellow-900/10 text-yellow-600",
      "Day Off": "bg-gray-900/10 text-gray-600",
    };
    return colors[type] || "bg-blue-900/10 text-blue-600";
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-xl max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-blue-900/20 p-6 rounded-lg border border-blue-900/30 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-blue-100 mb-2 font-semibold">
              Dia da Semana:
            </label>
            <select
              name="text"
              value={newTask.text}
              onChange={handleInputChange}
              className="w-full p-3 bg-blue-900/30 text-white rounded-lg border border-blue-900/40 focus:ring-2 focus:ring-blue-600"
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

          <div>
            <label className="block text-blue-100 mb-2 font-semibold">
              Tipo de Treino:
            </label>
            <select
              name="descripition"
              value={newTask.descripition}
              onChange={handleInputChange}
              className="w-full p-3 bg-blue-900/30 text-white rounded-lg border border-blue-900/40 focus:ring-2 focus:ring-blue-600"
            >
              <option value="Treino de Peito">Peito</option>
              <option value="Treino de Costas">Costas</option>
              <option value="Treino de Braço">Braço</option>
              <option value="Treino de Perna">Perna</option>
              <option value="Treino de Ombro">Ombro</option>
              <option value="Day Off">Day Off</option>
            </select>
          </div>

          <div>
            <label className="block text-blue-100 mb-2 font-semibold">
              Número de Exercícios:
            </label>
            <select
              name="Nexercicio"
              value={newTask.Nexercicio}
              onChange={handleInputChange}
              className="w-full p-3 bg-blue-900/30 text-white rounded-lg border border-blue-900/40 focus:ring-2 focus:ring-blue-600"
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
            className="bg-blue-900/30 text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-blue-900/40 transition-colors duration-300"
          >
            <PlusCircleIcon size={24} />
            Adicionar Tarefa
          </button>
        </div>
      </form>

      {tasks.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-bold text-2xl text-blue-100 mb-4">
            Suas Tarefas:
          </h3>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-blue-900/20 rounded-lg p-4 flex items-center justify-between border border-blue-900/30 hover:border-blue-600 transition-all duration-300"
              >
                <div className="flex-grow mr-4">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm mb-2 ${getTrainingColor(
                      task.descripition
                    )}`}
                  >
                    {task.descripition}
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {task.text}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Data: {task.data} | {task.Nexercicio} exercícios
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    name="descripition"
                    className="bg-blue-900/30 text-white p-2 rounded-md border border-blue-900/40"
                    onChange={(e) =>
                      handleSelectChange(
                        task.id,
                        "descripition",
                        e.target.value
                      )
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
                    className="bg-blue-900/30 text-white p-2 rounded-md border border-blue-900/40"
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
                    className="p-2 rounded-md bg-blue-900/30 text-red-400 hover:bg-blue-900/40 transition-colors duration-300"
                  >
                    <TrashIcon size={24} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-200 text-center text-lg">
          Nenhum treino adicionado.
        </p>
      )}
    </div>
  );
}

export default Tasks;
