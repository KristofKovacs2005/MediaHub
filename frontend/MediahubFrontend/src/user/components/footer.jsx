import './footer.css';
import phonePic from '../../assets/phone.png';
import facebookIcon from '../../assets/facebook.png';
import twitterIcon from '../../assets/twitter.png';
import instagramIcon from '../../assets/instagramColorless.png';
import facebookColoredIcon from '../../assets/facebookcolored.png'
import instagramColoredIcon from '../../assets/instagram.png'
import twitterColoredIcon from '../../assets/twitterColored.png'

export function Footer(){
    return(
        <footer className="appFooter">
            <div className="footerInner">
                <section className="footerSection footerSection1">
                    <h4 className="footerTitle">MediaHub</h4>
                    <div className="footerContactRow">
                        <div className="phoneItem">
                            <img src={phonePic} alt="phone" className="phoneIcon"/>
                            <a href="tel:+3699999999999" className="phoneNumber">+36 99 999 9999</a>
                        </div>
                        <div className="socialTable" aria-label="Social links">
                            <a
                                className="socialItem"
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Facebook page"
                            >
                                <span
                                    className="socialIcon"
                                    style={{
                                        '--icon-default': `url(${facebookIcon})`,
                                        '--icon-color': `url(${facebookColoredIcon})`
                                    }}
                                    aria-hidden="true"
                                />
                                <span className="socialLabel">Facebook</span>
                            </a>
                            <a
                                className="socialItem"
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Twitter page"
                            >
                                <span
                                    className="socialIcon"
                                    style={{
                                        '--icon-default': `url(${twitterIcon})`,
                                        '--icon-color': `url(${twitterColoredIcon})`
                                    }}
                                    aria-hidden="true"
                                />
                                <span className="socialLabel">Twitter</span>
                            </a>
                            <a
                                className="socialItem"
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Instagram page"
                            >
                                <span
                                    className="socialIcon"
                                    style={{
                                        '--icon-default': `url(${instagramIcon})`,
                                        '--icon-color': `url(${instagramColoredIcon})`
                                    }}
                                    aria-hidden="true"
                                />
                                <span className="socialLabel">Instagram</span>
                            </a>
                        </div>
                    </div>
                    <p>&copy; 2024 MediaHub. Minden jog fenntartva.</p>
                    <p className="footerLinks">Adatvédelem · Felhasználási feltételek · Gyakran ismételt kérdések</p>
                    <p>Ügyfélszolgálat</p>
                </section>
            </div>
        </footer>
    )
}