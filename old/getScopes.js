const getScopes = (apiFunction) => {
  // Return empty array for nonexistent function
  if (!apiFunction) {
    return [];
  }

  let scopes;
  if (apiFunction.scopes) {
    // Handle individual function
    const stringOrFunctionScopes = apiFunction.scopes;

    // Add all scopes as strings
    scopes = [];
    stringOrFunctionScopes.forEach((scope) => {
      if (typeof scope === 'string') {
        // Already a string. Just add it
        scopes.push(scope);
      } else {
        // Evaluate then add all scopes
        const subScopes = getScopes(scope);
        subScopes.forEach((subScope) => {
          scopes.push(subScope);
        });
      }
    });
  } else {
    // Handle category recursively
    const scopesLists = (
      Object.keys(apiFunction)
        .map((prop) => {
          const childFunction = apiFunction[prop];
          return getScopes(childFunction);
        })
    );

    // Concatenate together
    scopes = [].concat(...scopesLists);
  }

  // Only keep unique scopes
  const scopeSet = new Set([]);
  scopes.forEach((scope) => {
    scopeSet.add(scope);
  });

  return Array.from(scopeSet);
};

module.exports = getScopes;
