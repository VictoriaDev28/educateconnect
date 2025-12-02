export const signUpFormControl = [
    {
        name : 'userName',
        label : 'Username',
        placeholder : 'Enter your user name',
        type : 'text',
        componentType : 'input'
    },
    {
        name : 'userEmail',
        label : 'Email',
        placeholder : 'Enter your user email',
        type : 'email',
        componentType : 'input'
    } ,
    
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        type : 'password',
        componentType : 'input'
    }   
    
]


export const signInFormControl = [
    
    {
        name : 'userEmail',
        label : 'Email',
        placeholder : 'Enter your user email',
        type : 'email',
        componentType : 'input'
    } ,
    
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        type : 'password',
        componentType : 'input'
    }   
    
]


export const initialSignInFormData = {
    userEmail: "",
    password: ""
}

export const initialSignUpFormData = {
    userName: "",
    userEmail: "",
    password: ""
}

export const languageOptions = [
    {id: "english", label: "English"},
    {id: "swahili", label: "Swahilli"},
    {id: "french", label: "French"},
    {id: "spanish", label: "Spanish"},
];


export const courseLevelOptions = [
    {id: "beginner", label: "Beginner"},
    {id: "intermediate", label: "Itermediate"},
    {id: "advanced", label: "Advanced"}
];

export const courseCategories = [
    {id: "web-development", label: "Web Development"},
    {id: "machine-learning", label: "Machine Learning"},
    {id: "artificial-intelligence", label: "Artificial Intellligence"},
    {id: "cyber-security", label: "Cyber Security"},
    {id: "data-science", label: "Data science"},
];


export const courseLandingPageFormControls = [
    {
        name: "title", 
        label: "Title", 
        componentType: "input", 
        type: "text", 
        placeholder: "Enter course title"
    },
    {
        name: "category", 
        label: "Category", 
        componentType: "select", 
        type: "text", 
        placeholder: "", 
        options: courseCategories
    },
    {
        name: "level", 
        label: "Level", 
        componentType: "select", 
        type: "text", 
        placeholder: "", 
        options: courseLevelOptions
    },
    {
        name: "primaryLanguage",
        label: "Primary Language",
        componentType: "select",
        type: "text",
        placeholder: "",
        options: languageOptions
    },
    {
        name: "subtitle",
        label: "Subtitle",
        componentType: "input",
        type: "text",
        placeholder: "Enter course subtitle",
    },

    {
        name: "description",
        label: "Description",
        componentType: "textarea",
        type: "text",
        placeholder: "Enter course description",
    },
    {
        name: "objectives",
        label: "Objectives",
        componentType: "textarea",
        type: "text",
        placeholder: "Enter course objectives",
    },
    {
        name: "welcomeMessage",
        label: "Welcome Message",
        componentType: "textarea",
        placeholder: "Welcome Message for the Student",
    },
];


export const courseLandingInitialFormData = {
    title: "",
    category: "",
    level: "",
    primaryLanguage: "",
    subtitle: "",
    description: "",
    objectives: "",
    welcomeMessage: "",
    image: ""
};


export const courseCurriculumInitialFormData = [
    {
        title: "",
        videoUrl: "",
        free: false,
        public_id: "",
    },
]
