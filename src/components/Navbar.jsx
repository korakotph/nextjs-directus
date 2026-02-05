'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import '@/styles/navbar.scss';

const BASE_PATH = '/'
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export default function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] || 'th';
    const slug = segments[1] || 'home';

    const restPath = slug ? `/${slug}` : '';
    const [menu, setMenu] = useState([]);

    const linkHref = (path) => `${BASE_PATH}/${locale}${path}`
    const isActive = (path) => path === `/${slug}`;

    useEffect(() => {
        async function fetchMenu() {
            try {
            const res = await fetch(
                `${DIRECTUS_URL}/items/pages?filter[status][_eq]=published&filter[show_in_menu][_eq]=true&deep[translations]=*&sort=menu_order`
            );
            const json = await res.json();
            setMenu(json.data || []);
            } catch (err) {
            console.error("Failed to load menu", err);
            }
        }
    fetchMenu();
    }, []);

    // Toggle สำหรับปิดเมนูเมื่อคลิกเมนูแล้ว (บน mobile)
    const handleMenuClick = () => setMenuOpen(false)

    return (
        <>
            <nav className="sticky top-0 z-[100] bg-brand-700">
                <div className="px-8 sm:px-6 lg:px-8 z-50">
                    <div className="flex justify-between items-center h-20">
                        <div className="text-2xl font-bold text-primary">
                            <Link href="/home">
                                <img src="/img/Logo_Silpakorn_websit.svg" alt="LOGO" className="h-8 lg:h-12" width={202} height={48}/>
                            </Link>
                        </div>

                        {/* Hamburger Button Mobile */}
                        <button
                            className="menu-btn md:hidden flex flex-col justify-center items-center w-8 h-8 mr-0"
                            aria-label="Toggle menu"
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </button>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-2 lg:gap-6 text-sm lg:text-base font-medium">
                            {menu.map(({ name_th, name_en, path }) => (
                                <Link
                                    key={path}
                                    href={linkHref(path)}
                                    className={`text-white hover:text-brand-100 transition ${
                                        isActive(path) ? 'font-semibold' : 'font-normal'
                                    }`}
                                >
                                    {isActive(path) && (<img src="/img/ele.svg" className="inline-block mr-2" alt="" width={10} height={10}/>)}
                                    {locale === 'en' ? name_en : name_th}
                                    {isActive(path) && (<img src="/img/ele.svg" className="inline-block ml-2" alt="" width={10} height={10}/>)}
                                </Link>
                            ))}
                        </div>

                        {/* Language Switcher */}
                        <div className="hidden md:flex items-center text-sm lg:text-base font-medium relative">
                            <Link
                                href={`${BASE_PATH}/th${restPath}`}
                                className={`px-4 py-1 transition ${
                                locale === 'th' ? 'text-white' : 'text-brand-500 hover:text-brand-100'
                                }`}
                            >
                                TH
                            </Link>
                            <div className="w-px h-4 bg-brand-500" />
                            <Link
                                href={`${BASE_PATH}/en${restPath}`}
                                className={`px-4 py-1 transition ${
                                locale === 'en' ? 'text-white' : 'text-brand-500 hover:text-brand-100'
                                }`}
                            >
                                EN
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                
            </nav>
            <div id="mobile-menu" className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-200 bg-brand-900 ${menuOpen ? 'open' : ''}`}>
                <div className="flex flex-col items-center gap-4 py-6">
                    {menu.map(({ name_th, name_en, path }) => (
                        <Link
                            key={path}
                            href={linkHref(path)}
                            className={`text-white text-lg hover:text-brand-100 transition ${
                                isActive(path) ? 'font-semibold' : 'font-normal'
                            }`}
                            onClick={handleMenuClick}
                        >
                            {isActive(path) && (<img src="/img/ele.svg" className="inline-block mr-2" alt="" width={10} height={10}/>)}
                            {locale === 'en' ? name_en : name_th}
                            {isActive(path) && (<img src="/img/ele.svg" className="inline-block ml-2" alt="" width={10} height={10}/>)}
                        </Link>
                    ))}
                    <div className="flex items-center text-lg font-medium gap-2 mt-4">
                        <Link
                            href={`${BASE_PATH}/th${restPath}`}
                            className={`px-4 py-1 transition ${
                                locale === 'th' ? 'text-white' : 'text-brand-500 hover:text-brand-100'
                            }`}
                            onClick={handleMenuClick}
                        >TH</Link>
                        <span className="w-px h-4 bg-green-700" />
                        <Link
                            href={`${BASE_PATH}/en${restPath}`}
                            className={`px-4 py-1 transition ${
                                locale === 'en' ? 'text-white' : 'text-brand-500 hover:text-brand-100'
                            }`}
                            onClick={handleMenuClick}
                        >EN</Link>
                    </div>
                </div>
            </div>
        </>
        
    )
}