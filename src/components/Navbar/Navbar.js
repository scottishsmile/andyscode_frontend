'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.

import NavHeader from './NavHeader'
import styles from '@/styles/navbar/Navbar.module.scss'

const Navbar = ({ children }) => (
    <div className={styles.navbar}>
        <NavHeader />
        <main>{children}</main>
    </div>
)

export default Navbar;