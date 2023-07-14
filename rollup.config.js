svelte({
    preprocess,
    dev: isDevelopment,
    hydratable: true,
    emitCss: true,
    onwarn: (warning, handler) => {
      const { code, frame } = warning;
  
      if (code === "anchor-is-valid" || code === "a11y-autofocus")
        return;
  
      if (code === "css-unused-selector" && frame.includes("shape"))
        return;
  
      handler(warning);
    }
  })
  