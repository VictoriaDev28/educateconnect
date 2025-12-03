import { Outlet } from "react-router-dom"
import StudentViewCommonHeader from "./Header"


function StudentViewCommonLayout(){
    return (
        <div>
            <StudentViewCommonLayout/>
            <Outlet />
        </div>
        
    )
}

export default StudentViewCommonLayout