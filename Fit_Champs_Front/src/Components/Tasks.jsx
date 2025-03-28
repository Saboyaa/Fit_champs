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

  return (
    <div>
      <div className="bg-sky-900/50 p-6 shadow-lg rg-sky-950ounded-xl ">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-blue-100 mb-2 font-semibold">
                Dia da Semana
              </label>
              <select
                name="text"
                value={newTask.text}
                onChange={handleInputChange}
                className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:ring-2 focus:ring-sky-600"
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
                Tipo de Treino
              </label>
              <select
                name="descripition"
                value={newTask.descripition}
                onChange={handleInputChange}
                className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:ring-2 focus:ring-sky-600"
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
                Número de Exercícios
              </label>
              <select
                name="Nexercicio"
                value={newTask.Nexercicio}
                onChange={handleInputChange}
                className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:ring-2 focus:ring-sky-600"
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
              className="bg-neutral-800 text-blue-100 px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-neutral-700 transition-colors duration-300"
            >
              <PlusCircleIcon size={24} />
              Adicionar Treino
            </button>
          </div>
        </form>
      </div>
      {tasks.length > 0 ? (
        <div className="bg-sky-900/50 p-6 shadow-lg rounded-xl mb-8 mt-5">
          <div className="space-y-4 mt-5">
            <h3 className="font-bold text-2xl text-blue-100 mb-4">
              Treinos Adicionados:
            </h3>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-grow mr-4">
                    <p className="text-white font-semibold text-lg">
                      {task.text} - {task.descripition}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Data: {task.data} | {task.Nexercicio} exercícios
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 rounded-full bg-sky-700 text-white hover:bg-red-400 transition-colors duration-300"
                    >
                      <TrashIcon size={24} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-sky-900/50 p-6 shadow-lg rounded-xl mb-8 mt-5">
          <p className="text-blue-100 text-center text-lg">
            Nenhum treino adicionado.
          </p>
        </div>
      )}
    </div>
  );
}

export default Tasks;
