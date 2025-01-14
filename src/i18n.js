import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Pirates Simulator",
    description:
      "Mark your location on the map (click on a state). Zoom in to select your country more easily and see where other pirates are from. Let's chart our global pirate community!",
    ranglist: "Pirates Rang List",
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
    title: "Piraten Simulator",
    description:
      "Markiere deinen Standort auf der Karte (klicke auf einen Staat). Zoome hinein, um dein Land leichter auszuwählen, und entdecke, woher die anderen Piraten stammen. Lass uns die Weltkarte unserer Piratencrew zeichnen!",
    ranglist: "Piraten Rankliste",
  },
  es: {
    title: "Simulador de piratas",
    description:
      "Marca tu ubicación en el mapa (haz clic en un estado). Haz zoom para seleccionar tu país más fácilmente y ver de dónde son los demás piratas. ¡Vamos a trazar nuestra comunidad pirata global!",
    ranglist: "Lista de rango de piratas",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

export default i18n;
