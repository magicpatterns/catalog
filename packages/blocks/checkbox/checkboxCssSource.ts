export const checkboxConstantCssTemplate = ``

export const checkboxVariantCssTemplate = `.{{ORG}}-checkbox-container {
    display: flex;
    align-items: center;
  }

  .{{ORG}}-checkbox-size-lg {
    --{{ORG}}-checkbox-size: 16px;
    --{{ORG}}-checkbox-label-font-size: 14px;
  }

  .{{ORG}}-checkbox-size-md {
    --{{ORG}}-checkbox-size: 14px;
    --{{ORG}}-checkbox-label-font-size: 12px;
  }

  .{{ORG}}-checkbox-size-sm {
    --{{ORG}}-checkbox-size: 12px;
    --{{ORG}}-checkbox-label-font-size: 11px;
  }
  
  .{{ORG}}-checkbox-label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  
    .{{ORG}}-checkbox-input {
      position: absolute;
      height: var(--{{ORG}}-checkbox-size);
      width: var(--{{ORG}}-checkbox-size);
      opacity: 0;
      cursor: pointer;
    }
  
    .{{ORG}}-checkbox {
      flex-shrink: 0;
      width: var(--{{ORG}}-checkbox-size);
      height: var(--{{ORG}}-checkbox-size);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: {{borderRadius}}px;
      border-width: {{borderWidth}}px;
      border-color: {{borderColor}};
  
      .{{ORG}}-checkmark {
        display: none;
        height: calc(var(--{{ORG}}-checkbox-size) * 0.6);
        width: calc(var(--{{ORG}}-checkbox-size) * 0.6);
      }
    }
  
    .{{ORG}}-checkbox-input:not(:checked):hover + .{{ORG}}-checkbox {
      background-color: {{backgroundColorHover}};
    }
  
    .{{ORG}}-checkbox-input:not(:checked):active + .{{ORG}}-checkbox {
      background-color: {{backgroundColorActive}};
      border-color: {{borderColorActive}};
    }
  
    .{{ORG}}-checkbox-input:not(:checked):disabled + .{{ORG}}-checkbox {
      background-color: {{backgroundColorDisabled}};
      border-color: {{borderColorDisabled}};
    }
  
    .{{ORG}}-checkbox-input:checked + .{{ORG}}-checkbox {
      background-color: {{backgroundColorChecked}};
      border-color: {{borderColorChecked}};
  
      .{{ORG}}-checkmark {
        color: {{checkmarkColorChecked}};
      }
    }
  
    .{{ORG}}-checkbox-input:checked + .{{ORG}}-checkbox {
      .{{ORG}}-checkmark {
        display: initial;
      }
    }
  
    .{{ORG}}-checkbox-input:checked:hover + .{{ORG}}-checkbox {
      background-color: {{backgroundColorCheckedHover}};
      border-color: {{borderColorCheckedHover}};
    }
  
    .{{ORG}}-checkbox-input:checked:active + .{{ORG}}-checkbox {
      background-color: {{backgroundColorCheckedActive}};
      border-color: {{borderColorCheckedActive}};
  
      .{{ORG}}-checkmark {
        color: {{checkmarkColorCheckedActive}};
      }
    }
  
    .{{ORG}}-checkbox-input:checked:disabled + .{{ORG}}-checkbox {
      background-color: {{backgroundColorCheckedDisabled}};
      border-color: {{borderColorCheckedDisabled}};
  
      .{{ORG}}-checkmark {
        color: {{checkmarkColorCheckedDisabled}};
      }
    }
  
    .{{ORG}}-checkbox-label-text {
      margin-left: 8px;
      color: {{textColor}};
      font-size: var(--{{ORG}}-checkbox-label-font-size);
    }
  
    .{{ORG}}-checkbox-input:disabled ~ .{{ORG}}-checkbox-label-text {
      color: {{textColorDisabled}};
    }
  
    .{{ORG}}-checkbox-input:checked ~ .{{ORG}}-checkbox-label-text {
      color: {{textColorChecked}};
    }
  
    .{{ORG}}-checkbox-input:checked:hover ~ .{{ORG}}-checkbox-label-text {
      color: {{textColorCheckedHover}};
    }
  }
  
  .{{ORG}}-checkbox-icon {
    margin-left: 8px;
    width: var(--{{ORG}}-checkbox-size);
    height: var(--{{ORG}}-checkbox-size);
  }
  
  .{{ORG}}-checkbox-icon-primary {
    color: {{iconPrimaryColor}};
  }
  
  .{{ORG}}-checkbox-icon-secondary {
    color: {{iconSecondaryColor}};
  }
`
