document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('github-form')
    let formInput = document.getElementById('search')
    const username = document.getElementById('user-list')
    const repo = document.getElementById('repos-list')
   
    const searchUserURL = `https://api.github.com/users?q=${document.getElementById('search').value}`


    form.addEventListener('submit', searchFunction)
    form.addEventListener('submit', ()=> {
        console.log(formInput.value)
    })
    function searchFunction (event) {
        event.preventDefault();
        fetch(`https://api.github.com/search/users?q=`+formInput.value,{
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        })
        .then(r=> r.json())
        .then(data => {
            data.items.forEach(data=> createList(data))
        })
    }

    function createList(usernames){
        const repoUrl =`https://api.github.com/users/${formInput.value}/repos`
        console.log(usernames)
        const users = usernames
        console.log(formInput.value)
        let i = document.createElement('li')
        i.innerHTML = `<img src="${users.avatar_url}"><p>User: ${users.login}</p>`
        username.appendChild(i)
        i.addEventListener('click', ()=> {
            console.log('clicked')
            console.log(users.login)
            fetch (`https://api.github.com/users/${users.login}/repos`,{
                headers: {
                    'Accept': 'application/vnd.github+json'
                }
            })
            .then(r => r.json())
            .then(data => data.forEach(data=>runData(data)))
        })
    }
    function runData(data){
        console.log(data.name)
        let j = document.createElement('li')
        j.id = 'repoList'
        j.innerHTML = `<p>${data.name}</p>`
        repo.appendChild(j)
    }
})