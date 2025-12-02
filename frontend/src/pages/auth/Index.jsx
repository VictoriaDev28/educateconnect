// import { Tabs } from "@components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { signUpFormControl } from "@/config/form";
import {signInFormControl } from "@/config/form"
import CommonForm from "@/components/common-form/Index";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context/Index";

function AuthPage() {
    const [activeTab, setActiveTab] = useState("signin");
    const {signInFormData, setSignInFormData,
        signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser}=useContext(AuthContext)

        function handleTabChange(value){
            setActiveTab(value);
        }

        function checkIfSignInFormIsValid(){
            return signInFormData && signInFormData.userEmail !== '' && signInFormData.password !== ''
        }


        function checkIfSignUpFormIsValid(){
            return (signUpFormData && signUpFormData.userName !== "" && signUpFormData.userEmail !== "" && signUpFormData.password !== "")
        }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link to={"/"} className="flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 mr-4" />
                    <span className="font-extrabold text-2xl text-teal-600">EducateConnect</span>
                </Link>
            </header>

            <main className="flex items-center justify-center flex-1 bg-background p-6">
                <div className="w-full max-w-md">
                    <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="signin"  className="w-full max-w-md">
                        <TabsList className="grid w-full grid-cols-2 ">
                            <TabsTrigger value="signin" className="bg-teal-600">Sign In</TabsTrigger>
                            <TabsTrigger value="signup" className="bg-teal-600">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value='signin'>
                            <Card className="p-6 space-y-4">
                                <CardHeader>
                                    <CardTitle>Sign In</CardTitle>
                                    <CardDescription>
                                        Enter Your Valid Email and Password to access your account.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <CommonForm 
                                    formControls={signInFormControl}
                                    buttonText={'Sign In'}
                                    formData={signInFormData}
                                    setFormData={setSignInFormData}
                                    isButtonDisabled={!checkIfSignInFormIsValid()}
                                    handleSubmit={handleLoginUser}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='signup'>
                            <Card className="p-6 space-y-4">
                                <CardHeader>
                                    <CardTitle>Sign Up </CardTitle>
                                    <CardDescription>
                                        Enter your Info to create a new account.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    
                                    <CommonForm 
                                    formControls={signUpFormControl}
                                    buttonText={'Sign Up'}
                                    formData={signUpFormData}
                                    setFormData={setSignUpFormData}
                                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                                    handleSubmit = { handleRegisterUser }
                                    />
                                    
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </div>
            </main>
        </div>
    );
}

export default AuthPage;