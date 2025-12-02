import FormControls from "@/components/common-form/FormControls"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { courseLandingPageFormControls } from "@/config/form"
import { InstructorContext } from "@/context/instructor-context/Index"
import { useContext } from "react"


function CourseLanding(){

    const {courseLandingFormData, setCourseLandingFormData} = useContext(InstructorContext)
    return(
        <Card>
            <CardHeader>
                <CardTitle>Course Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
                <FormControls 
                formControls={courseLandingPageFormControls}
                formData={courseLandingFormData}
                setFormData={setCourseLandingFormData}
                />
            </CardContent>
        </Card>

    )
}
export default CourseLanding