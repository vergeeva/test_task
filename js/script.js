function ValidMail(email) {
    let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(email);
}

function get_all_users()
{
    let url= `http://localhost:8000/api/users/all_users`
    axios.get(url).then(res => {
        // Выводим результат в консоль браузера
        console.log(res.data.users);
        let list_of_users = document.querySelector('ol');
        let len = res.data.users.length;
        for(let i=0;i<len;i++)
        {
            let time_date_of_first_click = new Date(res.data.users[i].first_click_date);
            let year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(time_date_of_first_click);
            let month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(time_date_of_first_click);
            let day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(time_date_of_first_click);
            let hour = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(time_date_of_first_click);
            let minutes = new Intl.DateTimeFormat('ru', { minute: '2-digit' }).format(time_date_of_first_click);
            time_date_of_first_click = `${hour}:${minutes} ${day}.${month}.${year}`;
            let user_name = res.data.users[i].name;
            let count_of_click = res.data.users[i].click_count;
            const new_item = document.createElement('li');
            new_item.textContent = time_date_of_first_click + " " +user_name + " кликнул(а) "+ count_of_click + " раз(а)";
            list_of_users.appendChild(new_item);
        }
    })
}

function client_click_on_form()
{
    let user_name = document.getElementsByTagName("input")[0].value;
    let user_email = document.getElementsByTagName("input")[1].value;
    if (user_name === "" || user_email === "" )
    {
        alert("Заполните поля имени и почты");
    }
    else
    {
        if (ValidMail(user_email))
        {
            let url= `http://localhost:8000/api/users/user_clicked`;
            axios.post(url,
                {
                    name: user_name,
                    email: user_email,
                    click_count: 0
                })
                .then(res => {
                    console.log(res);
                })
                .catch(function (error) {
            console.log(error);
            console.log(user_name, user_email);
        });
            window.location.href = 'feed_page.html';
        }
        else
        {
            alert("Неверный формат email");
        }
    }
}