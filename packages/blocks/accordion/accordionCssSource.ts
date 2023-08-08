export const accordionConstantCssTemplate = ``

export const accordionVariantCssTemplate = `.{{ORG}}-accordion {
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(26, 45, 73, 0.25);
    border-radius: {{borderRadius}}px;
    overflow: hidden;
    border-width: {{borderWidth}}px;
    border-color: {{borderColor}};
  }
  
  .{{ORG}}-accordion-body {
    width: 100%;
    transition: max-height 200ms ease-in-out;
    overflow: hidden;
    background-color: {{backgroundColorBody}};
  }
  
  .{{ORG}}-accordion-content {
    width: 100%;
    padding: 12px 16px;
    background-color: {{backgroundColorBody}};
  }
  
  .{{ORG}}-accordion-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    width: 100%;
    background-color: {{backgroundColorFooter}};
  }
  
  .{{ORG}}-accordion-footer-text {
    font-size: 14px;
    font-weight: 400;
    color: {{textColorFooter}};
    cursor: pointer;
  }
  
  .{{ORG}}-accordion-footer-text:hover {
    text-decoration: underline;
  }
  
  .{{ORG}}-accordion {
    .{{ORG}}-accordion-footer {
        border-top-width: {{borderWidth}}px;
        border-top-color: {{borderColor}};
        border-top-style: solid;
    }
  }
  
  .{{ORG}}-accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px 12px 16px;
    border-left-width: 4px;
    border-left-color: transparent;
    cursor: pointer;
  }
  
  .{{ORG}}-accordion-header-border {
    border-left-color: {{headerHighlightColor}};
  }
  
  .{{ORG}}-accordion-header-content {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  
  .{{ORG}}-accordion-header-left-icon {
    width: 14px;
    height: 14px;
    margin-left: 9px;
    color: {{headerLeftIconColor}};
  }

  .{{ORG}}-accordion-header-right-icon {
    width: 14px;
    height: 14px;
    margin-right: 9px;
    color: {{headerRightIconColor}};
  }
  
  .{{ORG}}-accordion-header-expand-icon {
    width: 14px;
    height: 14px;
    transition: rotate 200ms ease-in-out;
  }
  
  .{{ORG}}-accordion-header-expanded {
    .{{ORG}}-accordion-content {
      color: {{headerHighlightColor}};
    }
  
    .{{ORG}}-accordion-header-expand-icon {
      rotate: 180deg;
    }
  }
  
  .{{ORG}}-accordion {
    .{{ORG}}-accordion-header {
      border-bottom-width: {{borderWidth}}px;
      border-bottom-color: {{borderColor}};
      border-bottom-style: solid;
    }
  }
  
`
