from flask import Flask, send_from_directory
from flask_socketio import SocketIO

app = Flask(__name__, static_folder='.', static_url_path='')
socketio = SocketIO(app, cors_allowed_origins='*')

todolist = []


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


def broadcast_todos():
    socketio.emit('todos_update', {'todos': todolist})


@socketio.on('connect')
def handle_connect():
    broadcast_todos()


@socketio.on('add_todo')
def handle_add_todo(data):
    text = (data or {}).get('text', '').strip()
    if not text:
        return
    todolist.append(text)
    broadcast_todos()


@socketio.on('edit_todo')
def handle_edit_todo(data):
    data = data or {}
    index = data.get('index')
    text = (data.get('text') or '').strip()
    if index is None or not text or not (0 <= index < len(todolist)):
        return
    todolist[index] = text
    broadcast_todos()


@socketio.on('remove_todo')
def handle_remove_todo(data):
    index = (data or {}).get('index')
    if index is None or not (0 <= index < len(todolist)):
        return
    todolist.pop(index)
    broadcast_todos()


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, use_reloader=False)
