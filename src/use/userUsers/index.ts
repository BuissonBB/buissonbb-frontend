import { reactive, computed } from "vue"

import app from "@/feathers-client"

interface User {
    email: string;
    password: string;
}

let registerResolve: (User) => void;

app.service('users').on('created', async (item: User) => {
   console.log('ITEMS EVENT created', item)
})

const register = async (username: string, email: string, password: string) => {
   return app.service('users').create({ username, email, password });
}

export function useUsers() {
   return {
      register
   }
}
