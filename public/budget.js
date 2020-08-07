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
      var ex=0;
      var inc=0;
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
              ex+=parseFloat(amount);
              total-=parseFloat(amount);
              tr_ex = ex_table.insertRow(rowcnt_ex);       
            }
            else {
              inc+=parseFloat(amount);
              total+=parseFloat(amount);
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
              
              var delete_button = document.createElement('button');
              var i = document.createElement('i');
              delete_button.appendChild(i);
              i.setAttribute('class', 'fa fa-trash');
              // set the attributes.
              delete_button.setAttribute('type', 'button');
              delete_button.setAttribute('id', "delete");
              delete_button.setAttribute('value', item._id);
              delete_button.setAttribute('onclick', 'deltinfo(this)');
              td.setAttribute('id', 'delt_data');  
              td.appendChild(delete_button);
              
          }
          else if (c==4)
          {
            td.setAttribute('id', 'edit_data'); 
            var edit_button = document.createElement('button');
              var i = document.createElement('i');
              edit_button.appendChild(i);
              i.setAttribute('class', 'fa fa-edit');
              // set the attributes.
              edit_button.setAttribute('type', 'button');
              edit_button.setAttribute('id', "edit");
              edit_button.setAttribute('value', item._id);
              edit_button.setAttribute('onclick', 'editinfo(this)');
              td.appendChild(edit_button);
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
      
     
         document.getElementById("total").innerHTML=t+parseFloat(total).toFixed(2);
         document.getElementById("INCOME_SCORE").innerHTML='+'+parseFloat(inc).toFixed(2);
         document.getElementById("EXPENSES_SCORE").innerHTML='-'+parseFloat(ex).toFixed(2);
      
 
  } 
    //----------------GET_ELEMENT----------------
    async function getelement(id)
    {
      
   
      const response= await fetch(`/elem/${id}`);
      const mydata= await  response.json();
      var {type,description,amount}=mydata;
      
      document.getElementById('type-edit').value=type;     
      document.getElementById('description-edit').value=description;      
      document.getElementById('amount-edit').value=amount;
    
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
      const res =  await fetch('/app',options);
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
   //----------------EDIT-----------------------
  async function editinfo(ob)
  {
    getelement(ob.value) ;
    document.querySelector('.bg-modal') .style.display='flex';
    document.querySelector('.close').addEventListener('click',function(){
      document.querySelector('.bg-modal').style.display='none';

    });    
    document.getElementById('conf_ed').addEventListener('click',async function(){
      //document.querySelector('.bg-modal').style.display='none';
      const Ntype= document.getElementById('type-edit').value;
      const Ndescription= document.getElementById('description-edit').value;
      const Namount= document.getElementById('amount-edit').value;
      const newdata={type:Ntype,description:Ndescription,amount:Namount};
        const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newdata),  
      };
      location.reload();    
      document.querySelector('.bg-modal').style.display='none';
      const response =  await fetch(`/edit/${ob.value}`,options);
       const json = await response.json();
    });    
 
   
 }


