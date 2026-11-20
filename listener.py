import speech_recognition as sr
import socketio

recognizer = sr.Recognizer()
sio = socketio.Client()


def addToDo(text: str):
    sio.emit('add_todo', {'text': text})


def runProgram():
    sio.connect('http://localhost:5000')

    with sr.Microphone() as source:
        print("Adjusting for noise...")
        recognizer.adjust_for_ambient_noise(source, duration=1)

    text = ""
    while "stop" not in text.lower():
        with sr.Microphone() as source:
            print("Listening...")
            audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            print("Stated: " + text)
            if "add to do" in text.lower():
                task = text.lower().split("add to do", 1)[1].strip()
                if task:
                    addToDo(task)
        except sr.UnknownValueError:
            print("Audio not understood")
        except sr.RequestError as e:
            print(f"Could not request results; {e}")

    sio.disconnect()


if __name__ == '__main__':
    runProgram()
