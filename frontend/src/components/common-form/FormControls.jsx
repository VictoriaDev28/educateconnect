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
    const renderComponentByType = (getControlItem) => {
        const currentControlItemValue = formData?.[getControlItem.name] || ''

        switch (getControlItem.componentType) {
            case "input":
                return (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type || "text"}
                        value={currentControlItemValue}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value,
                        })}
                    />
                );

            case "select":
                return (
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value,
                            })
                        }
                        value={currentControlItemValue}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0
                                ? getControlItem.options.map((option) => (
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
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        value={currentControlItemValue}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: e.target.value,
                            })
                        }
                    />
                );

            default:
                return (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type || "text"}
                        value={currentControlItemValue}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
        }
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