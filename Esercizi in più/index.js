/* let array = [
    {
        num: 5,
    },
    {
        num: 3,
    }, 
    {
        num:7,
    }
];

const somma = array.reduce((pre, cor) => {
    return pre + cor.num;
},0);

console.log(somma); */

/**
 * Obiettivo: calcolare l'età media dei nostri utenti
 */

 const users = [
    { name: "Marco", birth_date: 2000 }, // 0
    { name: "Alessandro", birth_date: 1991 }, // 1
    { name: "Giovanni", birth_date: 1997 }, // 2
  ];
  
  /**
   * ***** ALGORITMO *****
   * [X] Creo un nuovo array di utenti manipolando il primo, inserendo il calcolo dell'età -> map(); -> { name: "", birth_date: 2000, age: 30 }
   * [X] Calcolo la somma dell'età di tutti gli utenti -> reduce();
   * [X] Calcolo l'età media arrotondata all'intero più vicino -> Math.round(somma / array.length);
   */
  
  const users_age = users.map((item) => {
    return {
      ...item, // { name: item.name, birth_date: item.birth_date }
      age: new Date().getFullYear() - item.birth_date // -> 2022 - 2000 = 22
    }
  });
  console.log(users_age)
  
  const somma = users_age.reduce((prev, current) => prev + current.age / 5, 0);
  // 1) 0 + 22 = 22;
  // 2) 22 + 31 = 53;
  // 3) 53 + 25 = 78;
  
  
  const media = Math.round(somma / users_age.length);

  console.log(somma);
  console.log(media)