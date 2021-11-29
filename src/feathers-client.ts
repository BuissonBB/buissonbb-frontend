
// Feathers configuration
import io from 'socket.io-client'

import feathers from '@feathersjs/client'
import { BACKEND_URL } from './settings'

const app = feathers()

// En mode dev on utilise le serveur de backend qui tourne en local, sinon on est en prod et on utilise celui de prod qui tourne sur qovery
const socket = process.env.NODE_ENV === 'development' ? io() : io(BACKEND_URL)

app.configure(feathers.socketio(socket))

app.configure(feathers.authentication({ storage: window.sessionStorage }))

export default app
