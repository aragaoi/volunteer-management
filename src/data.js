import {v4 as uuid} from 'uuid';

export const entitiesMock = [
  {
    "id": uuid(),
    "name": "Orfanato Céu Azul",
    "type": "594",
    "document": "594",
    "address": {
      "street": "Rua A",
      "city": "B",
      "state": "C"
    },
    "email": "594",
    "phone": "594",
    "calendar": {
      "sunday": {
        "morning": {
          "available": true,
          "maxVolunteers": 5
        },
        "afternoon": {
          "available": true,
          "maxVolunteers": 5
        },
        "night": {
          "available": true,
          "maxVolunteers": 5
        }
      }
    },
    "description": "Orfanato que acolhe crianças e adolecentes desde 1990.",
    "avatarUrl": "https://www.geisinger.org/-/media/OneGeisinger/Images/ghs/patient-care/find-a-location/location-ctas/location-placeholder-460.jpg",
    "rating": {
      "average": "4",
      "evaluations": [
        {
          "user": {
            "name": "João",
            "avatar": "https://www.w3schools.com/howto/img_avatar.png"
          },
          "comment": "Cum lura peregrinatione, omnes deuses amor placidus, emeritis turpises. Glos, terror, et diatria.",
          "value": 4
        },
        {
          "user": {
            "name": "João",
            "avatar": "https://www.w3schools.com/howto/img_avatar.png"
          },
          "comment": "Cum lura peregrinatione, omnes deuses amor placidus, emeritis turpises. Glos, terror, et diatria.",
          "value": 4
        }
      ]
    }
  },
  {
    "id": uuid(),
    "name": "Asilo Dois Irmãos",
    "type": "Casa de repouso",
    "document": "564564564564",
    "address": {
      "street": "Rua José Antunes",
      "city": "São Paulo",
      "state": "SP"
    },
    "email": "asilodoisirmaos@gmail.com",
    "phone": "1199999999",
    "calendar": {
      "sunday": {
        "morning": {
          "available": true,
          "maxVolunteers": 5
        },
        "afternoon": {
          "available": true,
          "maxVolunteers": 5
        },
        "night": {
          "available": true,
          "maxVolunteers": 5
        }
      }
    },
    "description": "Casa de repouso para idosos.",
    "avatarUrl": "https://www.geisinger.org/-/media/OneGeisinger/Images/ghs/patient-care/find-a-location/location-ctas/location-placeholder-460.jpg",
    "rating": {
      "average": "3",
      "evaluations": [
        {
          "user": {
            "name": ""
          },
          "comment": "Lugar muito tranquilo",
          "value": 3
        },
        {
          "user": {
            "name": ""
          },
          "comment": "Lugar muito tranquilo",
          "value": 3
        }
      ]
    }
  },
  {
    "id": uuid(),
    "name": "ONG Meninos do Morro",
    "type": "594",
    "document": "594",
    "address": {
      "street": "Rua A",
      "city": "B",
      "state": "C"
    },
    "email": "594",
    "phone": "594",
    "calendar": {
      "sunday": {
        "morning": {
          "available": true,
          "maxVolunteers": 5
        },
        "afternoon": {
          "available": true,
          "maxVolunteers": 5
        },
        "night": {
          "available": true,
          "maxVolunteers": 5
        }
      }
    },
    "description": "ONG de trabalhos culturais com crianças e adolescentes de comunidades carente",
    "avatarUrl": "https://www.geisinger.org/-/media/OneGeisinger/Images/ghs/patient-care/find-a-location/location-ctas/location-placeholder-460.jpg",
    "rating": {
      "average": "4",
      "evaluations": [
        {
          "user": {
            "name": ""
          },
          "comment": "",
          "value": ""
        }
      ]
    }
  },
  {
    "id": uuid(),
    "name": "Clínica Vida Limpa",
    "type": "Casas de recuperação",
    "document": "897456456456",
    "address": {
      "street": "Rua A",
      "city": "B",
      "state": "C"
    },
    "email": "vidalimpa@gmail.com",
    "phone": "4799999999",
    "calendar": {
      "sunday": {
        "morning": {
          "available": true,
          "maxVolunteers": 5
        },
        "afternoon": {
          "available": true,
          "maxVolunteers": 5
        },
        "night": {
          "available": true,
          "maxVolunteers": 5
        }
      }
    },
    "description": "Casa de recuperação e reinserção social para dependentes químicos.",
    "avatarUrl": "https://www.geisinger.org/-/media/OneGeisinger/Images/ghs/patient-care/find-a-location/location-ctas/location-placeholder-460.jpg",
    "rating": {
      "average": "5",
      "evaluations": [
        {
          "user": {
            "name": ""
          },
          "comment": "Fazem um ótimo trabalho ajudando muitas pessoas.",
          "value": 5
        }
      ]
    }
  }
];

export const usersMock = [
  {
    "id": uuid(),
    "name": "João",
    "address": {
      "street": "Rua A",
      "city": "B",
      "state": "C"
    },
    "email": "joao@email.com",
    "phone": "88999999999",
    "description": "Orfanato que acolhe crianças e adolecentes desde 1990.",
    "avatarUrl": "https://www.w3schools.com/howto/img_avatar.png",
    "acceptContact": true,
    "rating": {
      "average": "4",
      "evaluations": [
        {
          "entity": {
            "name": ""
          },
          "comment": "",
          "value": "4"
        }
      ]
    }
  },
  {
    "id": uuid(),
    "name": "Maria",
    "address": {
      "street": "Rua A",
      "city": "B",
      "state": "C"
    },
    "email": "maria@email.com",
    "phone": "99999999999",
    "description": "Orfanato que acolhe crianças e adolecentes desde 1990.",
    "avatarUrl": "https://www.w3schools.com/howto/img_avatar2.png",
    "rating": {
      "average": "4",
      "evaluations": [
        {
          "entity": {
            "name": ""
          },
          "comment": "",
          "value": "4"
        }
      ]
    }
  },
]
