import { useState } from "react";
import "./Horario.css";

function Horario() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const horarios = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM"
  ];

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getWeekRange(currentDate);

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };

  const todayFormatted = formatDate(new Date());

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="horarioWrapper">
      <div className="horarioHeader">
        <h2>Horario</h2>
        <h5>
          Semana: {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
        </h5>
        <div className="horarioHeaderButtons">
          <button onClick={goToPreviousWeek}>←</button>
          <button onClick={goToToday}>Hoy</button>
          <button onClick={goToNextWeek}>→</button>
        </div>
      </div>

      <table className="horarioTable">
        <thead>
          <tr>
            <th>Horas</th>
            {diasSemana.map((dia, index) => {
              const dayDate = new Date(startOfWeek);
              dayDate.setDate(startOfWeek.getDate() + index);
              const formattedDay = formatDate(dayDate);

              return (
                <th key={dia} className={formattedDay === todayFormatted ? "diaActual" : ""}>
                  {`${dia} - ${formattedDay}`}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {horarios.map((hora) => (
            <>
              {/* Fila para la hora exacta */}
              <tr key={`${hora}-00`}>
                <td className="horaCell" rowSpan={2}>{hora}</td>
                {diasSemana.map((dia) => (
                  <td key={`${dia}-${hora}-00`} className="horarioCell"></td>
                ))}
              </tr>
              {/* Fila para los 30 minutos */}
              <tr key={`${hora}-30`}>
                {diasSemana.map((dia) => (
                  <td key={`${dia}-${hora}-30`} className="horarioCell subHoraCell"></td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Horario;
