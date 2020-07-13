const ts = require("typescript");

function sourceVisitor(context, sf) {
  const visitor = (node) => {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier.text === 'react') {
      const importStatement = ts.createImportDeclaration(
        undefined,
        undefined,
        ts.createImportClause(ts.createIdentifier("createElement"), undefined),
        ts.createLiteral("vhtml")
      );
      return importStatement;
    }
    return ts.visitEachChild(node, visitor, context);
  };
  return visitor;
}

module.exports = function transform() {
  return (context) => {
    return (sourceFile) =>
      ts.visitNode(sourceFile, sourceVisitor(context, sourceFile));
  };
}