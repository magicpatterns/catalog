export const tooltipConstantCssTemplate = ``

export const tooltipVariantCssTemplate = `.{{ORG}}-tooltip-wrapper {
    position: relative;
  }
  
  .{{ORG}}-tooltip {
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    font-size: 14px;
    background-color: {{backgroundColor}};
    color: {{textColor}};
    max-width: {{maxWidth}}px;
    width: max-content;
  }
  
  .{{ORG}}-tooltip-sm {
    padding: 5px 8px;
  }
  
  .{{ORG}}-tooltip-md {
    padding: 12px;
  }
  
  .{{ORG}}-tooltip-lg {
    padding: 8px;
  }
  
  .{{ORG}}-tooltip-header {
    font-size: 14px;
    font-weight: 600;
  }
  
  .{{ORG}}-tooltip-body {
    font-size: 12px;
    font-weight: 400;
  }
  
  .{{ORG}}-tooltip-header ~ .{{ORG}}-tooltip-body {
    margin-top: 4px;
  }
  
  .{{ORG}}-tooltip::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: {{arrowSize}}px;
    margin-left: calc({{arrowSize}} * -1)px;
  }
  
  /* Top */
  .{{ORG}}-tooltip.{{ORG}}-tooltip-top {
    bottom: calc({{offset}}px + 100%);
  }
  .{{ORG}}-tooltip.{{ORG}}-tooltip-top::before {
    top: 100%;
    border-top-color: {{backgroundColor}};
  }
  
  /* Right */
  .{{ORG}}-tooltip.{{ORG}}-tooltip-right {
    left: calc(100% + {{offset}}px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  
  .{{ORG}}-tooltip.{{ORG}}-tooltip-right::before {
    left: calc({{arrowSize}} * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: {{backgroundColor}};
  }
  
  /* Bottom */
  .{{ORG}}-tooltip.{{ORG}}-tooltip-bottom {
    top: calc({{offset}}px + 100%);
  }
  
  .{{ORG}}-tooltip.{{ORG}}-tooltip-bottom::before {
    bottom: 100%;
    border-bottom-color: {{backgroundColor}};
  }
  
  /* Left */
  .{{ORG}}-tooltip.{{ORG}}-tooltip-left {
    left: auto;
    right: calc(100% + {{offset}}px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  
  .{{ORG}}-tooltip.{{ORG}}-tooltip-left::before {
    left: auto;
    right: calc({{arrowSize}} * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: {{backgroundColor}};
  }
  
  .{{ORG}}-tooltip-actions {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 8px;
  }
  
  .{{ORG}}-tooltip-actions-center {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  
  .{{ORG}}-tooltip-actions-left {
    flex-direction: row;
  }
  
  .{{ORG}}-tooltip-actions-right {
    flex-direction: row-reverse;
  }
  
  .{{ORG}}-tooltip-primary-action {
    background-color: {{primaryActionBackgroundColor}} !important;
    color: {{primaryActionTextColor}} !important;
  }
  
  .{{ORG}}-tooltip-secondary-action {
    color: {{secondaryActionColor}} !important;
  }
  
`
