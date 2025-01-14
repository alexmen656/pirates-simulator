import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Pirates Simulator",
    description:
      "Mark your location on the map (click on a state). Zoom in to select your country more easily and see where other pirates are from. Let's chart our global pirate community!",
    ranglist: "Top Pirates",
    ship: "Ship",
    send: "Send",
    lc_input: "Type your message",
    language: "Language",
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
    ranglist: "Piraten-Rangliste",
    ship: "Schiff",
    send: "Senden",
    lc_input: "Gib deine Nachricht ein",
    language: "Sprache",
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
    ranglist: "Lista de Rangos de Piratas",
    ship: "Barco",
    send: "Enviar",
    lc_input: "Escribe tu mensaje",
    language: "Idioma",
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
