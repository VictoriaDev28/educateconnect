import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function FormControls({ formControls = [], formData, setFormData }) {
    const renderComponentByType = (item) => {
        switch (item.componentType) {
            case "input":
                return (
                    <Input
                        id={item.name}
                        name={item.name}
                        placeholder={item.placeholder}
                        type={item.type || "text"}
                    />
                );

            case "select":
                return (
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={item.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {item.options && item.options.length > 0
                                ? item.options.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.label}
                                        </SelectItem>
                                    ))
                                : null}
                        </SelectContent>
                    </Select>
                );

            case "textarea":
                return (
                    <Textarea
                        id={item.name}
                        name={item.name}
                        placeholder={item.placeholder}
                    />
                );

            default:
                return (
                    <Input
                        id={item.name}
                        name={item.name}
                        placeholder={item.placeholder}
                        type={item.type || "text"}
                    />
                );
                break;
        }
        return element;
    };

    return (
        <div className="flex flex-col gap-3">
            {formControls.map((controlItem) => (
                <div key={controlItem.name}>
                    <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                    {renderComponentByType(controlItem)}
                </div>
            ))}
        </div>
    );
}

export default FormControls;