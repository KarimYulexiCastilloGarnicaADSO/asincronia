function getUserRepositories(username, callback) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => console.error('Error:', error));
  }
  
  const learners = ['KarimYulexiCastilloGarnicaADSO', 'learner2', 'learner3']; // replace with actual learner usernames
  
  for (let i = 0; i < learners.length; i++) {
    const learner = learners[i];
    getUserRepositories(learner, (repos) => {
      console.log(`Repositorios de ${learner}:`);
      repos.forEach((repo) => {
        console.log(repo.name);
      });
      console.log('------------------------');
      if (i === learners.length - 1) {
        console.log('Se han resuelto todas');
      }
    });
  }