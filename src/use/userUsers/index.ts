import { reactive, computed } from "vue"

import app from "@/feathers-client"

interface User {
    email: string;
    password: string;
}



app.service('users').on('created', async (item: User) => {
   console.log('ITEMS EVENT created', item)
})

const register = (username: string, email: string, password: string) => {
   app.service('users').create({ username, email, password })
}

export function useUsers() {
   return {
      register
   }
}
