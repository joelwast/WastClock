// ClockApp.jsx - Navegación Inferior y Diseño Minimalista Mejorado
import React, { useState, useEffect } from 'react';
import './ClockApp.css';

// Componentes de iconos personalizados
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TimerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 16"></polyline>
  </svg>
);

const StopwatchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 12 12"></polyline>
    <path d="M12 2 L12 4"></path>
    <path d="M4.93 4.93 L6.34 6.34"></path>
    <path d="M19.07 4.93 L17.66 6.34"></path>
  </svg>
);

// Nuevos iconos para las acciones
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
  </svg>
);

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ClockApp = () => {
  // Estado para el idioma de la aplicación (español por defecto)
  const [lang, setLang] = useState('es');
  
  // Efecto para establecer el atributo lang en el elemento html
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  
  // Estado para la hora actual
  const [currentTime, setCurrentTime] = useState(new Date());
  // Estado para la zona horaria
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  // Estado para el modo (reloj, cronómetro, temporizador)
  const [mode, setMode] = useState('clock');
  // Estado para el tema (claro/oscuro)
  const [darkMode, setDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Estados para el cronómetro
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  
  // Estados para el temporizador
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false);
  
  // Lista de zonas horarias populares
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];
  
  // Actualiza la hora cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Maneja el cronómetro
  useEffect(() => {
    let intervalId;
    if (stopwatchRunning) {
      intervalId = setInterval(() => {
        setStopwatchTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [stopwatchRunning]);
  
  // Maneja el temporizador
  useEffect(() => {
    let intervalId;
    if (timerRunning && timerTime > 0) {
      intervalId = setInterval(() => {
        setTimerTime(prevTime => {
          if (prevTime <= 1000) {
            clearInterval(intervalId);
            setTimerRunning(false);
            setTimerEnded(true);
            // Alertar al usuario
            setTimeout(() => {
              alert('¡Tiempo completado!');
              setTimerEnded(false);
            }, 0);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning, timerTime]);
  
  // Formatea la hora según la zona horaria seleccionada
  const formatTime = () => {
    const options = { 
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true,
      timeZone: timezone 
    };
    return new Intl.DateTimeFormat(lang, options).format(currentTime);
  };
  
  // Formatea la fecha según la zona horaria seleccionada
  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: timezone 
    };
    const dateStr = new Intl.DateTimeFormat(lang, options).format(currentTime);
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  };
  
  // Formatea el tiempo del cronómetro
  const formatStopwatchTime = () => {
    const hours = Math.floor(stopwatchTime / 3600000);
    const minutes = Math.floor((stopwatchTime % 3600000) / 60000);
    const seconds = Math.floor((stopwatchTime % 60000) / 1000);
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  // Configura e inicia el temporizador
  const startTimer = () => {
    const totalMilliseconds = (timerHours * 3600 + timerMinutes * 60 + timerSeconds) * 1000;
    if (totalMilliseconds > 0) {
      setTimerTime(totalMilliseconds);
      setTimerRunning(true);
    }
  };
  
  // Formatea el tiempo del temporizador
  const formatTimerTime = () => {
    const hours = Math.floor(timerTime / 3600000);
    const minutes = Math.floor((timerTime % 3600000) / 60000);
    const seconds = Math.floor((timerTime % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Maneja el enfoque en los campos de entrada del temporizador
  const handleFocus = (e) => {
    e.target.select();
  };
  
  // Cambiar idioma (puedes agregar un botón o selector para esto si lo deseas)
  const toggleLanguage = () => {
    setLang(prevLang => prevLang === 'es' ? 'en' : 'es');
  };
  
  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Botón de cambio de tema */}
      <button 
        className="theme-toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
      
      {/* Contenedor principal */}
      <div className="clock-container">
        {/* Reloj */}
        {mode === 'clock' && (
          <div className="clock-mode">
            <div className="timezone-selector">
              <select 
                value={timezone} 
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                  Local: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </option>
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            
            <div className="date-display">{formatDate()}</div>
            <div className="time-display">{formatTime()}</div>
          </div>
        )}
        
        {/* Cronómetro - Rediseñado con iconos */}
        {mode === 'stopwatch' && (
          <div className="stopwatch-mode">
            <div className="stopwatch-display">{formatStopwatchTime()}</div>
            
            <div className="button-group">
              {!stopwatchRunning ? (
                <button 
                  className="action-btn start-btn"
                  onClick={() => setStopwatchRunning(true)}
                  aria-label="Iniciar cronómetro"
                >
                  <PlayIcon />
                </button>
              ) : (
                <button 
                  className="action-btn pause-btn"
                  onClick={() => setStopwatchRunning(false)}
                  aria-label="Pausar cronómetro"
                >
                  <PauseIcon />
                </button>
              )}
              
              <button 
                className="action-btn reset-btn"
                onClick={() => {
                  setStopwatchRunning(false);
                  setStopwatchTime(0);
                }}
                aria-label="Reiniciar cronómetro"
              >
                <ResetIcon />
              </button>
            </div>
          </div>
        )}
        
        {/* Temporizador - Rediseñado con iconos */}
        {mode === 'timer' && (
          <div className="timer-mode">
            {!timerRunning ? (
              <div className="timer-setup">
                <div className="timer-inputs">
                  <div className="timer-input-group">
                    <label>Horas</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="23"
                      value={timerHours}
                      onChange={(e) => setTimerHours(parseInt(e.target.value) || 0)}
                      onFocus={handleFocus}
                      aria-label="Horas"
                    />
                  </div>
                  <div className="timer-input-group">
                    <label>Minutos</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="59"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                      onFocus={handleFocus}
                      aria-label="Minutos"
                    />
                  </div>
                  <div className="timer-input-group">
                    <label>Segundos</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="59"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                      onFocus={handleFocus}
                      aria-label="Segundos"
                    />
                  </div>
                </div>
                
                <button 
                  className="timer-action-btn"
                  onClick={startTimer}
                  aria-label="Iniciar temporizador"
                >
                  <PlayIcon /> Iniciar
                </button>
              </div>
            ) : (
              <div className="timer-running">
                <div className={`timer-display ${timerEnded ? 'timer-ended' : ''}`}>
                  {formatTimerTime()}
                </div>
                
                <div className="button-group">
                  <button 
                    className="action-btn pause-btn"
                    onClick={() => setTimerRunning(false)}
                    aria-label="Pausar temporizador"
                  >
                    <PauseIcon />
                  </button>
                  
                  <button 
                    className="action-btn cancel-btn"
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerTime(0);
                      setTimerEnded(false);
                    }}
                    aria-label="Cancelar temporizador"
                  >
                    <CancelIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Navegación - Ahora más compacta */}
        <div className="navigation-menu">
          <button 
            className={`nav-button ${mode === 'clock' ? 'active' : ''}`}
            onClick={() => setMode('clock')}
          >
            <ClockIcon />
            <span>Reloj</span>
          </button>
          
          <button 
            className={`nav-button ${mode === 'stopwatch' ? 'active' : ''}`}
            onClick={() => setMode('stopwatch')}
          >
            <StopwatchIcon />
            <span>Cronómetro</span>
          </button>
          
          <button 
            className={`nav-button ${mode === 'timer' ? 'active' : ''}`}
            onClick={() => setMode('timer')}
          >
            <TimerIcon />
            <span>Temporizador</span>
          </button>
        </div>
        
        {/* Puedes agregar este botón si quieres permitir cambiar el idioma explícitamente */}
        {/* <button
          className="language-toggle"
          onClick={toggleLanguage}
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button> */}
      </div>
    </div>
  );
};

export default ClockApp;