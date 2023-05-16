import styles from '@/styles/members/Register.module.scss'
import TermsText from '@/components/termsAndConditionsText';

const TermsAndConditions = () => {


    return(
        <>
        <div>
            <p><b className={styles.registerBoxText}>Terms and Conditions</b></p>
            <div className={styles.termsConditionsScrollBox}>
                <TermsText />
            </div>
        </div>
        </>
    )
}

export default TermsAndConditions;