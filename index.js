let task_status = "PAUSED"
let take_break = false;
let break_taken = 0;
let min_break = 0
let max_break = 0
let end_time;
let number_of_task = 0;
let each_task_min = 0
let total_work_time = 0
let timer_for_cal = 0 
let task_completed = 0
let work_time = 0


let interval = setInterval(()=>{
 let now_time = new Date().getTime()
 let diff = (end_time - now_time)
 if(task_status == "BREAK" || task_status == "WORK"){
    if(diff > 0){

        let min = Math.floor(diff/(1000 * 60));
        let sec = Math.floor((diff - (min * 1000 * 60))/1000)
        // console.log(`${min}:${sec}`)
        document.getElementById('mins').innerHTML = min >= 10 ? min : `0`+ min
        document.getElementById('sec').innerHTML = sec >= 10 ? sec : `0`+ sec
        if(task_status == "WORK"){
            //for the progress and task completed status 
            work_time += 1;
            timer_for_cal += 1;
            if(Math.floor((timer_for_cal/60)) == each_task_min){
                task_completed += 1
                timer_for_cal = 0;
            }
            let work_time_mins = work_time/60
            let percent =((work_time_mins/total_work_time) * 100).toFixed(2)
            document.getElementById("progress").innerHTML = percent + "%"
            let progress_bar = document.getElementById('meter')
            progress_bar.style.width = `${percent}%`
            if(parseInt(percent) == 100){
                task_status = "COMPLETED"
                  document.getElementById('mins').innerHTML = '00'
                 document.getElementById('sec').innerHTML = '00'
            }
        }
     }else{
        if(take_break == true)
        {
            task_status = "WORK"
            take_break = false
            end_time = new Date().getTime() + (25 * 1000 * 60)
        }else{
            task_status = "BREAK"
            break_taken = break_taken + 1
            take_break = true 
            if(break_taken % 4 == 0){
                end_time = new Date().getTime() + (max_break * 1000 * 60)
            }else{
                end_time = new Date().getTime() + (min_break * 1000 * 60)
            }
        }
     }
 }
 let focus = document.getElementById('focus_text')
 let status_element = document.getElementById('status')
 document.getElementById("task_completed").innerHTML = task_completed
 switch(task_status){
     case "WORK":
          status_element.innerHTML = "In Progress"
          focus.innerHTML = "Focus in Work"
          break;
     case "BREAK":
         status_element.innerHTML = "Break"
        focus.innerHTML = "Take A Break!"
         break;
     default:
          status_element.innerHTML = task_status
          focus.innerHTML = `Your task is ${task_status}!`
 }
},1000)

const handlesubmit = (e)=>{
    e.preventDefault();
    console.log("submitted")
    number_of_task = parseInt(document.getElementById('task_count').value)
    min_break = parseInt(document.getElementById('min_break').value)
    max_break = parseInt(document.getElementById('max_break').value)
    each_task_min = parseInt(document.getElementById('task_mins').value)
    document.getElementById('modal').classList.add('hide')
    total_work_time = number_of_task * each_task_min
    task_status = "WORK"
    end_time = new Date().getTime() + (25 * 1000 * 60)
    return false
}

var form = document.getElementById("myform");
form.addEventListener('submit', handlesubmit);

