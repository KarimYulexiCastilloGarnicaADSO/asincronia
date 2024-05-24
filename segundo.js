let promesa = new Promise(() => {
    fetch("user.json")
    .then((response) => response.json())
    .then((data) => {
    console.table(data.users.map(user => ({name: user.name, avatar: user.avatar})));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  });
  let promesa2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hola"), 3000)
    console.log(2)
  });
  let promesa3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("xd"), 3000)
    console.log(3)
  });
  Promise.all([promesa, promesa2, promesa3])
    .then((values) => {
      console.log(values)
    })
    .catch((error) => {
      console.error('Error:', error);
    },)
  

