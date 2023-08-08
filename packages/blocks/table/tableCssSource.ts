export const tableBaseCssTemplate = `
.{{ORG}}-table-alignment-left {
    .{{ORG}}-table-cell-content {
        justify-content: flex-start;
    }
}
.{{ORG}}-table-alignment-center {
    .{{ORG}}-table-cell-content {
        justify-content: center;
    }
}
  
.{{ORG}}-table-alignment-right {
    .{{ORG}}-table-cell-content {
        justify-content: flex-end;
    }
}

.{{ORG}}-table-cell-width-nowrap {
    white-space: nowrap;
}
`

export const tableVariantCssTemplate = `
/* TABLE */
.{{VARIANT_CLASS_NAME}} {
    width: 100%;
    border-radius: {{borderRadius}}px;
    border-color: {{borderColor}};
    border-width: {{borderWidth}}px;
    border-collapse: collapse;

    .{{ORG}}-table-cell {
        border-color: {{borderColor}};
        border-width: {{borderWidth}}px;
        border-collapse: collapse;
    }

    /* TABLE HEADER + CELL */
    .{{ORG}}-table-header {
        background-color: {{backgroundColorHeader}};
        margin-bottom: 12px;

        .{{ORG}}-table-cell {
            font-weight: {{fontWeightHeader}};
            padding-left: {{paddingX}}px;
            padding-right: {{paddingX}}px;
            padding-top: {{paddingY}}px;
            padding-bottom: {{paddingY}}px;
            border-color: {{borderColorHeader}};
            border-width: {{borderWidthHeader}}px;
            border-left-style: {{borderStyleLeftHeader}};
            border-right-style: {{borderStyleRightHeader}};
            border-top-style: {{borderStyleTopHeader}};
            border-bottom-style: {{borderStyleBottomHeader}};


            .{{ORG}}-table-cell-content {
                display: flex;
            }
        }

        .{{ORG}}-table-header-cell-icon-sort {
            width: 14px;
            height: 14px;
            cursor: pointer;
            margin-left: 8px;
            color: {{sortIconColor}};
            transition: 200ms ease-in-out;
        }

        .{{ORG}}-table-header-cell-icon-sort:hover {
            color: {{sortIconColorHover}};
        }
    }

    /* TABLE CELL */
    .{{ORG}}-table-cell {
        padding: 8px;
      
        .{{ORG}}-table-cell-content {
          display: flex;
          align-items: center;
        }
      
        .{{ORG}}-table-cell-checkbox {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      
        .{{ORG}}-table-cell-checkbox-separator {
          border-right: 1px solid {{borderColor}};
        }

        .{{ORG}}-table-cell-leading-icon {
          margin-right: 8px;
          color: {{leadingIconColor}};
        }
      
        .{{ORG}}-table-cell-trailing-icon {
          margin-left: 8px;
          color: {{trailingIconColor}};
        }
    }
      
    .{{ORG}}-table-footer {
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
    }

    .{{ORG}}-table-expandable-row-container {
        padding-left: calc(2 * {{paddingX}}px);
        background-color: {{expandableRowAccentColor}};
    }

    .{{ORG}}-table-expandable-row-content {
        background-color: {{expandableRowBackgroundColor}};
        border-left: 3px solid {{expandableRowBorderColor}};
        border-bottom: 3px solid {{expandableRowBorderColor}};
    }

    .{{ORG}}-table-expandable-row-header {
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid {{borderColor}};
    }

    .{{ORG}}-table-expandable-row-panel-container {
        overflow: hidden;
        transition: max-height 200ms ease-in-out;
    }

    .{{ORG}}-table-expandable-row-panel {
        padding-left: {{paddingX}}px;
        padding-right: {{paddingX}}px;
        padding-top: {{paddingY}}px;
        padding-bottom: {{paddingY}}px;
        display: flex;
        align-items: center;
    }

    .{{ORG}}-table-expandable-row-icon {
        cursor: pointer;
        color: {{expandableRowHeaderIconColor}};
        width: 32px;
        padding: 0px 10px;
    }

    !!EXTRA_STYLES!!
}
`

export const tableVariantCssTemplateWithStripes = `
    .{{ORG}}-table-body {
        .{{ORG}}-table-row:nth-child(odd) {
            background-color: {{backgroundColorCell}};
        }
    
        .{{ORG}}-table-row:nth-child(even) {
            background-color: transparent;
        }
    }

    .{{ORG}}-table-body:before {
        content:"@";
        display:block;
        line-height:10px;
        text-indent:-99999px;
    }
`
