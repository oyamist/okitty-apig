#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const pkg = require('../package.json');
const LAMBDAPATH = path.join(__dirname, '..', 'lambda');

const lambdaPkg = {
    name: pkg.name,
    description: pkg.description,
    author: pkg.author,
    version: pkg.version,
    dependencies: pkg.dependencies,
}

fs.writeFileSync(path.join(LAMBDAPATH, 'package.json'), 
    JSON.stringify(lambdaPkg, null, 2));
