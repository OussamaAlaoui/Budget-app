var today = new Date();
document.getElementById('h-date').innerHTML+=today.toLocaleString("default", { month: "long" });


getinfo();
    //----------------GET-------------------------
     async function getinfo()
    {
    var inc="";
    var exp="";
    var total_exp=0;

    var total_inc=parseFloat("0");

    var total=0;
    var c="";
        const response= await fetch('/app');
        const data= await  response.json();
       
        for(item of data)
        {            

             var {date,type,description,amount}=item;
          
            if(type=='-')
             {     total_exp+=parseFloat(amount);
                    total-=parseInt(amount);  
                    exp+=`<div class="expenses-data">`+`<div class="">`+date.day+'-'+date.month+'-'+date.year+`</div>`+`<div >`+description+`</div>`+`<div >`+amount+`</div>`+`</div>`;
                    document.getElementById("expences_data").innerHTML=exp;
                    document.getElementById('EXPENSES_SCORE').innerHTML="- "+total_exp.toFixed(2);;
            }
            else 
            {      
                total_inc+=parseFloat(amount);
                total+=parseInt(amount); 
                inc+=`<div class="income-data">`+`<div class="">`+date.day+'-'+date.month+'-'+date.year+`</div>`+`<div >`+description.split('').join('&#8203;')+`</div>`+`<div >`+amount+`</div>`+`</div>`;
                document.getElementById("income_data").innerHTML=inc;
                document.getElementById('INCOME_SCORE').innerHTML="+ "+total_inc.toFixed(2);;
            }
           
        } 
        if(total>=0)
        c="+ ";
      
        document.getElementById("total").innerHTML=c+parseFloat(total).toFixed(2);
        
   } 

    //----------------POST-----------------------
    postinfo();
      function postinfo()
    {
       
      const button = document.getElementById("added");
      console.log(button);
      button.addEventListener('click', async event => {   
      const type=document.getElementById('add_type').value;
      const amount=document.getElementById('amount').value;
      const description = document.getElementById('description').value;
      const date={year:today.getFullYear(),month:(today.getMonth()+1),day:today.getDate()};
      const data={date,type,amount,description}; 
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),  
        };
      document.getElementById('amount').value="";
      document.getElementById('description').value="";
      location.reload();
      const response =  await fetch('/app',options);
      const json = await response.json();
      
      });
    
    }
     //----------------DELETE-----------------------
     deltinfo();
     function deltinfo()
   {
      
     const button_D = document.getElementById("delt");
     console.log(button_D);
    //  button.addEventListener('click', async event => {   
    //  const type=document.getElementById('add_type').value;
    //  const amount=document.getElementById('amount').value;
    //  const description = document.getElementById('description').value;
    //  const date={year:today.getFullYear(),month:(today.getMonth()+1),day:today.getDate()};
    //  const data={date,type,amount,description}; 
    //    const options = {
    //      method: 'POST',
    //      headers: {
    //        'Content-Type': 'application/json'
    //      },
    //      body: JSON.stringify(data),  
    //    };
    //  document.getElementById('amount').value="";
    //  document.getElementById('description').value="";
    //  location.reload();
    //  const response =  await fetch('/app',options);
    //  const json = await response.json();
     
    //  });
   
   }

