# Project Details

**Project Name:** Mock

**Team Members and Contributions:** Alyssa Sun (asun59), Faizah Naqvi (ffnaqvi) (20 hrs)

**Link to Repo:** [repo](https://github.com/cs0320-s24/mock-asun59-ffnaqvi)

**IMPORTANT NOTE:** USERNAME AND PASSWORD TO SIGN IN IS: "Alyssa", "A" OR "Faizah", "F" 

# Design Choices

- **Relationships between Classes/Interfaces:**
  - **styles:** is the folder that holds all the css files that manages the front end styling. Much of this was taken from the gear up!
  - **components:** is the folder that holds all the front end type script and react files that handles front end logic.
    - **data:** This folder has the **mockData.js** which is a file that contains **mock data**. This mock data is retrieved from the front end since we don't have an actual server to return calculated data. Thus, we just have a json that contains samples of realistic data that could be returned from a CSV server that is directly being used in our front end.
    - **commands:** This folder contains everything that is needed to execute user commands. **callCommands** contains a **dictionary** that maps key commands strings to a replFunction interface. This allows us to satisfy a developer need to easily add commands without needing to modify our code greatly. The **commandFunction.tsx** handles holding all the REPLFunciton functions. We utilize **strategy pattern** through having REPLFunciton be in interface where other functions can implement this. Thus, our dictionary just maps commands to an interface so developers can add and remove commands as they please since everything is wrapped around an interface. In this folder, we implemented **search, mode, view, load** functions that is necessary for our mock uses. 
    **REPL:** This folder contains all the files that deal with the users constant command input. **REPL.tsx** is the higher level  file that simply manages the structure. There is a history const and mode const. This is help here so that other files have access to these values and can update them accordingly. We added mode here from the gear up so we can have a **shared state** that properly updates mode and the command's mode output. **REPLHisory.tsx** primarily manages with updating the history of user input and output. Much of the code was adopted from the gear up. We added an aditional funcitonality that as the history output search and view results in a form of a table for higher readability. Finally, **REPLInput.tsx** simply handles taking in an input and entering it into our REPLFunction and retreiving an output. 
    **Other files:** the other files were just basic set ups. We added a password to our login to **protect** user access to files. 

# Errors/Bugs
No known bugs

# Tests

# How to
**Run Tests:** cd into mock where the test folder exists. Call
**npx playwright test** in your terminal to execute the front end playwright tests. 

**Build and Run Program:** cd into mock where teh application lives. Call **npm start** in your terminal to run our applcation. Then click on the local host link!

# Collaboration
No collaboration
