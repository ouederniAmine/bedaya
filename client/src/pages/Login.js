import Header from "../components/login&signup/Header"
import Login from "../components/login&signup/Login"

export default function LoginPage(){
    return(
        <>   <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? Ask your administrator to create one for you."
                />
            <Login/>
        </div>
    </div>
        </>
    )
}