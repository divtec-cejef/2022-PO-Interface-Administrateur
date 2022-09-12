const listOfSections = ['INF', 'HOR', 'LAC', 'MMC', 'DCM', 'ELT', 'AUT'];
const listOfStands = [
  {
    id: 1,
    name: 'Donner du style avec CSS',
    section: listOfSections[0],
    keywords: 'CSS',
  },
  {
    id: 2,
    name: 'C\'est quoi le cryptage ?',
    section: listOfSections[0],
    keywords: 'Cryptage',
  },
  {
    id: 3,
    name: 'Les bases de la programmation',
    section: listOfSections[0],
    keywords: 'Programmation',
  },
  {
    id: 4,
    name: 'Utilisation du terminal',
    section: listOfSections[0],
    keywords: 'Terminal',
  },
  {
    id: 5,
    name: 'Créer un contenu HTML',
    section: listOfSections[0],
    keywords: 'HTML',
  },
  {
    id: 6,
    name: 'Serveur & réseau',
    section: listOfSections[0],
    keywords: 'Réseau',
  },
  {
    id: 7,
    name: 'Montage pont de barillet',
    section: listOfSections[1],
    keywords: 'Pont',
  },
  {
    id: 8,
    name: 'Horloge didactique',
    section: listOfSections[1],
    keywords: 'Horloge',
  },
  {
    id: 9,
    name: 'Carburant Martien',
    section: listOfSections[2],
    keywords: 'Poire',
  },
  {
    id: 10,
    name: 'Analyse du sol Martien !',
    section: listOfSections[3],
    keywords: 'Masse et volume',
  },
  {
    id: 11,
    name: 'Les anneaux de \"Ça tourne\"',
    section: listOfSections[3],
    keywords: 'Anneaux',
  },
  {
    id: 12,
    name: 'no name',
    section: listOfSections[4],
    keywords: 'Vaisseau',
  },
  {
    id: 13,
    name: 'Reaction time',
    section: listOfSections[5],
    keywords: 'Reaction',
  },
  {
    id: 14,
    name: 'Effet du courant électique',
    section: listOfSections[5],
    keywords: 'Courant',
  },
  {
    id: 15,
    name: 'Mars Attacks',
    section: listOfSections[6],
    keywords: 'Flipper',
  },
  {
    id: 16,
    name: 'Morpion',
    section: listOfSections[6],
    keywords: 'CNC',
  }
];
const state = {
  listOfManager: [
    {
      "id": 1,
      "first_name": "Merle",
      "last_name": "Malone",
      "email": "merlemalone@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 2,
      "first_name": "Huff",
      "last_name": "Kennedy",
      "email": "huffkennedy@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 3,
      "first_name": "Kathleen",
      "last_name": "Christian",
      "email": "kathleenchristian@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 4,
      "first_name": "Elizabeth",
      "last_name": "Massey",
      "email": "elizabethmassey@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 5,
      "first_name": "Ellis",
      "last_name": "Oneal",
      "email": "ellisoneal@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 6,
      "first_name": "Ashlee",
      "last_name": "Downs",
      "email": "ashleedowns@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 7,
      "first_name": "Monique",
      "last_name": "King",
      "email": "moniqueking@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 8,
      "first_name": "Johnnie",
      "last_name": "Rich",
      "email": "johnnierich@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 9,
      "first_name": "Dixon",
      "last_name": "Osborn",
      "email": "dixonosborn@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 10,
      "first_name": "Acevedo",
      "last_name": "House",
      "email": "acevedohouse@digique.com",
      "stand": [
        "CSS",
        "Pont"
      ]
    },
    {
      "id": 11,
      "first_name": "Ruby",
      "last_name": "Mathews",
      "email": "rubymathews@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 12,
      "first_name": "Jones",
      "last_name": "Rhodes",
      "email": "jonesrhodes@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 13,
      "first_name": "Kim",
      "last_name": "Roman",
      "email": "kimroman@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 14,
      "first_name": "Autumn",
      "last_name": "Hood",
      "email": "autumnhood@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 15,
      "first_name": "Bonner",
      "last_name": "Hyde",
      "email": "bonnerhyde@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 16,
      "first_name": "Lester",
      "last_name": "Mcfadden",
      "email": "lestermcfadden@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 17,
      "first_name": "Ashley",
      "last_name": "Beard",
      "email": "ashleybeard@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 18,
      "first_name": "Tameka",
      "last_name": "Yang",
      "email": "tamekayang@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 19,
      "first_name": "Elise",
      "last_name": "Hines",
      "email": "elisehines@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 20,
      "first_name": "Annie",
      "last_name": "Villarreal",
      "email": "annievillarreal@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 21,
      "first_name": "Reynolds",
      "last_name": "Kline",
      "email": "reynoldskline@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 22,
      "first_name": "Alisa",
      "last_name": "Bray",
      "email": "alisabray@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 23,
      "first_name": "Robyn",
      "last_name": "Boyle",
      "email": "robynboyle@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 24,
      "first_name": "Agnes",
      "last_name": "Michael",
      "email": "agnesmichael@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    },
    {
      "id": 25,
      "first_name": "Eliza",
      "last_name": "Cantu",
      "email": "elizacantu@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 26,
      "first_name": "Ursula",
      "last_name": "Price",
      "email": "ursulaprice@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 27,
      "first_name": "Yvonne",
      "last_name": "Bowers",
      "email": "yvonnebowers@digique.com",
      "stand": [
        "CSS",
        "Programmation"
      ]
    },
    {
      "id": 28,
      "first_name": "Whitney",
      "last_name": "Powell",
      "email": "whitneypowell@digique.com",
      "stand": [
        "HTML",
        "Pont"
      ]
    },
    {
      "id": 29,
      "first_name": "Theresa",
      "last_name": "Carson",
      "email": "theresacarson@digique.com",
      "stand": [
        "HTML",
        "Programmation"
      ]
    }
  ]
}
const mutations = {
  changeStand(state, payload) {
    state.listOfManager[payload.index].stand = [];
    payload.newStands.forEach(stand => {
      state.listOfManager[payload.index].stand.push(stand);
    })
  }
}
const actions = {
  updateStand({ commit }, payload) {
    let newStand = []

    payload.stands.forEach((element) => {
      newStand.push(listOfStands[element].keywords);
    });

    commit('changeStand', { index: payload.id, newStands: newStand });
  }
}
const getters = {
  getManager: (state) => {
    return state.listOfManager
  },

  getStands: () => {
    return listOfStands;
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
