import Link from 'next/link'
import styles from '@/styles/members/Payment.module.scss'

const ThingsToBuy = (props) => {
    const roles = props.roles || null;
    const paymentReturnUrl = props.paymentReturnUrl;                    // Pass this url to paypal and Gpay buttons.

    // Incase roles is undefined because user has logged out but 2nd browser is on the page.
    if(roles !== null){
        if(roles.includes('AppPremium') || roles.includes('AppAdmin')){
            return(
                <>
                <div>
                    <h2 className={styles.headerText}>Products Premium Users Can Buy....</h2>
                    <div className={styles.text}>
                        <ul>
                            <li>Booster Pack</li>
                            <li>My Super Ebook</li>
                        </ul>
                        <br />
                    </div>
                    <h4 className={styles.headerText}>Add Basic Paypal/GPay shopping cart here....</h4>
                    <div className={styles.text}>
                        <p>Item 1 $49.99<button>PAYPAL Buy</button><button>GPay Buy</button></p>
                        <p>Item 2 $29.99<button>PAYPAL Buy</button><button>GPay Buy</button></p>
                    </div>
                </div>
                </>
            )
        } else {
            return(
                <>
                <div>
                    <h2 className={styles.headerText}>Products Basic Users Can Buy...</h2>
                    <div className={styles.text}>
                        <ul>
                            <li>Premium Membership</li>
                            <li>My Super Ebook</li>
                        </ul>
                        <br />
                    </div>
                    <h4 className={styles.headerText}>Add Basic Paypal/GPay shopping cart here....</h4>
                    <div className={styles.text}>
                        <p>These buttons don't work, just for show...</p>
                        <p>Item 1 $49.99<button>PAYPAL Buy</button><button>GPay Buy</button></p>
                        <p>Item 2 $29.99<button>PAYPAL Buy</button><button>GPay Buy</button></p>
                        <br />
                        <p>Click this link to simulate buying premium membership</p>
                        <p><Link href={paymentReturnUrl} className={styles.link}>TEST Upgrade To premium</Link></p>
                        <p>Your user account will get the "AppPremium" role added.</p>
                        <p>Paypal / Gpay would use this url as their success page to redirect to after the transcation.</p>
                    </div>
                </div>
                </>
            )
        }
    }

}

export default ThingsToBuy;