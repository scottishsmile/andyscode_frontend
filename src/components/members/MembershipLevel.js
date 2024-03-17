
const MembershipLevel = ({ roles }) => {

    // So we don't display "AppBasic" or "AppPremium" in the profile we just want to display "Basic" or "Premium"

    // Incase roles is undefined because user has logged out but 2nd browser is on the premium page.
    if(roles !== null){

        if(roles.includes('AppAdmin')){
            return(
                <>Admin</>
            )
        } else if(roles.includes('AppPremium')) {
            return(
                <>Premium</>
            )
        } else if(roles.includes('AppBasic')) {
            return(
                <>Basic</>
            )
        }
        else {
            return(
                <>You are special!</>
            )
        }
    }
    else {
        return(
            <>No Roles!</>
        )
    }
}

export default MembershipLevel;