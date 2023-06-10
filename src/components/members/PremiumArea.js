import Link from 'next/link'
import styles from '@/styles/members/Premium.module.scss'

const PremiumArea = (props) => {
    const roles = props.roles || null;

    // Incase roles is undefined because user has logged out but 2nd browser is on the premium page.
    if(roles !== null){

        if(roles.includes('AppPremium') || roles.includes('AppAdmin')){
            return(
                <>
                <div>
                    <div className={styles.headerText}>
                        <h2>Premium Members Area</h2>
                        <p>Only upgraded premium users should see this page</p>
                        <br />
                    </div>
                    <div className={styles.textBlobsContainer}>
                        <div className={styles.textBlob}>
                            <h3>VIP</h3>
                            <p>Special premium user content on this page!</p>
                            <p>Once a user has bought premium access they get the "AppPremium" role assigned to them which will allow access to this page.</p>
                            <br />
                        </div>
                    </div>
                </div>
                </>
            )
        } else {
            return(
                <>
                <div>
                    <div className={styles.headerText}>
                        <h2>Sorry, Premium Members Only!</h2>
                        <p>Become one of our VIPs to see the hidden premium content!</p>
                        <br />
                    </div>
                    <div className={styles.textBlobsContainer}>
                        <div className={styles.textBlob}>
                            <h3>For Sale</h3>
                            <p> Buy Premium access here - <Link href="/members/payment">Buy</Link></p>
                            <br />
                            <p>Go back to the regular content - <Link href="/members/dashboard">Members Dashboard</Link></p>
                            <br />
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }
}

export default PremiumArea;