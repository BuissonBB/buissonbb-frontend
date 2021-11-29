import { computed } from 'vue'

const structure = computed(() => {
  return {
    "sections": [
      {
        "name": "Gaming",
        "icon": "/assets/gamepad.png",
        "color": "#27AE60",
        "categories": [
          {
            "name": "Minecraft",
            "icon": "/assets/pickaxe.png"
          },
          {
            "name": "Pokémon",
            "icon": "/assets/pokeball.png"
          }
        ]
      },
      {
        "name": "Informatique",
        "icon": "/assets/computer.png",
        "color": "#BB6BD9",
        "categories": [
          {
            "name": "Java",
            "icon": "/assets/java.png"
          },
          {
            "name": "C++",
            "icon": "/assets/cpp.png"
          }
        ]
      }
    ]
  };
});

const title = computed(() => {
  return "BuissonBB";
});

export function useForumMeta() {
  return {
    title,
    structure
  };
};
