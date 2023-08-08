export const datePickerConstantCssTemplate = ``

export const datePickerVariantCssTemplate = `.{{ORG}}-datePicker-button {
    padding-left: {{paddingXButton}}px;
    padding-right: {{paddingXButton}}px;
    padding-top: {{paddingYButton}}px;
    padding-bottom: {{paddingYButton}}px;
    border-width: {{borderWidth}}px;
    border-color: {{borderColor}};
    border-radius: {{borderRadius}}px;
    font-size: {{fontSize}}px;
    font-weight: {{fontWeight}};

    .{{ORG}}-datePicker-button-icon {
        margin-right: 8px;
    }
}

.{{ORG}}-datePicker-button:hover {
    border-color: {{borderColorHover}};
}

.{{ORG}}-datePicker-content {
    display: flex;
    background-color: white;

    .{{ORG}}-datePicker-content-presets {
        width: 150px;
        border-right: 1px solid {{borderColor}};
    }

    .{{ORG}}-datePicker-content-calendar {
        padding-left: {{paddingXCalendar}}px;
        padding-right: {{paddingXCalendar}}px;
        padding-top: {{paddingYCalendar}}px;
        padding-bottom: {{paddingYCalendar}}px;
        display: flex;
        align-items: center;
    }
}

.{{ORG}}-datePicker-range-button {
    width: 100%;
    text-align: left;
    padding-left: {{paddingXRange}}px;
    padding-right: {{paddingXRange}}px;
    padding-top: {{paddingYRange}}px;
    padding-bottom: {{paddingYRange}}px;
    background-color: {{backgroundColorRange}};
    color: {{textColorRange}};
    font-size: {{fontSizeRange}}px;
    font-weight: {{fontWeightRange}};
}

.{{ORG}}-datePicker-range-button:hover {
    background-color: {{backgroundColorRangeHover}};
    color: {{textColorRangeHover}};
}

.{{ORG}}-datePicker-range-button-selected {
    background-color: {{backgroundColorRangeSelected}} !important;
    color: {{textColorRangeSelected}} !important;
}
`
