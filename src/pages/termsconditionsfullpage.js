import TermsText from '@/components/termsAndConditionsText';
import Layout from '@/shared/Layout';
import styles from '@/styles/TermsConditionsFullPage.module.scss'

const TermsConditionsFullPage = () => {
    return (
        <Layout
            title='Terms And Conditions'
            description='Useage policy for the site'
            keywords=''
        >
            <div className={styles.pagecontainer}>
                <TermsText />
            </div>
        </Layout>
    )
}
    
export default TermsConditionsFullPage;
