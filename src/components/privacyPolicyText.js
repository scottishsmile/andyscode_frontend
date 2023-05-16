import { COMPANY_NAME, TERMS_PRIVACY_EMAIL } from '@/constants/constants';
import Link from 'next/link';

const PrivacyPolicyText = () => {

    return(
        <>
        <div>
            <h4>Privacy Policy Statement</h4>
            <br />
            <p>"We", "Our", "Us" shall refer to {COMPANY_NAME} .</p>
            <p>"You" shall refer to the customer, or user registering for an account. </p>
            <p>{COMPANY_NAME} is committed to protecting your privacy and to compliance with the Australian Privacy Principles contained in the Privacy Act 1988 (Cth). If you have any questions relating to this privacy statement or your privacy rights please contact us.</p>
            <br />
            <h4>Personal Information</h4>
            <p>"Personal information" is information or an opinion about an individual whose identity is apparent, or can reasonably be ascertained, from the information or opinion.</p>
            <p>“Sensitive Information” is Personal Information about an individual that includes health information, genetic information, biometric information or templates, or Personal Information that is also information or an opinion about an individual’s race or ethnicity, their religious, political or philosophical beliefs, opinions or affiliations, their sexual orientation or criminal record.</p>
            <p>{COMPANY_NAME} will also collect any personal information necessary for the purposes of complying with the Anti-Money Laundering and Counter-Terrorism Financing Act 2006</p>
            <p>The information we collect from you will depend on what services we provide to you and may include your name, address and contact details, your e-mail address and identification and verification information.</p>
            <br />
            <h4>Collection of personal information</h4>
            <p>{COMPANY_NAME} may collect and hold Personal Information about you such as your name, gender, date of birth, contact details (including your address, phone number and email address, whether personal or for work), level of education, financial information, billing or payment details, bank account details, tax file number, products and services information and preferences.</p>
            <p>We do not collect Sensitive Information and we will only collect such information with your consent if it is reasonably necessary for one or more of our functions or activities.</p>
            <p>We may also collect information about you from our web site but this information will only identify who you are if you provide us with your details (eg. if you e-mail your contact details to us). When you visit our web site our web server collects the following types of information for statistical purposes:</p>
            <ul>
            <li>Your Internet service provider’s address</li>
            <li>The number of users who visit the web site</li>
            <li>The date and time of each visit</li>
            <li>The pages accessed and the documents downloaded;</li>
            <li>The type of browser used.</li>
            </ul>
            <p>No attempt is made to identify individual users from this information.</p>
            <p>The website and platform contains links to the web sites of third parties. If you access those third party web sites they may collect information about you.</p>
            <p>We do not collect information about you from the third parties. You will need to contact them to ascertain their privacy standards.</p>
            <br />
            <h4>Cookies and Browser Local Storage</h4>
            <p>A cookie is a small text file placed on your computer hard drive (browser's local storage) by a web page server. Cookies may be accessed later by our web server. Cookies store information about your use of our web site. Cookies also allow us to provide you with more personalised service when using our web site.</p>
            <p>We use cookies and local storage to:</p>
            <ul>
                <li>Determine whether you have previously used the website</li>
                <li>Identify the pages you have accessed</li>
                <li>Facilitate administration of the site and for security purposes</li>
            </ul>
            <br />
            <h4>Advertising</h4>
            <p>We may use Google and/or other third-party service providers to serve ads on our behalf across the Internet and sometimes on our Website.</p>
            <p>They may collect anonymous information about your visits to our Website (not including your name, address, email address or telephone number), and your interaction with our products and services.</p>
            <p>They may also use information about your visits to the Website and other websites to target advertisements for goods and services in order to provide more relevant advertisements about goods and services of interest to you.</p>
            <p>By using this website you accept that third party cookies may be placed on your web browser or similar technology may be used where cookies are not supported in order for us to serve related advertising in future.</p>
            <br />
            <h4>Email Address</h4>
            <p>If you provide us with your e-mail address during a visit to our web site it will only be used for the purpose for which you provided it to us.</p>
            <p>It will not be added to a mailing list without your consent unless the mailing list is related to the purpose for which you provided your e-mail address to us. </p>
            <p>We may use your e-mail address, for example, to provide you with information about a particular service or respond to a message you have sent to us.</p>
            <p>We may use your email address to notify you of significant upgrades or changes to your account, our services or terms and conditions.</p>
            <br />
            <h4>Notification of the collection of personal information</h4>
            <p>When we obtain personal information about you, we ensure that you have the ability to contact us by email or support ticket request and that you are aware of the collection of information and our purposes for doing so. </p>
            <p>As per above, we are unable to provide certain services if the requested information is not provided. </p>
            <p>We do not disclose your information to third parties, unless they are related entities or services providers, in which case they are required to conform to our procedures.</p>
            <br />
            <h4>Disclosure of personal information</h4>
            <p>We may disclose your Personal Information to shareholders, officers and employees of {COMPANY_NAME}, other businesses within our group of companies, service providers who assist us in our business operations (including parties that we engage to provide you with goods or services on our behalf or who are connected with or involved in our relationship with you.</p>
            <p>We may also disclose your Personal Information to our Website host or service providers in certain limited circumstances, for example when our Website experiences a technical problem or to ensure that it operates in an effective and secure manner.</p>
            <p>We may also share non-personal, de-identified and aggregated information for research or promotional purposes or for the purpose of improving our services.</p>
            <p>We may have to disclose personal information where it is required by law, for example to government agencies and regulatory bodies as part of our statutory obligations, or for law enforcement purposes.</p>
            <br />
            <h4>Access to your personal information</h4>
            <p>Where a person requests access to their personal information, our policy is, subject to certain conditions (as outlined below) to permit access.</p>
            <p>We will correct personal information where that information is found to be inaccurate, incomplete or out of date.</p>
            <p>We will not charge you a fee for your access request but may charge you the reasonable cost of processing your request.</p>
            <p>If a person wishes to access their personal information or correct it, they should contact us by raising a support ticket or emailing {TERMS_PRIVACY_EMAIL} .</p>
            <p>We may not always be able to give you access to all the personal information we hold about you. If this is the case, we will provide a written explanation of the reasons for our refusal; together with details of our complaints process for if you wish to challenge the decision.</p>
            <p>We may not be able to give you access to information in the following circumstances:</p>
            <ul>
                <li>Where we reasonably believe this may pose a serious threat to the life, health of safety of any individual or to public health/safety.</li>
                <li>Which would unreasonably impact the privacy of another individual</li>
                <li>Where such request is reasonably considered to be frivolous or vexatious</li>
                <li>Which relates to existing or anticipated legal proceedings which would otherwise not be accessible in the discovery process relating to such proceedings</li>
                <li>Which would reveal our intentions and thereby prejudice our negotiations with you</li>
                <li>Which would be unlawful</li>
                <li>Which is prohibited by law or a court/tribunal order</li>
                <li>Which relates to suspected unlawful activity or serious misconduct, where access would likely prejudice the taking of appropriate action in relation thereto</li>
                <li>Where enforcement activities conducted by or on behalf of an enforcement body may be prejudiced</li>
                <li>Where access would reveal details regarding a commercially sensitive decision-making process</li>
                <li>Where we do not belive you are the person in question and suspect an attempt at identity fraud</li>
            </ul>
            <br />
            <h4>Security of personal information</h4>
            <p>We take reasonable steps and precautions to keep personal information secure from loss, misuse, and interference, and from unauthorised access, modification or disclosure.</p>
            <p>If you use the Internet to communicate with us, you should be aware that there are inherent risks in transmitting information over the Internet.</p>
            <p>{COMPANY_NAME} does not have control over information while in transit over the Internet and we cannot guarantee its security.</p>
            <p>Where information is no longer required to be held or retained by {COMPANY_NAME} for any purpose or legal obligation, we will take all reasonable steps to destroy or de-identify the information accordingly.</p>
            <p></p>
            <p></p>
            <p></p>
            <br />
           
           
           
            <br />
            <p><i>Version 1, March 2023</i></p>
        </div>
        </>
    )
}

export default PrivacyPolicyText;