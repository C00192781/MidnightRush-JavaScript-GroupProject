from tornado import websocket, web, ioloop, httpserver
import tornado
import json

connections = {}
session=[]


WAITING_FOR_PLAYERS = 0
GAME_IN_PROGRESS = 1
game_state = WAITING_FOR_PLAYERS


class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True
        
    def open(self):
        #prints out "Connection Open" when the connection is opened
        print("Connection Open")
        
        player_address = str(self.request.remote_ip) + str(self.stream.socket.getpeername()[1])
        connections[player_address] = self
        print("Player Address:" + player_address)

    def on_message(self, message):
        #this will print the message that is sent from the .html file.
        print(message)
        msg = json.loads(message)
        if msg['type'] == "updatePosition":
            print("Update received")
            send_to_other_player(self,message)
        if msg['type'] == 'updateState':
            send_to_other_player(self, message)
        if msg['type'] == 'join':
            join(self)
            print("Joining")
        if msg['type'] == "quit":
            print("Quit")
            quitGame(self)

    def on_close(self):
        pass

def send_to_other_player(self, message):
        for key, value in connections.items():
              if(key != get_player_address(self)):
                      value.write_message(message)
    
def get_player_address(self):
	return self.request.remote_ip + str(self.stream.socket.getpeername()[1])

def format_message(self, t, d):
    msg={"type":t, "data":d}
    print(str(msg['type'])+str(msg['data']))
    return json.dumps(msg)

    
def join(self):

    if len(session)<2:
        #try:
            print("Adding to the game"+str(len(session)))
            session.append(self)
            game_state=GAME_IN_PROGRESS
            msg=format_message(self,"Success","Game has been joined")
            self.write_message(msg)

    if len(session) >= 2:
        print("Not adding")
        msg=format_message(self,"Error","Joining has failed; lobby full")
        self.write_message(msg)
        print("len: "+str(len(session)))


def quitGame(self):
    print("quitting"+str(self))
    print("clearing session")
    session.clear()
    game_state=WAITING_FOR_PLAYERS


def updatePosition(self,msg):
    print("Updating Position")
    message=format_message(self, msg['type'], msg['data'])
    send_to_other_player(self, message)



gameApp = tornado.web.Application([
	#map the handler to the URI named "test"
	(r'/wstest', WSHandler),
])

if __name__ == '__main__':
	server_port = 8080
	gameApp.listen(server_port)
	ioloop.IOLoop.instance().start()
