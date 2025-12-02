import { Label } from "@/components/ui/label"
import { InstructorContext } from "@/context/instructor-context/Index"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContext } from "react"
import { Input } from "@/components/ui/input"
import { mediaUploadService } from "@/services"
import MediaProgressBar from "@/components/media-progress-bar/Index"
import { Button } from "@/components/ui/button"



function CourseSettings(){
    const {courseLandingFormData, setCourseLandingFormData,
        mediaUploadProgress, setMediaUploadProgress,
        mediaUploadProgressPercentage, setMediaUploadProgressPercentage
    } = useContext(InstructorContext);

    async function handleImageUploadChange(event){
        const selectedImage = event.target.files[0];

        if(selectedImage){
            const imageFormData = new FormData();
            imageFormData.append('file',selectedImage);

            try {
                setMediaUploadProgress(true)
                const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage);

                if(response.success){
                    setCourseLandingFormData({
                        ...courseLandingFormData,
                        image: response.data.url
                    });
                    setMediaUploadProgress(false)
                }
                
            } catch (error) {
                console.log(error);
                
                
            }
        }
    }


    return(
        <Card>
            <CardHeader>
                <CardTitle>Course Settings</CardTitle>
            </CardHeader>

            <div className="p-4">
                {
                    mediaUploadProgress ? (
                    <MediaProgressBar  
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgressPercentage}
                    />
                ) : null
                }
            </div>
            
            <CardContent>
                {
                    courseLandingFormData?.image ?(
                    <div className="space-y-2">
                        <img 
                            src={courseLandingFormData.image}
                            alt="Course thumbnail"
                            className="w-full max-w-md h-auto rounded-md object-cover"
                        />
                        <Button 
                            onClick={() => setCourseLandingFormData({...courseLandingFormData, image: ''})}
                            className="bg-red-600 text-white mt-2"
                        >
                            Remove Image
                        </Button>
                    </div>

                 ):(
                <div className="flex flex-col gap-3">
                    <Label>Upload Course Image</Label>
                    <Input onChange={handleImageUploadChange}
                    type="file" 
                    accept="image/*"
                    className="mb-4"/>
                </div>
                  )
                }
                
            </CardContent>
        </Card>

    )
}
export default CourseSettings