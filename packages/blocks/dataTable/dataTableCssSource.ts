export const dataTableConstantCssTemplate = ``

export const dataTableVariantCssTemplate = `.{{ORG}}-dataTable-container {
    width: 100%;
  }
  
  .{{ORG}}-dataTable-footer-container {
    padding: 8px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-left: 1px solid {{borderColor}};
    border-right: 1px solid {{borderColor}};
    border-bottom: 1px solid {{borderColor}};
  }
  
  .{{ORG}}-dataTable-footer-paginate {
    justify-content: flex-end;
  }
  
  .{{ORG}}-dataTable-footer-loading {
    justify-content: center;
  }
  
  .{{ORG}}-dataTable-paginate {
    display: flex;
    align-items: center;
  
    .{{ORG}}-dataTable-paginate-icon {
      width: 12px;
      height: 12px;
    }
  
    .{{ORG}}-dataTable-paginate-icon {
      width: 10px;
      height: 10px;
      cursor: pointer;
      color: {{iconColor}};
      transition: all 200ms ease-in-out;
    }
  
    .{{ORG}}-dataTable-paginate-icon:hover {
      color: {{iconColorHover}};
    }
  
    .{{ORG}}-dataTable-paginate-context {
      margin: 0 8px;
      font-size: 14px;
      color: {{contextColor}};
    }
  }
  
`
