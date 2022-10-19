function Expand() {
    if(document.getElementById('box').className == 'invbox') {
        document.getElementById('box').className = 'box';
        document.getElementById('fold').style.display = '';
        document.getElementById('fold_').style.display = '';
        document.getElementById('ava').style.display = '';
        document.getElementById('tool').style.display = '';
        expanded = true;
        console.log(10);
    } else {
        document.getElementById('box').className = 'invbox';
        document.getElementById('fold').style.display = 'none';
        document.getElementById('fold_').style.display = 'none';
        document.getElementById('ava').style.display = 'none';
        document.getElementById('tool').style.display = 'none';
        expanded = false;
        console.log(1);
    }
} 
