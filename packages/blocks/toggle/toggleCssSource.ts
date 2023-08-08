export const toggleConstantCssTemplate = ``

export const toggleVariantCssTemplate = `.{{ORG}}-toggle {
    display: flex;
    align-items: center;
}

.{{ORG}}-toggle-size-sm {
  --{{ORG}}-toggle-height: 20px;
  --{{ORG}}-toggle-width: 20px;
}

.{{ORG}}-toggle-size-md {
  --{{ORG}}-toggle-height: 22px;
  --{{ORG}}-toggle-width: 22px;
}

.{{ORG}}-toggle-size-lg {
  --{{ORG}}-toggle-height: 26px;
  --{{ORG}}-toggle-width: 26px;
}

.{{ORG}}-switch-label {
    font-size: 16px;
    font-weight: 400;
    margin-right: 12px;
  }
  
  /* The box around the slider */
  .{{ORG}}-switch {
    position: relative;
    display: inline-block;
    width: calc(var(--{{ORG}}-toggle-width) + var(--{{ORG}}-toggle-width) + 8px);
    height: calc(var(--{{ORG}}-toggle-height) + 8px);
    color: #ffffff;
  }
  
  /* Hide default HTML checkbox */
  .{{ORG}}-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .{{ORG}}-toggle-slider.{{ORG}}-toggle-slider-disabled {
    background-color: {{toggleBackgroundColorDisabled}} !important;
  }
  
  /* The slider */
  .{{ORG}}-toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: {{toggleBackgroundColor}};
    -webkit-transition: 200ms ease-in-out;
    transition: 200ms ease-in-out;
    border-radius: 34px;
  }
  
  .{{ORG}}-toggle-slider:hover {
    background-color: {{toggleBackgroundColorHover}};
  }
  
  .{{ORG}}-toggle-slider:before {
    position: absolute;
    content: '';
    height: var(--{{ORG}}-toggle-height);
    width: var(--{{ORG}}-toggle-width);
    left: 4px;
    bottom: 4px;
    background-color: #ffffff;
    -webkit-transition: 200ms ease-in-out;
    transition: 200ms ease-in-out;
    border-radius: 50%;
  }
  
  input:checked + .{{ORG}}-toggle-slider {
    background-color: {{toggleColorChecked}};
  }
  
  input:checked:hover + .{{ORG}}-toggle-slider {
    background-color: {{toggleColorCheckedHover}};
  }
  
  input:checked + .{{ORG}}-toggle-slider:before {
    -webkit-transform: translateX(var(--{{ORG}}-toggle-width));
    -ms-transform: translateX(var(--{{ORG}}-toggle-width));
    transform: translateX(var(--{{ORG}}-toggle-width));
  }
  
  .{{ORG}}-switch-enabled-icon,
  .{{ORG}}-switch-disabled-icon {
    color: #ffffff;
    display: flex;
    position: absolute;

    width: calc(var(--{{ORG}}-toggle-width) - 7px);
    height: calc(var(--{{ORG}}-toggle-height) - 7px);
  }

  .{{ORG}}-toggle-icon {
    width: calc(var(--{{ORG}}-toggle-width) - 7px);
    height: calc(var(--{{ORG}}-toggle-height) - 7px);
  }
  
  input:checked ~ .{{ORG}}-switch-enabled-icon {
    display: flex;
    top: 9px;
    left: calc(var(--{{ORG}}-toggle-width) / 3 + 1px);
  }

  input:checked ~ .{{ORG}}-switch-disabled-icon {
    display: none;
  }
  
  input:not(:checked) ~ .{{ORG}}-switch-disabled-icon {
    display: flex;
    top: 9px;
    right: calc(var(--{{ORG}}-toggle-width) / 3 + 1px);
  }

  input:not(:checked) ~ .{{ORG}}-switch-enabled-icon {
    display: none;
  }
`
