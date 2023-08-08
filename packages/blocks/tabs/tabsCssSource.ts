export const tabsConstantCssTemplate = ``

export const tabsVariantCssTemplate = `.{{ORG}}-tabs {
  display: flex;
  transition: all 200ms ease-in-out;

  .{{ORG}}-tab {
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-color: transparent;
  }

  .{{ORG}}-tab:hover {
    border-color: {{borderColorHover}};
  }

  .{{ORG}}-tab-active {
    font-weight: 600;
    border-color: {{borderColorActive}} !important;
  }
}

.{{ORG}}-tabs-left {
  flex-direction: column;

  .{{ORG}}-tab {
    border-left-width: 4px;
  }
}

.{{ORG}}-tabs-bottom {
  flex-direction: row;

  .{{ORG}}-tab {
    border-bottom-width: 4px;
  }
}

.{{ORG}}-tabs-sm {
  .{{ORG}}-tab {
    padding: 8px 12px;
  }
}

.{{ORG}}-tabs-lg {
  .{{ORG}}-tab {
    padding: 16px 24px;
  }
}
`
