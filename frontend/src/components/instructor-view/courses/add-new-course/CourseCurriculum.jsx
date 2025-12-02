import { InstructorContext } from "@/context/instructor-context/Index"
import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useContext } from "react"
import { courseCurriculumInitialFormData } from "@/config/form"
import { mediaUploadService } from "@/services"
import { Button } from "@/components/ui/button"
import MediaProgressBar from "@/components/media-progress-bar/Index"


function CourseCurriculum(){

    const {courseCurriculumFormData, setCourseCurriculumFormData,
        mediaUploadProgress, setMediaUploadProgress,
        mediaUploadProgressPercentage, setMediaUploadProgressPercentage}
         = useContext(InstructorContext);

    function handleNewCourse(){
        setCourseCurriculumFormData([
            ...courseCurriculumFormData,
            {
                ...courseCurriculumInitialFormData[0]
            }
        ])
    }

function handleCourseTitleChange(event, currentIndex){
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],

        title: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData)
}

function handleFreeChange(currentValue, currentIndex){
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData]
    cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        free:currentValue,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData)
}

async function handleSingleCourseUpload(event, currentIndex){
        const selectedFile = event.target.files[0];

    if(selectedFile){
        const videoFormData = new FormData();
        videoFormData.append('file', selectedFile);

        try {
            setMediaUploadProgress(true)
            const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
            if(response.success){
                let cpyCourseCurriculumFormData = [...courseCurriculumFormData]
                    cpyCourseCurriculumFormData[currentIndex] = {
                        ...cpyCourseCurriculumFormData[currentIndex],
                        videoUrl: response?.data?.url,
                        public_id: response?.data?.public_id
                    }
                    setCourseCurriculumFormData(cpyCourseCurriculumFormData)
                    setMediaUploadProgress(false)
                }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

    return(
        <Card>
            <CardHeader>
                <CardTitle className=" text-teal-600">Create Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>

                <Button onClick={handleNewCourse} className="bg-teal-600 text-white">Add Course</Button>
                {
                    mediaUploadProgress ? 
                    <MediaProgressBar  
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgressPercentage}
                    /> : null
                }

                <div className="mt-4 space-y-4">
                    {
                        courseCurriculumFormData.map((curriculumItem, index) =>(
                            <div className="border p-5 rounded-md">
                                <div className="flex gap-5 items-center">

                                    <h3 className="font-semibold">Course {index+1}</h3>

                                    <Input 
                                    name={`title-${index+1}`}
                                    placeholder="Enter course title"
                                    className="mx-w-96"
                                    onChange={(event)=> handleCourseTitleChange(event, index)}
                                    value={courseCurriculumFormData[index]?.title}
                                    />

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                        onCheckedChange= {(value)=> 
                                            handleFreeChange(value, index)
                                        }
                                    
                                        checked={courseCurriculumFormData[index]?.free}
                                        id={`free-${index+1}`}
                                        />
                                        <Label htmlFor={`free-${index+1}`}>Free Course</Label>

                                    </div>

                                 </div>

                                 <div className="mt-6">
                                    {
                                        courseCurriculumFormData[index]?.videoUrl ?
                                        (
                                        <div className="flex gap-3">
                                            <video src={courseCurriculumFormData[index]?.videoUrl}
                                            width="450"
                                            height="200"
                                            controls
                                            className="rounded-md"
                                            />
                                            <Button>Replace Video</Button>
                                            <Button className="bg-red-600">Delete Video</Button>
                                        </div>
                                        )
                                        :
                                        (

                                    <Input 
                                    type="file"
                                    accept="video/*"
                                    onChange={(event)=> handleSingleCourseUpload(event, index)}
                                    className="mb-4"
                                    /> )
                                    }
                                 </div>
                               
                                 
                                    
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}
export default CourseCurriculum