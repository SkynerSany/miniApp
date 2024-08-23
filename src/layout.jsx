import { Route, Routes } from 'react-router-dom';
import * as enMessages  from './locales/en.json';
import * as ruMessages from './locales/ru.json';
import Header from './widgets/header/header.jsx';
import Home from './pages/home/home.jsx';
import Description from './pages/description/description.jsx';
import { useEffect, useState } from 'react';

const messages = {
  en: enMessages,
  ru: ruMessages,
};

export default function Layout() {
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const userLang =  window.Telegram.WebApp.initDataUnsafe.user.language_code || 'ru';
    setLanguage(userLang === 'ru' ? userLang : 'en');
  }, []);

  function changeLanguage() {
    setLanguage(language == "en" ? "ru" : "en");
  }

  return (
    <>
      <Header language={language} changeLanguage={changeLanguage} />
      <main>
        <Routes>
          <Route path={ '/' } element={<Home cards={ messages[language].signs } />} />
          <Route path={ '/description' } element={<Description lang={ language } cards={ messages["en"].signs } />} />
        </Routes>
      </main>
    </>
  )
}
