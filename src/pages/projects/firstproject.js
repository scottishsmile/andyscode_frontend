import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/shared/Layout';
import styles from '@/styles/projects/FirstProject.module.scss';

const FirstProject = () => {
    return (
        <Layout
            title='First Project'
            description='My first project page'
            keywords=''
        >
        <div className={styles.pagecontainer}>
            <div className={styles.headerText}>
                <h2>Project # 1</h2>
                <div className={styles.screenShotContainer}>
                    <Image id="firstproject" src="/projects/firstproject-screenshot.png" className={styles.screenShot} height={297} width={600} layout="responsive" objectFit="contain" alt=''/>
                </div>
            </div>
            <br />
            <div className={styles.textBlobsContainer}>
                <div className={styles.textBlob}>
                <h3>My First CV Website</h3>
                <p>I made my first CV website back in June 2020. It has a Python Django backend and serves static HTML pages with some JavaScript sprinkled in when necessary.</p>
                <p>It uses the MVC Model-View-Controller pattern.</p>
                <p>The aim of the website was just to be a place where I hosted some of the various snippets of code I had written throughout the previous years.</p>
                <p>It's good to see how far my coding has come!</p>
                <p>Take A Look! - <Link href="http://andycv.pythonanywhere.com/" >Andy's CV</Link></p>
                <p>It's hosted on PythonAnywhere.com . I think it has served it's purpose, so I may discontinue it in the future...</p>
                <p>Github Repo for the project is here - <Link href="https://github.com/scottishsmile/andycv" >Repo</Link> (I think I will keep it private as long as it is in use) </p>
                <br />
                </div>
            </div>
        </div>
        </Layout>
    )
}
    
export default FirstProject;