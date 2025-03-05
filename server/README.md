# CPM calculator

## Setup Instructions

### Activating Virtual Environment
Okay, sooooo the first time using server requires creating virtual environment (why? So you don't have to install things like flask on your own computer, so once this project is done you delete it and poof every library is delete with it as well). So you create it and then install all needed libraries from the requirements.txt file.

#### On Linux:
```sh
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### On Windows:
```sh
cd server
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Deactivating Virtual Environment
After the work is done you can deactivate the Virtual Environment:

#### On Windows and Linux 

```sh
deactivate
```

### Running the Backend Server
Once the virtual environment is activated, you can start the backend server by running:

#### On Linux:
```sh
python3 server.py
```

#### On Windows:
```sh
py server.py
```

Make sure all necessary dependencies are installed before running the server.

