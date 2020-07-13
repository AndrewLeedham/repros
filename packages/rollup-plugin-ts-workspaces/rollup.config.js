const ts = require('@wessberg/rollup-plugin-ts');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const commonJS = require('@rollup/plugin-commonjs');
const path = require('path');
const transform = require('./transform');

const extensions = [".tsx", ".ts", ".jsx", ".js"];

// const entry = path.resolve('./packages/child/entry.ts');
// const modules = {
//     [entry]: `import child from "./index";\n\nexport default child;\n`,
// };

module.exports = {
    input: './packages/child/index.tsx',
    preserveModules: true,
    external: ['child', 'react', 'react-dom', 'vhtml'],
    plugins: [
        nodeResolve({extensions}),
        commonJS(),
        // {
        //     resolveId(id, importer) {
        //         if (id in modules) {
        //           return id;
        //         }
        //         if (importer && importer in modules) {
        //           return path.resolve(path.dirname(importer), id);
        //         }
        //     },
        //     load(id) {
        //         if (id in modules) {
        //             return modules[id];
        //         }
        //         return null;
        //     }
        // },
        ts({
            transpiler: 'babel',
            transformers: {
                before: [transform()],
            },
            tsconfig: "tsconfig.vhtml.json"
        })
    ],
    output: {
        dir: './packages/child/dist/',
        format: "cjs",
        exports: "named",
    }
}