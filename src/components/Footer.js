import styles from '@/styles/Footer.module.scss'
import Link from 'next/link';
import { COMPANY_NAME } from '@/constants/constants';

const Footer = () => {


    return(
        <>
        <div className={styles.footerContainer}>
            <footer id="footer" className="flex-shrink-0 py-1 bg-dark text-white-50">
                <div className="container text-center">
                <small>
                    <ul className={styles.footerList}>
                        <li>Copyright &copy; {COMPANY_NAME}</li>
                        <li><Link href="/termsconditionsfullpage" >Terms and Conditions</Link></li>
                        <li><Link href="/privacypolicyfullpage" >Privacy Policy</Link></li>
                    </ul>
                </small>
                </div>
            </footer>
        </div>
        </>
    )
}

export default Footer;