# OpenAI Custom API Interface - sLeDa

This project is a custom user interface built with React to interact with OpenAIs' and other powerful models. It allows users to send prompts to the API's and receive responses, with support for uploading files and choosing between various AI models. It's also has GPT-4-Turbo 128k Model.

![Application Screenshot](https://github.com/sleda/api-interface/blob/master/screenshots/App.png)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

To install Custom API Interface, follow these steps:

```bash
git clone https://github.com/sleda/api-interface.git
cd api-interface
npm install
```

## Usage

To use the application, follow these steps:

1. Start the application by running `npm start` in the terminal. This will launch the application in your default web browser.
2. Choose an AI model from the dropdown menu at the top of the application.
3. Enter a text prompt in the text area provided or upload a file containing your prompt.
4. Click the 'Send' button to submit your prompt to the OpenAI API.
5. The response from the API will be displayed in the 'Response' section below the prompt input area.

## Features

- Multiple AI models will be available for future versions.
- Text input for prompts.
- File upload capability for prompts.
- Responses displayed directly in the interface.

## Screenshots

<p align="center">
  <img src="https://github.com/sleda/api-interface/blob/master/screenshots/Selector.png" alt="Application Screenshot 2" width="45%">
  <img src="https://github.com/sleda/api-interface/blob/master/screenshots/Response.png" alt="Application Screenshot 1" width="45%">
</p>


## Project Structure

- `App.tsx`: The root component that renders the application.
- `APIForm.tsx`: The form component where users can input prompts and select AI models.
- `APISelector.tsx`: The dropdown component for model selection.
- `FileParser.tsx`: A utility component for parsing uploaded files.

## Contributing

Contributions to this project are welcome. Please send pull requests or open an issue to discuss what you would like to change.

## License

Distributed under the MIT License. See `LICENSE` for more information.
