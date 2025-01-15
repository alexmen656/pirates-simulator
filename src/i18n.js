import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Pirates Simulator",
    description:
      "Mark your location on the map (click on a state). Zoom in to select your country more easily and see where other pirates are from. Let's chart our global pirate community!",
    ranglist: "Leaderboard",//"Top Pirates",
    ship: "Ship",
    base: "Base",
    ship_count: "Ship Count",
    total_bases: "Total Bases",
    send: "Send",
    lc_input: "Type your message",
    language: "Language",
    statistics: "Statistics",
    m_credits: "Music Credits",
    new_tab: "New Tab",
    global: "Global",
    hints: {
      base: "Place your base by holding Shift and then clicking anywhere on the land.",
      ship1:
        "Place your ships by holding the alt key and klick anywhere on the sea. (2 ships)",
      ship2:
        "Place your ships by holding the alt key and klick anywhere on the sea. (1 ship)",
    },
  },
  de: {
    title: "Piraten-Simulator",
    description:
      "Markiere deinen Standort auf der Karte (klicke auf einen Staat). Zoome hinein, um dein Land leichter auszuwählen und zu sehen, woher andere Piraten kommen. Lasst uns unsere globale Piratengemeinschaft kartieren!",
    ranglist: "Rangliste",//"Top Piraten",
    ship: "Schiff",
    base: "Basis",
    ship_count: "Schiffszahl",
    total_bases: "Gesamtanzahl der Basen",
    send: "Senden",
    lc_input: "Gib deine Nachricht ein",
    language: "Sprache",
    statistics: "Statistiken",
    m_credits: "Musik-Credits",
    new_tab: "Neuer Tab",
    global: "Global",
    hints: {
      base: "Platziere deine Basis, indem du die Umschalttaste gedrückt hältst und irgendwo auf das Land klickst.",
      ship1:
        "Platziere deine Schiffe, indem du die Alt-Taste gedrückt hältst und irgendwo auf das Meer klickst. (2 Schiffe)",
      ship2:
        "Platziere deine Schiffe, indem du die Alt-Taste gedrückt hältst und irgendwo auf das Meer klickst. (1 Schiff)",
    },
  },
  es: {
    title: "Simulador de Piratas",
    description:
      "Marca tu ubicación en el mapa (haz clic en un estado). Acércate para seleccionar tu país más fácilmente y ver de dónde son otros piratas. ¡Cartografiemos nuestra comunidad pirata global!",
    ranglist: "Clasificación", // "Top Piratas"
    ship: "Barco",
    base: "Base",
    ship_count: "Cantidad de Barcos",
    total_bases: "Total de Bases",
    send: "Enviar",
    lc_input: "Escribe tu mensaje",
    language: "Idioma",
    statistics: "Estadísticas",
    m_credits: "Creditos", //de Música", // "Music Credits"
    new_tab: "Nueva Pestaña",
    global: "Global",
    hints: {
      base: "Coloca tu base manteniendo presionada la tecla Shift y haciendo clic en cualquier parte de la tierra.",
      ship1:
        "Coloca tus barcos manteniendo presionada la tecla Alt y haz clic en cualquier parte del mar. (2 barcos)",
      ship2:
        "Coloca tus barcos manteniendo presionada la tecla Alt y haz clic en cualquier parte del mar. (1 barco)",
    },
  },

};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

export default i18n;
