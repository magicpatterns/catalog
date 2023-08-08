export const radioItemConstantCssTemplate = ``

export const radioItemVariantCssTemplate = `.{{ORG}}-radioItem-container {
    display: flex;
    align-items: center;
  }
  
  .{{ORG}}-radioItem-label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  
    .{{ORG}}-radioItem-input {
      position: absolute;
      height: 14px;
      width: 14px;
      opacity: 0;
      cursor: pointer;
    }
  
    .{{ORG}}-radioItem {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: {{borderWidth}}px;
      border-color: {{borderColor}};
      border-radius: 50%;
    }
  
    .{{ORG}}-radioItem-input:not(:checked):hover + .{{ORG}}-radioItem {
      background-color: {{backgroundColorHover}};
    }
  
    .{{ORG}}-radioItem-input:not(:checked):active + .{{ORG}}-radioItem {
      background-color: {{backgroundColorActive}};
      border-color: {{borderColorActive}};
    }
  
    .{{ORG}}-radioItem-input:not(:checked):disabled + .{{ORG}}-radioItem {
      background-color: {{backgroundColorDisabled}};
      border-color: {{borderColorDisabled}};
    }
  
    .{{ORG}}-radioItem-input:checked + .{{ORG}}-radioItem {
      background-color: {{backgroundColorChecked}};
      border-color: {{borderColorChecked}};
  
      .{{ORG}}-checkmark {
        color: {{checkmarkColor}};
      }
    }
  
    .{{ORG}}-radioItem-input:checked + .{{ORG}}-radioItem {
      .{{ORG}}-inner-circle {
        display: block;
      }
    }
  
    .{{ORG}}-radioItem-input:checked:hover + .{{ORG}}-radioItem {
      background-color: {{backgroundColorCheckedHover}};
      border-color: {{borderColorCheckedHover}};
    }
  
    .{{ORG}}-radioItem-input:checked:active + .{{ORG}}-radioItem {
      background-color: {{backgroundColorCheckedActive}};
      border-color: {{borderColorCheckedActive}};
    }
  
    .{{ORG}}-radioItem-input:checked:disabled + .{{ORG}}-radioItem {
      background-color: {{backgroundColorCheckedDisabled}};
      border-color: {{borderColorCheckedDisabled}};
    }
  
    .{{ORG}}-radioItem-label-text {
      margin-left: 8px;
      color: {{labelTextColor}};
    }
  
    .{{ORG}}-radioItem-label-text-sm {
      font-size: 12px;
    }
  
    .{{ORG}}-radioItem-label-text-md {
      font-size: 14px;
    }
  
    .{{ORG}}-radioItem-input:checked ~ .{{ORG}}-radioItem-label-text {
      color: {{labelTextColorChecked}};
    }
  
    .{{ORG}}-radioItem-input:checked:hover ~ .{{ORG}}-radioItem-label-text {
      color: {{labelTextColorHover}};
    }

    .{{ORG}}-radioItem-input:disabled ~ .{{ORG}}-radioItem-label-text {
      color: {{labelTextColorDisabled}} !important;
    }
  }
  
  .{{ORG}}-radioItem-icon {
    margin-left: 8px;
    width: 14px;
    height: 14px;
  }
  
  .{{ORG}}-radioItem-icon-primary {
    color: {{primaryIconColor}};
  }
  
  .{{ORG}}-radioItem-icon-secondary {
    color: {{secondaryIconColor}};
  }
  
  .{{ORG}}-inner-circle {
    display: none;
    width: 6px;
    height: 6px;
    background-color: #ffffff;
    border-radius: 50%;
  }
`
