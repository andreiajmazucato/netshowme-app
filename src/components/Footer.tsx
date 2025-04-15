// src/components/Header.tsx
'use client'

import { FaChevronDown, FaSearch, FaUserCircle } from 'react-icons/fa'

export default function Header() {
    return (
        <header className="top-bar">
            <div className="logo">
                <img
                    width="159"
                    height="25"
                    src="https://netshow.me/wp-content/uploads/2023/11/logo-padd.svg"
                    alt="Netshow.me"
                />
            </div>

            <nav className="menu">
                <ul>
                    <li className="has-submenu">
                        Categorias <FaChevronDown className="dropdown-icon" />
                        <ul className="submenu">
                            <li><a href="#">category 1</a></li>
                            <li><a href="#">category 2</a></li>
                            <li><a href="#">category 3</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">Assuntos <FaChevronDown className="dropdown-icon" />
                        <ul className="submenu">
                            <li><a href="#">Assunto 1</a></li>
                            <li><a href="#">Assunto 2</a></li>
                            <li><a href="#">Assunto 3</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">Outras Páginas <FaChevronDown className="dropdown-icon" />
                        <ul className="submenu">
                            <li><a href="#">Página 1</a></li>
                            <li><a href="#">Página 2</a></li>
                            <li><a href="#">Página 3</a></li>
                        </ul>
                    </li>
                    <li>Minha Lista</li>
                    <li>Lives</li>
                    <li>Fórum</li>
                </ul>
            </nav>

            <div className="top-actions">
                <FaSearch className="icon" />
                <FaUserCircle className="icon user" />
            </div>
        </header>
    )
}
