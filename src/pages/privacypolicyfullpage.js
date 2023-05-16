import PrivacyText from '@/components/privacyPolicyText';
import Layout from '@/shared/Layout';
import styles from '@/styles/PrivacyPolicyFullPage.module.scss'

const PrivacyPolicyFullPage = () => {
    return (
        <Layout
            title='Privacy Policy'
            description='Privacy policy for the site'
            keywords=''
        >
            <div className={styles.pagecontainer}>
                <PrivacyText />
            </div>
        </Layout>
    )
}
    
export default PrivacyPolicyFullPage;