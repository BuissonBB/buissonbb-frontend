import { reactive, computed } from "vue"

import app from "@/feathers-client"

interface Item {
    id: number;
    text: string;
}

interface ItemState {
    itemsListReady: boolean;
    items: {[id: string]: Item};
}

const itemsState: ItemState = reactive({
   itemsListReady: false,
   items: {},
})


app.service('items').on('created', async (item: Item) => {
   console.log('ITEMS EVENT created', item)
   itemsState.items[item.id] = item
})

app.service('items').on('patched', (item: Item) => {
   console.log('ITEMS EVENT patched', item)
   itemsState.items[item.id] = item
})

app.service('items').on('removed', (item: Item) => {
   console.log('ITEMS EVENT removed', item)
   delete itemsState.items[item.id]
})

const itemsList = computed(() => {
   if (!itemsState.itemsListReady) {
      app.service('items').find({}).then((list: Item[]) => {
         list.forEach(item => { itemsState.items[item.id] = item })
         itemsState.itemsListReady = true
      })
      return []
   }
   return Object.values(itemsState.items)
})

const addItem = (text: string) => {
   app.service('items').create({ text })
}

const deleteItem = (id: number) => {
   app.service('items').remove(id)
}

export function useItems() {
   return {
      itemsList, addItem, deleteItem,
   }
}
