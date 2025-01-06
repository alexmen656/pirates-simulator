import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Pirates Simulator",
    description: "Mark your location on the map (click on a state). Zoom in to select your country more easily and see where other pirates are from. Let's chart our global pirate community!",
    ranglist: "Pirates Rang List"
  },
  de: {
    title: "Piraten Simulator",
    description: "Markiere deinen Standort auf der Karte (klicke auf einen Staat). Zoome hinein, um dein Land leichter auszuwählen, und entdecke, woher die anderen Piraten stammen. Lass uns die Weltkarte unserer Piratencrew zeichnen!",
    ranglist: "Piraten Rangliste"
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

export default i18n;
