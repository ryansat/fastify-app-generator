const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

const createFile = (filePath, content) => {
    fs.writeFileSync(filePath, content, 'utf8');
};

const setupProject = async () => {
    const projectName = process.argv[2];
    if (!projectName) {
        console.log('Please provide a project name');
        return;
    }

    try {
        fs.mkdirSync(projectName);
        process.chdir(projectName);
        if (!runCommand('npm init -y')) return;

        console.log('Installing dependencies...');
        const dependencies = 'fastify drizzle-orm mariadb fastify-jwt dotenv';
        const devDependencies = 'typescript ts-node @types/node nodemon';
        if (!runCommand(`npm install ${dependencies}`) || !runCommand(`npm install -D ${devDependencies}`)) return;

        console.log('Setting up project structure...');
        const directories = ['src', 'src/models', 'src/controllers', 'src/routes', 'src/services', 'src/utils', 'src/migrations'];
        directories.forEach((dir) => fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true }));

        console.log('Creating starter files...');
        createFile('.env', `DB_HOST=localhost\nDB_USER=root\nDB_PASS=password\nDB_NAME=mydb\nJWT_SECRET=your_jwt_secret`);
        createFile('tsconfig.json', JSON.stringify({
            compilerOptions: {
                target: "ES2018",
                module: "CommonJS",
                moduleResolution: "node",
                outDir: "./dist",
                esModuleInterop: true,
                strict: true,
                skipLibCheck: true
            },
            include: ["src/**/*"],
            exclude: ["node_modules", "**/*.spec.ts"]
        }, null, 2));

        const appContent = `import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify({ logger: true });

app.get('/', async (request, reply) => {
    return { hello: 'world' };
});

const start = async () => {
    try {
        await app.listen(3000);
        console.log('Server running at http://localhost:3000/');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();`;
        createFile(path.join('src', 'app.ts'), appContent);

        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = require(packageJsonPath);
        packageJson.scripts = {
            ...packageJson.scripts,
            "build": "tsc",
            "start": "node dist/app.js",
            "dev": "nodemon --exec ts-node src/app.ts"
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`Project setup complete! Run the following commands to start your project:
cd ${projectName}
npm run dev`);

    } catch (error) {
        console.error('Error setting up the project', error);
    }
};

setupProject();
