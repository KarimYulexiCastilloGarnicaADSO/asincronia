async function fetchData() {
    try {
      let response = await fetch("user.json");
      let data = await response.json();
      console.table(data.users.map(user => ({name: user.name, avatar: user.avatar})));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function ola() {
    const promesa2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Hola"), 3000);
      console.log(2);
    });
  
    const promesa3 = new Promise((resolve, reject) => {
      setTimeout(() => resolve("xd"), 3000);
      console.log(3);
    });
  
    try {
      await Promise.all([fetchData(), promesa2, promesa3]);
      console.log("Se han resuelto todas");
    } catch (error) {
      console.error('Error:', error);
    }
  }
  ola();