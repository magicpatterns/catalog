export const modalConstantCssTemplate = ``

export const modalVariantCssTemplate = `.{{ORG}}-modal-container {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .{{ORG}}-modal-overlay {
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .{{ORG}}-modal {
    position: fixed;
    background-color: {{backgroundColor}};
    color: {{color}};
    border-radius: 2px;
    overflow: hidden;
    min-width: 400px;
  }
  
  .{{ORG}}-modal-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  
  .{{ORG}}-modal-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 200ms;
  }
  
  .{{ORG}}-modal-exit {
    opacity: 1;
  }
  
  .{{ORG}}-modal-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: all 200ms;
  }
  
  .{{ORG}}-modal-header {
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
  }
  
  .{{ORG}}-modal-header-close-icon {
    cursor: pointer;
  }
  
  .{{ORG}}-modal-body {
    padding: 12px;
  }
  
  .{{ORG}}-modal-footer {
    padding: 10px 12px;
  }
  
  .{{ORG}}-modal-header ~ .{{ORG}}-modal-body {
    border-top-width: {{borderWidth}}px;
    border-top-style: solid;
    border-top-color: {{borderColor}};
  }
  
  .{{ORG}}-modal-body ~ .{{ORG}}-modal-footer {
    border-top-width: {{borderWidth}}px;
    border-top-style: solid;
    border-top-color: {{borderColor}};
  }
`
