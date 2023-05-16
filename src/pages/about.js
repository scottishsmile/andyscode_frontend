import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/shared/Layout';
import styles from '@/styles/About.module.scss';
import Script from 'next/script';

const About = () => {
    return (
        <Layout
            title='About'
            description='About page for Andys site'
            keywords=''
        >
        <div className={styles.pagecontainer}>
          <div className={styles.headerText}>
            <h2>About Me</h2>
            <div className={styles.profilePicContainer}>
                <Image id="andy1" src="/andypic1.jpg" className={styles.profilePic} height={400} width={279} alt=''/>
            </div>
            <br />
          </div>
          <div className={styles.textBlobsContainer}>
            <div className={styles.textBlob}>
              <h3>Current Coding Job</h3>
              <p>I work for one of Australia's largest mining companies. I got my coding job through an internal job posting and a lot of luck.</p>
              <p>Working in wireless communications (shift-work) I had time at 3am to do some coding if I was able to focus.</p>
              <p>After meeting some of the software developers, I focused my personal development on moving into a coding role.</p>
              <p>July 2022 is when I started my first coding job. I have been working with super-experienced devs with up to 20 years experience in the industry.</p>
              <p>The first 6 months were brutal. It was the most mentally draining job I have ever had.</p>
              <p>The tech stack was Angular frontend, C# ASP.NET backend and Postgres Database.</p>
              <br />
              <h3>What I spent time on</h3>
              <div className={styles.spentTimeOnContainer}>
                <div className={styles.box}>
                    <p>Angular</p>
                    <ul>
                        <li>Angular 13 &amp; 14</li>
                        <li>Passing data between components</li>
                        <li>NgRx Global Store</li>
                        <li>Services</li>
                        <li>Oh my god, Observables!</li>
                        <li>Angular University</li>
                        <li>Jest Unit Tests</li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <p>C# ASP.NET</p>
                    <ul>
                        <li>ASP.NET 6 &amp; .NET 7</li>
                        <li>Entity Framework Core</li>
                        <li>Data Manipulation Manipulation</li>
                        <li>Hangfire Scheduled Tasks</li>
                        <li>Batching Database Queries</li>
                        <li>Creating API Endpoints</li>
                        <li>XUnit Tests</li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <p>JavaScript</p>
                    <ul>
                        <li>ES6</li>
                        <li>Arrays, soo many arrays.</li>
                        <li>Sometimes Sets, not arrays.</li>
                        <li>Passing by reference bit me</li>
                        <li>Map and ForEach infinitely</li>
                        <li>'string' + 'concatenation'</li>
                        <li>Design Prototypes</li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <p>Infrastructure</p>
                    <ul>
                        <li>AWS Cloudwatch Logging</li>
                        <li>Terraforms for AWS</li>
                        <li>Azure Pipelines</li>
                        <li>GitLab Repos</li>
                        <li>MS Power BI</li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <p>Python</p>
                    <ul>
                        <li>Light scripting</li>
                        <li>Converting document formats</li>
                        <li>Ripping data from documents</li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <p>Dev Extreme</p>
                    <ul>
                        <li>devexpress.com UI Components</li>
                        <li>Data Grids</li>
                        <li>Dropdown Menus</li>
                        <li>Custom changes to components</li>
                    </ul>
                </div>
              </div>
            </div>
            <div className={styles.textBlob}>
              <h3>Before Coding</h3>
              <p>Network engineering. Lots of network engineering.</p>
              <p>I started as a Network engineer working for some Perth radio stations.</p>
              <p>Specialising in Cisco equipment, I have the CCNP certification.</p>
              <p>Ended up working as a Comms tech at a couple of small mine sites. WA and QLD.</p>
              <p>Joined a bigger mining company as a site tech - mostly doing network programming, fibre optics and general IT.</p>
              <p>Moved into a city job in a Wireless Communications role for autonomous mine trucks.</p>
            </div>
            <div className={styles.textBlob}>
              <h3>Education</h3>
              <p>I have 2 degrees from UK universities</p>
              <ul>
              <li>BSc Telecommunications Engineering</li>
              <li>BSc Psychology</li>
              </ul>
              <br />
              <p>My professional certifications</p>
              <ul>
              <li>Cisco CCNP</li>
              <li>Microsoft MCSA Server 2019</li>
              <li>AWS Solutions Architect Associate</li>
              </ul>
              <br />
              <p>And then I had the required lobotomy to become an Australian citizen.</p>
            </div>
            <div className={styles.textBlob}>
              <h3>Hobbies</h3>
              <p>Coding. I do an hour every night.</p>
              <p>Computer games. I'm a natural.</p>
              <p>Learning guitar. I'm awful.</p>
              <p>I have a home gym. I'm not buff.</p>
              <p>I have a home pool table. I'm average.</p>
              <p>Karate &amp; Kung-Fu. 10 years ago.</p>
            </div>
            <div className={styles.textBlob}>
                <h3>Social Media</h3>
                <p className={styles.socialMedia}>
                    <Link href={`https://github.com/scottishsmile`}><Image src={`/socialmedia/github.png`} className={styles.image} height={50} width={50}  alt='Github' /></Link>
                    <Link href={`http://www.linkedin.com/in/andrew-davis-274a33101`}><Image src={`/socialmedia/linkedin.png`} className={styles.image} height={50} width={50}  alt='LinkedIn' /></Link>
                </p>
            </div>
            <br />
        </div>
      </div>
      <Script src="/gsap/gsap.min.js" strategy="beforeInteractive"/>
      <Script id="pic-animation" strategy="lazyOnload">
        {`

          const andy1 = document.getElementById('andy1');

          gsap.from(andy1,{ x: -200, rotation: 20, duration: 2});

        `}
      </Script>
    </Layout>
    )
}
    
export default About;