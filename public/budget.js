var today = new Date();
document.getElementById('h-date').innerHTML+=today.toLocaleString("default", { month: "long" });
getinfo();
    //----------------GET-------------------------
     async function getinfo()
    {
      var inc_table= document.getElementById("data-in");
      var inc_table0= document.getElementById("INCOME_INFO");
      var ex_table= document.getElementById("data-ex");
      var total=0;
      var t="";
      var rowcnt = inc_table.rows.length; 
      var rowcnt_ex = ex_table.rows.length; 
   
        const response= await fetch('/app');
        const data= await  response.json();
       
        for(item of data)
        {              
          var tr_ex = inc_table.insertRow(rowcnt);  
          var tr = inc_table.insertRow(rowcnt);  
          var td = document.createElement('td');
          
          
            var {date,type,description,amount}=item;
            if(type=='-')
            {
              
                        tr_ex = ex_table.insertRow(rowcnt_ex);
                      
            }
            else {
           
                tr = inc_table.insertRow(rowcnt);   
            }
             td = document.createElement('td');
        
            
       
         
          
              //-----------------------NewROWS------------------------------
        for (var c = 0; c <inc_table0.rows[1].cells.length; c++) {
          if(type=='-')
          {
             td = tr_ex.insertCell(c);
          }
          else
          {
             td = tr.insertCell(c);
          }
        
          if (c ==3) {   // if its the last column of the table.
              // add a button control.
              td.setAttribute('id', 'delt_data');  
              
              var button = document.createElement('button');
              var i = document.createElement('i');
              button.appendChild(i);
              i.setAttribute('class', 'fa fa-trash');
              // set the attributes.
              button.setAttribute('type', 'button');
              button.setAttribute('id', "delete");
              button.setAttribute('value', item._id);
              button.setAttribute('onclick', 'deltinfo(this)');
              td.appendChild(button);
          }
          else {
              if(c==0)
              {
                td.setAttribute('id', 'date-in-data'); 
                td.innerHTML=date.day+'-'+date.month+'-'+date.year;
              }
              else if (c==1)
              {   
                td.setAttribute('id', 'desc_data');  
                td.innerHTML=description.split('').join('&#8203;');
              }
              else if(c==2)
              {
                td.setAttribute('id', 'amo_data');  
                td.innerHTML=amount;
              }
          }
      
           
        } 
       }
         if(total>=0)
         t="+ ";
      
         document.getElementById("total").innerHTML=c+parseFloat(total).toFixed(2);
      
 
  } 

    //----------------POST-----------------------
    postinfo();
      function postinfo()
    {      
      const button = document.getElementById("added");
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
  
   async function deltinfo(ob)
   {    
       
        const data={id:ob.value};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),  
        };
        location.reload(); 
        const response =  await fetch('/delete',options);
      const json = await response.json();
   
       
  }

