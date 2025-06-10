// Função para formatar data de forma consistente (dd/mm/yyyy)
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Função para formatar data no formato usado pelos treinos (dd-mm-yy)
const formatDateForTraining = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};

// Função para obter o range da semana atual
export const getWeekRange = () => {
  const currentDate = new Date();

  // Calcular o início da semana (domingo)
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay(); // 0 = domingo, 1 = segunda, etc.
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

  // Calcular o fim da semana (sábado)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
    startForTraining: formatDateForTraining(startOfWeek),
  };
};

// Função para mudar de semana
export const changeWeek = (
  currentWeekOffset,
  offset,
  setCurrentWeekOffset,
  setWeekRange
) => {
  const newOffset = currentWeekOffset + offset;

  // Não permitir ir para semanas futuras
  if (newOffset > 0) return;

  setCurrentWeekOffset(newOffset);

  const currentDate = new Date();

  // Calcular o início da semana atual
  const startOfCurrentWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();
  startOfCurrentWeek.setDate(currentDate.getDate() - dayOfWeek);

  // Aplicar o offset de semanas
  const newStartDate = new Date(startOfCurrentWeek);
  newStartDate.setDate(startOfCurrentWeek.getDate() + 7 * newOffset);

  // Calcular o fim da nova semana
  const newEndDate = new Date(newStartDate);
  newEndDate.setDate(newStartDate.getDate() + 6);

  setWeekRange({
    start: formatDate(newStartDate),
    end: formatDate(newEndDate),
    startForTraining: formatDateForTraining(newStartDate),
  });
};

// Função utilitária para converter data do formato dd/mm/yyyy para objeto Date
export const parseFormattedDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

// Função utilitária para converter data do formato dd-mm-yy para objeto Date
export const parseTrainingDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  const fullYear = year < 50 ? 2000 + year : 1900 + year; // Assumir 2000s para anos < 50
  return new Date(fullYear, month - 1, day);
};

// Função para verificar se uma data está dentro de um range de semana
export const isDateInWeekRange = (
  dateString,
  weekRange,
  isTrainingFormat = false
) => {
  try {
    const targetDate = isTrainingFormat
      ? parseTrainingDate(dateString)
      : parseFormattedDate(dateString);

    const startDate = parseFormattedDate(weekRange.start);
    const endDate = parseFormattedDate(weekRange.end);

    return targetDate >= startDate && targetDate <= endDate;
  } catch (error) {
    console.error("Erro ao verificar data no range:", error);
    return false;
  }
};

// Função para obter os dias da semana em português
export const getDaysOfWeek = () => [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Função para calcular a data de um treino baseado no dia da semana e data de início
export const calculateTaskDate = (dayOfWeek, startDateString) => {
  try {
    // Se startDateString já está no formato correto, usar diretamente
    let startDate;
    if (startDateString.includes("/")) {
      startDate = parseFormattedDate(startDateString);
    } else {
      // Formato dd-mm-yy
      const [day, month, year] = startDateString.split("-").map(Number);
      const fullYear = year < 50 ? 2000 + year : 1900 + year;
      startDate = new Date(fullYear, month - 1, day);
    }

    const dayOffsets = {
      Domingo: 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      Sábado: 6,
    };

    const taskDate = new Date(startDate);
    taskDate.setDate(startDate.getDate() + dayOffsets[dayOfWeek]);

    return formatDateForTraining(taskDate);
  } catch (error) {
    console.error("Erro ao calcular data do treino:", error);
    return formatDateForTraining(new Date());
  }
};
