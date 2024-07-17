const bxels = Array.from(document.getElementsByClassName("box"));

let boxes = [
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0']
];
let currentbox = [
    [null, null],
    [null, null]
];
let currentpiece = [null, null];
let pli = 0;
const starterpossiblemoves = [[
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true]
],[
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true],
    [true,true,true,true,true,true,true,true]
]];
let possiblemoves = starterpossiblemoves;

for(var b of bxels){
    b.onclick = ev => {
        let el = ev.target;
        el = el.id==""?el.parentElement:el;
        let elid = el.id;
        let x = Number(elid[0]);
        let y = Number(elid[1]);
        boxclick(x,y,el);
    }
}

function boxclick(x, y, el){
    if(currentbox[pli][0] == x && currentbox[pli][1]==y){
        switch(boxes[x][y][0]){
            case "t":
                square(el,x,y);
                break;
            case "s":
                circle(el,x,y);
                break;
            case "c":
                triangle(el,x,y);
                break;
        }
    } else {
        pli = pli==0?1:0;
        console.log(pli, x, y, possiblemoves[pli][x]);
        if(possiblemoves[pli][x][y]) {
            currentbox[pli] = [x,y];
            triangle(el,x,y);
            colorturn(el);
        } else {
            pli = pli==0?1:0;
        }
    }
    detectpossiblemoves();
}

function colorturn(el){
    el.style.background = pli==0?"var(--bluebox)":"var(--redbox)";
}
function colorpb(x, y){
    document.getElementById(`${x}${y}`).style.background = "var(--avlbox)";
}
function colordef(x, y){
    document.getElementById(`${x}${y}`).style.background = "var(--defbox)";
}


function triangle(el, x, y){
    boxes[x][y] = `t${pli}`;
    el.children[0].src = "tr.png";
    currentpiece[pli] = "t";
}
function square(el, x, y){
    boxes[x][y] = `s${pli}`;
    el.children[0].src = "sq.png";
    currentpiece[pli] = "s";
}
function circle(el, x, y){
    boxes[x][y] = `c${pli}`;
    el.children[0].src = "cc.png";
    currentpiece[pli] = "c";
}


function detectpossiblemoves(){
    let npli = pli==0?1:0;
    possiblemoves[npli] = [
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false]
    ];
    if(currentpiece[npli]==null){
        possiblemoves[npli] = [
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true]
        ]
    } else {
        let cnpx = currentbox[npli][0];
        let cnpy = currentbox[npli][1];
        switch(currentpiece[npli]){
            case "s":
                for(var tx=0; tx<8; tx++){
                    possiblemoves[npli][tx][cnpy] = true;
                }
                for(var ty=0; ty<8; ty++){
                    possiblemoves[npli][cnpx][ty] = true;
                }
                break;
            case "c":
                if(cnpx-1>-1)possiblemoves[npli][cnpx-1][cnpy] = true;
                if(cnpx+1<8)possiblemoves[npli][cnpx+1][cnpy] = true;
                if(cnpy-1>-1)possiblemoves[npli][cnpx][cnpy-1] = true;
                if(cnpy+1<8)possiblemoves[npli][cnpx][cnpy+1] = true;
                if(cnpx-1>-1&&cnpy-1>-1)possiblemoves[npli][cnpx-1][cnpy-1] = true;
                if(cnpx-1>-1&&cnpy+1<8)possiblemoves[npli][cnpx-1][cnpy+1] = true;
                if(cnpx+1<8&&cnpy-1>-1)possiblemoves[npli][cnpx+1][cnpy-1] = true;
                if(cnpx+1<8&&cnpy+1<8)possiblemoves[npli][cnpx+1][cnpy+1] = true;
                break;
            case "t":
                tx = cnpx-1, ty = cnpy-1;
                while (!(tx<0||ty<0||tx>7||ty>7)){
                    possiblemoves[npli][tx][ty] = true;
                    tx = tx-1, ty = ty-1;
                }
                tx = cnpx-1, ty = cnpy+1;
                while (!(tx<0||ty<0||tx>7||ty>7)){
                    possiblemoves[npli][tx][ty] = true;
                    tx = tx-1, ty = ty+1;
                }
                tx = cnpx+1, ty = cnpy-1;
                while (!(tx<0||ty<0||tx>7||ty>7)){
                    possiblemoves[npli][tx][ty] = true;
                    tx = tx+1, ty = ty-1;
                }
                tx = cnpx+1, ty = cnpy+1;
                while (!(tx<0||ty<0||tx>7||ty>7)){
                    possiblemoves[npli][tx][ty] = true;
                    tx = tx+1, ty = ty+1;
                }
                break;   
        }
    }
    for(var xs in boxes){
        for(var ys in boxes[xs]){
            let x=Number(xs), y=Number(ys);
            let currboxel = boxes[x][y];
            if(currboxel!="0"){
                possiblemoves[npli][x][y] = false;
            }
            if(currboxel=="0"){}
            else if(currboxel[1]==String(pli)){
                switch(currboxel[0]){
                    case "s":
                        for(var tx=0; tx<8; tx++){
                            possiblemoves[npli][tx][y] = false;
                        }
                        for(var ty=0; ty<8; ty++){
                            possiblemoves[npli][x][ty] = false;
                        }
                        break;
                    case "c":
                        if(x-1>-1)possiblemoves[npli][x-1][y] = false;
                        if(x+1<8)possiblemoves[npli][x+1][y] = false;
                        if(y-1>-1)possiblemoves[npli][x][y-1] = false;
                        if(y+1<8)possiblemoves[npli][x][y+1] = false;
                        if(x-1>-1&&y-1>-1)possiblemoves[npli][x-1][y-1] = false;
                        if(x-1>-1&&y+1<8)possiblemoves[npli][x-1][y+1] = false;
                        if(x+1<8&&y-1>-1)possiblemoves[npli][x+1][y-1] = false;
                        if(x+1<8&&y+1<8)possiblemoves[npli][x+1][y+1] = false;
                        break;
                    case "t":
                        tx = x-1, ty = y-1;
                        while (!(tx<0||ty<0||tx>7||ty>7)){
                            possiblemoves[npli][tx][ty] = false;
                            tx = tx-1, ty = ty-1;
                        }
                        tx = x-1, ty = y+1;
                        while (!(tx<0||ty<0||tx>7||ty>7)){
                            possiblemoves[npli][tx][ty] = false;
                            tx = tx-1, ty = ty+1;
                        }
                        tx = x+1, ty = y-1;
                        while (!(tx<0||ty<0||tx>7||ty>7)){
                            possiblemoves[npli][tx][ty] = false;
                            tx = tx+1, ty = ty-1;
                        }
                        tx = x+1, ty = y+1;
                        while (!(tx<0||ty<0||tx>7||ty>7)){
                            possiblemoves[npli][tx][ty] = false;
                            tx = tx+1, ty = ty+1;
                        }
                        break;
                }
            }
        }
    }

    for(var px in possiblemoves[npli]){
        for(var py in possiblemoves[npli][px]){
            if(possiblemoves[npli][px][py]) colorpb(px, py);
            else if(boxes[px][py]=="0"){
                colordef(px, py);
            }
        }
    }

}