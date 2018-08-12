var xhr = new XMLHttpRequest();
xhr.open("POST","/ws/auth.php");
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
xhr.onreadystatechange = function()
{
    alert(xhr.status + ': ' + xhr.responseText);
}
xhr.send("LOGIN=Alex");