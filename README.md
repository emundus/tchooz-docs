# Tchooz Documentation
This repository generates the documentation for the Tchooz project. This documentation is available at [https://emundus.github.io/tchooz-docs/](https://emundus.github.io/tchooz-docs/).

## Build locally
If you've downloaded the emundus/tchooz-docs repository and are editing Tchooz documentation on your local machine, you can generate the HTML files from markdown in the source directory. You can review your changes before you commit them or create pull requests.

**Note:** Terminal commands can be executed on Linux, Mac, and Windows (using PowerShell).

### Build prerequisites
The following software is required to build the documentation:
- [Git](https://git-scm.com/downloads)
- [Node.js (LTS version)](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/get-npm)

### Build instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/emundus/tchooz-docs.git
   ```
2. Navigate to the project directory:
    ```bash
    cd tchooz-docs
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. To watch for changes and build the documentation, run:
    ```bash
    npm run docs:dev
    ```
5. Open your browser and navigate to [http://localhost:5555/tchooz-docs/](http://localhost:5555/tchooz-docs/) to view the documentation.
6. Edit the markdown files in the `src` directory.
7. The changes will be automatically reflected in the browser.