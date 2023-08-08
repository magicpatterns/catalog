export const paginationConstantCssTemplate = `
`

export const paginationVariantCssTemplate = `.{{VARIANT_CLASS_NAME}} {
    display: flex;
    flex-direction: row;
    border-radius: {{borderRadius}}px;
    border-width: {{borderWidth}}px;
    border-color: {{borderColor}};

    .{{ORG}}-pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
        border-width: {{borderWidth}}px;
        border-color: {{borderColor}};
        background-color: {{backgroundColorControls}};
        cursor: pointer;

        color: {{colorControls}};
        font-weight: {{fontWeightControls}};

    }

    .{{ORG}}-pagination-controls-left {
        border-right-style: solid;
        border-left-style: none;
        border-top-style: none;
        border-bottom-style: none;
    }

    .{{ORG}}-pagination-controls-right {
        border-right-style: none;
        border-left-style: solid;
        border-top-style: none;
        border-bottom-style: none;
    }


    .{{ORG}}-pagination-control-icon {
        width: 16px;
        height: 16px;
    }

    .{{ORG}}-pagination-controls:hover {
        color: {{colorControlsHover}};
    }
    

    .{{ORG}}-pagination-controls-disabled {
        cursor: initial;
        color: {{colorControlsDisabled}} !important;
    }


    .{{ORG}}-pagination-pages-text-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;

        .{{ORG}}-pagination-pages-text-content {
            font-weight: {{fontWeightPages}};
            font-size: {{fontSizePages}}px;
        }
    }

    .{{ORG}}-pagination-pages-numbers-container {
        display: flex;
        justify-content: center;
        align-items: center;

        .{{ORG}}-pagination-pages-numbers-button {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: {{paddingY}}px;
            padding-bottom: {{paddingY}}px;
            border-radius: {{borderRadiusPages}}px;
            font-weight: {{fontWeightPages}};
            font-size: {{fontSizePages}}px;
            cursor: pointer;
        }

        .{{ORG}}-pagination-pages-numbers-button-active {
            color: {{colorPagesActive}};
            background-color: {{backgroundColorPagesActive}};
        }
    }
}
`
