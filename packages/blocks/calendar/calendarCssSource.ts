export const calendarConstantCssTemplate = ``

export const calendarVariantCssTemplate = `.{{VARIANT_CLASS_NAME}} {
    transition: all 200ms ease-in-out;
    display: flex;
    gap: 24px;

    .{{ORG}}-calendar-container {
        display: flex;
        flex-direction: column;

        .{{ORG}}-calendar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: {{paddingXHeader}}px;
            padding-right: {{paddingXHeader}}px;
            padding-top: {{paddingYHeader}}px;
            padding-bottom: {{paddingYHeader}}px;
        }

        .{{ORG}}-calendar-header-text {
            font-size: {{fontSizeHeader}}px;
            font-weight: {{fontWeightHeader}};
            margin: 0 14px;
        }

        .{{ORG}}-calendar-header-icon-button {
            background-color: {{controlIconBackgroundColor}};
            width: 32px;
            height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;

            .{{ORG}}-calendar-header-icon {
                width: 16px;
                height: 16px;
                cursor: pointer;
                color: {{controlIconColor}};
            }
        }

        .{{ORG}}-calendar-header-icon-button:hover {
            background-color: {{controlIconBackgroundColorHover}};
        }

        .{{ORG}}-calendar-header-icon-button:active {
            background-color: {{controlIconBackgroundColorActive}};
        }

        .{{ORG}}-calendar-header-icon {
            width: 14px;
            height: 14px;
            cursor: pointer;
        }
    }

    .{{ORG}}-calendar-body {
        display: flex;
        align-items: flex-start;
    }

    .{{ORG}}-calendar-table {
        display: table;
        border-collapse: collapse; 

        .{{ORG}}-calendar-weekday-row {
            display: table-row;
            border-bottom: 1px solid gray;

            .{{ORG}}-calendar-cell {
                font-weight: {{fontWeightWeekday}};
            }
        }

        .{{ORG}}-calendar-cell {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            border: none;
            width: auto;
            background: transparent;
            width: {{width}}px;
            height: {{height}}px;
            font-size: {{fontSizeCell}}px;
            font-weight: {{fontWeightCell}};
            border-radius: 50%;
        }

        .{{ORG}}-calendar-cell:hover {
            background-color: {{backgroundColorHover}};
            color: {{fontColorHover}};
        }

        .{{ORG}}-calendar-cell-disabled {
            color: {{fontColorDisabled}};
            font-weight: {{fontWeightDisabled}};
            background-color: transparent;
        }

        .{{ORG}}-calendar-cell-disabled:hover {
            background-color: transparent;
            color: {{fontColorDisabled}};
        }

        .{{ORG}}-calendar-cell-in-range {
            background-color: {{backgroundColorRange}};
            color: {{fontColorRange}};
            border-radius: 0;
        }

        .{{ORG}}-calendar-cell-in-range:hover {
            background-color: {{backgroundColorRange}};
            color: {{fontColorRange}};
        }

        .{{ORG}}-calendar-cell-selected {
            background-color: {{backgroundColorSelected}} !important;
            color: {{fontColorSelected}} !important;
        }

        .{{ORG}}-calendar-cell-selected-left {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        .{{ORG}}-calendar-cell-selected-right {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
}
`
