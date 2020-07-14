import ts from '@wessberg/rollup-plugin-ts';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import path from 'path';
import transform from './transform';
import {promises} from 'fs';
const {readFile} = promises;

const extensions = [".tsx", ".ts", ".jsx", ".js"];

// const entry = path.resolve('./packages/child/entry.ts');
// const modules = {
//     [entry]: `import child from "./index";\n\nexport default child;\n`,
// };

export default {
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
        {
            async load(id) {
                if (path.extname(id) === '.tsx') {
                    const file = await readFile(id);
                    return file.toString().replace('import { createElement } from \'react\';', 'import createElement from \'vhtml\';');
                }
            }
        },
        ts({
            transpiler: 'babel',
            tsconfig: "tsconfig.vhtml.json"
        })
    ],
    output: {
        dir: './packages/child/dist/',
        format: "cjs",
        exports: "named",
    }
}