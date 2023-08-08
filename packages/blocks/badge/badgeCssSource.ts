export const badgeConstantCssTemplate = `.{{ORG}}-badge {
    padding: 4px 6px;
    display: flex;
    align-items: center;
    font-weight: 600;
    border-radius: 4px;
    transition: all 200ms ease-in-out;
  
    .{{ORG}}-badge-left-icon {
      margin-left: 8px;
    }
  }`

export const badgeVariantCssTemplate = `
.{{VARIANT_CLASS_NAME}} {
    color: {{textColor}};
    background-color: {{backgroundColor}};

    &:hover {
        color: {{textColorHover}};
        background-color: {{backgroundColorHover}};
    }
}
`
