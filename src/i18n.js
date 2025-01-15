import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Pirates Simulator",
    description:
      "Mark your location on the map (click on a state). Zoom in to select your country more easily and see where other pirates are from. Let's chart our global pirate community!",
    ranglist: "Leaderboard", //"Top Pirates",
    ship: "Ship",
    base: "Base",
    ship_count: "Ship Count",
    total_bases: "Total Bases",
    send: "Send",
    lc_input: "Type your message",
    language: "Language",
    statistics: "Statistics",
    m_credits: "Music Credits",
    documentation: "Documentation",
    new_tab: "New Tab",
    global: "Global",
    logout: "Log Out",
    hints: {
      base: "Place your base by holding Shift and then clicking anywhere on the land.",
      ship1:
        "Place your ships by holding the alt key and klick anywhere on the sea. (2 ships)",
      ship2:
        "Place your ships by holding the alt key and klick anywhere on the sea. (1 ship)",
    },
    ship_info:
      "Ship: Covers a radius of 1000 km. The first three ships cost 750 coins. After that, the cost increases with each additional ship. Place them strategically to collect gold, diamonds, emeralds, rubies, or stones! The cost of your next ship is: {formattedShipPrice} coins.",
  },
  de: {
    title: "Piraten-Simulator",
    description:
      "Markiere deinen Standort auf der Karte (klicke auf einen Staat). Zoome hinein, um dein Land leichter auszuwählen und zu sehen, woher andere Piraten kommen. Lasst uns unsere globale Piratengemeinschaft kartieren!",
    ranglist: "Rangliste", //"Top Piraten",
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
    documentation: "Dokumentation",
    global: "Global",
    logout: "Log Out",
    hints: {
      base: "Platziere deine Basis, indem du die Umschalttaste gedrückt hältst und irgendwo auf das Land klickst.",
      ship1:
        "Platziere deine Schiffe, indem du die Alt-Taste gedrückt hältst und irgendwo auf das Meer klickst. (2 Schiffe)",
      ship2:
        "Platziere deine Schiffe, indem du die Alt-Taste gedrückt hältst und irgendwo auf das Meer klickst. (1 Schiff)",
    },
    ship_info:
      "Schiff: Deckt einen Radius von 1000 km ab. Die ersten drei Schiffe kosten 750 Münzen. Danach steigen die Kosten mit jedem weiteren Schiff. Platziere sie strategisch, um Gold, Diamanten, Smaragde, Rubine oder Steine zu sammeln! Kosten deines nächsten Schiffes betragen: {formattedShipPrice} Münzen.",
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
    documentation: "Documentación",
    global: "Global",
    logout: "Log Out",
    hints: {
      base: "Coloca tu base manteniendo presionada la tecla Shift y haciendo clic en cualquier parte de la tierra.",
      ship1:
        "Coloca tus barcos manteniendo presionada la tecla Alt y haz clic en cualquier parte del mar. (2 barcos)",
      ship2:
        "Coloca tus barcos manteniendo presionada la tecla Alt y haz clic en cualquier parte del mar. (1 barco)",
    },
    ship_info:
      "Barco: Cubre un radio de 1000 km. Los primeros tres barcos cuestan 750 monedas. Después, el costo aumenta con cada barco adicional. ¡Colócalos estratégicamente para recolectar oro, diamantes, esmeraldas, rubíes o piedras! El costo de tu próximo barco es: {formattedShipPrice} monedas.",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

export default i18n;
