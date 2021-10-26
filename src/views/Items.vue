<template>
   <label>Item
      <input type="text" v-model="itemText" />
   </label>
   <button @click="addItem(itemText)">Ajouter</button>

   <hr/>
   <div>
      <ul>
         <li v-for="item in itemsList">
            {{ item.text }} <span><button @click="deleteItem(item.id)">Supprimer</button></span>
         </li>
      </ul>
      <div v-if="itemsList.length === 0">
         Aucun item présent
      </div>
   </div>
</template>

<script>
import { ref } from "vue"
import { useItems } from "@/use/useItems"

export default {

   setup() {
      const { itemsList, addItem, deleteItem } = useItems()

      const itemText = ref('')

      return {
         itemsList, addItem, deleteItem,
         itemText,
      }
   }
}
</script>

<style>
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}
</style>
