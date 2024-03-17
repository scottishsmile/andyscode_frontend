import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/shared/Layout';
import styles from '@/styles/projects/AuthProject.module.scss';

const AuthProject = () => {
    return (
        <Layout
            title='Auth Project'
            description='My auth project page'
            keywords=''
        >
        <div className={styles.pagecontainer}>
            <div className={styles.headerText}>
                <h2>User Auth Project</h2>
                <div className={styles.screenShotContainer}>
                    <Image id="firstproject" src="/projects/authproject-screenshot.png" className={styles.screenShot} height={297} width={600} layout="responsive" objectFit="contain" alt=''/>
                </div>
            </div>
            <br />
            <div className={styles.textBlobsContainer}>
                <div className={styles.textBlob}>
                <h3>Rolling My Own Auth</h3>
                <p>My first full web app project.</p>
                <p><b>API:</b> C# ASP.NET Core 5, <b>Frontend:</b> React, <b>Admin GUI:</b> ASP RazorPages</p>
                <p>I wanted to learn how to log users in and out of an app. It morphed into this large project where I designed my own authentication system from scratch.</p>
                <p>I wouldn't do this again, because "you don't know what you don't know". So there is bound to be security flaws in this if I wrote it myself.</p>
                <p>Ideally you want to use an industry standard product to do the user authentication that has many security professionals focusing on it.</p>
                <p>Alternatives could be cloud-based (AWS Cognito, Google Firebase Auth), authentication servers (Identity Server, Keycloak) or authentication frameworks (Identity Core or Spring Auth).</p>
                <p>It was a really good project to learn about authentication!</p>
                <br />
                <h3>What I learned</h3>
                <p>JWT Tokens</p>
                <p>Session cookies</p>
                <p>User login authentication flow</p>
                <p>Password reset authentication flow</p>
                <p>User Roles</p>
                <p>SQL injection protection techniques</p>
                <p>Validating user input</p>
                <p>ASP Web Api</p>
                <p>ASP Razor Pages</p>
                <p>ASP Hosted React Client</p>
                <p>SQL Server</p>
                <p>Entity Framework Core</p>
                <p>Serilog Logging</p>
                <p>API to API communications</p>
                <p>Lots and lots of troubleshooting</p>
                <p>Basic web app deployment</p>
                <br />
                <h3>Take A Look</h3>
                <p>The idea is that you can "plug in" your own app to this authentication system. So it will look bare bones.</p>
                <p>I did host this app on Smarterasp.net originally but their infrastructure was VERY slow.</p>
                <p>They are cheap, but the web app isn't ALWAYS RUNNING. When 15mins without traffic passes, they shut down the VMs.</p>
                <p>So I have discontinued the hosting, the git repos will have to do...</p>
                <p>Github Repo for the project is here - <Link href="https://github.com/scottishsmile/AuthProject" >Repo</Link></p>
                <p>Project Discussion Document is here - <Link href="/projects/AuthProjectDiscussionDocumentV1.docx" >Repo</Link></p>
                <br />
                </div>
            </div>
        </div>
        </Layout>
    )
}
    
export default AuthProject;