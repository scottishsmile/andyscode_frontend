import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Layout from '@/shared/Layout';
import Script from 'next/script';

const Home = () => {

  return(
    <Layout
      title='My Homepage'
      description='Home page for Andys site'
      keywords=''>
        <div className={styles.pagecontainer}>
          <div className={styles.topAnimation}>
            <Image id="react" src="/logos/react-logo-small.png" className={styles.animationImg} height={50} width={44} alt='' />
            <Image id="java" src="/logos/java-logo-small.png" className={styles.animationImg} height={50} width={30} alt=''/>
            <Image id="csharp" src="/logos/csharp-logo-small.png" className={styles.animationImg} height={50} width={50} alt=''/>
            <Image id="angular" src="/logos/angular-logo-small.png" className={styles.animationImg} height={50} width={50} alt=''/>
          </div>
          <br />
          <div className={styles.headerText}>
            <h2>Welcome To Andy's Code!</h2>
            <br />
          </div>
          <div className={styles.topFlexContainer}>
            <div className={styles.box}>
              <Image src="/AndyTopShot.png" className={styles.topShotPic} height={990} width={601} alt=''/>
            </div>
            <div className={styles.box}>
              <div className={styles.myPlan}>
                <p><b>My Plan: </b></p>
                <ol>
                  <li>Learn to code</li>
                  <li>Pass job interview</li>
                  <li>Ask to be paid $1 million <u>per hour!</u></li>
                  <li>Work for 1 hour</li>
                  <li>Retire</li>
                </ol>
              </div>
            </div>
          </div>
          <div className={styles.textBlobsContainer}>
            <div className={styles.textBlob}>
              <h3>My Skills</h3>
              <p>C#, Angular, React, NextJS, Python, JavaScript, Some Java, Some Django, HTML, CSS/SCSS</p>
              <p>I have dabbled in infrastructure, just what I had to learn. A little terrible forms, I mean TerraForms, and AWS Azure stuff.</p>
              <p>Git - Github, Gitlab, Sourcetree is my GUI of choice. I have some basic knowledge of pipelines.</p>
              <p>I am a Network Engineer by trade, so programming all those Cisco switches and routers. Plugging in the blue cable! </p>
              <p>When I can't get out of it, system admin work. Windows Server, Ubuntu, Linux Mint.</p>
            </div>
            <div className={styles.textBlob}>
              <h3>Coding Experience</h3>
              <p>I got lucky and got my first real coding job July 2022.</p>
              <p>Tech stack: C# ASP.NET, Angular and Postgres database.</p>
              <p>Before that, around 5 years of "self-study" in my spare time and on night shift.</p>
              <p>I still consider myself a beginner, I have drowned a few times but been resuscitated by the seniors for more punishment.</p>
            </div>
          <div className={styles.textBlob}>
              <h3>My Project</h3>
              <p>This web app is probably my best piece of work to demonstrate.</p>
              <p>ASP.NET 7 backend, NextJS FrontEnd and MySQL database.</p>
              <p>I built the login/registration system from scratch using C# Identity Core.</p>
              <p className="text-success"><b>Give it a try! Register, confirm your email, login, check your profile page, change your password.</b></p>
          </div>
        </div>
      </div>
      <Script src="/gsap/gsap.min.js" strategy="beforeInteractive"/>
      <Script id="title-animation" strategy="lazyOnload">
        {`
          const csharp = document.getElementById('csharp');
          const angular = document.getElementById('angular');
          const java = document.getElementById('java');
          const react = document.getElementById('react');

          gsap.to(angular,{ x: -20, rotation: 360, duration: 2});
          gsap.to(csharp,{ x: -30, y:-40, duration: 2});
          gsap.to(java,{ x: 20, y: 40, duration: 2});
          gsap.to(react,{ rotation: 360, duration: 2});

        `}
      </Script>
    </Layout>
  )
};

export default Home;	