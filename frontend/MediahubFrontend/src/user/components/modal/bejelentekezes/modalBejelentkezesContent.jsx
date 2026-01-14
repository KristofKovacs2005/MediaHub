export default function ModalBejelentkezesContent({isClose}) {
    return(
    <div className="modalContent">
        <button className="closeButton" onClick={isClose}>X</button>
        <h2>Bejelentkezés</h2>
        <form className="modalForm">
            <p>Jelentkezzen be a felhasználói fiókjába!</p>
            <input type="text" id="email" placeholder="Email cím" required />
            <input type="password" id="password" placeholder="Jelszó" required />
            <button type="submit">Bejelentkezés</button>
        </form>
    </div>);
}