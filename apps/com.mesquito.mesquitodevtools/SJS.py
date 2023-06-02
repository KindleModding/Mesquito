from flask import Flask, Response
import json

app = Flask(__name__)

global currentJSCommand
currentJSCommand = ""

global currentJSResponse
currentJSResponse = ""

globalHeaders = {
    "Access-Control-Allow-Origin": "*"
}

@app.route("/sendCommand/<commandToSend>")
def sendcommand(commandToSend):
    global currentJSCommand
    currentJSCommand = commandToSend
    return Response("", headers=globalHeaders)

@app.route("/getCommand")
def getCommand():
    global currentJSCommand
    returnValue = currentJSCommand
    currentJSCommand = ""

    return Response(json.dumps({"result": returnValue}), headers=globalHeaders)

@app.route("/sendOutput/<outputToSend>")
def sendOutput(outputToSend):
    global currentJSResponse
    currentJSResponse = outputToSend
    return Response("", headers=globalHeaders)

@app.route("/getOutput")
def getOutput():
    global currentJSResponse
    returnValue = currentJSResponse
    currentJSResponse = ""
    return Response(json.dumps({"result": returnValue}), headers=globalHeaders)

@app.route("/")
def rootFile():
    with open('./SJS.html') as file:
        return file.read()

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0')