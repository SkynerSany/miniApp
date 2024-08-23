import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './description.css';
import { useSwipeable } from "react-swipeable";

function setButtonBack(navigate) {
  const BackButton = window.Telegram.WebApp.BackButton;
  
  BackButton.show();
  BackButton.onClick(() => BackButton.hide());
  window.Telegram.WebApp.onEvent('backButtonClicked', () => navigate("/"));
}

function createRequestBody(title, lang) {
  return JSON.stringify({
    "sign": title,
    "language": lang === 'ru' ? "original" : 'translated',
    "period": "today"
  })
}

function getSignDesc(requestBody, setsignDescription) {
  fetch('https://poker247tech.ru/get_horoscope/', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: requestBody
  })
  .then( (response) => response.json())
  .then( (signDescription) => setsignDescription(signDescription))
  .catch( (error) => alert(`Сервер в данный момент не доступен \n ${error}`));
}


export default function Description({ lang, cards }) {
  const [signDescription, setsignDescription] = useState('');
  const navigate = useNavigate();
  let { state } = useLocation();

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      navigate("/");
      window.Telegram.WebApp.BackButton.hide();
    },
  });

  useEffect(() => {
    setButtonBack(navigate);
    
    const requestBody = createRequestBody(cards[state.signNumber].title, lang);
    getSignDesc(requestBody, setsignDescription);
  }, [lang])

  return (
    <section className="description" {...swipeHandlers}>
      <div className="wrapper">
        {
          signDescription.horoscope
        }
      </div>
    </section>
  )
}
