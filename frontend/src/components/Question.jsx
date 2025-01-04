import React, { useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Radio, Checkbox, RadioGroup, Button } from "@mui/material";

const Question = ({ question, setQuestions }) => {
    const [questionText, setQuestionText] = useState(question.question);
    const [answerType, setAnswerType] = useState(question.type);
    const [options, setOptions] = useState(question.options);

    const handleQuestionChange = (event) => {
        setQuestionText(event.target.value);
        updateQuestion({ question: event.target.value });
    };

    const handleAnswerTypeChange = (event) => {
        setAnswerType(event.target.value);
        updateQuestion({ type: event.target.value });
    };

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
        updateQuestion({ options: newOptions });
    };

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        updateQuestion({ options: newOptions });
    };

    const updateQuestion = (newData) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === question.id ? { ...q, ...newData } : q
            )
        );
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <TextField
                label="Question"
                value={questionText}
                onChange={handleQuestionChange}
                fullWidth
                margin="normal"
            />

            {/* Answer Type Selection */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Answer Type</InputLabel>
                <Select value={answerType} onChange={handleAnswerTypeChange}>
                    <MenuItem value="text">Short Answer</MenuItem>
                    <MenuItem value="multiple">Multiple Choice</MenuItem>
                    <MenuItem value="checkbox">Checkboxes</MenuItem>
                </Select>
            </FormControl>

            {/* Options if it's Multiple Choice or Checkboxes */}
            {(answerType === "multiple" || answerType === "checkbox") && (
                <div>
                    {options.map((option, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                value={option}
                                onChange={(e) => handleOptionChange(index, e)}
                                label={`Option ${index + 1}`}
                                margin="normal"
                            />
                            <Button
                                color="error"
                                onClick={() => removeOption(index)}
                                sx={{ ml: 2 }}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button onClick={addOption}>Add Option</Button>
                </div>
            )}

            {/* Display answer options based on type */}
            {answerType === "multiple" && (
                <RadioGroup>
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Radio />}
                            label={option}
                        />
                    ))}
                </RadioGroup>
            )}

            {answerType === "checkbox" && (
                <div>
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={option}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Question;
