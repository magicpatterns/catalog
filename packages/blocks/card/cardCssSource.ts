export const cardConstantCssTemplate = ``

export const cardVariantCssTemplate = `.{{ORG}}-card {
    border-width: {{borderWidth}}px;
    border-color: {{borderColor}};
    border-radius: {{borderRadius}}px;
    transition: all 200ms ease-in-out;
    overflow: hidden;

    .{{ORG}}-card-header {
        display: flex;
        align-items: center;
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
        border-bottom-width: {{borderWidth}}px;
        border-bottom-color: {{borderColor}};
        border-bottom-style: solid;
    }

    .{{ORG}}-card-body {
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
    }

    .{{ORG}}-card-footer {
        display: flex;
        align-items: center;
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
        border-top-width: {{borderWidth}}px;
        border-top-color: {{borderColor}};
        border-top-style: solid;
    }
}

.{{ORG}}-card-clickable {
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 1px 0px #1A2D494D, 0px 8px 12px 0px #1A2D4926;
    }
}
`
