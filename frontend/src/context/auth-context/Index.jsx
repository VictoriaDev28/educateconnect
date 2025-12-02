import { initialSignInFormData } from "@/config/form";
import { initialSignUpFormData} from "@/config/form";
import { createContext, useState, useEffect } from "react"
import registerService, { loginService, checkAuthService } from '@/services'





export const AuthContext = createContext(null)

function AuthProvider({children}) {
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [auth, setAuth] = useState({
        authenticated : false,
        user: null
    });

    const [loading, setLoading] =useState(true)


    async function handleRegisterUser (event){
        event.preventDefault();
        try {
            const data = await registerService(signUpFormData);
            
            if (data.success) {
                console.log('Registration successful:', data);
                // Reset form
                setSignUpFormData({
                    userName: "",
                    userEmail: "",
                    password: ""
                });
                alert('Sign up successful! Please sign in now.');
                // Optionally auto-switch to sign in tab or redirect
            } else {
                console.error('Registration failed:', data.message);
                alert(`Sign up failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Error: ${error.message || 'Sign up failed'}`);
        }
    }
    async function handleLoginUser (event){
        event.preventDefault();
        try {
            const data = await loginService(signInFormData);

            if (data.success){
                sessionStorage.setItem('accessToken', data.data.accessToken);
                setAuth({
                    authenticated: true,
                    user: data.data.user
                });
                console.log('Login successful:', data);
                alert('Login successful!');
            } else {
                setAuth({
                    authenticated: false,
                    user: null
                })
                console.error('Login failed:', data.message);
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(`Error: ${error.message || 'Login failed'}`);
        }
    }

    // check auth user
    async function checkAuthUser () {
        try {
            const data = await checkAuthService();

            if (data?.success) {
                setAuth({
                    authenticated: true,
                    user: data.data.user,
                });
            } else {
                setAuth({
                    authenticated: false,
                    user: null,
                });
            }
        } catch (error) {
            console.log("Auth check error:", error);
            setAuth({
                authenticated: false,
                user: null,
            });
        } finally {
            setLoading(false);
        }
    }
    
function resetCredentials(){
    setAuth({
        authenticated: false,
        user:  null
    })
}

    useEffect(() =>{
        checkAuthUser();

    }, [])
   
    console.log(auth)

    return <AuthContext.Provider value={{
        signInFormData, setSignInFormData,
        signUpFormData, setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth, 
        resetCredentials

    }}
    >
        {
            loading ?  
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-teal-200 rounded-full animate-pulse"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
            : children
        }
        </AuthContext.Provider>
}
export default AuthProvider;