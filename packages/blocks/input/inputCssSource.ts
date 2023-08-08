export const inputConstantCssTemplate = ``

export const inputVariantCssTemplate = `.{{VARIANT_CLASS_NAME}} {
    position: relative;
  
    .{{ORG}}-input-icon-container {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 2px;
      left: 2px;
      position: absolute;

      border-right-width: {{leadingIconBorderWidth}}px;
      border-right-color: {{borderColor}};
      background-color: {{leadingIconBackgroundColor}};
  
      .{{ORG}}-input-icon {
        width: 16px;
        height: 16px;
        color: {{leadingIconColor}};
      }
    }

    .{{ORG}}-input-icon-container ~ .{{ORG}}-input-input {
      padding-left: 52px;
    }
  
    .{{ORG}}-input-input {
      border-width: {{borderWidth}}px;
      border-color: {{borderColor}};
      border-radius: {{borderRadius}}px;
      padding: 12px;
      transition: all 200ms ease-in-out;
      font-size: 14px;
      height: 44px;
      width: 245px;
      outline: none;
      box-shadow: none;
    }
  
    .{{ORG}}-input-input {
      background-color: {{backgroundColor}};
    }
  
    .{{ORG}}-input-input:hover:not(:disabled) {
      background-color: {{backgroundColorHover}};
    }
  
    .{{ORG}}-input-input:disabled {
      background-color: {{backgroundColorDisabled}};
    }

    .{{ORG}}-input-input:focus:not(:disabled) {
      border-color: {{borderColorFocus}};
      background-color: {{backgroundColorFocus}};
    }
  
    .{{ORG}}-input-error {
      border-color: {{errorColor}} !important;
    }
  
    .{{ORG}}-input-action-icon {
      transition: all 100ms ease-in-out;
      color: {{actionIconColor}};
      cursor: pointer;
      position: absolute;
      top: 14px;
      right: 12px;
      width: 16px;
      height: 16px;
    }

    .{{ORG}}-input-action-icon-clickable {
      &:hover {
        color: {{actionIconColorHover}};
      }
    }
  
    .{{ORG}}-input-error-icon {
      color: {{errorColor}};
      cursor: pointer;
      position: absolute;
      top: 14px;
      right: 12px;
      width: 16px;
      height: 16px;
    }
  
    .{{ORG}}-input-action-icon-disabled {
      cursor: default;
    }
  }
`
