import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeekCalendar.css';

const WeekCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [daysWithNotifications, setDaysWithNotifications] = useState([]);
  const userId = localStorage.getItem('userId');

  // Función para obtener la semana actual
  const getCurrentWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Lunes
    const days = [];

    // Añadir los 7 días de la semana a la lista de días
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());

    const fetchTestPeriod = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/testmade/${userId}`);
        const tests = response.data;

        if (tests.length > 0) {
          const lastTest = tests[0];
          const testStartDate = new Date(lastTest.dateCreated);
          const daysOfTest = lastTest.DaysTestSelected;

          const notificationDays = [];
          for (let i = 0; i < daysOfTest; i++) {
            const testDay = new Date(testStartDate);
            testDay.setDate(testStartDate.getDate() + i);
            notificationDays.push(testDay.getDate());
          }

          setDaysWithNotifications(notificationDays);
        }
      } catch (error) {
        console.error("Error al obtener el periodo de prueba:", error);
      }
    };

    fetchTestPeriod();
  }, [userId]);

  return (
    <div className='wnd'>
      <div className="weekCalendarContainer">
        {currentWeek.map((day, index) => (
          <div className="weekDay" key={index}>
            {daysWithNotifications.includes(day.getDate()) && (
              <div className="notificationCircle"></div>
            )}
            <div className="dayName">{day.toLocaleDateString('es-ES', { weekday: 'long' })}</div>
            <div className="dayNumber">{day.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
