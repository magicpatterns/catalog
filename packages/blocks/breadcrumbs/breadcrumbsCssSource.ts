export const breadcrumbsConstantCssTemplate = ``

export const breadcrumbsVariantCssTemplate = `.{{ORG}}-breadcrumbs {
    line-height: 20px;
  
    .icon-row-margin {
      margin-left: 14px;
      margin-right: 14px;
    }
  
    .icon-column-margin {
      margin-top: 14px;
      margin-bottom: 14px;
    }
  
    .parent {
      color: {{textColorActive}};
  
      &:hover {
        text-decoration: underline;
      }
    }
  
    .current {
      color: {{textColorInactive}};
  
      &:hover {
        text-decoration: none;
      }
    }
  }
  
  .{{ORG}}-cursor-pointer {
    cursor: pointer;
  }
  
  .{{ORG}}-breadcrumbs.row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .{{ORG}}-breadcrumbs.column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 14px;
    margin-bottom: 14px;
  }
  
  .{{ORG}}-breadcrumb-icon {
    color: {{iconColor}};
  }
  
`
