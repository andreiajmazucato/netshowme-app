// src/components/Footer.tsx
'use client'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <span className="copyright">© Flow</span>
                <a href="#" className="footer-link">Política de Privacidade</a>
                <a href="#" className="footer-link">Termo de Uso</a>
            </div>
            <div className="footer-right">
                Desenvolvido por <a href="https://netshow.me" className="footer-link" target="_blank">Netshow.me</a>
                <button className="beta-button ml-2">BETA</button>
            </div>
        </footer>
    )
}
