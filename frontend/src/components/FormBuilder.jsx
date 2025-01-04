import { useState } from "react";
import "../styles/FormBuilder.css";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export default function FormBuilder() {
    const [form, setForm] = useState({
        title: "Untitled Form",
        fields: [
            {
                type: "text",
                label: "Example question",
                required: true,
                options: []
            }
        ],
        description: "This is an example form"
    });

    const fieldTypes = [
        { value: "text", label: "Text" },
        { value: "multiple", label: "Multiple Choice" },
        { value: "checkbox", label: "Checkbox" },
        { value: "number", label: "Number" },
        { value: "email", label: "Email" },
        { value: "date", label: "Date" },
        { value: "time", label: "Time" },
        { value: "file", label: "File" },
    ];

    const handleChange = (e, fieldIndex) => {
        const { name, value } = e.target;

        if (fieldIndex !== undefined) {
            setForm(prevForm => ({
                ...prevForm,
                fields: prevForm.fields.map((field, index) =>
                    index === fieldIndex ? { ...field, [name]: value } : field
                )
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));
        }
    };

    const handleTypeChange = (fieldIndex, type) => {
        setForm(prevForm => ({
            ...prevForm,
            fields: prevForm.fields.map((field, index) =>
                index === fieldIndex ? {
                    ...field,
                    type,
                    options: type === "multiple" ? ["Option 1"] : []
                } : field
            )
        }));
    };

    const handleOptionChange = (fieldIndex, optionIndex, value) => {
        setForm(prevForm => ({
            ...prevForm,
            fields: prevForm.fields.map((field, index) =>
                index === fieldIndex ? {
                    ...field,
                    options: field.options.map((opt, i) =>
                        i === optionIndex ? value : opt
                    )
                } : field
            )
        }));
    };

    const addOption = (fieldIndex) => {
        setForm(prevForm => ({
            ...prevForm,
            fields: prevForm.fields.map((field, index) =>
                index === fieldIndex ? {
                    ...field,
                    options: [...field.options, `Option ${field.options.length + 1}`]
                } : field
            )
        }));
    };

    const removeOption = (fieldIndex, optionIndex) => {
        setForm(prevForm => ({
            ...prevForm,
            fields: prevForm.fields.map((field, index) =>
                index === fieldIndex ? {
                    ...field,
                    options: field.options.filter((_, i) => i !== optionIndex)
                } : field
            )
        }));
    };

    const addField = () => {
        setForm(prevForm => ({
            ...prevForm,
            fields: [...prevForm.fields, {
                type: "text",
                label: "New question",
                required: true,
                options: []
            }]
        }));
    };

    const deleteField = (index) => {
        if (form.fields.length > 1) {
            setForm(prevForm => ({
                ...prevForm,
                fields: prevForm.fields.filter((_, i) => i !== index)
            }));
        } else {
            console.warn("Cannot delete the last field.");
        }
    };


    const duplicateField = (index) => {
        setForm(prevForm => ({
            ...prevForm,
            fields: [
                ...prevForm.fields.slice(0, index + 1),
                { ...prevForm.fields[index] },
                ...prevForm.fields.slice(index + 1)
            ]
        }));
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination || source.index === destination.index) return;
        setForm(prevForm => {
            const reorderedFields = Array.from(prevForm.fields);
            const [movedField] = reorderedFields.splice(source.index, 1);
            reorderedFields.splice(destination.index, 0, movedField);

            return {
                ...prevForm,
                fields: reorderedFields
            };
        });
    };



    return (
        <div className="form_builder">
            <input type="text" name="title" className="form_title" value={form.title} onChange={(e) => handleChange(e)} placeholder="Form Title" />
            <textarea name="description" className="form_description" value={form.description} onChange={(e) => handleChange(e)} placeholder="Form Description" />
            <div className="form_builder_container">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <div
                                className="form_fields"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {form.fields.length && form.fields.map((field, fieldIndex) => (
                                    <Draggable key={fieldIndex} draggableId={String(fieldIndex)} index={fieldIndex}>
                                        {(provided) => (
                                            <div
                                                className="form_field"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="field_header">
                                                    <input
                                                        type="text"
                                                        name="label"
                                                        className="field_label"
                                                        value={field?.label || ""}
                                                        onChange={(e) => handleChange(e, fieldIndex)}
                                                        placeholder="Field Label"
                                                    />

                                                    <select
                                                        value={field.type}
                                                        onChange={(e) => handleTypeChange(fieldIndex, e.target.value)}
                                                        className="field_type"
                                                    >
                                                        {fieldTypes.map(type => (
                                                            <option key={type.value} value={type.value}>
                                                                {type.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="field_actions">
                                                        <button className="form_action_icon duplicate_field" onClick={() => duplicateField(fieldIndex)}>
                                                            <ContentCopyIcon />
                                                        </button>
                                                        <button
                                                            className="form_action_icon delete_field"
                                                            onClick={() => deleteField(fieldIndex)}
                                                            disabled={form.fields.length === 1}
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </div>

                                                {field.type === "multiple" && (
                                                    <div className="field_options">
                                                        {field.options.map((option, optionIndex) => (
                                                            <div key={optionIndex} className="option_row">
                                                                <input
                                                                    type="text"
                                                                    value={option}
                                                                    onChange={(e) => handleOptionChange(fieldIndex, optionIndex, e.target.value)}
                                                                    className="option_input"
                                                                />
                                                                {field.options.length > 1 && (
                                                                    <button
                                                                        onClick={() => removeOption(fieldIndex, optionIndex)}
                                                                        className="remove_option"
                                                                    >
                                                                        <DeleteIcon />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => addOption(fieldIndex)}
                                                            className="add_option"
                                                        >
                                                            <AddIcon /> Add Option
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="form_actions">
                    <button className="form_action_icon add_field" onClick={addField}>
                        <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}