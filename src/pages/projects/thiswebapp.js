import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/shared/Layout';
import styles from '@/styles/projects/ThisWebApp.module.scss';

const ThisWebApp = () => {
    return (
        <Layout
            title='This Website'
            description='This webiste project page'
            keywords=''
        >
        <div className={styles.pagecontainer}>
        <div className={styles.headerText}>
                <h2>This Web App</h2>
                <div className={styles.screenShotContainer}>
                    <Image id="firstproject" src="/projects/thiswebsite-screenshot.png" className={styles.screenShot} height={727} width={546} layout="responsive" objectFit="contain" alt=''/>
                </div>
            </div>
            <br />
            <div className={styles.textBlobsContainer}>
                <div className={styles.textBlob}>
                <h3>This Website</h3>
                <p>Yes, this website. You're looking at it!</p>
                <p>Try registering for an account! It won't let you login until you confirm your email.</p>
                <p>Login and access our members area, then upgrade your account to gain access to the Premium Members VIP area.</p>
                <p>Change your profile's email address and username - you should be able to login with your old email until you confirm your new email.</p>
                <p>Reset your password.</p>
                <p>Go on, go on, go on, go on! Do it!</p>
                <br />
                <h3>This Website</h3>
                <p><b>API:</b> C# ASP.NET 7 <b>Frontend:</b> NextJS (basically React), <b>Admin GUI:</b> ASP RazorPages</p>
                <p>To improve on my "Auth project" (where I wrote my own user authentication API) I wanted to use an industry standard framework for my next app.</p>
                <p>Identity Core is an authentication that comes with ASP. It's getting a little older now, but it is free and you can host your own authentication so there's no recurring fees.</p>
                <p>Unfortunately, Identity Core also scaffolds out the RazorPages for login, registration and password resets. I didn't like that. Identity Core wants to be more of a standalone MVC app you send your users to for login and then it re-directs them back to your website.</p>
                <p>I wanted the login form to be in the NextJS frontend app, so it matches the website's look and feel. I didn't want to redirect users from my frontend website to my backend API to view a RazorPage for login.</p>
                <p>So I used Identity Core's API modules and turned it all into API end points! It took a long time.</p>
                <p>Not that many people have done this, I'm one of a select few.</p>
                <br />
                <h3>Front End</h3>
                <p>NextJS 13 was chosen as the frontend framework because I wanted the app to perform well in SEO.</p>
                <p>React / Angular are good SPAs (Single Page Apps) but Google sees them as almost a blank page, as they are a single javascript page that dynamically changes.</p>
                <p>NextJS gives you the option of easily generating static HTML pages from react-style code. So google can see all the content!</p>
                <p>It also loads really fast and can also be run in a React-style client SPA mode should you need it.</p>
                <p>Next-Auth is the most popular authentication framework for NextJS. I use it to handle the communication with the backend API to log users in and out.</p>
                <p>I got really deep into this framework, following their guidelines on how to code the refresh/access token flow.</p>
                <p>The Blog on this website is quite nice, I followed an online tutorial to build it and then customised it.</p>
                < br />
                <h3>Back End</h3>
                <p>I stuck with ASP.NET as I have been using it for so long. This app started in dotnet 6 and was upgraded to dotnet 7.</p>
                <p>Identity Framework Core handles all the user authentication. My previous "roll my own auth" project really helped me understand what I was doing and why.</p>
                <p>API versioning was also mplemented and enabled in Swagger.</p>
                <p>I started to use the SOLID design principals a lot more in this project as I was becoming more experienced. I also dabbled with the Factory Design Pattern.</p>
                <p>A JWT refresh and access token system was coded from scratch. I wanted users to be able to stay logged in for a week, so they didn't have to constantly login every time they closed the browser.</p>
                < br />
                <h3>What I learned</h3>
                <p>API Versioning</p>
                <p>Access and Refresh Tokens</p>
                <p>Identity Core Framework</p>
                <p>Even more about JWTs and Session cookies</p>
                <p>Even more about user registration, login and password authentication flow</p>
                <p>Entity Framework Core</p>
                <p>MySQL</p>
                <p>SOLID design principals</p>
                <p>AppSettings and Secrets</p>
                <p>Factory design pattern</p>
                <p>NextJS</p>
                <p>React</p>
                <p>Next Auth</p>
                <p>Logging frameworks Serilog and Winston</p>
                <p></p>
                <br />
                <h3>Repo</h3>
                <p>Github Repo for the project is here - <Link href="https://github.com/scottishsmile/AuthProject" >Repo</Link></p>
                <br />
                </div>
            </div>
        </div>
        </Layout>
    )
}
    
export default ThisWebApp;