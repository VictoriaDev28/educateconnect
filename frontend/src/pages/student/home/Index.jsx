import { AuthContext } from "@/context/auth-context/Index";
import { Button } from "@/components/ui/button";
import { useContext } from "react"



function StudentHomePage (){
    const { resetCredentials } = useContext(AuthContext);

    function handleLogout(){
        resetCredentials();
        sessionStorage.clear();

    }
    return (
        <div>Home Page
            <Button onClick={handleLogout}>LogOut</Button>
        </div>
    )
}

export default StudentHomePage