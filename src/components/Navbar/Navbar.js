import NavHeader from './NavHeader'
import styles from '@/styles/navbar/Navbar.module.scss'

const Navbar = ({ children }) => (
    <div className={styles.navbar}>
        <NavHeader />
        <main>{children}</main>
    </div>
)

export default Navbar;