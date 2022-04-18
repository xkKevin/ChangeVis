var func1 = async function() {
    console.log("1");
    await setTimeout(() => {
        let n = parseInt(Math.random() * 6 + 1, 10); //1~6
        console.log(n);
    }, 1000);
    console.log("2");
};

function setTT() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let n = parseInt(Math.random() * 6 + 1, 10); //1~6
            console.log(n);
            resolve();
        }, 1000);
    })
}


var func2 = async function() {
    console.log("1");
    await setTT();
    console.log("2");
};

func1();
// func2();