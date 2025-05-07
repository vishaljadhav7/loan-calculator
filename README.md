**Loan Calculator - Installation Guide**

**Manual Installation Steps**

### 1. Clone the Repository
To get started, clone the repository to your local machine:
```bash
git clone https://github.com/vishaljadhav7/loan-calculator
cd loan-calculator
```


### 2. Install Dependencies
Install all necessary dependencies for the project:
```bash
# Install client dependencies
npm install
```


### 3. Setup Environment Variables
To configure the application, you need to set up environment variables. Follow these steps:

- Obtain your API Key from [exchangerate-api.com](http://exchangerate-api.com/).
- Create a `.env` file in the root directory of your project.
- Add the following line to the `.env` file, replacing `YOUR_API_KEY` with your actual API key:
```
VITE_REACT_API=YOUR_API_KEY
```


### 4. Start the Application
After setting up the environment variables, you can start the application:
```bash
npm run dev
```

### 5. Access the Application
Once the application is running, you can access it at:
- **Frontend**: [http://localhost:5173](http://localhost:5173) (default Vite port)


### 6. Troubleshooting
If you encounter any issues during installation or startup, please check the following:

- Ensure all environment variables are correctly set.
- Verify that all dependencies were successfully installed.
- Check the console for any error messages and address them accordingly.

For further assistance, please open an issue on the GitHub repository.
