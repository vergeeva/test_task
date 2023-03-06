
function get_all_users()
{
    let url= `http://localhost:8000/api/users/all_users`
    axios.get(url).then(res => {
        // Выводим результат в консоль браузера
        console.log(res.data.users);
/*        document.querySelector('.list-element').innerHTML = res.data.users*/
    })
}