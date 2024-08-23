import './header.css';

export default function Header({ changeLanguage, language }) {
  return (
    <header className='header'>
      <div className="wrapper">
        <button onClick={ () => changeLanguage()} className='lang-switcher'>{ language }</button>
      </div>
    </header>
  )
}
