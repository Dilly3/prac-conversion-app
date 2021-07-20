
import './style-laptop.css'

    let apiRequest = (code, callback)=>{
    const req = new XMLHttpRequest()
    code = code.toUpperCase()
    let presentDate = new Date()
    presentDate = presentDate.toLocaleString()
    console.log(presentDate)
    let date1 = presentDate.slice(0,10)
    let time1 = presentDate.toString().slice(11,24)
    
    req.addEventListener('readystatechange',()=>{
        if(req.readyState === 4 && req.status === 200){
            callback(undefined,{Rate:JSON.parse(req.responseText).rates[code],
            Time: time1,
        Date: date1} )
        }else if (req.readyState === 4) {
            callback("url error", undefined)
        }
        
    })
    
    // https://open.exchangerate-api.com/v6/latest
    // https://jsonplaceholder.typicode.com/todos/
    req.open('GET',"https://open.exchangerate-api.com/v6/latest")
    req.send()
}

    const input = document.querySelector('.text_field')
    const submit_button = document.querySelector('.submit_button')
    const info = document.querySelector('.display_info')
    

   

    submit_button.addEventListener('click',(e)=>{
    info.innerHTML =''
    const time_div = document.createElement('div')
    const date_div = document.createElement('div')
    const rate_div = document.createElement('div')
    
    time_div.innerHTML = `Time: `
    date_div.innerHTML = `Date: `
    let code = input.value.toUpperCase()
    console.log(code)
    input.value = ''
   
    apiRequest(code,(err,data)=>{
        console.log(data)
        time_div.innerHTML += data.Time
        date_div.innerHTML += data.Date

        if(data.Rate === undefined){
            rate_div.innerHTML = 'Code does not exist'
        }else{
            rate_div.innerHTML = `1 USD = ${code} ${data.Rate}`
        }
        info.append(date_div)
        
        info.append(time_div)
        info.append(rate_div)
        info.classList.remove('hidden')
        
       
    })
},false)

