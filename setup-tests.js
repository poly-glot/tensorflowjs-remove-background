import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(path.join(__dirname, 'public', 'index.html')), { encoding: "utf8" });

global.beforeEach(() => {
    document.documentElement.innerHTML = html;
});

global.afterEach(() => {
    jest.clearAllMocks();
});
