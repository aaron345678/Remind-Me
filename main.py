import subprocess

server = subprocess.Popen("python",'server.py')
listener = subprocess.Popen('python','listener.py')
server.wait()
listener.wait()

print("Both scripts have finished executing.")