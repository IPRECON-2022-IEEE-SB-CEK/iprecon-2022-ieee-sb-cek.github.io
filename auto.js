let   {exec}       = require('child_process')  
const {promisify}  = require('util')
const exe          = promisify(exec)
const {watchFile}  = require('fs');


async function ip4(){
    let bool = true
    try{
        const {stdout} = await exe('ip r')
        let ip  = stdout.split('\n')
        console.log(`connected to internet \n ${ip[0]}`)
    }
    catch(e){
        
        bool=false
    }
    return bool
    
}
(async function(){
    const {stdout} = await exe(`ls`)
    let files      = stdout.split('\n').filter(n=>n)
    console.log(files)
    let out=''
    for(i=0;i<files.length;i++){
        if(files[i].split('.').length==1 && !files[i].match('CNAME')){
            let {stdout} = await exe(`cd ${files[i]} && ls`)
            out+=stdout.split('\n').filter(n=>n).join('\n')
            await exe('cd ..')
        }
        else{
            out+='\n'+files[i]+'\n'
        }
    }
    out=out.split('\n').filter(n=>n)
    let dirs = []
    let = 0;
    out.forEach(n=>{
        dirs.push(n.split('\r')[0])
    })
    dirs.forEach(n=>{
        watchFile(n, async(curr, prev) => {
            console.log(`${n} modified at ${curr.mtime}`)
            console.log('Checking internet')
            if(await ip4()){
               try{
                n=n.split('\\')
               }
              catch(e){}
                try{
                    const {stdout} = await exe(`git add . && git commit -m "auto update in ${n[n.length-1].length!=1 ? n[n.length-1]: n} @ (${new Date().split(' ')[4]})" && git push`)
                    console.log(stdout)
                }
                catch(e){

                }
            }
        
        });
        
    })
    

})()
