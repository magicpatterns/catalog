export const notificationBannerConstantCssTemplate = `.{{ORG}}-notificationBanner {
  padding: 14px;
  border-radius: 4px;
  box-shadow: 0px 10px 18px rgba(26, 45, 73, 0.15),
    0px 0px 1px rgba(26, 45, 73, 0.3);

  .{{ORG}}-notificationBanner-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 1;
  }

  .{{ORG}}-notificationBanner-close-button {
    padding: 4px;
    border-radius: 4px;
    width: 32px;
    margin-left: 8px;
  }
}

.{{ORG}}-notificationBanner-content.{{ORG}}-notificationBanner-size-sm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;

  .{{ORG}}-notificationBanner-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: flex-start;
  }
}

.{{ORG}}-notificationBanner-content.{{ORG}}-notificationBanner-size-lg {
  display: flex;
  justify-content: space-between;

  .{{ORG}}-notificationBanner-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-right: 60px;
  }
}

.{{ORG}}-notificationBanner-content.{{ORG}}-notificationBanner-size-xl {
  display: flex;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;

  .{{ORG}}-notificationBanner-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-right: 10px;
  }
}
`

export const notificationBannerVariantCssTemplate = `
.{{VARIANT_CLASS_NAME}} {
  background-color: {{backgroundColor}};
  color: {{textColor}};
  border-width: {{borderWidth}}px;
  border-color: {{borderColor}};

  .{{ORG}}-notificationBanner-icon {
    color: {{iconColor}};
  }

  .{{ORG}}-notificationBanner-close-button {
    background-color: {{closeButtonBackgroundColor}};
  }
}
`
