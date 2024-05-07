import React from "react";
import Link from "next/link";

export default function Navbar() {

    const menu = (
        <ul id="main-nav" className="menu menu-lg menu-vertical lg:menu-horizontal">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
            <li><Link href="/account/signin" className="btn btn-primary">Login</Link></li>
        </ul>
    );

    return (
        <header className="navbar bg-base-300 px-4 py-2">
            <div className="navbar-start">
                <h1 className="text-2xl lg:text-4xl font-bold text-primary-500">CountdownApp</h1>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <nav tabIndex="0" className="dropdown-content mt-3 z-[1] shadow bg-base-300 rounded-box w-52">
                        {menu}
                    </nav>
                </div>
                <nav className="hidden lg:flex">
                    {menu}
                </nav>
            </div>
        </header>
    );
}