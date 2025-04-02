import React, { useEffect, useState } from "react";
import { getAllReserves } from "../../services/reserveAPI";
import "./Horario.css";

function Horario() {

  const [reservas, setReservas] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const horarios = [
    "7:00 AM",
    "8:30 AM",
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM",
    "7:00 PM",
  ];

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];



  
  useEffect(() => {
    async function fetchReservas() {
      try {
        const reservasData = await getAllReserves();
        setReservas(reservasData);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    }

    fetchReservas();
  }, []);

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(
      date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)
    );

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getWeekRange(currentDate);

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
  };

  const todayFormatted = formatDate(new Date());

  const goToPreviousWeek = () =>
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  const goToNextWeek = () =>
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  const goToToday = () => setCurrentDate(new Date());

  const convertirHoraReserva = (horaReserva) => {
    const [hour, minute] = horaReserva.split(":");
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute), 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="horarioWrapper">
      <div className="horarioHeader">
        <h2>Horario</h2>
        <h5>
          Semana: {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
        </h5>
        <div className="horarioHeaderButtons">
          <button onClick={goToPreviousWeek}>{"<"}</button>
          <button onClick={goToToday}>Hoy</button>
          <button onClick={goToNextWeek}>{">"}</button>
        </div>
      </div>

      <table className="horarioTable">
        <thead>
          <tr>
            <th>Horas</th>
            {diasSemana.map((dia, index) => {
              const tablaDia = new Date(startOfWeek);
              tablaDia.setDate(startOfWeek.getDate() + index);
              const formattedDay = formatDate(tablaDia);

              return (
                <th
                  key={dia}
                  className={formattedDay === todayFormatted ? "diaActual" : ""}
                >
                  {`${dia} - ${formattedDay}`}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {horarios.map((hora, horaIndex) => (
            <tr key={hora}>
              <td className="horaCell">{hora}</td>
              {diasSemana.map((dia, diaIndex) => {
                const tablaDia = new Date(startOfWeek);
                tablaDia.setDate(startOfWeek.getDate() + diaIndex);
                const formattedDay = formatDate(tablaDia);
                const numeroDiaTabla = tablaDia.getDate();

                const reservasDiaHora = reservas.filter((reserva) => {
                  const reservaHoraTexto = convertirHoraReserva(
                    reserva.startHour.slice(0, 5)
                  );
                  const reservaDia = reserva.numberDay;
                  return (
                    reservaHoraTexto === hora && reservaDia === numeroDiaTabla
                  );
                });

                const contenidoCelda = reservasDiaHora
                  .map((r) => `[ ${r.reason} (${r.laboratoryName}) ]`)
                  .join("\n");

                return (
                  <td key={`${dia}-${hora}`} className="horarioCell">
                    {contenidoCelda && (
                      <div className="reserva">{contenidoCelda}</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Horario;
