import { Route, Routes } from "react-router-dom";
// import { Button } from "./components/ui/button";
import AuthPage from "./pages/auth/Index";
import RouteGuard  from "./components/route-guard";
import { useContext } from "react"
import { AuthContext } from "./context/auth-context/Index";
import InstructorDashboardPage from "./pages/instructor/Index";
import AddNewCoursePage from "./pages/instructor/AddNewCourse";
import StudentViewCommonLayout from "./components/student-view/CommonLayout";
import StudentHomePage from "./pages/student/home/Index";
import NotFoundPage from "./pages/not-found/Index";

function App() {

  const { auth } = useContext(AuthContext)
  return (
   <Routes>

     <Route path="/auth" element = {
      <RouteGuard element={<AuthPage/>}
      authenticated={auth?.authenticated}
      user={auth?.user}
    />
    }
    />

    <Route path="instructor" element= {
      <RouteGuard element= { <InstructorDashboardPage /> } 
      authenticated={auth?.authenticated}
      user={auth?.user}
      />
    }
    />

    <Route path="instructor/add-new-course" element={
      <RouteGuard element={<AddNewCoursePage/>}
      authenticated={auth?.authenticated}
      user={auth?.user}
      />
    }
    />

    <Route path="instructor/edit-course/:courseId" element={
      <RouteGuard element={<AddNewCoursePage/>}
      authenticated={auth?.authenticated}
      user={auth?.user}
      />
    }
    />

    <Route path='/'
    element={
      <RouteGuard element={<StudentViewCommonLayout />}
      authenticated={auth?.authenticated}
      user={auth?.user}
      />
    }>

      <Route path="" element={<StudentHomePage />}/>
      <Route path="home" element={<StudentHomePage />}/>

    </Route>
    <Route path="*" element={<NotFoundPage />}/>

   </Routes>
  );
}

export default App;